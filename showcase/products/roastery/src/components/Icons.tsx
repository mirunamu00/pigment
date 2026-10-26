import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 12h12" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 6v12M6 12h12" />
  </svg>
);

export const BeanIcon = (p: P) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="12" rx="6.5" ry="8.5" transform="rotate(35 12 12)" />
    <path d="M8.5 17.5c2-2.5 1-5 3-7.5s4-2.5 4.2-4.5" />
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3c2.6 3.4 5.5 5.8 5.5 10a5.5 5.5 0 0 1-11 0c0-2.4 1.2-4.2 2.8-5.6.2 1.9 1.1 3 2.3 3.4C11 8 11 5.4 12 3Z" />
  </svg>
);

export const BoxIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" />
    <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M9 3v4M15 3v4" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
  </svg>
);

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="logo-mark">
      <rect x="1" y="1" width="38" height="38" rx="9" fill="var(--ink)" />
      <path d="M11 30V18.5a9 9 0 0 1 18 0V30" fill="none" stroke="var(--paper)" strokeWidth="2.2" />
      <path d="M8 30h24" stroke="var(--paper)" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M20 15.5c1.8 2.2 3.4 3.8 3.4 6.4a3.4 3.4 0 0 1-6.8 0c0-1.5.8-2.6 1.8-3.5.1 1.1.7 1.8 1.4 2-.4-1.8-.4-3.4.2-4.9Z"
        fill="var(--ember)"
      />
    </svg>
  );
}
