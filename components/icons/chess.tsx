import type { ChessPiece } from '@/content/types';

/**
 * The three chess pieces, drawn as large brand marks.
 *
 * ── Why these are not in the icon set ──
 *
 * `./index.tsx` is a 24×24 grid at 1.75 stroke, sized to sit inside a glossy
 * `IconBadge`. These are not icons and never go in a badge: they are watermarks,
 * drawn on a 48×48 grid so the muzzle, the mitre slit and the crenellations
 * survive, and they render at ~96px where an icon renders at 24.
 *
 * ── Why chess ──
 *
 * The hero is a photograph of a blue queen in front of silver pawns, the brand
 * blue is sampled from that piece (see --grad-glass-card in tokens.css), and the
 * line under it is about moving ahead. A card carrying a `</>`, a megaphone and
 * a shield was carrying the same three symbols every agency site carries; a card
 * carrying a piece from the board the whole site is built on is carrying this
 * company's. The mapping is on `mark` in content/practices.ts.
 *
 * All three sit on the same plinth so they read as one set rather than three
 * drawings. `currentColor` throughout, so the card decides how loud they are.
 */
const PIECES: Record<ChessPiece, React.ReactNode> = {
  /* Facing left. The four cues that make a horse read at a glance and not a
     boot, in the order they were added while drawing it: the ear, the eye, a
     muzzle that projects past the brow, and — the one that actually did it — a
     chin with a concave throat behind it. The step on the back edge is the mane
     break. */
  knight: (
    <>
      <path
        d="M32.5 3.2C31.6 5.6 30.9 7.3 29.6 8.3c-2.4 1.1-4.4 2-6.2 3.4
           Q19.4 14.9 15 16.1 Q11.7 17.1 10.3 19.9 Q9.9 21.4 11.6 21.7
           L14.6 21.4 Q16.3 22.7 16.5 24.8 Q15.5 26.4 17.5 28.4 Q18.7 31.2 19 35 L35 35
           C36.6 30 37.2 24.2 36.4 19.4 L34.3 16.4
           C35.3 12.2 34.6 7.8 33.9 4.6z"
      />
      <circle cx="22.6" cy="14.9" r=".95" fill="currentColor" stroke="none" />
    </>
  ),
  /* The notch on the upper right of the mitre is the bishop's slit. Without it
     the silhouette is a pawn. */
  bishop: (
    <>
      <circle cx="24" cy="6.5" r="2.2" />
      <path d="M24 10.4c3 2 5.3 4.7 6.7 7.7L27.6 21l3.8.6c.4 1.1.6 2.2.6 3.4H16c0-5.5 2.5-11 8-14.6z" />
      <path d="M15.4 25.4h17.2v3.4H15.4z" />
      <path d="M18.6 29.4c.4 2.5-.6 4.5-1.8 5.6h14.4c-1.2-1.1-2.2-3.1-1.8-5.6z" />
    </>
  ),
  rook: <path d="M11 6h5.5v5H21V6h6v5h4.5V6H37v10l-3.5 3v16h-19V19L11 16z" />,
};

/** The plinth all three stand on. */
const PLINTH = (
  <path d="M13.5 35h21v1.6c0 2 1.5 3.5 3.5 4.2V42.6H10v-1.8c2-.7 3.5-2.2 3.5-4.2z" />
);

export function ChessMark({
  piece,
  size = 96,
  className,
}: {
  piece: ChessPiece;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PIECES[piece]}
      {PLINTH}
    </svg>
  );
}
