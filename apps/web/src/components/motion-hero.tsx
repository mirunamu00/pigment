"use client";

import { useEffect, useRef } from "react";

/**
 * The home page's short film: one product restyled by several systems (rendered from showcase/banner). It plays
 * muted and looped; people who ask for reduced motion get its last frame, the four results side by side.
 */
export function MotionHero() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (reduce.matches ? el.pause() : void el.play().catch(() => {}));
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
  }, []);
  return (
    <div className="motion-hero">
      <video
        ref={video}
        src="/pigment-motion.mp4"
        poster="/pigment-motion-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="A coffee shop site restyled in turn by four Pigment design systems, then the four results side by side"
      />
    </div>
  );
}
