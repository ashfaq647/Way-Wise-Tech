import type { CSSProperties } from "react";

/*
  The gold question mark with rays from the FAQ card (Frame 2147239138.png), drawn as an inline SVG
  (owner-approved 2026-11-11: no asset was supplied). Coordinates are reference pixels at 1920,
  measured from the frame at x 320, y 195, so the viewBox is the 180x175 area around the drawing.
  Animation lives in faq-questions.css.
*/

/** The rays' common centre, roughly the middle of the question mark. */
const CENTRE = { x: 93, y: 88 };

/** Each ray as two end points, traced from the reference. */
const rayLines: [number, number, number, number][] = [
  [53, 14, 70, 39],
  [80, 20, 84, 34],
  [97, 11, 96, 32],
  [127, 17, 110, 36],
  [44, 36, 60, 47],
  [132, 39, 124, 42],
  [20, 47, 51, 59],
  [161, 45, 134, 52],
  [155, 64, 140, 65],
  [17, 76, 47, 72],
  [166, 84, 139, 79],
  [47, 89, 67, 86],
  [142, 96, 129, 91],
  [36, 107, 71, 97],
  [144, 117, 117, 99],
  [57, 120, 71, 114],
  [126, 122, 116, 111],
  [45, 145, 74, 126],
  [132, 155, 111, 127],
  [74, 154, 82, 136],
  [93, 165, 92, 142],
  [109, 151, 105, 140],
];

const distance = (x: number, y: number) => Math.hypot(x - CENTRE.x, y - CENTRE.y);

/**
 * Each ray runs from its inner end to its outer end, so it draws outwards, and carries its angle
 * around the centre (0 to 1, clockwise from the top) for the sweeping shimmer.
 */
const rays = rayLines.map(([x1, y1, x2, y2]) => {
  const [inner, outer] =
    distance(x1, y1) < distance(x2, y2)
      ? [
          [x1, y1],
          [x2, y2],
        ]
      : [
          [x2, y2],
          [x1, y1],
        ];
  const angle = Math.atan2(outer[0] - CENTRE.x, -(outer[1] - CENTRE.y));
  const turn = ((angle / (2 * Math.PI)) % 1 + 1) % 1;
  return { inner, outer, turn: Math.round(turn * 1000) / 1000 };
});

const hook =
  "M61 72 L62 62 C64 46 78 40 97 40 C118 40 131 52 131 67 C131 80 123 87 113 93 C107 97 106 99 106 103 L85 103 C85 95 88 90 98 83 C104 79 106 74 106 68 C106 62 102 58 96 58 C89 58 86 63 85 72 Z";
const dot = "M84 112 L107 113 L106 134 L85 133 Z";

export function FaqQuestionMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="3 0 180 175" fill="none" aria-hidden="true" className={`wf-mark ${className}`}>
      <defs>
        <clipPath id="wf-mark-fill">
          <path d={hook} />
          <path d={dot} />
        </clipPath>
        <linearGradient id="wf-mark-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff3d6" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff3d6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="wf-mark__rays">
        {rays.map(({ inner, outer, turn }) => (
          <g key={`${inner}-${outer}`} className="wf-mark__ray" style={{ "--wf-turn": turn } as CSSProperties}>
            <line
              x1={inner[0]}
              y1={inner[1]}
              x2={outer[0]}
              y2={outer[1]}
              pathLength={1}
              className="wf-mark__ray-line"
            />
          </g>
        ))}
      </g>

      {/* Entrance (outer group), idle float (inner group). */}
      <g className="wf-mark__glyph">
        <g className="wf-mark__float">
          {/* The loose hand-drawn outline, offset from the fill and drifting slightly behind it. */}
          <g className="wf-mark__outline">
            <path d={hook} />
            <path d={dot} />
          </g>
          <g className="wf-mark__fill">
            <path d={hook} />
            <path d={dot} />
          </g>
          {/* Where the outline crosses the gold it reads as a dark line, as in the reference. */}
          <g clipPath="url(#wf-mark-fill)">
            <g className="wf-mark__outline wf-mark__outline--inner">
              <path d={hook} />
              <path d={dot} />
            </g>
            <rect x="0" y="30" width="34" height="110" fill="url(#wf-mark-sheen)" className="wf-mark__sheen" />
          </g>
        </g>
      </g>
    </svg>
  );
}
