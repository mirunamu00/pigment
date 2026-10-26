const PATHS: Record<string, string> = {
  home: 'M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6.5H9V21H4.5a1 1 0 0 1-1-1z',
  book: 'M5 5.5A2.5 2.5 0 0 1 7.5 3H19v14H7.5A2.5 2.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19v-4M9 7.5h6M9 11h4',
  calendar: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM4 10h16M8.5 3v4M15.5 3v4',
  basket: 'M3 10h18l-1.6 8.4a2 2 0 0 1-2 1.6H6.6a2 2 0 0 1-2-1.6zM7.5 10 11 4M16.5 10 13 4M9 14v2.5M15 14v2.5M12 14v2.5',
  settings: 'M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1M15 5v4M9 10v4M17 15v4',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  heart: 'M12 20s-7.5-4.6-9.2-9.1C1.6 7.6 3.8 4.5 7 4.5c2.1 0 3.5 1.2 5 3 1.5-1.8 2.9-3 5-3 3.2 0 5.4 3.1 4.2 6.4C19.5 15.4 12 20 12 20z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M15.5 4.3a3.5 3.5 0 0 1 0 6.4M18 14.2a6.4 6.4 0 0 1 3.5 5.8',
  flame: 'M12 3c1.2 3.4 5.5 5.6 5.5 10.5a5.5 5.5 0 0 1-11 0c0-2.4 1.1-4.1 2.7-5.3.3 1.9 1.3 3 2.5 3.3C11.3 9 10.9 6 12 3z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12M18 6 6 18',
  chevronRight: 'M9 5l7 7-7 7',
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronDown: 'M5 9l7 7 7-7',
  arrowRight: 'M4 12h15M13 6l6 6-6 6',
  trash: 'M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13M10 11v5M14 11v5',
  move: 'M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18',
  bell: 'M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15zM10 21h4',
  play: 'M8 5.5v13l10.5-6.5z',
  leaf: 'M5 20c0-8.5 5.5-15 15-15 0 9.5-6 15-14 15M5 20c3-4.5 6.5-7 10-9',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  share: 'M8.5 10.5l7-4M8.5 13.5l7 4M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  chart: 'M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6',
  swap: 'M7 4 3.5 7.5 7 11M3.5 7.5H17M17 13l3.5 3.5L17 20M20.5 16.5H7',
  printer: 'M7 9V3.5h10V9M7 17H4.5V10a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v7H17M7 14h10v6.5H7z',
  bowl: 'M3 11h18a9 9 0 0 1-18 0zM8 20.5h8M9 7c0-1.5 1-2 1-3.5M13 7c0-1.5 1-2 1-3.5',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5.5M12 7.5h.01',
  alert: 'M12 3.5 2.5 20h19zM12 10v4.5M12 17.5h.01',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5a7.5 7.5 0 0 1 15 0',
  ruler: 'M3 16.5 16.5 3 21 7.5 7.5 21zM7 12.5l2 2M10 9.5l2 2M13 6.5l2 2',
  logout: 'M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15M10 8l-4 4 4 4M6 12h10',
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className, filled }: { name: IconName; size?: number; className?: string; filled?: boolean }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Star({ fill = 1, size = 14 }: { fill?: number; size?: number }) {
  const id = `s${Math.round(fill * 100)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="currentColor" />
          <stop offset={`${fill * 100}%`} stopColor="var(--star-empty)" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z" />
    </svg>
  );
}

export function Stars({ rating, size }: { rating: number; size?: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} fill={Math.max(0, Math.min(1, rating - i))} />
      ))}
    </span>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="9" fill="var(--brand)" />
        <circle cx="14" cy="17.5" r="7" fill="none" stroke="#fff" strokeWidth="2.4" />
        <path d="M20.5 12.5 26.5 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M11 17.5a3 3 0 0 1 3-3" stroke="var(--accent-soft)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <span className="logo-word">Panful</span>
    </span>
  );
}
