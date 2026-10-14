"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface RailScreen {
  name: string;
  src?: string;
}

/**
 * Every screen of one demo app at phone size, side by side. Each phone scrolls on its own, so the whole
 * full-page capture is there to read — a mobile page is judged by its length, not its first 844px.
 */
export function PhoneRail({ screens, bg, label }: { screens: RailScreen[]; bg: string; label: string }) {
  return (
    <div className="phones" role="list" aria-label={`${label} screens at 390px`}>
      {screens.map((s) => (
        <Phone key={s.name} screen={s} bg={bg} label={label} />
      ))}
    </div>
  );
}

function Phone({ screen, bg, label }: { screen: RailScreen; bg: string; label: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [length, setLength] = useState<number | null>(null);
  const img = useRef<HTMLImageElement>(null);
  const measure = (el: HTMLImageElement | null) => {
    if (el?.naturalWidth) setLength(Math.round((el.naturalHeight / el.naturalWidth) * 390));
  };
  // A cached image can finish loading before hydration, when onLoad has nothing to call yet.
  useEffect(() => {
    if (img.current?.complete) measure(img.current);
  }, [screen.src]);
  return (
    <figure className="phone" role="listitem">
      <div
        className="phone__screen"
        style={{ "--shot-bg": bg } as CSSProperties}
        tabIndex={0}
        role="region"
        aria-label={`${label}: ${screen.name}, scrollable`}
        onScroll={(e) => !scrolled && e.currentTarget.scrollTop > 8 && setScrolled(true)}
      >
        {screen.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screen.src}
            alt=""
            loading="lazy"
            ref={img}
            onLoad={(e) => measure(e.currentTarget)}
          />
        ) : (
          <span className="phone__empty mono">No capture</span>
        )}
        {/* Only pages longer than one phone screen have anything to scroll to. */}
        {screen.src && length !== null && length > 844 && (
          <span className="phone__hint" data-hidden={scrolled || undefined} aria-hidden="true">
            Scroll
            <svg viewBox="0 0 12 12" width={10} height={10}>
              <path d="M6 2.5v7M3 6.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
      <figcaption className="phone__caption">
        <span>{screen.name}</span>
        <span className="mono meta">{length ? `390 × ${length.toLocaleString("en-US")}` : "390"}</span>
      </figcaption>
    </figure>
  );
}
