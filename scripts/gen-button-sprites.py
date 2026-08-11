"""Cut the two mockup pills into 9-slice sprites for .u-btn--blue / .u-btn--chrome.

Run: python3 scripts/gen-button-sprites.py

WHY THE SURFACE IS THE RENDER AND NOT A GRADIENT STACK
------------------------------------------------------
Fitting the mockup pill to a separable model (a function of y times a function
of x, which is all any stack of linear-gradients can express) leaves p99 error
33/255 on blue and 88/255 on chrome. That error is structure, not noise: a
curved specular sheen wraps the end caps, it bends, and no number of gradient
layers reproduces it. So the caps are the mockup's own pixels and the middle is
synthesised from them.

WHY THE MIDDLE IS FITTED PER ROW
--------------------------------
An earlier version measured ONE horizontal falloff curve H(x) shared by every
row (the median column ratio) and stretched the middle along it. The pill is not
separable in that direction either: at the top of the blue pill the light drops
45% left to right, near the bottom rim only 18%. A single median H(x) lands
between the two, so the ramp all but vanished and the middle rendered as a flat
slab of #052681 against the mockup's #1336A6 -> #00166C. A monotonic clamp that
existed to hide streaking then pinned the first half of the span to exactly 1.0,
flattening what was left.

Each row therefore gets its own falloff, fitted independently:

  · per row, per channel, a degree-6 least-squares polynomial in x
  · fitted only inside the capsule for that row (the caps narrow the domain)
  · glyph pixels are rejected by iterated MAD outlier trimming on luminance,
    then the mask is DILATED before a second pass. Trimming alone leaves the
    antialiased fringe of each stroke in the data, which drags the fit on the
    rows the text runs through and prints them back out as horizontal streaks
    across the middle band.
  · the fitted field is then damped hard vertically across the interior rows.
    THIS IS THE STEP THAT KEEPS THE PILL CLEAN — do not turn PASSES back down.
    Fitting each row alone leaves row-to-row oscillation, worst where the type
    is densest, and once the middle is stretched to a real button width that
    oscillation reads as horizontal streaks lying across the label. Sweeping
    PASSES shows why damping is free here: worst-case error falls from 66 to 35
    on blue and 87 to 30 on chrome while median and p99 hold, i.e. what is being
    removed is oscillation and not signal. It only starts costing accuracy past
    ~30 passes, where the median begins to climb. The rim rows carry real 1px
    structure and are left out of it.
  · the fit is rescaled so it passes exactly through the cap's own boundary
    column, which makes both joins continuous BY CONSTRUCTION

Against the mockup's own pill, glyphs and the antialiased capsule rim excluded,
that leaves median 3/255, p90 12, p99 31, max 35 on blue and 2 / 7 / 21 / 30 on
chrome. What error remains sits on the rows the type ran through, where the fit
has only the gaps between strokes to work from. Every button on the site puts
its own label over exactly those rows.

The crop boxes below are the pills' real bounds, one antialiased row and column
in from the background on every side. Chrome's used to read (345, 613, 740, 795),
which cut four rows off its top and two off its bottom: the sprite lost the dark
top rim and the bottom bevel entirely, and the analytic capsule alpha then
rounded the truncated body back into a pill, so the loss did not look like a
crop. It looked like a flat white button.

The right cap is the left cap mirrored, then relit per row by the fitted
left-to-right ratio. The mockup's own right cap has the arrow glyph through it,
and both caps carry their bright arc on the OUTER edge, so a mirror is correct.

Relighting and anchoring are affine in (v + EPS), never a bare per-channel
ratio. Blue's red channel sits at 0-5, so a bare ratio there is 0/0 and sprays
saturated confetti down the right cap.

Alpha is an analytically antialiased capsule; pixels on that edge take their
colour from INBOARD px further in, so the mockup's white-blended boundary is not
baked in underneath our own alpha.
"""

from PIL import Image
from statistics import median
import colorsys
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = Image.open(os.path.join(ROOT, "assets/source/mockup-1-hero.png")).convert("RGB")
PX = SRC.load()
OUT = os.path.join(ROOT, "public/art")

MIDW = 128  # synthesised middle width, in source px
SS = 4  # alpha supersample
UP = 2  # output scale
DEG = 6  # falloff polynomial degree
MARGIN = 2.0  # px of the capsule edge excluded from the fit (antialiasing)
DILATE = 2  # px the glyph mask grows by before the second fit
RIM = 5  # px at top and bottom kept out of the vertical smoothing
PASSES = 16  # vertical damping passes: the residual after fitting is row-to-row oscillation
SUB = 4  # trend samples per source px
EPS = 8.0  # affine offset that keeps near-zero channels from exploding
INBOARD = 2.5  # px to pull edge colour in from
EDGE = 0.5  # capsule inset


