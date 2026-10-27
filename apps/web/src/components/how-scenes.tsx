"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

const E = "expo.out";
const EIN = "expo.in";
const EIO = "expo.inOut";
const img = (name: string) => `/motion/how/${name}.webp`;
const words = (sel: string) => `${sel} .hs-mask > span`;

/**
 * One step's scene: drawn at 1280×800 on the page itself (no frame) and scaled to its column. It loops while on
 * screen; with reduced motion it rests on a finished frame.
 */
function Scene({ label, build, children }: { label: string; build: (tl: gsap.core.Timeline) => void; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current!;
    const st = stage.current!;
    const fit = () => st.style.setProperty("--hs-scale", String(el.clientWidth / 1280));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
      build(tl);
      // The last half second of every scene fades it out for the loop; reduced motion rests just before that.
      const rest = Math.max(0, (tl.duration() - 0.7) / tl.duration());
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = false;
      const sync = () => (reduce.matches ? tl.pause().progress(rest) : visible ? tl.play() : tl.pause());
      const io = new IntersectionObserver(
        ([e]) => {
          visible = !!e?.isIntersecting;
          sync();
        },
        { threshold: 0.25 },
      );
      io.observe(el);
      reduce.addEventListener("change", sync);
      sync();
      // The stage stays hidden (CSS) until every element has its starting state and the stage its scale.
      st.style.visibility = "visible";
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

/** Words that rise out of their own line box. */
function Mask({ children, className }: { children: string; className?: string }) {
  return (
    <span className={`hs-mask${className ? ` ${className}` : ""}`}>
      {children.split(" ").map((w, i) => (
        <span key={i}>{w}</span>
      ))}
    </span>
  );
}

/** A screen written in column by column over another, as in the home film. */
function Strips({ src, cls, n = 8 }: { src: string; cls: string; n?: number }) {
  return (
    <div className={`hs-layer ${cls}`}>
      {Array.from({ length: n }, (_, k) => {
        // Each strip reaches a little past its right edge so neighbours overlap and no hairline shows.
        const l = (k / n) * 100, r = Math.max(0, 100 - ((k + 1) / n) * 100 - 0.3);
        return (
          <div key={k} className="hs-strip" data-shut={`inset(0% ${r}% 100% ${l}%)`} data-open={`inset(0% ${r}% 0% ${l}%)`} style={{ clipPath: `inset(0% ${r}% 100% ${l}%)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" />
          </div>
        );
      })}
    </div>
  );
}

function writeIn(tl: gsap.core.Timeline, cls: string, t: number) {
  tl.fromTo(`.${cls} img`, { scale: 1.06, filter: "blur(8px)", transformOrigin: "50% 0%" }, { scale: 1, filter: "blur(0px)", duration: 1.0, ease: E }, t + 0.1);
  gsap.utils.toArray<HTMLElement>(`.${cls} .hs-strip`).forEach((s, k) => {
    tl.fromTo(s, { clipPath: s.dataset.shut }, { clipPath: s.dataset.open, duration: 0.75, ease: EIO }, t + k * 0.045);
  });
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* 1. Survey: every page of a site, laid out; the ones that cover every feature are captured in depth.               */

const PAGES = Array.from({ length: 16 }, (_, i) => img(`page-${String(i).padStart(2, "0")}`));
const DEEP = [1, 6, 9, 14];

export function SurveyScene() {
  return (
    <Scene
      label="Every page of a site laid out and counted; the pages that together cover every feature lift out to be captured in depth"
      build={(tl) => {
        const count = { v: 0 };
        const out = gsap.utils.toArray<HTMLElement>(".hs-count")[0]!;
        gsap.set(".hs-sheet", { autoAlpha: 0, z: -400, y: 60 });
        gsap.set(words(".hs-lines"), { yPercent: 110 });
        gsap.set(".hs-count", { autoAlpha: 0, y: 30 });
        tl.to(".hs-sheet", { autoAlpha: 1, z: 0, y: 0, duration: 1.1, ease: E, stagger: { each: 0.06, from: "random" } }, 0.1)
          .to(".hs-count", { autoAlpha: 1, y: 0, duration: 0.8, ease: E }, 0.15)
          .to(count, { v: 150, duration: 2.2, ease: "power2.out", onUpdate: () => void (out.textContent = String(Math.round(count.v))) }, 0.2)
          .to(words(".hs-lines .a"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.05 }, 0.3)
          .fromTo(".hs-table", { rotationZ: -34 }, { rotationZ: -26, duration: 5.6, ease: "sine.inOut" }, 0)
          // The deep captures lift off the table; the rest fall back.
          .to(words(".hs-lines .a"), { yPercent: -110, duration: 0.45, ease: EIN, stagger: 0.03 }, 2.9)
          .to(words(".hs-lines .b"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.05 }, 3.25)
          .to(".hs-sheet:not(.deep)", { opacity: 0.22, duration: 0.8, ease: E }, 3.0)
          .to(".hs-sheet.deep", { z: 110, duration: 1.0, ease: E, stagger: 0.1 }, 3.0)
          .to(".hs-sheet.deep", { boxShadow: "0 50px 60px -30px rgba(14,14,12,.5), 0 0 0 3px #0e0e0c", duration: 0.6, ease: E, stagger: 0.1 }, 3.1)
          .to({}, { duration: 1.4 })
          .to([".hs-table", ".hs-survey-copy"], { autoAlpha: 0, duration: 0.5, ease: EIN });
      }}
    >
      <div className="hs-survey-copy">
        <div className="hs-count">0</div>
        <div className="hs-lines">
          <div className="hs-swap a">
            <Mask>pages surveyed until</Mask>
            <Mask>nothing new turns up</Mask>
          </div>
          <div className="hs-swap b">
            <Mask>then the ones that cover</Mask>
            <Mask>every feature, in depth</Mask>
          </div>
        </div>
      </div>
      <div className="hs-table-wrap">
        <div className="hs-table">
          {PAGES.map((src, i) => (
            <div key={src} className={`hs-sheet${DEEP.includes(i) ? " deep" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* 2. Measure: the language as values — Morning Shapes' own tokens.                                                   */

const FIELDS = ["#ffce00", "#0061ef", "#ff7300", "#02873e", "#ffa1cc", "#5432a5"];

export function MeasureScene() {
  return (
    <Scene
      label="The design language as measured values: six color fields with their hex codes, bold type at -0.03em, a pill that sinks onto its ledge in 150 milliseconds along its easing curve; logos, names, copy, imagery and fonts are left behind"
      build={(tl) => {
        const path = gsap.utils.toArray<SVGPathElement>(".hs-curve path")[0]!;
        const dot = gsap.utils.toArray<SVGCircleElement>(".hs-curve circle")[0]!;
        const along = { p: 0 };
        const place = () => {
          const pt = path.getPointAtLength(along.p * path.getTotalLength());
          dot.setAttribute("cx", String(pt.x));
          dot.setAttribute("cy", String(pt.y));
        };
        gsap.set(".hs-field", { scaleY: 0 });
        gsap.set(words(".hs-measure"), { yPercent: 110 });
        gsap.set(".hs-curve path", { strokeDashoffset: 1 });
        gsap.set([".hs-press", ".hs-curve circle"], { autoAlpha: 0 });
        gsap.set(".hs-struck s", { scaleX: 0 });
        tl.to(".hs-field", { scaleY: 1, duration: 1.0, ease: E, stagger: 0.07 }, 0.1)
          .to(words(".hs-fields"), { yPercent: 0, duration: 0.7, ease: E, stagger: 0.05 }, 0.5)
          .to(words(".hs-spec-type"), { yPercent: 0, duration: 0.9, ease: E, stagger: 0.05 }, 1.0)
          .to(".hs-press", { autoAlpha: 1, duration: 0.4 }, 1.6)
          .to(words(".hs-spec-motion"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.04 }, 1.7)
          .to(".hs-curve path", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 1.9)
          .to(".hs-curve circle", { autoAlpha: 1, duration: 0.2 }, 2.8);
        // The pill presses twice: down 2px with its ledge gone, timed along the system's own curve.
        [2.9, 3.8].forEach((t) => {
          tl.to(".hs-press", { y: 2, boxShadow: "0 0px 0 0 rgba(65,61,69,0)", duration: 0.15, ease: "power1.out" }, t)
            .to(".hs-press", { y: 0, boxShadow: "0 2px 0 0 rgba(65,61,69,0.2)", duration: 0.15, ease: "power1.out" }, t + 0.35)
            .fromTo(along, { p: 0 }, { p: 1, duration: 0.6, ease: "power3.out", onUpdate: place }, t);
        });
        tl.to(words(".hs-left"), { yPercent: 0, duration: 0.7, ease: E, stagger: 0.04 }, 3.2)
          .to(".hs-struck s", { scaleX: 1, duration: 0.5, ease: EIO, stagger: 0.12 }, 4.0)
          .to({}, { duration: 1.4 })
          .to(".hs-measure", { autoAlpha: 0, duration: 0.5, ease: EIN });
      }}
    >
      <div className="hs-measure">
        <div className="hs-fields">
          {FIELDS.map((hex) => (
            <div key={hex} className="hs-field-col">
              <i className="hs-field" style={{ background: hex }} />
              <Mask className="hs-meta">{hex}</Mask>
            </div>
          ))}
        </div>
        <div className="hs-specs">
          <div className="hs-spec hs-spec-type">
            <span className="hs-mask hs-big">
              <span>Aa</span>
            </span>
            <Mask className="hs-meta">bold · −0.03em · sentence case</Mask>
          </div>
          <div className="hs-spec hs-spec-motion">
            <div className="hs-press-row">
              <span className="hs-press">Start free</span>
              <svg className="hs-curve" viewBox="-10 -10 180 120" width="180" height="120">
                <path d="M0 100 C 51.2 6, 96 0, 160 0" pathLength={1} strokeDasharray="1" />
                <circle r="7" cx="0" cy="100" />
              </svg>
            </div>
            <Mask className="hs-meta">press · 150ms · cubic-bezier(.32,.94,.6,1)</Mask>
          </div>
        </div>
        <div className="hs-left">
          <Mask className="hs-meta">left behind</Mask>
          <span className="hs-mask hs-struck">
            {["logos", "names", "copy", "imagery", "fonts"].map((w) => (
              <span key={w}>
                {w}
                <s />
              </span>
            ))}
          </span>
        </div>
      </div>
    </Scene>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* 3. The spec: written as rules — real lines from a published agent.md.                                             */

const SPEC: Array<[string, string]> = [
  ["h1", "Morning Shapes"],
  ["h2", "The ten rules that define this look"],
  ["li", "Warm white and cream carry the page; color comes as whole flat fields."],
  ["li", "Every area of the product owns one hue, everywhere."],
  ["li", "Bands bulge at their edges."],
  ["li", "Every action is a pill or a circle on a ledge."],
  ["h2", "Never"],
  ["p", "Faces, outlines or gradients on the shapes. A tint of a hue as a background."],
];
const SECTIONS = ["Character", "Ten defining rules", "Never", "Signature elements", "Color, type, space", "Motion and interaction", "Applying the concept", "Tokens, light and dark", "Every component state"];

export function SpecScene() {
  let n = 0;
  return (
    <Scene
      label="The spec, agent.md, written line by line: the system's defining rules and its Never list, then every section it holds, from its character to every component state"
      build={(tl) => {
        gsap.set(".hs-doc", { autoAlpha: 0, rotationY: -18, rotationX: 8, z: -300, y: 60 });
        gsap.set(".hs-doc-line", { clipPath: "inset(0 100% 0 0)" });
        gsap.set(".hs-toc li", { autoAlpha: 0, x: 24 });
        gsap.set(".hs-toc-head", { autoAlpha: 0 });
        tl.to(".hs-doc", { autoAlpha: 1, rotationY: -8, rotationX: 4, z: 0, y: 0, duration: 1.2, ease: E }, 0.1).to(".hs-doc", { rotationY: -2, rotationX: 1, duration: 6, ease: "sine.inOut" }, 1.2);
        gsap.utils.toArray<HTMLElement>(".hs-doc-line").forEach((line, i) => {
          tl.to(line, { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power2.inOut" }, 0.6 + i * 0.3);
        });
        tl.to(".hs-toc-head", { autoAlpha: 1, duration: 0.4 }, 3.1).to(".hs-toc li", { autoAlpha: 1, x: 0, duration: 0.6, ease: E, stagger: 0.12 }, 3.2);
        tl.to({}, { duration: 1.4 }).to([".hs-doc", ".hs-toc"], { autoAlpha: 0, duration: 0.5, ease: EIN });
      }}
    >
      <div className="hs-doc-depth">
        <div className="hs-doc">
          <div className="hs-doc-name">design-system/agent.md</div>
          {SPEC.map(([kind, text], i) => (
            <div key={i} className={`hs-doc-line ${kind}`}>
              {kind === "li" && <b>{++n}.</b>}
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className="hs-toc">
        <div className="hs-toc-head">and the rest of it</div>
        <ul>
          {SECTIONS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </Scene>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* 4. Test: four apps, three runs each, two apps it never saw; candidates revised until one holds.                    */

const APPS = [
  ["Dashboard", false],
  ["Store", false],
  ["Blog", false],
  ["Settings", false],
  ["Landing", true],
  ["Docs", true],
] as const;
const CANDIDATES = [
  ["Candidate 1", "short of the reference — revised", false],
  ["Candidate 2", "a rule too narrow — revised", false],
  ["Candidate 3", "holds on all six apps", true],
] as const;

export function TestScene() {
  return (
    <Scene
      label="A coding agent applies the spec to four test apps three times each and to two apps it never saw; candidates that fall short are revised as general rules until one holds"
      build={(tl) => {
        gsap.set(".hs-cell i", { scale: 0 });
        gsap.set(".hs-row", { autoAlpha: 0, x: -20 });
        gsap.set(".hs-cand", { autoAlpha: 0, y: 20 });
        gsap.set(".hs-rail i", { scaleY: 0 });
        gsap.set(words(".hs-runs"), { yPercent: 110 });
        tl.to(".hs-row", { autoAlpha: 1, x: 0, duration: 0.6, ease: E, stagger: 0.07 }, 0.1).to(words(".hs-runs"), { yPercent: 0, duration: 0.7, ease: E, stagger: 0.05 }, 0.3);
        // Each run fills its cell, app by app.
        gsap.utils.toArray<HTMLElement>(".hs-cell i").forEach((c, k) => {
          tl.to(c, { scale: 1, duration: 0.4, ease: E }, 0.9 + k * 0.08);
        });
        tl.to(".hs-rail i", { scaleY: 1, duration: 2.2, ease: "power2.inOut" }, 1.0);
        CANDIDATES.forEach((_, i) => tl.to(`.hs-cand.c${i}`, { autoAlpha: 1, y: 0, duration: 0.6, ease: E }, 1.1 + i * 0.8));
        tl.to({}, { duration: 1.8 }).to([".hs-matrix", ".hs-cands"], { autoAlpha: 0, duration: 0.5, ease: EIN });
      }}
    >
      <div className="hs-matrix">
        <div className="hs-runs">
          <Mask>run 1</Mask>
          <Mask>run 2</Mask>
          <Mask>run 3</Mask>
        </div>
        {APPS.map(([name, unseen]) => (
          <div key={name} className={`hs-row${unseen ? " unseen" : ""}`}>
            <span className="hs-app-name">
              {name}
              {unseen && <em>never tuned on</em>}
            </span>
            {(unseen ? [0] : [0, 1, 2]).map((k) => (
              <span key={k} className="hs-cell">
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="hs-cands">
        <div className="hs-rail">
          <i />
        </div>
        {CANDIDATES.map(([name, why, pass], i) => (
          <div key={name} className={`hs-cand c${i}${pass ? " pass" : ""}`}>
            <b>{pass ? "✓" : "×"}</b>
            <span>{name}</span>
            <em>{why}</em>
          </div>
        ))}
      </div>
    </Scene>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* 5. Showcase: three realistic products, each rewritten by a system — unedited.                                     */

const SHOWS = [
  ["roastery", "morning-shapes", "kilnstreet.coffee", "Coffee shop", ["Morning", "Shapes"]],
  ["journal", "inkleaf", "the-journal", "Magazine", ["Inkleaf"]],
  ["recipes", "graphite-blueprint", "recipes.app", "Recipe app", ["Graphite", "Blueprint"]],
] as const;

export function ShowcaseScene() {
  return (
    <Scene
      label="Three realistic products — a coffee shop, a magazine and a recipe app — each rewritten column by column by a published system, unedited"
      build={(tl) => {
        gsap.set(".hs-win", { autoAlpha: 0, rotationY: -22, rotationX: 10, z: -400, y: 80 });
        gsap.set(words(".hs-show-names"), { yPercent: 110 });
        gsap.set(".hs-show", { autoAlpha: 0 });
        gsap.set(".hs-badge", { autoAlpha: 0, y: 12 });
        tl.to(".hs-win", { autoAlpha: 1, rotationY: -10, rotationX: 4, z: 0, y: 0, duration: 1.2, ease: E }, 0)
          .to(".hs-win", { rotationY: -3, rotationX: 1, duration: 8, ease: "sine.inOut" }, 1.1)
          .to(".hs-badge", { autoAlpha: 1, y: 0, duration: 0.6, ease: E }, 0.8);
        SHOWS.forEach((s, i) => {
          const t = 0.3 + i * 2.6;
          if (i > 0) tl.to(words(`.hs-show-name.n${i - 1}`), { yPercent: -110, duration: 0.45, ease: EIN, stagger: 0.03 }, t - 0.25).set(`.hs-show.s${i - 1}`, { autoAlpha: 0 }, t);
          tl.set(`.hs-show.s${i}`, { autoAlpha: 1 }, t)
            .set(".hs-win-url", { textContent: s[2] }, t)
            .to(words(`.hs-show-name.n${i}`), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.05 }, t + 0.15);
          writeIn(tl, `hs-after${i}`, t + 0.9);
          tl.to(`.hs-after${i} img`, { y: -30, duration: 1.2, ease: "sine.inOut" }, t + 1.5);
        });
        tl.to({}, { duration: 0.6 }).to([".hs-win", ".hs-show-copy"], { autoAlpha: 0, duration: 0.5, ease: EIN });
      }}
    >
      <div className="hs-show-copy">
        <div className="hs-show-names">
          {SHOWS.map(([, , , product, system], i) => (
            <div key={product} className={`hs-show-name n${i}`}>
              <Mask className="hs-meta">{product}</Mask>
              {system.map((line) => (
                <Mask key={line}>{line}</Mask>
              ))}
            </div>
          ))}
        </div>
        <div className="hs-badge">unedited agent output</div>
      </div>
      <div className="hs-win-depth">
        <div className="hs-win">
          <div className="hs-win-bar">
            <b />
            <b />
            <b />
            <span className="hs-win-url">{SHOWS[0][2]}</span>
          </div>
          <div className="hs-win-view">
            {SHOWS.map(([product, system], i) => (
              <div key={product} className={`hs-show s${i}`}>
                <div className="hs-layer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(`${product}-original`)} alt="" />
                </div>
                <Strips src={img(`${product}-${system}`)} cls={`hs-after${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* 6. Kept in the project: the spec lives in design-system/, and a later session builds on it.                       */

const FILES: Array<[string, boolean]> = [
  ["src/", false],
  ["design-system/agent.md", true],
  ["design-system/tokens.css", true],
  ["design-system/VERSION", true],
  ["AGENTS.md", true],
  ["CLAUDE.md", true],
];

export function ProjectScene() {
  return (
    <Scene
      label="The spec kept in the project as design-system/agent.md, with AGENTS.md and CLAUDE.md pointing at it; weeks later a new session with no memory reads it and builds a new screen on the same system"
      build={(tl) => {
        gsap.set(".hs-file", { autoAlpha: 0, x: -16 });
        gsap.set(".hs-pwin", { autoAlpha: 0, rotationY: -20, rotationX: 8, z: -400, y: 80 });
        gsap.set([".hs-reads", ".hs-when"], { autoAlpha: 0, y: 12 });
        tl.to(".hs-file", { autoAlpha: 1, x: 0, duration: 0.5, ease: E, stagger: 0.11 }, 0.1)
          .to(".hs-pwin.day1", { autoAlpha: 1, rotationY: -10, rotationX: 4, z: 0, y: 0, duration: 1.1, ease: E }, 0.6)
          .to(".hs-when.w1", { autoAlpha: 1, y: 0, duration: 0.5, ease: E }, 1.0)
          .to(".hs-pwin.day1 img", { y: -60, duration: 1.6, ease: "sine.inOut" }, 1.2)
          // Weeks later: the first window steps back and a new session's window comes forward.
          .to(".hs-pwin.day1", { z: -260, x: -110, y: -50, opacity: 0.5, duration: 1.0, ease: EIO }, 2.7)
          .to(".hs-when.w1", { autoAlpha: 0, duration: 0.3 }, 2.7)
          .to(".hs-reads", { autoAlpha: 1, y: 0, duration: 0.6, ease: E }, 2.9)
          .to(".hs-pwin.week3", { autoAlpha: 1, rotationY: -8, rotationX: 3, z: 0, y: 0, duration: 1.1, ease: E }, 3.2)
          .to(".hs-when.w3", { autoAlpha: 1, y: 0, duration: 0.5, ease: E }, 3.6)
          .to(".hs-pwin.week3 img", { y: -40, duration: 1.4, ease: "sine.inOut" }, 3.9)
          .to({}, { duration: 1.4 })
          .to([".hs-tree", ".hs-pwins", ".hs-reads"], { autoAlpha: 0, duration: 0.5, ease: EIN });
      }}
    >
      <ul className="hs-tree">
        {FILES.map(([f, isNew]) => (
          <li key={f} className={`hs-file${isNew ? " new" : ""}`}>
            {f}
          </li>
        ))}
      </ul>
      <div className="hs-reads">new session · reads agent.md</div>
      <div className="hs-pwins">
        <div className="hs-pwin day1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/motion/flow-today.webp" alt="" />
          <span className="hs-when w1">Day 1 · set up</span>
        </div>
        <div className="hs-pwin week3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/motion/flow-insights.webp" alt="" />
          <span className="hs-when w3">Week 3 · new screen</span>
        </div>
      </div>
    </Scene>
  );
}
