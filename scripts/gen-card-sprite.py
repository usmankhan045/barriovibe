"""Cut the mockup's blue pill into a 9-slice CARD sprite for .u-surface-btn.

Run: python3 scripts/gen-card-sprite.py

WHY THIS EXISTS AT ALL
----------------------
The work cards carried the button's blue as a stack of four linear-gradients
(--grad-btn-blue-bevel-top / -bottom / -light / -body in tokens.css). That stack
was measured and hand-tuned against the pill, and it is the closest a gradient
stack gets, but gen-button-sprites.py already established that the closest a
gradient stack gets is not close: fitting the pill to a separable model leaves
p99 error 33/255, and the residual is structure, not noise. A card built from
gradients and a button built from the render sit next to each other on /work and
do not match. This makes the card the same pixels as the button.

WHY THE BUTTON SPRITE CANNOT JUST BE REUSED
-------------------------------------------
btn-blue.png is a 2-slice: `border-image-slice: 0 64 fill` cuts it left/middle/
right only, so it stretches horizontally and the middle column is one fixed row
of pixels smeared vertically. That is correct for a pill of locked height (see
.u-btn: height is explicit precisely so the caps stay semicircles), and wrong for
a card, which is ~300px tall and varies with its own copy. Stretching the pill's
64px of vertical structure over a card flattens the waist and smears both rims.

A card therefore needs a real 9-slice: four corners held, two edges stretched one
way, two the other, and a middle stretched both. The pill only ever supplies 64
rows of vertical structure, so those rows are RE-SPACED, not smeared: the rims
(bevel top and bottom) are kept at their true pixel height and only the interior
is resampled to the card's height. That is the same reasoning as the button's
--btn-cap: an 18px lit edge stays 18px whatever the box does.

WHAT IS TAKEN FROM THE PILL AND WHAT IS SYNTHESISED
---------------------------------------------------
  · the vertical profile (the rims, the specular waist at 46%, the deep core) is
    the pill's own, fitted per row by the same degree-6 / MAD-trim / vertical-
    damp pipeline as gen-button-sprites.py, so the label glyphs are rejected
  · the horizontal falloff is the pill's own per-row left-to-right ratio, which
    is what tilts the light from the upper left
  · the corner radius is the card's (24px = --radius-tile-lg), not the pill's
    semicircle, and the alpha is an analytically antialiased rounded rectangle
  · the pill's end caps are DISCARDED. Their curved specular arc wraps a
    semicircle; on a 24px corner it would read as a bright blob. The corners
    instead take the interior falloff carried out to the edge, which is what the
    mockup's own large blue panels do.

Alpha edge pixels take their colour from INBOARD px further in, so the mockup's
white-blended boundary is not baked in underneath our own alpha. Same as the
button.
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

# The blue pill's real bounds in the mockup — identical to gen-button-sprites.py.
BX0, BY0, BX1, BY1 = 61, 736, 315, 799

RADIUS = 24  # --radius-tile-lg, in CSS px
SLICE = 40  # 9-slice inset: corner box side, in CSS px. > RADIUS so the whole
# corner arc plus the rim rows sit inside the held corner.
MIDW = 24  # synthesised middle width in output px (stretched by border-image)
MIDH = 24  # synthesised middle height in output px

RIM_TOP = 18  # rows of real bevel structure held at the top (see --grad-*-bevel-top)
RIM_BOT = 16  # and at the bottom

SS = 4  # alpha supersample
UP = 2  # output scale
DEG = 6  # falloff polynomial degree
MARGIN = 2.0  # px of the pill edge excluded from the fit (antialiasing)
DILATE = 2  # px the glyph mask grows by before the second fit
RIM = 5  # px at top and bottom kept out of the vertical smoothing
PASSES = 16  # vertical damping passes
SUB = 4  # trend samples per source px
EPS = 8.0  # affine offset that keeps near-zero channels from exploding
INBOARD = 2.5  # px to pull edge colour in from
EDGE = 0.5  # shape inset
LIFT = 0.055  # hover lightness lift, same as the blue pill


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


# ---------------------------------------------------------------- fit the pill
W, H = BX1 - BX0 + 1, BY1 - BY0 + 1
R_PILL = H / 2.0
src = [[PX[BX0 + c, BY0 + r] for c in range(W)] for r in range(H)]


def t_of(x):
    return (2.0 * x - (W - 1)) / (W - 1)


def domain(r):
    """Columns of row r inside the capsule, clear of its antialiased edge."""
    cy = r + 0.5 - R_PILL
    dx = R_PILL - math.sqrt(max(0.0, R_PILL * R_PILL - cy * cy))
    lo, hi = dx + MARGIN, W - 1 - dx - MARGIN
    cols = [c for c in range(W) if lo <= c <= hi]
    cap = round(H / 2)
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

NS = (W - 1) * SUB + 1
xs = [i / SUB for i in range(NS)]


# ------------------------------------------------- which rows can be trusted
# Measured on the pill, the label occupies rows 22-41, where up to 47% of the
# straight span is glyph, and the bright rim rows 2-4 and 60-61 are near-solid
# white type. Those rows do not contain enough surface to recover a falloff
# from: a degree-6 fit through the gaps between strokes bows (it put the red
# channel at 44 across the waist where the pill's own pixels read 7, printing a
# pale smudge down the middle of the card), and a local median through the same
# gaps is merely noisy instead (45 -> 25 -> 63 -> 3 along one row).
#
# gen-button-sprites.py can absorb this because it never stretches these rows
# and paints the button's own label over them. A card stretches each one over
# ~8px of height with nothing on top, so the error becomes the thing you see.
#
# A row is therefore either WELL SAMPLED, and fitted from its own pixels, or it
# is not, and it does not get to invent a falloff SHAPE at all: it inherits one
# interpolated from the nearest trustworthy rows above and below, and only its
# own overall LEVEL is solved for. The light varies smoothly down the pill and
# the label band is bounded by clean rows on both sides, so the interpolation is
# sound. This is the rule the button generator's docstring describes; the card
# is the case that actually requires it.
# Measured DIRECTLY off the source, not inferred from how many pixels the MAD
# trimmer dropped: that trimmer rejects ~15% of a perfectly clean row as tail
# outliers, so thresholding on its survival rate condemns almost every row.
# White type on deep blue is unambiguous at the pixel level, so count it.
GLYPH_LUM = 90.0  # a pixel brighter than this is type, not surface
GLYPH_FRAC = 0.02  # a row with more type than this is not well sampled


def glyph_fraction(r):
    cols = domain(r)
    if not cols:
        return 1.0
    hit = sum(1 for c in cols if sum(src[r][c]) / 3.0 > GLYPH_LUM)
    return hit / len(cols)


TRUSTED = [r for r in range(H) if glyph_fraction(r) <= GLYPH_FRAC]
if not TRUSTED:
    raise SystemExit("no well-sampled rows in the pill — check the crop box")


def fit_row_own(r):
    """Degree-6 falloff from row r's own clean pixels. Only for trusted rows."""
    good = clean[r]
    ts = [t_of(c) for c in good]
    deg = min(DEG, max(1, len(good) // 12))
    ch = [polyfit(ts, [src[r][c][k] for c in good], deg) for k in range(3)]
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


own = {r: fit_row_own(r) for r in TRUSTED}


def borrowed_shape(r):
    """Falloff shape for an untrusted row, blended from the nearest trusted ones."""
    below = [t for t in TRUSTED if t < r]
    above = [t for t in TRUSTED if t > r]
    if not below:
        return own[above[0]]
    if not above:
        return own[below[-1]]
    a, b = below[-1], above[0]
    w = (r - a) / (b - a)
    return [
        tuple(own[a][i][k] * (1 - w) + own[b][i][k] * w for k in range(3))
        for i in range(NS)
    ]


def fit_row(r):
    if r in own:
        return own[r]
    shape = borrowed_shape(r)
    # Solve only for this row's own level: the median ratio between its clean
    # pixels and the borrowed shape at the same columns. Affine in (v + EPS) for
    # the same reason the button relights that way — blue's red channel sits near
    # zero, where a bare ratio is 0/0.
    good = clean[r]
    if not good:
        return shape
    q = []
    for k in range(3):
        ratios = [
            (src[r][c][k] + EPS) / (shape[min(NS - 1, int(round(c * SUB)))][k] + EPS)
            for c in good
        ]
        q.append(median(ratios) if ratios else 1.0)
    return [
        tuple(min(255.0, max(0.0, (shape[i][k] + EPS) * q[k] - EPS)) for k in range(3))
        for i in range(NS)
    ]


print(
    "        %d of %d pill rows well sampled; %d borrow their falloff (%s)"
    % (
        len(TRUSTED),
        H,
        H - len(TRUSTED),
        ",".join(str(r) for r in range(H) if r not in own) or "none",
    )
)

field = [fit_row(r) for r in range(H)]

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


# The pill's caps are discarded (see module docstring), so the usable horizontal
# span is the straight part of the capsule only.
CAP = round(H / 2)
XA, XB = CAP, W - 1 - CAP


def row_colour(r, u):
    """Fitted colour of pill row r at horizontal fraction u in [0, 1]."""
    return trend(r, XA + max(0.0, min(1.0, u)) * (XB - XA))


# ------------------------------------------------------- re-space the vertical
# The card's height is not the pill's. The rims keep their true pixel height and
# only the interior is resampled — smearing the whole profile would flatten the
# specular waist and both bevels, which are the three things that make this read
# as the button (see tokens.css, --grad-btn-blue-body).
CARD_H = SLICE + MIDH + SLICE


def card_row_to_pill_row(y):
    """Map an output row to a fractional pill row, holding both rims."""
    if y < RIM_TOP:
        return float(y)
    if y >= CARD_H - RIM_BOT:
        return float(H - (CARD_H - y))
    span_out = CARD_H - RIM_TOP - RIM_BOT
    span_src = H - RIM_TOP - RIM_BOT
    return RIM_TOP + (y - RIM_TOP) * span_src / span_out


def sample(y, u):
    """Bilinear in (re-spaced pill row, horizontal fraction)."""
    fr = card_row_to_pill_row(y)
    r0 = max(0, min(H - 1, int(math.floor(fr))))
    r1 = max(0, min(H - 1, r0 + 1))
    w = fr - r0
    a, b = row_colour(r0, u), row_colour(r1, u)
    return tuple(a[k] * (1 - w) + b[k] * w for k in range(3))


# ------------------------------------------------------------------- assemble
CARD_W = SLICE + MIDW + SLICE
# ── THE SIDE EDGES ──────────────────────────────────────────────────────────
# The first cut of this sprite had none, and on /work that passed unnoticed:
# those cards lie flat on the page, so only the top and bottom rims ever catch
# the eye. The coverflow TURNS its cards up to 58 degrees, which points a side
# edge straight at the viewer, and there was nothing there — the body ran flat
# into the silhouette and the cards read as paper cutouts rather than objects.
#
# The pill has the edge; this generator was throwing it away. Its caps are
# discarded (see the module docstring, and rightly: a semicircular specular arc
# does not belong on a 24px corner) and both side edges went with them. Measured
# on the pill's own left cap at its vertical middle, going inward from the
# silhouette: (3,8,64) -> (7,18,69) -> (7,21,81) -> (1,20,99) -> body. A dark
# rim, then a lift back up to the body over about six pixels.
#
# That profile is reapplied here as a multiplier on whatever the body colour is
# at that row, rather than as fixed colours, so the edge stays consistent with
# the light the rest of the card is carrying: darker at the very edge on both
# sides, and slightly lifted just inboard on the LEFT only, which is the side
# the pill is lit from. Same asymmetry as --grad-btn-blue-light describes.
EDGE_L = [0.42, 0.55, 0.72, 0.88, 0.97, 1.02, 1.01, 1.0]
EDGE_R = [0.40, 0.52, 0.68, 0.84, 0.93, 0.98, 1.0, 1.0]


def edge_scale(x):
    """Multiplier for the side bevel at output column x."""
    if x < len(EDGE_L):
        return EDGE_L[x]
    k = CARD_W - 1 - x
    if k < len(EDGE_R):
        return EDGE_R[k]
    return 1.0


out = [[None] * CARD_W for _ in range(CARD_H)]
for y in range(CARD_H):
    for x in range(CARD_W):
        # Horizontal fraction across the FULL card, so the corners and the edges
        # carry the same left-to-right tilt the middle does and every 9-slice
        # join is continuous by construction.
        v = sample(y, x / (CARD_W - 1))
        m = edge_scale(x)
        if m != 1.0:
            # Affine in (v + EPS), never a bare per-channel scale: blue's red
            # channel sits near zero, where a bare multiply is meaningless.
            v = tuple(max(0.0, (c + EPS) * m - EPS) for c in v)
        out[y][x] = v


def cov(x, y):
    """Rounded-rectangle coverage, supersampled."""
    n = 0
    for sy in range(SS):
        for sx in range(SS):
            X, Y = x + (sx + 0.5) / SS, y + (sy + 0.5) / SS
            cx = min(max(X, RADIUS), CARD_W - RADIUS)
            cy = min(max(Y, RADIUS), CARD_H - RADIUS)
            d = math.hypot(X - cx, Y - cy)
            if d <= RADIUS - EDGE:
                n += 1
    return n / (SS * SS)


img = Image.new("RGBA", (CARD_W, CARD_H))
ip = img.load()
for y in range(CARD_H):
    for x in range(CARD_W):
        a = cov(x, y)
        rgb = out[y][x]
        if a < 0.999:
            # Pull colour inboard along the normal, away from the antialiased rim.
            cx = min(max(x + 0.5, RADIUS), CARD_W - RADIUS)
            cy = min(max(y + 0.5, RADIUS), CARD_H - RADIUS)
            vx, vy = cx - (x + 0.5), cy - (y + 0.5)
            L = math.hypot(vx, vy) or 1
            sx_ = min(CARD_W - 1, max(0, round(x + vx / L * INBOARD)))
            sy_ = min(CARD_H - 1, max(0, round(y + vy / L * INBOARD)))
            rgb = out[sy_][sx_]
        ip[x, y] = (*[int(round(min(255.0, max(0.0, v)))) for v in rgb], int(round(a * 255)))

img = img.resize((CARD_W * UP, CARD_H * UP), Image.LANCZOS)
img.save(os.path.join(OUT, "card-blue.png"))

# Hover: the same sprite lifted in HLS lightness, so every specular arc and rim
# survives the state change instead of being replaced by a flat tint.
hv = img.copy()
hp = hv.load()
for yy in range(hv.height):
    for xx in range(hv.width):
        r_, g_, b_, a_ = hp[xx, yy]
        if a_ == 0:
            continue
        h_, l_, s_ = colorsys.rgb_to_hls(r_ / 255, g_ / 255, b_ / 255)
        r2, g2, b2 = colorsys.hls_to_rgb(h_, min(1.0, l_ + LIFT), s_)
        hp[xx, yy] = (round(r2 * 255), round(g2 * 255), round(b2 * 255), a_)
hv.save(os.path.join(OUT, "card-blue-hover.png"))

os.makedirs(OUT, exist_ok=True)
print(
    "card    pill %dx%d -> sprite %dx%d   border-image-slice: %d fill"
    % (W, H, img.width, img.height, SLICE * UP)
)
