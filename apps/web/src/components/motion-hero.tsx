"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";

/** The examples in the films: unedited showcase and flow captures (public/motion). */
const SYSTEMS = [
  { id: "margin-notes", name: ["Margin", "Notes"], colors: ["#faf9f6", "#0e0e0c", "#1849f2", "#1e2a6b"] },
  { id: "inkleaf", name: ["Inkleaf"], colors: ["#faf9f5", "#141413", "#cfe0d2", "#f1d6c8"] },
  { id: "graphite-blueprint", name: ["Graphite", "Blueprint"], colors: ["#08090a", "#282a30", "#5e6ad2", "#8a8f98"] },
  { id: "morning-shapes", name: ["Morning", "Shapes"], colors: ["#ffce00", "#0061ef", "#ff7300", "#2d2c2b"] },
];
const MORNING = { yellow: "#ffce00", blue: "#0061ef", orange: "#ff7300", green: "#02873e", ink: "#2d2c2b", cream: "#f9f4f2", violet: "#5432a5" };
const STRIPS = 8;
const img = (id: string) => `/motion/${id}.webp`;
const E = "expo.out";
const EIO = "expo.inOut";
const words = (sel: string) => `${sel} .mh-mask > span`;

function Mask({ words: w }: { words: string[] }) {
  return (
    <span className="mh-mask">
      {w.map((x, i) => (
        <span key={i}>{x}</span>
      ))}
    </span>
  );
}

