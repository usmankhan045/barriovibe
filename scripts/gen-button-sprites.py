from PIL import Image
from statistics import median
import math, os

SRC = Image.open('/Users/usmankhan/projects/services website/assets/source/mockup-1-hero.png').convert('RGB')
px = SRC.load()
OUT = '/Users/usmankhan/projects/services website/public/art'
MIDW, SS, UP, FEATHER = 128, 4, 2, 7   # middle width, alpha supersample, output scale, cap blend
INBOARD = 2.5   # px to pull edge colour in from
EDGE    = 0.5   # capsule inset

def build(name, x0, x1, y0, y1, lift):
    W, H = x1-x0+1, y1-y0+1
    cap = round(H/2)
    src = [[px[x0+c, y0+r] for c in range(W)] for r in range(H)]
    lum = [[sum(p)/3 for p in row] for row in src]

    # separable fit (glyph-masked) — drives the synthesised middle and the cap falloff
    keep = []
    for r in range(H):
        m = median(lum[r]); mad = median([abs(v-m) for v in lum[r]]) or 1e-6
        keep.append([abs(lum[r][c]-m) <= 3.5*mad for c in range(W)])
    V = []
    for r in range(H):
        sel = [src[r][c] for c in range(W) if keep[r][c]]
        V.append(tuple(median([p[i] for p in sel]) for i in range(3)) if len(sel) > 8 else None)
    for i in range(H):
        if V[i] is None:
            a = next((j for j in range(i,-1,-1) if V[j]), None)
            b = next((j for j in range(i,H) if V[j]), None)
            V[i] = V[a] if b is None else V[b] if a is None else tuple(
                V[a][k]+(V[b][k]-V[a][k])*(i-a)/(b-a) for k in range(3))
    Hx = []
    for c in range(W):
        vals = [lum[r][c]/max(sum(V[r])/3, 1e-6) for r in range(H) if keep[r][c]]
        Hx.append(median(vals) if vals else 1.0)
    for _ in range(6):                                   # heavy smooth: it is low-frequency
        Hx = [median(Hx[max(0,c-4):c+5]) for c in range(W)]
    # Force the middle span monotonic. Residual wobble in Hx makes the
    # interpolation parameter double back on itself, which shows up as a light
    # vertical streak partway along the stretched middle.
    for c in range(cap, W-cap):
        Hx[c] = min(Hx[c], Hx[c-1])

    NW = cap + MIDW + cap
    out = [[None]*NW for _ in range(H)]
    for r in range(H):
        for c in range(cap):                             # left cap, verbatim
            out[r][c] = src[r][c]
        for c in range(cap):                             # right cap, mirrored + relit
            # Mirroring maps source column c to output column NW-1-c, so the
            # OUTER source edge (c=0) lands on the OUTER output edge. Writing
            # src[cap-1-c] here instead flips the cap inside out: it put the
            # cap's inner column on the pill's outer edge and left the seam
            # reading src[0], which is what tore the right end open.
            k = Hx[W-1-c]/max(Hx[c], 1e-6)
            out[r][NW-1-c] = tuple(min(255, max(0, v*k)) for v in src[r][c])
        # Middle: text-free, and seamless BY CONSTRUCTION. Interpolating between
        # the two cap boundary columns that actually exist in the output means
        # the joins cannot mismatch. `t` follows the measured falloff shape
        # rather than being linear, so the real left-lit ramp survives the
        # stretch.
        A, B = out[r][cap-1], out[r][NW-cap]
        hA, hB = Hx[cap-1], Hx[W-cap]
        mid = []
        for c in range(MIDW):
            u = c/(MIDW-1)
            xs = cap + u*(W-1-2*cap)
            i = min(W-2, int(xs)); f = xs-i
            h = Hx[i]*(1-f)+Hx[i+1]*f
            t = (hA-h)/(hA-hB) if abs(hA-hB) > 1e-4 else u
            t = min(1.0, max(0.0, t))
            mid.append(tuple(A[k]+(B[k]-A[k])*t for k in range(3)))
            out[r][cap+c] = mid[-1]
        # Feather the caps' inner columns into the middle. Matching only the
        # VALUE at the join still leaves a slope discontinuity where the cap's
        # own curvature meets a straight interpolation, and the eye reads that
        # as a hard vertical line — the caps looked like separate lenses stuck
        # on the ends. Cross-fading over FEATHER columns matches the slope too.
        for c in range(FEATHER):
            w = (c+1)/(FEATHER+1)              # 1 at the join -> 0 further in
            li, ri = cap-1-c, NW-cap+c
            out[r][li] = tuple(out[r][li][k]*(1-w)+mid[0][k]*w for k in range(3))
            out[r][ri] = tuple(out[r][ri][k]*(1-w)+mid[-1][k]*w for k in range(3))

    # capsule alpha (supersampled) + pull edge RGB from inboard so the mockup's
    # white-blended boundary is not baked in under our own alpha
    R = H/2.0
    def cov(c, r):
        n = 0
        for sy in range(SS):
            for sx in range(SS):
                X = c+(sx+.5)/SS; Y = r+(sy+.5)/SS
                cy = Y-H/2.0
                if X < R:            d = math.hypot(X-R, cy)
                elif X > NW-R:       d = math.hypot(X-(NW-R), cy)
                else:                d = abs(cy)
                if d <= R-EDGE: n += 1
        return n/(SS*SS)
    img = Image.new('RGBA', (NW, H))
    ip = img.load()
    for r in range(H):
        for c in range(NW):
            a = cov(c, r)
            rgb = out[r][c]
            if a < 0.999:
                # Sample toward the centre so the mockup's white-blended boundary
                # is not baked in underneath our own alpha.
                cy = r-H/2.0
                if c < R:      vx, vy = R-c, -cy
                elif c > NW-R: vx, vy = (NW-R)-c, -cy
                else:          vx, vy = 0, -cy
                L = math.hypot(vx, vy) or 1
                sc = min(NW-1, max(0, round(c+vx/L*INBOARD)))
                sr = min(H-1,  max(0, round(r+vy/L*INBOARD)))
                rgb = out[sr][sc]
            ip[c, r] = (*[int(round(v)) for v in rgb], int(round(a*255)))
    img = img.resize((NW*UP, H*UP), Image.LANCZOS)
    p = os.path.join(OUT, 'btn-%s.png' % name)
    img.save(p)
    # Hover: the same sprite lifted in HLS lightness, so every specular arc and
    # rim survives the state change instead of being replaced by a flat tint.
    import colorsys
    hv = img.copy(); hp = hv.load()
    for yy in range(hv.height):
        for xx in range(hv.width):
            R_, G_, B_, A_ = hp[xx, yy]
            if A_ == 0: continue
            h_, l_, s_ = colorsys.rgb_to_hls(R_/255, G_/255, B_/255)
            r2, g2, b2 = colorsys.hls_to_rgb(h_, min(1.0, l_+lift), s_)
            hp[xx, yy] = (round(r2*255), round(g2*255), round(b2*255), A_)
    hv.save(os.path.join(OUT, 'btn-%s-hover.png' % name))
    print('%-7s %s  source %dx%d → sprite %dx%d  cap=%dpx (×%d = %dpx slice)'
          % (name, p, W, H, img.width, img.height, cap, UP, cap*UP))
    return cap

os.makedirs(OUT, exist_ok=True)
build('blue',   61, 315, 736, 799, 0.055)
build('chrome', 345, 613, 740, 795, 0.045)
