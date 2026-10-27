"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** The examples in the film: unedited showcase captures of the coffee-shop product (public/motion). */
const SYSTEMS = [
  { id: "margin-notes", name: ["Margin", "Notes"], colors: ["#faf9f6", "#0e0e0c", "#1849f2", "#1e2a6b"] },
  { id: "inkleaf", name: ["Inkleaf"], colors: ["#faf9f5", "#141413", "#cfe0d2", "#f1d6c8"] },
  { id: "graphite-blueprint", name: ["Graphite", "Blueprint"], colors: ["#08090a", "#282a30", "#5e6ad2", "#8a8f98"] },
  { id: "morning-shapes", name: ["Morning", "Shapes"], colors: ["#ffce00", "#0061ef", "#ff7300", "#2d2c2b"] },
];
const STRIPS = 8;
const img = (id: string) => `/motion/${id}.webp`;

function Mask({ words }: { words: string[] }) {
  return (
    <span className="mh-mask">
      {words.map((w, i) => (
        <span key={i}>{w}</span>
      ))}
    </span>
  );
}

/**
 * The home page's short film, live: one site rewritten by several systems, then the results side by side. Drawn at
 * 1920×1080 and scaled to its box, so text stays sharp at any size. It plays while on screen and loops; with reduced
 * motion it shows its last frame.
 */
