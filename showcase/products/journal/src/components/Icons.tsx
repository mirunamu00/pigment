interface IconProps {
  size?: number;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
});

export const SearchIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const MenuIcon = ({ size = 22 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const CloseIcon = ({ size = 22 }: IconProps) => (
  <svg {...base(size)}>
    <path d="m5 5 14 14M19 5 5 19" />
  </svg>
);

export const ArrowIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const LinkIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);

export const MailIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 7 8.5-7" />
  </svg>
);

export const ShareIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
  </svg>
);

export const BookmarkIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M6 3h12v18l-6-4.5L6 21Z" />
  </svg>
);

export const PinIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const ClockIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const CheckIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

/** The Halfpenny mark: a coin, half inked. */
export const Mark = ({ size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden focusable={false}>
    <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M16 3a13 13 0 0 1 0 26Z" fill="var(--accent)" />
  </svg>
);
