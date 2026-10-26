import type { CSSProperties, ReactNode } from "react";

/**
 * The studio details from the interface kit. Rules: one bloom per screen, tape only on pinned things,
 * at most two pencil notes per screen, all decorative (aria-hidden) and never inside a system preview.
 */

export function WatercolorFilters() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="wc" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves={4} seed={11} result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale={70} xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation={2.5} result="soft" />
          <feMorphology in="soft" operator="erode" radius={6} result="inner" />
          <feComposite in="soft" in2="inner" operator="out" result="rim" />
          <feGaussianBlur in="rim" stdDeviation={2} result="rimSoft" />
          <feComponentTransfer in="soft" result="wash">
            <feFuncA type="linear" slope={0.48} />
          </feComponentTransfer>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={4} result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.8 0 0 0 1.2" result="grainA" />
          <feMerge result="paint">
            <feMergeNode in="wash" />
            <feMergeNode in="rimSoft" />
          </feMerge>
          <feComposite in="paint" in2="grainA" operator="in" />
        </filter>
        <filter id="wcs" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={3} seed={5} result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale={12} xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation={0.6} result="soft" />
          <feMorphology in="soft" operator="erode" radius={2} result="inner" />
          <feComposite in="soft" in2="inner" operator="out" result="rim" />
          <feComponentTransfer in="soft" result="wash">
            <feFuncA type="linear" slope={0.62} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="wash" />
            <feMergeNode in="rim" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

/** The ink-blue watercolor bloom. Place it absolutely inside a positioned parent. */
export function Bloom({ style, size = 700, strength = 0.42 }: { style?: CSSProperties; size?: number; strength?: number }) {
  return (
    <svg aria-hidden="true" className="bloom" viewBox="0 0 700 560" style={{ width: size, height: (size * 560) / 700, ...style }}>
      <g filter="url(#wc)" opacity={strength}>
        <ellipse cx="370" cy="290" rx="260" ry="190" fill="var(--bloom-indigo)" />
        <ellipse cx="250" cy="200" rx="150" ry="118" fill="var(--bloom-blue)" opacity={0.7} />
        <ellipse cx="490" cy="400" rx="120" ry="88" fill="#3a2f7a" opacity={0.55} />
        <circle cx="96" cy="480" r="18" fill="var(--bloom-indigo)" />
        <circle cx="610" cy="110" r="10" fill="var(--bloom-blue)" />
      </g>
    </svg>
  );
}

export function Tape({ style, alt, width = 88, rotate = -4 }: { style?: CSSProperties; alt?: boolean; width?: number; rotate?: number }) {
  return <span aria-hidden="true" className={alt ? "tape tape--alt" : "tape"} style={{ width, transform: `rotate(${rotate}deg)`, ...style }} />;
}

type ArrowDir = "down-left" | "down-right" | "up-left" | "up-right" | "left";

const ARROWS: Record<ArrowDir, { body: string; head: string; box: string }> = {
  "down-left": { box: "0 0 70 60", body: "M64 8 C 40 6, 18 22, 14 52", head: "M7 43 L 14 53 L 21 44" },
  "down-right": { box: "0 0 50 50", body: "M4 10 C 24 8, 38 20, 40 44", head: "M33 36 L 40 45 L 46 35" },
  "up-left": { box: "0 0 40 30", body: "M36 26 C 26 24, 14 16, 10 4", head: "M4 11 L 10 3 L 16 10" },
  "up-right": { box: "0 0 60 50", body: "M6 44 C 20 40, 40 30, 44 6", head: "M37 13 L 44 4 L 50 14" },
  left: { box: "0 0 40 30", body: "M38 6 C 26 6, 14 12, 4 22", head: "M3 13 L 3 23 L 13 24" },
};

/** A pencil note: points at the next action. Decorative — the same information must exist as real text. */
export function Note({ children, arrow, arrowFirst, style }: { children: ReactNode; arrow: ArrowDir; arrowFirst?: boolean; style?: CSSProperties }) {
  const a = ARROWS[arrow];
  const svg = (
    <svg viewBox={a.box} width={44} height={38}>
      <path d={a.body} fill="none" stroke="var(--ink-4)" strokeWidth={1.4} strokeLinecap="round" />
      <path d={a.head} fill="none" stroke="var(--ink-4)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <div aria-hidden="true" className="note" style={{ transform: "rotate(-2deg)", ...style }}>
      {arrowFirst && svg}
      <span>{children}</span>
      {!arrowFirst && svg}
    </div>
  );
}

export function Blot({ color, mix, size = 22 }: { color: string; mix: string; size?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" width={size} height={size} style={{ overflow: "visible", flex: "none" }}>
      <g filter="url(#wcs)">
        <circle cx="24" cy="24" r="16" fill={color} />
        <circle cx="31" cy="17" r="8" fill={mix} opacity={0.75} />
      </g>
    </svg>
  );
}