/** A screen image that is written in column by column (see `writeIn`). */
function Strips({ id, cls }: { id: string; cls: string }) {
  return (
    <div className={`mh-layer ${cls}`}>
      {Array.from({ length: STRIPS }, (_, k) => {
        // Each strip reaches a little past its right edge so neighbours overlap and no hairline shows.
        const l = (k / STRIPS) * 100, r = Math.max(0, 100 - ((k + 1) / STRIPS) * 100 - 0.3);
        return (
          <div key={k} className="mh-strip" data-shut={`inset(0% ${r}% 100% ${l}%)`} data-open={`inset(0% ${r}% 0% ${l}%)`} style={{ clipPath: `inset(0% ${r}% 100% ${l}%)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(id)} alt="" />
          </div>
        );
      })}
    </div>
  );
}

function writeIn(tl: gsap.core.Timeline, cls: string, t: number) {
  tl.fromTo(`.${cls} img`, { scale: 1.08, y: -40, filter: "blur(8px)", transformOrigin: "50% 0%" }, { scale: 1, filter: "blur(0px)", duration: 1.0, ease: E }, t + 0.1);
  gsap.utils.toArray<HTMLElement>(`.${cls} .mh-strip`).forEach((s, k) => {
    tl.fromTo(s, { clipPath: s.dataset.shut }, { clipPath: s.dataset.open, duration: 0.75, ease: EIO }, t + k * 0.045);
  });
}

function Window({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="mh-depth">
      <div className="mh-window">
        <div className="mh-chrome">
          <b />
          <b />
          <b />
          <span>{url}</span>
        </div>
        <div className="mh-view">{children}</div>
      </div>
    </div>
  );
}

/**
 * Runs one film: the stage is drawn at 1920×1080 and scaled to its box, the timeline plays while the box is on
 * screen, and with reduced motion it rests on its last frame. `build` adds the film's tweens.
 */
function useFilm(build: (tl: gsap.core.Timeline) => void, onDone?: () => void) {
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    const el = box.current!;
    const st = stage.current!;
    const fit = () => st.style.setProperty("--mh-scale", String(el.clientWidth / 1920));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, onComplete: () => done.current?.() });
      build(tl);
      tl.to({}, { duration: 1.4 });
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
    // The film is built once per mount; the wrapper remounts it to replay.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { box, stage };
}

function Stage({ film, label, children }: { film: ReturnType<typeof useFilm>; label: string; children: ReactNode }) {
  return (
    <div className="motion-hero" ref={film.box} role="img" aria-label={label}>
      <div className="mh-stage" ref={film.stage} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* Film 1 — starting a project: the system arrives before the first screen.                                          */

const FILES: Array<[string, boolean]> = [
  ["src/", false],
  ["package.json", false],
  ["design-system/agent.md", true],
  ["design-system/tokens.css", true],
  ["design-system/components.md", true],
  ["design-system/VERSION", true],
  ["AGENTS.md", true],
  ["CLAUDE.md", true],
];

function StartFilm({ onDone }: { onDone?: () => void }) {
  const film = useFilm((tl) => {
    gsap.set(words(".mh-intro"), { yPercent: 110, filter: "blur(10px)" });
    gsap.set([".mh-window", ".mh-ask", ".mh-panel"], { autoAlpha: 0 });
    gsap.set(".mh-window", { rotationY: -28, rotationX: 14, z: -500, y: 120 });
    gsap.set(".mh-file.new", { autoAlpha: 0, x: -20 });
    gsap.set([".mh-swatch", ".mh-kit > *"], { autoAlpha: 0, y: 24 });
    gsap.set(words(".mh-names"), { yPercent: 110 });
    tl.to(words(".mh-intro"), { yPercent: 0, filter: "blur(0px)", duration: 1.0, ease: E, stagger: 0.07 }, 0.15)
      .to(words(".mh-intro"), { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.04 }, 1.9)
      .to(".mh-window", { autoAlpha: 1, rotationY: -12, rotationX: 5, z: 0, y: 0, duration: 1.4, ease: E }, 2.2)
      .to(".mh-window", { rotationY: -3, rotationX: 1, duration: 8, ease: "sine.inOut" }, 3.4)
      .to(".mh-panel", { autoAlpha: 1, duration: 0.01 }, 2.4)
      .to(words(".mh-s0"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, 2.45)
      .fromTo(".mh-ask", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: E }, 2.9)
      .to(".mh-file.new", { autoAlpha: 1, x: 0, duration: 0.5, ease: E, stagger: 0.14 }, 3.7);
    // The foundation: tokens, then the components made from them.
    tl.to(words(".mh-s0"), { yPercent: -110, duration: 0.45, ease: "expo.in" }, 5.0)
      .to(words(".mh-s1"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, 5.35)
      .to(".mh-swatch", { autoAlpha: 1, y: 0, duration: 0.6, ease: E, stagger: 0.05 }, 5.3)
      .to(".mh-kit > *", { autoAlpha: 1, y: 0, duration: 0.7, ease: E, stagger: 0.09 }, 5.9);
    // Then the first screen, written from them.
    tl.to(words(".mh-s1"), { yPercent: -110, duration: 0.45, ease: "expo.in" }, 7.9)
      .to(words(".mh-s2"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, 8.25)
      .to(".mh-ask", { autoAlpha: 0, y: 20, duration: 0.4, ease: "expo.in" }, 7.9);
    writeIn(tl, "mh-first", 8.2);
    tl.to(".mh-first img", { y: -90, duration: 2.2, ease: "sine.inOut" }, 9.3);
  }, onDone);

  return (
    <Stage film={film} label="Starting a project: the agent sets the design system up — spec, tokens and components — before it builds the first screen">
      <div className="mh-intro">
        <Mask words={["Starting", "a", "project?"]} />
        <span className="mh-muted">
          <Mask words={["Begin", "with", "its", "system."]} />
        </span>
      </div>
      <div className="mh-panel">
        <div className="mh-idx">NEW PROJECT</div>
        <div className="mh-names">
          <div className="mh-name mh-s0">
            <Mask words={["The", "spec,"]} />
            <Mask words={["kept"]} />
          </div>
          <div className="mh-name mh-s1">
            <Mask words={["Tokens,"]} />
            <Mask words={["components"]} />
          </div>
          <div className="mh-name mh-s2">
            <Mask words={["First"]} />
            <Mask words={["screen"]} />
          </div>
        </div>
        <p className="mh-caption">Set up before any screen exists. Every later session builds from it.</p>
      </div>
      <Window url="my-new-app">
        <div className="mh-project">
          <ul className="mh-tree">
            {FILES.map(([f, isNew]) => (
              <li key={f} className={`mh-file${isNew ? " new" : ""}`}>
                {f}
              </li>
            ))}
          </ul>
          <div className="mh-canvas">
            <div className="mh-swatches">
              {Object.values(MORNING).map((c) => (
                <i key={c} className="mh-swatch" style={{ background: c }} />
              ))}
            </div>
            <div className="mh-kit">
              <div className="mh-type">Aa Figtree</div>
              <div className="mh-row">
                <span className="mh-pill" style={{ background: MORNING.ink, color: "#fff" }}>Save</span>
                <span className="mh-pill" style={{ background: MORNING.blue, color: "#fff" }}>Start free</span>
                <span className="mh-pill" style={{ background: MORNING.cream }}>Cancel</span>
              </div>
              <div className="mh-row">
                <span className="mh-tab on">● Today</span>
                <span className="mh-tab">Week</span>
                <span className="mh-tab">Month</span>
              </div>
              <div className="mh-row">
                <span className="mh-tile" style={{ background: MORNING.yellow }}>
                  <small>Check-ins</small>
                  <b>17</b>
                </span>
                <span className="mh-tile" style={{ background: MORNING.green, color: "#fff" }}>
                  <small>Streak</small>
                  <b>18</b>
                </span>
                <span className="mh-tile" style={{ background: MORNING.orange }}>
                  <small>Goals</small>
                  <b>3</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Strips id="flow-today" cls="mh-first" />
      </Window>
      <div className="mh-ask">“Set up the Pigment design system morning-shapes in this project.”</div>
    </Stage>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* Film 2 — a product that already works: one site rewritten by several systems.                                     */

function RestyleFilm({ onDone }: { onDone?: () => void }) {
  const film = useFilm((tl) => {
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
      tl.fromTo(`.mh-b${i} i`, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.7, ease: E, stagger: 0.05 }, t + 0.45);
      writeIn(tl, `mh-layer${i}`, t + 0.15);
      tl.to(`.mh-layer${i} img`, { y: -170, duration: 1.6, ease: "sine.inOut" }, t + 0.9);
      prev = `.mh-n${i}`;
    });

    const f = 3.9 + SYSTEMS.length * 2.0;
    tl.to(".mh-panel", { autoAlpha: 0, x: -40, duration: 0.5, ease: "expo.in" }, f - 0.1)
      .to(".mh-window", { z: -900, rotationY: 20, autoAlpha: 0, duration: 0.8, ease: "expo.in" }, f - 0.1)
      .to(".mh-card", { autoAlpha: 1, y: 0, rotationY: 0, z: 0, duration: 1.1, ease: E, stagger: 0.08 }, f + 0.45)
      .to(words(".mh-outro"), { yPercent: 0, duration: 0.9, ease: E, stagger: 0.05 }, f + 0.6)
      .to(".mh-url", { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, f + 1.2);
  }, onDone);

  return (
    <Stage film={film} label="A product that already works: one coffee shop site rewritten in turn by four Pigment design systems, then the four results side by side">
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
      <Window url="kilnstreet.coffee">
        <div className="mh-layer mh-layer-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img("original")} alt="" />
        </div>
        {SYSTEMS.map((s, i) => (
          <Strips key={s.id} id={s.id} cls={`mh-layer${i}`} />
        ))}
      </Window>
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
    </Stage>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */
/* Film 3 — every screen after: a fresh session builds from what the project kept.                                   */

/** The screens a later session built (unedited flow captures). */
const NEW_SCREENS = ["flow-goal-detail", "flow-insights", "flow-habits"];

function OngoingFilm({ onDone }: { onDone?: () => void }) {
  const film = useFilm((tl) => {
    gsap.set(words(".mh-intro"), { yPercent: 110, filter: "blur(10px)" });
    gsap.set([".mh-window", ".mh-panel", ".mh-ask", ".mh-reads"], { autoAlpha: 0 });
    gsap.set(".mh-window", { rotationY: -28, rotationX: 14, z: -500, y: 120 });
    gsap.set(words(".mh-names"), { yPercent: 110 });
    tl.to(words(".mh-intro"), { yPercent: 0, filter: "blur(0px)", duration: 1.0, ease: E, stagger: 0.07 }, 0.15)
      .to(words(".mh-intro"), { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.04 }, 1.9)
      .to(".mh-window", { autoAlpha: 1, rotationY: -12, rotationX: 5, z: 0, y: 0, duration: 1.4, ease: E }, 2.2)
      .to(".mh-window", { rotationY: -3, rotationX: 1, duration: 7, ease: "sine.inOut" }, 3.4)
      .to(".mh-panel", { autoAlpha: 1, duration: 0.01 }, 2.4)
      .to(words(".mh-o0"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, 2.45)
      .to(".mh-today img", { y: -120, duration: 2.0, ease: "sine.inOut" }, 2.8);
    // A new session, no memory, asks for a screen; it reads the kept spec and builds on it.
    tl.to(words(".mh-o0"), { yPercent: -110, duration: 0.45, ease: "expo.in" }, 4.4)
      .to(words(".mh-o1"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, 4.75)
      .set(".mh-idx", { textContent: "NEW SESSION · NO MEMORY" }, 4.75)
      .fromTo(".mh-ask", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: E }, 4.8)
      .fromTo(".mh-reads", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: E }, 5.3)
      .to([".mh-reads", ".mh-ask"], { autoAlpha: 0, duration: 0.4, ease: "expo.in" }, 6.6);
    // Three screens, written one after another.
    NEW_SCREENS.forEach((_, k) => {
      const t = 5.9 + k * 1.6;
      writeIn(tl, `mh-new${k}`, t);
      tl.to(`.mh-new${k} img`, { y: -110, duration: 1.1, ease: "sine.inOut" }, t + 0.8);
    });
    tl.to(words(".mh-o1"), { yPercent: -110, duration: 0.45, ease: "expo.in" }, 9.6)
      .to(words(".mh-o2"), { yPercent: 0, duration: 0.8, ease: E, stagger: 0.06 }, 9.95)
      .set(".mh-idx", { textContent: "SAME SYSTEM" }, 9.95);
  }, onDone);

  return (
    <Stage film={film} label="Every screen after: weeks later a new agent session with no memory reads the design system kept in the project and builds three new screens on it">
      <div className="mh-intro">
        <Mask words={["Weeks", "later,"]} />
        <span className="mh-muted">
          <Mask words={["any", "session", "follows", "it."]} />
        </span>
      </div>
      <div className="mh-panel">
        <div className="mh-idx">YOUR PRODUCT</div>
        <div className="mh-names">
          <div className="mh-name mh-o0">
            <Mask words={["Built", "on"]} />
            <Mask words={["the", "system"]} />
          </div>
          <div className="mh-name mh-o1">
            <Mask words={["Asks", "for"]} />
            <Mask words={["new", "screens"]} />
          </div>
          <div className="mh-name mh-o2">
            <Mask words={["Still", "on"]} />
            <Mask words={["the", "system"]} />
          </div>
        </div>
        <p className="mh-caption">Every session reads design-system/agent.md from your project. Built by a coding agent, unedited.</p>
      </div>
      <Window url="team-habits.app">
        <div className="mh-layer mh-today">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img("flow-today")} alt="" />
        </div>
        {NEW_SCREENS.map((id, k) => (
          <Strips key={id} id={id} cls={`mh-new${k}`} />
        ))}
      </Window>
      <div className="mh-ask">“Add a goal page, team insights and a list of every habit.”</div>
      <div className="mh-reads">reads design-system/agent.md</div>
    </Stage>
  );
}

/* ---------------------------------------------------------------------------------------------------------------- */

const FILMS = [
  ["start", "Start a project", StartFilm],
  ["restyle", "Restyle a product", RestyleFilm],
  ["ongoing", "Keep building", OngoingFilm],
] as const;

/** The home page's three short films, one per way to use a system; each plays in turn and the tabs pick one. */
export function MotionHero() {
  const [i, setI] = useState(0);
  const [round, setRound] = useState(0);
  const next = () => {
    setI((v) => (v + 1) % FILMS.length);
    setRound((r) => r + 1);
  };
  const Film = FILMS[i]![2];
  return (
    <div className="mh-films">
      <div role="tablist" aria-label="Ways to use a system" className="mh-tabs">
        {FILMS.map(([key, label], k) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={k === i}
            onClick={() => {
              setI(k);
              setRound((r) => r + 1);
            }}
          >
            <span className="mono">0{k + 1}</span> {label}
          </button>
        ))}
      </div>
      <Film key={`${i}-${round}`} onDone={next} />
    </div>
  );
}
