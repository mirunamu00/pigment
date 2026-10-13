interface IconProps {
  className?: string;
}

export function CartIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ImageIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1.8" fill="currentColor" />
      <path d="M4 17l5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