export function MotionHero() {
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current!;
    const st = stage.current!;
    const fit = () => st.style.setProperty("--mh-scale", String(el.clientWidth / 1920));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);

    const ctx = gsap.context(() => {
      const words = (sel: string) => `${sel} .mh-mask > span`;
      const E = "expo.out", EIO = "expo.inOut";
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.6 });

      gsap.set(words(".mh-intro"), { yPercent: 110, filter: "blur(10px)" });
      gsap.set(".mh-panel", { autoAlpha: 0 });
      gsap.set(words(".mh-names"), { yPercent: 110 });
      gsap.set(".mh-bars i", { scaleX: 0 });
      gsap.set(".mh-window", { autoAlpha: 0, rotationY: -28, rotationX: 14, z: -500, y: 120 });
      gsap.set(".mh-card", { autoAlpha: 0, y: 120, rotationY: -24, z: -300 });
      gsap.set(words(".mh-outro"), { yPercent: 110 });
      gsap.set(".mh-url", { autoAlpha: 0 });

      tl.to(words(".mh-intro"), { yPercent: 0, filter: "blur(0px)", duration: 1.0, ease: E, stagger: 0.07 }, 0.15)
        .to(words(".mh-intro"), { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.04 }, 1.75)
        .to(".mh-window", { autoAlpha: 1, rotationY: -16, rotationX: 6, z: 0, y: 0, duration: 1.5, ease: E }, 2.1)
        .to(".mh-window", { rotationY: -4, rotationX: 2, duration: 9.4, ease: "sine.inOut" }, 3.4)
        .to(".mh-panel", { autoAlpha: 1, duration: 0.01 }, 2.3)
        .to(words(".mh-n-1"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, 2.35)
        .to(".mh-layer-1 img", { y: -40, duration: 1.4, ease: "sine.inOut" }, 2.6);

      let prev = ".mh-n-1";
      SYSTEMS.forEach((_, i) => {
        const t = 3.9 + i * 2.0;
        tl.to(words(prev), { yPercent: -110, duration: 0.45, ease: "expo.in", stagger: 0.03 }, t)
          .to(words(`.mh-n${i}`), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, t + 0.38)
          .set(".mh-idx", { textContent: `SYSTEM 0${i + 1}` }, t + 0.38);
        if (i > 0) tl.to(`.mh-b${i - 1} i`, { scaleX: 0, transformOrigin: "100% 50%", duration: 0.35, ease: "expo.in", stagger: 0.03 }, t);
        tl.fromTo(`.mh-b${i} i`, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.7, ease: E, stagger: 0.05 }, t + 0.45)
          .fromTo(`.mh-layer${i} img`, { scale: 1.08, y: -40, filter: "blur(8px)", transformOrigin: "50% 0%" }, { scale: 1, filter: "blur(0px)", duration: 1.0, ease: E }, t + 0.25);
        gsap.utils.toArray<HTMLElement>(`.mh-layer${i} .mh-strip`).forEach((s, k) => {
          tl.fromTo(s, { clipPath: s.dataset.shut }, { clipPath: s.dataset.open, duration: 0.75, ease: EIO }, t + 0.15 + k * 0.045);
        });
        tl.to(`.mh-layer${i} img`, { y: -170, duration: 1.6, ease: "sine.inOut" }, t + 0.9);
        prev = `.mh-n${i}`;
      });

      const f = 3.9 + SYSTEMS.length * 2.0;
      tl.to(".mh-panel", { autoAlpha: 0, x: -40, duration: 0.5, ease: "expo.in" }, f - 0.1)
        .to(".mh-window", { z: -900, rotationY: 20, autoAlpha: 0, duration: 0.8, ease: "expo.in" }, f - 0.1)
        .to(".mh-card", { autoAlpha: 1, y: 0, rotationY: 0, z: 0, duration: 1.1, ease: E, stagger: 0.08 }, f + 0.45)
        .to(words(".mh-outro"), { yPercent: 0, duration: 0.9, ease: E, stagger: 0.05 }, f + 0.6)
        .to(".mh-url", { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, f + 1.2)
        .to({}, { duration: 1.4 });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = false;
      const sync = () => {
        if (reduce.matches) tl.pause().progress(0.999);
        else if (visible) tl.play();
        else tl.pause();
      };
      const io = new IntersectionObserver(([e]) => {
        visible = !!e?.isIntersecting;
        sync();
      });
      io.observe(el);
      reduce.addEventListener("change", sync);
      sync();
      return () => {
        io.disconnect();
        reduce.removeEventListener("change", sync);
      };
    }, st);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div className="motion-hero" ref={box} role="img" aria-label="One coffee shop site rewritten in turn by four Pigment design systems, then the four results side by side">
      <div className="mh-stage" ref={stage} aria-hidden="true">
        <div className="mh-intro">
          <Mask words={["One", "site."]} />
          <span className="mh-muted">
            <Mask words={["Any", "design", "system."]} />
          </span>
        </div>

        <div className="mh-panel">
          <div className="mh-idx">YOUR SITE</div>
          <div className="mh-names">
            <div className="mh-name mh-n-1">
              <Mask words={["Your", "site"]} />
            </div>
            {SYSTEMS.map((s, i) => (
              <div key={s.id} className={`mh-name mh-n${i}`}>
                {s.name.map((w) => (
                  <Mask key={w} words={[w]} />
                ))}
              </div>
            ))}
          </div>
          <div className="mh-bars">
            {SYSTEMS.map((s, i) => (
              <div key={s.id} className={`mh-b${i}`}>
                {s.colors.map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </div>
            ))}
          </div>
          <p className="mh-caption">Same site, same prompt. Each system applied by a coding agent, unedited.</p>
        </div>

        <div className="mh-depth">
          <div className="mh-window">
            <div className="mh-chrome">
              <b />
              <b />
              <b />
              <span>kilnstreet.coffee</span>
            </div>
            <div className="mh-view">
              <div className="mh-layer mh-layer-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img("original")} alt="" />
              </div>
              {SYSTEMS.map((s, i) => (
                <div key={s.id} className={`mh-layer mh-layer${i}`}>
                  {Array.from({ length: STRIPS }, (_, k) => {
                    // Each strip reaches a little past its right edge so neighbours overlap and no hairline shows.
                    const l = (k / STRIPS) * 100, r = Math.max(0, 100 - ((k + 1) / STRIPS) * 100 - 0.3);
                    return (
                      <div key={k} className="mh-strip" data-shut={`inset(0% ${r}% 100% ${l}%)`} data-open={`inset(0% ${r}% 0% ${l}%)`} style={{ clipPath: `inset(0% ${r}% 100% ${l}%)` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img(s.id)} alt="" />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mh-cards">
          {SYSTEMS.map((s, i) => (
            <div key={s.id} className="mh-card" style={{ left: 72 + i * 364 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(s.id)} alt="" />
              <span>{s.name.join(" ")}</span>
            </div>
          ))}
          <div className="mh-card mh-more" style={{ left: 72 + SYSTEMS.length * 364 }}>
            <b>+ more</b>
            <em>new systems keep arriving</em>
          </div>
        </div>
        <div className="mh-outro">
          <Mask words={["Pick", "one.", "Your", "agent", "applies", "it."]} />
        </div>
        <div className="mh-url">pigmentui.com</div>
      </div>
    </div>
  );
}
