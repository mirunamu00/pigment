import type { CSSProperties } from "react";

export const APPS = [
  ["dashboard", "Dashboard"],
  ["commerce", "E-commerce"],
  ["blog", "Blog"],
  ["settings", "Settings"],
] as const;
export type AppKey = (typeof APPS)[number][0];

/**
 * A screenshot of agent-built output. Until a capture exists it shows a labelled placeholder in the
 * system's background color, never a mockup — the gallery only ever shows real agent output.
 */
export function Shot({
  src,
  title,
  meta,
  bg,
  ink,
  height,
  href,
  openLabel,
  ariaLabel,
  style,
}: {
  src?: string;
  title: string;
  meta?: string;
  bg?: string;
  ink?: string;
  height: number | string;
  href?: string;
  openLabel?: string;
  ariaLabel: string;
  style?: CSSProperties;
}) {
  const vars = { "--shot-bg": bg, "--shot-ink": ink, height, ...style } as CSSProperties;
  const body = (
    <>
      <span className="shot__label">Agent-built screenshot</span>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" />
      ) : (
        <>
          <span className="shot__title">{title}</span>
          {meta && <span className="shot__meta">{meta}</span>}
        </>
      )}
      {href && openLabel && (
        <span className="shot__open">
          {openLabel}
          <svg aria-hidden="true" viewBox="0 0 12 12" width={10} height={10}>
            <path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );
  return href ? (
    <a className="shot" href={href} aria-label={ariaLabel} style={vars}>
      {body}
    </a>
  ) : (
    <div className="shot" role="img" aria-label={ariaLabel} style={vars}>
      {body}
    </div>
  );
}
