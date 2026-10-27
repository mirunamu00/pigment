"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

const E = "expo.out";

/**
 * A small looping scene for one step of how a system is made. Drawn at 960×540 and scaled to its box; it plays
 * while on screen, and with reduced motion it rests on its last frame.
 */
function Scene({ label, build, children }: { label: string; build: (tl: gsap.core.Timeline) => void; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current!;
    const st = stage.current!;
    const fit = () => st.style.setProperty("--hs-scale", String(el.clientWidth / 960));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 });
      build(tl);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = false;
      const sync = () => (reduce.matches ? tl.pause().progress(0.999) : visible ? tl.play() : tl.pause());
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
    // Built once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="hs" ref={box} role="img" aria-label={label}>
      <div className="hs-stage" ref={stage} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

/* 1. Survey and capture the reference */
export function SurveyScene() {
  return (
    <Scene
      label="A grid of pages being surveyed, a counter rising to 150, and the pages that cover every feature picked for deep capture"
      build={(tl) => {
        const n = { v: 0 };
        const out = gsap.utils.toArray<HTMLElement>(".hs-count b")[0]!;
        gsap.set(".hs-page", { autoAlpha: 0, y: 14 });
        gsap.set(".hs-page.pick", { boxShadow: "inset 0 0 0 1px #dedbd2" });
        tl.to(".hs-page", { autoAlpha: 1, y: 0, duration: 0.5, ease: E, stagger: { each: 0.05, from: "start" } }, 0)
          .fromTo(".hs-scan", { x: -60 }, { x: 980, duration: 2.4, ease: "none" }, 0.2)
          .to(n, { v: 150, duration: 2.4, ease: "power1.out", onUpdate: () => void (out.textContent = String(Math.round(n.v))) }, 0.2)
          .to(".hs-page.pick", { boxShadow: "inset 0 0 0 3px #0e0e0c", scale: 1.04, duration: 0.5, ease: E, stagger: 0.12 }, 2.8)
          .fromTo(".hs-page.pick i", { scale: 0 }, { scale: 1, duration: 0.4, ease: E, stagger: 0.12 }, 2.9)
          .to({}, { duration: 1.6 });
      }}
    >
      <div className="hs-count">
        <b>0</b> pages surveyed
      </div>
      <div className="hs-pages">
        {Array.from({ length: 18 }, (_, k) => (
          <div key={k} className={`hs-page${[1, 6, 10, 15].includes(k) ? " pick" : ""}`}>
            <span className="hs-bar" />
            <span className="hs-block" style={{ height: 18 + ((k * 7) % 22) }} />
            <span className="hs-line" />
            <span className="hs-line short" />
            <i>✓</i>
          </div>
        ))}
      </div>
      <span className="hs-scan" />
    </Scene>
  );
}

/* 2. Measure the design language */
const VALUES = [
  ["color", "#ffce00 · #0061ef · #2d2c2b"],
  ["type", "700 · −0.03em · sentence case"],
  ["shape", "pill 999px · ledge 0 2px 0"],
  ["motion", "150ms · cubic-bezier(.32,.94,.6,1)"],
  ["never", "logos · copy · characters · fonts"],
];

export function MeasureScene() {
  return (
    <Scene
      label="A reference page on the left, and its measured values — color, type, shape, motion — lifted out one by one; logos, copy, characters and fonts are left behind"
      build={(tl) => {
        gsap.set(".hs-ref > *", { autoAlpha: 0, y: 12 });
        gsap.set(".hs-val", { autoAlpha: 0, x: -30 });
        tl.to(".hs-ref > *", { autoAlpha: 1, y: 0, duration: 0.5, ease: E, stagger: 0.08 }, 0)
          .to(".hs-val", { autoAlpha: 1, x: 0, duration: 0.6, ease: E, stagger: 0.38 }, 0.8)
          .to(".hs-val.never s", { width: "100%", duration: 0.5, ease: "power2.inOut" }, 3.0)
          .to({}, { duration: 1.6 });
      }}
    >
      <div className="hs-ref">
        <span className="hs-ref-band" />
        <span className="hs-ref-title" />
        <span className="hs-ref-pills">
          <i />
          <i className="blue" />
        </span>
        <span className="hs-ref-dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="hs-vals">
        {VALUES.map(([k, v]) => (
          <div key={k} className={`hs-val${k === "never" ? " never" : ""}`}>
            <span className="mono">{k}</span>
            <b>
              {v}
              {k === "never" && <s />}
            </b>
          </div>
        ))}
      </div>
    </Scene>
  );
}

/* 3. Write the spec */
const SPEC_LINES = [
  ["h", "# Morning Shapes"],
  ["h", "## The ten rules that define this look"],
  ["p", "1. Warm white and cream carry the page; saturated color comes as whole fields."],
  ["p", "4. Every action is a round pill on a 2px ledge that sinks when pressed."],
  ["h", "## Never"],
  ["p", "- Faces or outlines on shapes. Gradients behind text."],
  ["h", "## Applying the concept"],
  ["p", "Dashboard · form · table · empty · error · loading …"],
];