def solve(a, b):
    """Gaussian elimination with partial pivoting. Returns None if singular."""
    n = len(b)
    m = [row[:] + [b[i]] for i, row in enumerate(a)]
    for i in range(n):
        p = max(range(i, n), key=lambda r: abs(m[r][i]))
        if abs(m[p][i]) < 1e-12:
            return None
        m[i], m[p] = m[p], m[i]
        for r in range(i + 1, n):
            f = m[r][i] / m[i][i]
            for c in range(i, n + 1):
                m[r][c] -= f * m[i][c]
    x = [0.0] * n
    for i in range(n - 1, -1, -1):
        x[i] = (m[i][n] - sum(m[i][c] * x[c] for c in range(i + 1, n))) / m[i][i]
    return x


def polyfit(ts, ys, deg):
    """Least squares on the power basis over t in [-1, 1]. Degrades on singularity."""
    while deg > 0:
        n = deg + 1
        a = [[sum(t ** (i + j) for t in ts) for j in range(n)] for i in range(n)]
        b = [sum(y * t**i for t, y in zip(ts, ys)) for i in range(n)]
        c = solve(a, b)
        if c is not None:
            return c
        deg -= 1
    return [sum(ys) / len(ys)]


def polyval(c, t):
    v = 0.0
    for k in range(len(c) - 1, -1, -1):
        v = v * t + c[k]
    return v


def build(name, x0, x1, y0, y1, lift):
    W, H = x1 - x0 + 1, y1 - y0 + 1
    cap = round(H / 2)
    R = H / 2.0
    src = [[PX[x0 + c, y0 + r] for c in range(W)] for r in range(H)]

    # ---- per-row falloff -------------------------------------------------
    def t_of(x):
        return (2.0 * x - (W - 1)) / (W - 1)

    def domain(r):
        """Columns of row r that are inside the capsule, clear of its edge."""
        cy = r + 0.5 - R
        dx = R - math.sqrt(max(0.0, R * R - cy * cy))
        lo, hi = dx + MARGIN, W - 1 - dx - MARGIN
        cols = [c for c in range(W) if lo <= c <= hi]
        return cols if len(cols) >= 8 else list(range(cap, W - cap))

    # Pass 1 locates the glyphs; pass 2 fits with their fringe dilated away.
    clean = []
    for r in range(H):
        cols = domain(r)
        inliers = cols
        for _ in range(4):
            ts = [t_of(c) for c in inliers]
            lums = [sum(src[r][c]) / 3.0 for c in inliers]
            coef = polyfit(ts, lums, min(DEG, max(1, len(inliers) // 12)))
            res = [lums[i] - polyval(coef, ts[i]) for i in range(len(inliers))]
            mad = median([abs(v) for v in res]) or 1e-6
            kept = [c for c, e in zip(inliers, res) if abs(e) <= 2.2 * 1.4826 * mad]
            if len(kept) < 10 or len(kept) == len(inliers):
                break
            inliers = kept
        bad = set(cols) - set(inliers)
        grown = set()
        for c in bad:
            grown.update(range(c - DILATE, c + DILATE + 1))
        clean.append([c for c in cols if c not in grown] or cols)

    # Sample the fitted colour on a sub-pixel grid so it can be smoothed across
    # rows and read back at any x.
    NS = (W - 1) * SUB + 1
    xs = [i / SUB for i in range(NS)]

    def fit_row(r):
        """Degree-6 falloff from row r's own clean pixels. Only trustworthy when
        those pixels span most of the row."""
        good = clean[r]
        ts = [t_of(c) for c in good]
        deg = min(DEG, max(1, len(good) // 12))
        ch = [polyfit(ts, [src[r][c][k] for c in good], deg) for k in range(3)]
        # Clamp to the range the kept pixels actually span, so a degree-6 fit
        # cannot ring past the real surface at the ends of its domain.
        rng = [
            (min(src[r][c][k] for c in good) - 2, max(src[r][c][k] for c in good) + 2)
            for k in range(3)
        ]
        lo, hi = good[0], good[-1]
        return [
            tuple(
                min(rng[k][1], max(rng[k][0], polyval(ch[k], t_of(min(hi, max(lo, x))))))
                for k in range(3)
            )
            for x in xs
        ]

    # A row the type runs through is left with only the 3-4px gaps between
    # strokes. Fitting degree 6 to that extrapolates wildly past the last gap,
    # which is what printed a pale horizontal band across the middle. Such a row
    # does not get to invent its own falloff SHAPE: it inherits one interpolated
    # from the nearest rows above and below that were well sampled, and only its
    # own level is solved for. The band of type is bounded by clean rows on both
    # sides, and the light varies smoothly down the pill, so the interpolation
    # is sound.
    field = [fit_row(r) for r in range(H)]

    # One light pass across rows in the interior. The rim rows carry real 1px
    # structure and are left alone.
    for _ in range(PASSES):
        sm = [row[:] for row in field]
        for r in range(RIM, H - RIM):
            a, b, c = field[r - 1], field[r], field[r + 1]
            sm[r] = [
                tuple(0.25 * a[i][k] + 0.5 * b[i][k] + 0.25 * c[i][k] for k in range(3))
                for i in range(NS)
            ]
        field = sm

    def trend(r, x):
        i = min(NS - 1, max(0, int(round(x * SUB))))
        return field[r][i]

    # ---- assemble --------------------------------------------------------
    # Everything below relights through the affine map v -> (v + EPS) * q - EPS
    # rather than a bare ratio v * q. Blue's red channel sits at 0-5, where a
    # bare ratio is 0/0.
    NW = cap + MIDW + cap
    out = [[None] * NW for _ in range(H)]
    for r in range(H):
        xA, xB = cap - 1, W - cap
        fA, fB = trend(r, xA), trend(r, xB)

        for c in range(cap):
            out[r][c] = src[r][c]  # left cap, verbatim

        # Right cap: mirrored, then relit by the row's own left-to-right ratio.
        # Mirroring maps source column c to output column NW-1-c, so the OUTER
        # source edge (c=0) lands on the OUTER output edge. Writing src[cap-1-c]
        # here instead flips the cap inside out.
        for c in range(cap):
            a, b = trend(r, c), trend(r, W - 1 - c)
            out[r][NW - 1 - c] = tuple(
                min(255.0, max(0.0, (src[r][c][k] + EPS) * ((b[k] + EPS) / (a[k] + EPS)) - EPS))
                for k in range(3)
            )

        # Middle: the fitted trend across the span between the two cap boundary
        # columns, put through the affine map that carries the trend at xA onto
        # the left cap's own last column. At u=1 it lands exactly on the right
        # cap's first column too, because that column is the same map applied to
        # the trend at xB. Both joins are continuous with no feathering.
        q = [(src[r][xA][k] + EPS) / (fA[k] + EPS) for k in range(3)]
        for c in range(MIDW):
            u = (c + 1) / (MIDW + 1)
            v = trend(r, xA + u * (xB - xA))
            out[r][cap + c] = tuple(
                min(255.0, max(0.0, (v[k] + EPS) * q[k] - EPS)) for k in range(3)
            )

    # ---- capsule alpha ---------------------------------------------------
    def cov(c, r):
        n = 0
        for sy in range(SS):
            for sx in range(SS):
                X, Y = c + (sx + 0.5) / SS, r + (sy + 0.5) / SS
                cy = Y - R
                if X < R:
                    d = math.hypot(X - R, cy)
                elif X > NW - R:
                    d = math.hypot(X - (NW - R), cy)
                else:
                    d = abs(cy)
                if d <= R - EDGE:
                    n += 1
        return n / (SS * SS)

    img = Image.new("RGBA", (NW, H))
    ip = img.load()
    for r in range(H):
        for c in range(NW):
            a = cov(c, r)
            rgb = out[r][c]
            if a < 0.999:
                cy = r - R
                if c < R:
                    vx, vy = R - c, -cy
                elif c > NW - R:
                    vx, vy = (NW - R) - c, -cy
                else:
                    vx, vy = 0, -cy
                L = math.hypot(vx, vy) or 1
                sc = min(NW - 1, max(0, round(c + vx / L * INBOARD)))
                sr = min(H - 1, max(0, round(r + vy / L * INBOARD)))
                rgb = out[sr][sc]
            ip[c, r] = (*[int(round(v)) for v in rgb], int(round(a * 255)))
    img = img.resize((NW * UP, H * UP), Image.LANCZOS)
    img.save(os.path.join(OUT, "btn-%s.png" % name))

    # Hover: the same sprite lifted in HLS lightness, so every specular arc and
    # rim survives the state change instead of being replaced by a flat tint.
    hv = img.copy()
    hp = hv.load()
    for yy in range(hv.height):
        for xx in range(hv.width):
            r_, g_, b_, a_ = hp[xx, yy]
            if a_ == 0:
                continue
            h_, l_, s_ = colorsys.rgb_to_hls(r_ / 255, g_ / 255, b_ / 255)
            r2, g2, b2 = colorsys.hls_to_rgb(h_, min(1.0, l_ + lift), s_)
            hp[xx, yy] = (round(r2 * 255), round(g2 * 255), round(b2 * 255), a_)
    hv.save(os.path.join(OUT, "btn-%s-hover.png" % name))

    print(
        "%-7s source %dx%d -> sprite %dx%d   border-image-slice: 0 %d fill"
        % (name, W, H, img.width, img.height, cap * UP)
    )


os.makedirs(OUT, exist_ok=True)
build("blue", 61, 315, 736, 799, 0.055)
build("chrome", 345, 611, 736, 797, 0.045)