export function SpecScene() {
  return (
    <Scene
      label="The spec, agent.md, being written line by line: the defining rules, a Never list and how to apply the system to every kind of screen"
      build={(tl) => {
        gsap.set(".hs-doc li", { autoAlpha: 0, x: -16 });
        tl.to(".hs-doc li", { autoAlpha: 1, x: 0, duration: 0.45, ease: E, stagger: 0.32 }, 0.2).to({}, { duration: 1.8 });
      }}
    >
      <div className="hs-doc">
        <div className="hs-doc-bar">agent.md</div>
        <ul>
          {SPEC_LINES.map(([kind, text]) => (
            <li key={text} className={kind === "h" ? "h" : ""}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </Scene>
  );
}

/* 4. Test on plain apps until it holds */
const ROUNDS = [
  ["Candidate 1", "signature 3 / 5", false],
  ["Candidate 2", "a rule invented data", false],
  ["Candidate 3", "3 samples · 2 unseen apps", true],
] as const;

export function TestScene() {
  return (
    <Scene
      label="An agent applies each candidate to four plain test apps and two apps it never saw; a review scores it against the reference, and it is revised until it passes"
      build={(tl) => {
        gsap.set(".hs-app", { autoAlpha: 0, y: 14 });
        gsap.set(".hs-app span", { scaleX: 0 });
        gsap.set(".hs-round", { autoAlpha: 0, x: 20 });
        tl.to(".hs-app", { autoAlpha: 1, y: 0, duration: 0.5, ease: E, stagger: 0.08 }, 0)
          .to(".hs-app span", { scaleX: 1, duration: 0.8, ease: "expo.inOut", stagger: 0.05 }, 0.4);
        ROUNDS.forEach((_, i) => tl.to(`.hs-round.r${i}`, { autoAlpha: 1, x: 0, duration: 0.5, ease: E }, 1.2 + i * 0.9));
        tl.to({}, { duration: 2 });
      }}
    >
      <div className="hs-apps">
        {["Dashboard", "Store", "Blog", "Settings", "Landing", "Docs"].map((a, i) => (
          <div key={a} className={`hs-app${i > 3 ? " unseen" : ""}`}>
            <em>{a}</em>
            <span />
            <span className="w2" />
            <span className="w3" />
          </div>
        ))}
      </div>
      <div className="hs-rounds">
        {ROUNDS.map(([name, why, pass], i) => (
          <div key={name} className={`hs-round r${i}${pass ? " pass" : ""}`}>
            <b>{pass ? "✓" : "×"}</b>
            <span>{name}</span>
            <em>{why}</em>
          </div>
        ))}
      </div>
    </Scene>
  );
}

/* 5. Show it on real products */
export function ShowcaseScene() {
  return (
    <Scene
      label="A realistic coffee shop site, then the same site with the system applied, written in column by column"
      build={(tl) => {
        const strips = gsap.utils.toArray<HTMLElement>(".hs-strip");
        strips.forEach((s, k) => tl.fromTo(s, { clipPath: s.dataset.shut }, { clipPath: s.dataset.open, duration: 0.7, ease: "expo.inOut" }, 0.8 + k * 0.05));
        tl.to(".hs-before-label", { autoAlpha: 0, duration: 0.3 }, 0.8).fromTo(".hs-after-label", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 1.4).to({}, { duration: 2.2 });
      }}
    >
      <div className="hs-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motion/original.webp" alt="" />
        {Array.from({ length: 6 }, (_, k) => {
          const l = (k / 6) * 100, r = Math.max(0, 100 - ((k + 1) / 6) * 100 - 0.4);
          return (
            <div key={k} className="hs-strip" data-shut={`inset(0% ${r}% 100% ${l}%)`} data-open={`inset(0% ${r}% 0% ${l}%)`} style={{ clipPath: `inset(0% ${r}% 100% ${l}%)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/motion/morning-shapes.webp" alt="" />
            </div>
          );
        })}
        <span className="hs-tag hs-before-label">original</span>
        <span className="hs-tag hs-after-label">with the system · unedited</span>
      </div>
    </Scene>
  );
}

/* 6. It lives in your project */
export function ProjectScene() {
  return (
    <Scene
      label="The spec kept in the project as design-system/agent.md, and sessions weeks apart building new screens from it"
      build={(tl) => {
        gsap.set([".hs-tree li", ".hs-session"], { autoAlpha: 0, y: 12 });
        tl.to(".hs-tree li", { autoAlpha: 1, y: 0, duration: 0.4, ease: E, stagger: 0.12 }, 0)
          .to(".hs-session", { autoAlpha: 1, y: 0, duration: 0.6, ease: E, stagger: 0.7 }, 1.0)
          .to({}, { duration: 2 });
      }}
    >
      <ul className="hs-tree">
        <li>design-system/</li>
        <li className="key">├ agent.md</li>
        <li>├ tokens.css</li>
        <li>└ VERSION</li>
        <li className="key">CLAUDE.md → agent.md</li>
      </ul>
      <div className="hs-sessions">
        {[
          ["Day 1", "set up", "flow-today"],
          ["Week 3", "new screen", "flow-goal"],
        ].map(([when, what, shot]) => (
          <div key={when} className="hs-session">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/motion/${shot}.webp`} alt="" />
            <span>
              <b>{when}</b> · {what}
            </span>
          </div>
        ))}
      </div>
    </Scene>
  );
}
