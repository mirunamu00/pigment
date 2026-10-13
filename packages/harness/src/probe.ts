import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Page } from "playwright";
import { shimNames } from "./extract.ts";

/**
 * The deep capture of one page, with motion allowed: what moves and how (keyframes, timing, frame
 * sequences), how elements respond (hover, focus, press, open), the illustrations and icons, the theme
 * mechanism and the section structure. The static capture (screenshots, measured styles) runs separately
 * with reduced motion so its screenshots are stable.
 *
 * Functions passed to page.evaluate run in the browser and must stay self-contained; the helpers they
 * share are installed on window.__pg by installHelpers.
 */

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MotionItem {
  id: string;
  kind: "css-animation" | "css-transition" | "web-animation";
  name: string;
  target: string;
  inSvg: boolean;
  box: Box | null;
  durationMs: number;
  delayMs: number;
  iterations: number | "infinite";
  direction: string;
  easing: string;
  keyframes: Array<Record<string, unknown>>;
}

export interface MotionReport {
  animations: MotionItem[];
  keyframeRules: Array<{ name: string; css: string; used: boolean }>;
  reducedMotionRules: string[];
  smil: Array<{ tag: string; attributeName: string; values: string; dur: string; repeatCount: string; target: string }>;
  lottie: string[];
  videos: Array<{ src: string; autoplay: boolean; loop: boolean; muted: boolean; box: Box }>;
  canvases: Box[];
  reveals: Array<{ target: string; before: Record<string, string>; after: Record<string, string>; transition: string }>;
  inaccessibleStylesheets: number;
  frames: Array<{ file: string; target: string; name: string; durationMs: number; iterations: number | "infinite"; spanMs: number }>;
  /**
   * Motion the browser's animation list can't see — script-driven SVG (Lottie), canvas, animated images —
   * found by watching the pixels: frame sequences of every element that changed while in view.
   */
  visual: Array<{ kind: "lottie" | "canvas" | "svg" | "image"; target: string; box: Box; file: string }>;
  /** Lottie animation files the page loaded, summarized: timing, size, stroke widths/colors/caps, trim paths (draw-on). */
  lottieFiles: LottieSummary[];
}

export interface LottieSummary {
  url: string;
  raw: string | null;
  fps: number;
  frames: number;
  durationMs: number;
  size: string;
  layers: number;
  /** Trim paths animate a stroke's visible length: the "draws itself" effect. */
  trimPaths: boolean;
  strokeWidths: Record<string, number>;
  strokeColors: Record<string, number>;
  fillColors: Record<string, number>;
  lineCaps: Record<string, number>;
  animatedStrokeWidth: boolean;
  /** How lines are drawn: real strokes, or hand-drawn lines exported as filled outlines (uneven weight). */
  drawing: "strokes" | "filled outlines" | "mixed" | "none";
  shapeLayers: number;
  /** Share of shape layers shown for two frames or less: redrawn frame by frame, like cel animation. */
  frameByFrame: number;
}

/** Reads a Lottie (bodymovin) JSON: what is drawn and how. */
export function summarizeLottie(url: string, data: unknown, raw: string | null): LottieSummary | null {
  const d = data as { v?: string; fr?: number; ip?: number; op?: number; w?: number; h?: number; layers?: unknown[] };
  if (!d || typeof d !== "object" || !Array.isArray(d.layers) || typeof d.fr !== "number" || typeof d.op !== "number") return null;
  const out: LottieSummary = {
    url,
    raw,
    fps: d.fr,
    frames: Math.round(d.op - (d.ip ?? 0)),
    durationMs: Math.round(((d.op - (d.ip ?? 0)) / d.fr) * 1000),
    size: `${d.w ?? "?"}×${d.h ?? "?"}`,
    layers: d.layers.length,
    trimPaths: false,
    strokeWidths: {},
    strokeColors: {},
    fillColors: {},
    lineCaps: {},
    animatedStrokeWidth: false,
    drawing: "none",
    shapeLayers: 0,
    frameByFrame: 0,
  };
  let shortLayers = 0;
  const bump = (m: Record<string, number>, k: string) => (m[k] = (m[k] ?? 0) + 1);
  const color = (k: unknown): string | null => {
    const v = Array.isArray(k) && typeof k[0] === "number" ? (k as number[]) : Array.isArray(k) && (k[0] as { s?: number[] })?.s ? (k[0] as { s: number[] }).s : null;
    if (!v) return null;
    const [r, g, b] = v.map((x) => Math.round(Math.min(1, Math.max(0, x)) * 255));
    return `rgb(${r}, ${g}, ${b})`;
  };
  const caps = ["", "butt", "round", "square"];
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    const n = node as Record<string, unknown>;
    if (n.ty === "tm") out.trimPaths = true;
    if (n.ty === 4 && typeof n.ip === "number" && typeof n.op === "number") {
      out.shapeLayers++;
      if (n.op - n.ip <= 2) shortLayers++;
    }
    if (n.ty === "st") {
      const w = (n.w as { k?: unknown; a?: number } | undefined) ?? {};
      if (typeof w.k === "number") bump(out.strokeWidths, `${Math.round(w.k * 100) / 100}`);
      else if (Array.isArray(w.k)) out.animatedStrokeWidth = true;
      const c = color((n.c as { k?: unknown } | undefined)?.k);
      if (c) bump(out.strokeColors, c);
      if (typeof n.lc === "number") bump(out.lineCaps, caps[n.lc] ?? String(n.lc));
    }
    if (n.ty === "fl") {
      const c = color((n.c as { k?: unknown } | undefined)?.k);
      if (c) bump(out.fillColors, c);
    }
    for (const v of Object.values(n)) if (v && typeof v === "object") walk(v);
  };
  walk(d.layers);
  walk((d as { assets?: unknown }).assets);
  const strokes = Object.keys(out.strokeWidths).length > 0 || out.animatedStrokeWidth;
  const fills = Object.keys(out.fillColors).length > 0;
  out.drawing = strokes && fills ? "mixed" : strokes ? "strokes" : fills ? "filled outlines" : "none";
  out.frameByFrame = out.shapeLayers ? Math.round((shortLayers / out.shapeLayers) * 100) / 100 : 0;
  return out;
}

/** Collects the Lottie files a page loads. Attach before navigating; call the result to read them. */
export function watchLottie(page: Page, rawDir: string, key: string): () => Promise<LottieSummary[]> {
  const found: LottieSummary[] = [];
  const pending: Array<Promise<void>> = [];
  page.on("response", (res) => {
    const url = res.url();
    const type = res.headers()["content-type"] ?? "";
    if (!/json/.test(type) && !/\.json(\?|$)/.test(url)) return;
    pending.push(
      (async () => {
        try {
          const text = await res.text();
          if (text.length > 8_000_000 || !text.includes('"layers"') || found.some((x) => x.url === url)) return;
          const file = join(rawDir, "lottie", `${key}-l${found.length + 1}.json`);
          const summary = summarizeLottie(url, JSON.parse(text), file);
          if (!summary) return;
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, text);
          found.push(summary);
        } catch {
          // a body that can't be read or parsed isn't evidence
        }
      })(),
    );
  });
  return async () => {
    await Promise.allSettled(pending);
    return found;
  };
}

export interface InteractionRecord {
  kind: string;
  target: string;
  base: Record<string, string>;
  hover?: Record<string, [string, string]>;
  focus?: Record<string, [string, string]> | "not focusable";
  press?: Record<string, [string, string]>;
  open?: { animations: Array<{ name: string; durationMs: number; easing: string; props: string[] }>; navigated: boolean };
  file: string | null;
  /** A step that could not run here (hidden, covered, detached): a gap in the evidence. */
  gap?: string;
}

export interface Inventory {
  svgs: Array<{
    id: string;
    role: "icon" | "graphic" | "illustration";
    box: Box;
    shapes: number;
    strokes: Record<string, number>;
    strokeWidths: Record<string, number>;
    fills: Record<string, number>;
    linecaps: string[];
    animated: boolean;
    interactive: boolean;
    file?: string;
    raw?: string;
  }>;
  images: Array<{ kind: "img" | "video"; ext: string; box: Box; objectFit: string; radius: string }>;
  typography: Record<string, Array<{ style: string; count: number }>>;
  buttons: Array<{ style: string; count: number; example: string }>;
  files: { icons: string | null; buttons: string | null };
}

export interface ThemeInfo {
  rootClasses: string[];
  rootAttributes: Record<string, string>;
  colorScheme: string;
  themeSelectors: Array<{ selector: string; variables: number }>;
  prefersDarkRules: number;
  toggles: Array<{ id: string; label: string }>;
  toggled?: { changed: boolean; screenshot: string | null; bodyBefore: string; bodyAfter: string };
}

export interface Structure {
  header: { position: string; height: number; background: string; backdropFilter: string; borderBottom: string; afterScroll?: Record<string, string> } | null;
  sections: Array<{ top: number; height: number; background: string; fullBleed: boolean; contentWidth: number; columns: number; heading: string; media: string[]; paddingY: string; textAlign: string }>;
  footer: { background: string; columns: number; height: number } | null;
  maxContentWidth: number;
}

export interface DeepCapture {
  url: string;
  motion: MotionReport;
  interactions: InteractionRecord[];
  inventory: Inventory;
  theme: ThemeInfo;
  structure: Structure;
}

// ---------------------------------------------------------------------------------------------------
// In-page functions
// ---------------------------------------------------------------------------------------------------

function installHelpers(): void {
  const w = window as unknown as { __pg?: unknown; __pgSeq?: number };
  if (w.__pg) return;
  w.__pgSeq = 0;
  const describe = (el: Element) => {
    const cls = (el.getAttribute("class") ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((c) => `.${c.slice(0, 32)}`)
      .join("");
    const role = el.getAttribute("role");
    return `${el.tagName.toLowerCase()}${el.id ? `#${el.id.slice(0, 32)}` : ""}${cls}${role ? `[role=${role}]` : ""}`;
  };
  const path = (el: Element) => {
    const parts: string[] = [];
    let e: Element | null = el;
    while (e && e !== document.body && parts.length < 4) {
      parts.unshift(describe(e));
      e = e.parentElement;
    }
    return parts.join(" > ");
  };
  const box = (el: Element) => {
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left + scrollX), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const visible = (el: Element) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden" && Number(cs.opacity) > 0.01;
  };
  const mark = (el: Element, attr: string) => {
    let v = el.getAttribute(attr);
    if (!v) {
      v = String(++w.__pgSeq!);
      el.setAttribute(attr, v);
    }
    return v;
  };
  w.__pg = { describe, path, box, visible, mark };
}

type Pg = {
  describe: (el: Element) => string;
  path: (el: Element) => string;
  box: (el: Element) => Box;
  visible: (el: Element) => boolean;
  mark: (el: Element, attr: string) => string;
};

/** Animations running now; their targets are marked data-pg-a so frames can be captured later. */
function collectRunning(): MotionItem[] {
  const pg = (window as unknown as { __pg: Pg }).__pg;
  const out: MotionItem[] = [];
  for (const a of document.getAnimations()) {
    const effect = a.effect as KeyframeEffect | null;
    const target = (effect?.target ?? null) as Element | null;
    if (!effect || !target) continue;
    const timing = effect.getTiming();
    let frames: Array<Record<string, unknown>> = [];
    try {
      frames = effect
        .getKeyframes()
        .slice(0, 8)
        .map((k) => {
          const o: Record<string, unknown> = {};
          for (const [key, v] of Object.entries(k)) if (key !== "composite" && key !== "computedOffset") o[key] = typeof v === "string" ? v.slice(0, 160) : v;
          return o;
        });
    } catch {
      // detached
    }
    const ctor = a.constructor.name;
    const kind = ctor === "CSSAnimation" ? "css-animation" : ctor === "CSSTransition" ? "css-transition" : "web-animation";
    const named = a as unknown as { animationName?: string; transitionProperty?: string };
    out.push({
      id: pg.mark(target, "data-pg-a"),
      kind,
      name: named.animationName ?? named.transitionProperty ?? a.id ?? "",
      target: pg.path(target),
      inSvg: !!target.closest("svg"),
      box: pg.box(target),
      durationMs: Number(timing.duration) || 0,
      delayMs: Number(timing.delay) || 0,
      iterations: timing.iterations === Infinity ? "infinite" : (timing.iterations ?? 1),
      direction: timing.direction ?? "normal",
      easing: kind === "css-animation" ? getComputedStyle(target).animationTimingFunction : (timing.easing ?? "linear"),
      keyframes: frames,
    });
  }
  return out;
}

/** Elements below the fold, with their style before they are scrolled into view. */
function markReveal(): void {
  const w = window as unknown as { __pgReveal: Array<{ el: Element; before: Record<string, string> }> };
  const pick = (el: Element) => {
    const cs = getComputedStyle(el);
    return { opacity: cs.opacity, transform: cs.transform, translate: cs.translate, filter: cs.filter, clipPath: cs.clipPath, visibility: cs.visibility };
  };
  w.__pgReveal = Array.from(document.querySelectorAll("main *, section, article, body > div > *"))
    .filter((el) => el.getBoundingClientRect().top > innerHeight && el.getBoundingClientRect().height > 8)
    .slice(0, 1500)
    .map((el) => ({ el, before: pick(el) }));
}

function readReveal(): MotionReport["reveals"] {
  const w = window as unknown as { __pg: Pg; __pgReveal?: Array<{ el: Element; before: Record<string, string> }> };
  const out: MotionReport["reveals"] = [];
  const changedAncestors = new Set<Element>();
  for (const { el, before } of w.__pgReveal ?? []) {
    const cs = getComputedStyle(el);
    const after: Record<string, string> = { opacity: cs.opacity, transform: cs.transform, translate: cs.translate, filter: cs.filter, clipPath: cs.clipPath, visibility: cs.visibility };
    const changed = Object.keys(before).filter((k) => before[k] !== after[k]);
    if (!changed.length) continue;
    // Keep the outermost element of a revealed group.
    let p = el.parentElement;
    let nested = false;
    while (p) {
      if (changedAncestors.has(p)) nested = true;
      p = p.parentElement;
    }
    changedAncestors.add(el);
    if (nested || out.length >= 40) continue;
    out.push({
      target: w.__pg.path(el),
      before: Object.fromEntries(changed.map((k) => [k, before[k]!])),
      after: Object.fromEntries(changed.map((k) => [k, after[k]!])),
      transition: `${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction} ${cs.transitionDelay}`,
    });
  }
  return out;
}

function motionStatics(usedNames: string[]): Omit<MotionReport, "animations" | "reveals" | "frames" | "visual" | "lottieFiles"> {
  const pg = (window as unknown as { __pg: Pg }).__pg;
  const keyframeRules: MotionReport["keyframeRules"] = [];
  const reducedMotionRules: string[] = [];
  let inaccessible = 0;
  const walk = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSKeyframesRule) keyframeRules.push({ name: rule.name, css: rule.cssText.slice(0, 900), used: usedNames.includes(rule.name) });
      else if (rule instanceof CSSMediaRule) {
        if (/prefers-reduced-motion/.test(rule.conditionText)) reducedMotionRules.push(rule.cssText.slice(0, 400));
        walk(rule.cssRules);
      } else if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules) walk((rule as CSSGroupingRule).cssRules);
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walk(sheet.cssRules);
    } catch {
      inaccessible++;
    }
  }
  keyframeRules.sort((a, b) => Number(b.used) - Number(a.used));
  const smil = Array.from(document.querySelectorAll("animate, animateTransform, animateMotion, set"))
    .slice(0, 60)
    .map((el) => ({
      tag: el.tagName,
      attributeName: el.getAttribute("attributeName") ?? el.getAttribute("type") ?? "",
      values: (el.getAttribute("values") ?? `${el.getAttribute("from") ?? ""} → ${el.getAttribute("to") ?? ""}`).slice(0, 200),
      dur: el.getAttribute("dur") ?? "",
      repeatCount: el.getAttribute("repeatCount") ?? "",
      target: el.parentElement ? pg.path(el.parentElement) : "",
    }));
  const lottie = Array.from(document.querySelectorAll("lottie-player, dotlottie-player, dotlottie-wc, [class*=lottie i], svg:has([id^=__lottie])"))
    .slice(0, 20)
    .map((el) => `${pg.path(el)} ${el.getAttribute("src") ?? ""}`.trim());
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video"))
    .filter((v) => pg.visible(v))
    .slice(0, 20)
    .map((v) => ({ src: (v.currentSrc || v.src || "").slice(0, 200), autoplay: v.autoplay, loop: v.loop, muted: v.muted, box: pg.box(v) }));
  const canvases = Array.from(document.querySelectorAll("canvas"))
    .filter((c) => c.getBoundingClientRect().width > 64)
    .map((c) => pg.box(c));
  return { keyframeRules: keyframeRules.slice(0, 80), reducedMotionRules: reducedMotionRules.slice(0, 20), smil, lottie, videos, canvases, inaccessibleStylesheets: inaccessible };
}

function interactionCandidates(): Array<{ id: string; kind: string; target: string }> {
  const pg = (window as unknown as { __pg: Pg }).__pg;
  const q = (s: string) => Array.from(document.querySelectorAll(s));
  const out: Array<{ id: string; kind: string; target: string }> = [];
  const signature = (el: Element) => {
    const cs = getComputedStyle(el);
    return [cs.backgroundColor, cs.color, cs.borderTopWidth, cs.borderTopColor, cs.borderTopLeftRadius, cs.paddingTop, cs.paddingLeft, cs.fontSize, cs.fontWeight].join("|");
  };
  const add = (kind: string, els: Element[], max: number) => {
    const seen = new Set<string>();
    for (const el of els) {
      if (out.filter((o) => o.kind === kind).length >= max) break;
      if (!pg.visible(el) || el.closest("[data-pg-i]")) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 16 || r.height < 12 || r.width > innerWidth + 1 || r.height > 900) continue;
      const sig = signature(el);
      if (seen.has(sig)) continue;
      seen.add(sig);
      out.push({ id: pg.mark(el, "data-pg-i"), kind, target: pg.path(el) });
    }
  };
  add("disclosure", q("details > summary, [aria-expanded=false]").filter((e) => !e.closest("header, nav")), 3);
  add("tab", q("[role=tab][aria-selected=false]"), 2);
  add("button", q("button, [role=button], a[class*=btn i], a[class*=button i], input[type=submit]"), 6);
  add("nav-link", q("header a, nav a"), 2);
  add("text-link", q("main p a, article p a, p a"), 2);
  add(
    "card",
    q("a")
      .filter((a) => {
        const r = a.getBoundingClientRect();
        return r.width >= 160 && r.height >= 120 && !!a.querySelector("img, svg, h2, h3, h4");
      })
      .concat(q("[class*=card i]")),
    3,
  );
  add("input", q("input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, select"), 2);
  return out;
}

function readStyles(id: string): Record<string, string> | null {
  const el = document.querySelector(`[data-pg-i="${id}"]`);
  if (!el) return null;
  const props = [
    "color", "backgroundColor", "backgroundImage", "borderTopColor", "borderTopWidth", "borderTopStyle", "borderTopLeftRadius", "boxShadow",
    "outlineColor", "outlineStyle", "outlineWidth", "outlineOffset", "transform", "translate", "scale", "rotate", "opacity", "filter",
    "textDecorationLine", "textDecorationColor", "textDecorationThickness", "textUnderlineOffset", "letterSpacing", "fontWeight", "cursor",
    "transitionProperty", "transitionDuration", "transitionTimingFunction",
  ] as const;
  const out: Record<string, string> = {};
  const cs = getComputedStyle(el);
  for (const p of props) out[p] = String(cs[p as keyof CSSStyleDeclaration] ?? "");
  for (const pseudo of ["::before", "::after"] as const) {
    const ps = getComputedStyle(el, pseudo);
    if (ps.content && ps.content !== "none" && ps.content !== "normal") {
      for (const p of ["backgroundColor", "transform", "width", "height", "opacity", "borderBottomWidth"] as const) out[`${pseudo}.${p}`] = String(ps[p]);
    }
  }
  const icon = el.querySelector("svg, img, [class*=icon i]");
  if (icon) {
    const is = getComputedStyle(icon);
    for (const p of ["transform", "translate", "rotate", "color", "stroke", "opacity"] as const) out[`icon.${p}`] = String(is[p]);
  }
  return out;
}

function inventoryInPage(): Omit<Inventory, "files"> {
  const pg = (window as unknown as { __pg: Pg }).__pg;
  const clear = (c: string) => c === "none" || c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);
  const bump = (m: Record<string, number>, k: string) => (m[k] = (m[k] ?? 0) + 1);
  const svgs = Array.from(document.querySelectorAll<SVGSVGElement>("svg"))
    .filter((s) => !s.parentElement?.closest("svg") && pg.visible(s))
    .map((s) => {
      const b = pg.box(s);
      const size = Math.max(b.w, b.h);
      const shapes = Array.from(s.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect"));
      const strokes: Record<string, number> = {};
      const strokeWidths: Record<string, number> = {};
      const fills: Record<string, number> = {};
      const caps = new Set<string>();
      for (const p of shapes.slice(0, 200)) {
        const cs = getComputedStyle(p);
        if (!clear(cs.stroke) && parseFloat(cs.strokeWidth) > 0) {
          bump(strokes, cs.stroke);
          bump(strokeWidths, cs.strokeWidth);
          caps.add(`${cs.strokeLinecap}/${cs.strokeLinejoin}${cs.vectorEffect === "non-scaling-stroke" ? "/non-scaling" : ""}`);
        }
        if (!clear(cs.fill)) bump(fills, cs.fill);
      }
      return {
        id: pg.mark(s, "data-pg-s"),
        role: (size <= 32 ? "icon" : size >= 96 ? "illustration" : "graphic") as "icon" | "graphic" | "illustration",
        box: b,
        shapes: shapes.length,
        strokes,
        strokeWidths,
        fills,
        linecaps: [...caps],
        animated: s.getAnimations({ subtree: true }).length > 0 || !!s.querySelector("animate, animateTransform, animateMotion"),
        interactive: !!s.closest("a, button"),
      };
    })
    .sort((a, b) => b.box.w * b.box.h - a.box.w * a.box.h);
  const images = [
    ...Array.from(document.querySelectorAll<HTMLImageElement>("img")).map((i) => ({ el: i as Element, kind: "img" as const, src: i.currentSrc || i.src })),
    ...Array.from(document.querySelectorAll<HTMLVideoElement>("video")).map((v) => ({ el: v as Element, kind: "video" as const, src: v.currentSrc || v.src })),
  ]
    .filter(({ el }) => pg.visible(el) && el.getBoundingClientRect().width >= 120)
    .slice(0, 60)
    .map(({ el, kind, src }) => {
      const cs = getComputedStyle(el);
      return { kind, ext: (/\.([a-z0-9]{2,5})(\?|$)/i.exec(src)?.[1] ?? "").toLowerCase(), box: pg.box(el), objectFit: cs.objectFit, radius: cs.borderTopLeftRadius };
    });
  const roles: Record<string, string> = {
    h1: "h1", h2: "h2", h3: "h3", h4: "h4", body: "main p, article p", small: "small, figcaption", label: "label",
    button: "button, a[class*=btn i], a[class*=button i]", "nav link": "header a, nav a", "footer link": "footer a", eyebrow: "[class*=eyebrow i], [class*=kicker i], [class*=overline i]",
  };
  const typography: Inventory["typography"] = {};
  for (const [role, selector] of Object.entries(roles)) {
    const counts: Record<string, number> = {};
    for (const el of Array.from(document.querySelectorAll(selector)).filter((e) => pg.visible(e)).slice(0, 40)) {
      const cs = getComputedStyle(el);
      bump(counts, [cs.fontFamily.split(",")[0]!.trim(), cs.fontSize, cs.fontWeight, cs.lineHeight, cs.letterSpacing, cs.textTransform, cs.fontStyle].join(" / "));
    }
    typography[role] = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([style, count]) => ({ style, count }));
  }
  const buttonCounts = new Map<string, { count: number; example: string }>();
  for (const b of Array.from(document.querySelectorAll("button, [role=button], a[class*=btn i], a[class*=button i], input[type=submit]"))) {
    const r = b.getBoundingClientRect();
    if (!pg.visible(b) || r.width < 24 || r.height < 18 || r.height > 80) continue;
    const cs = getComputedStyle(b);
    const style = [cs.backgroundColor, cs.color, `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, cs.borderTopLeftRadius, `${cs.paddingTop} ${cs.paddingLeft}`, cs.fontSize, cs.fontWeight, `h${Math.round(r.height)}`].join(" / ");
    const entry = buttonCounts.get(style) ?? { count: 0, example: pg.mark(b, "data-pg-b") };
    entry.count++;
    buttonCounts.set(style, entry);
  }
  const buttons = [...buttonCounts.entries()].map(([style, v]) => ({ style, ...v })).sort((a, b) => b.count - a.count).slice(0, 12);
  return { svgs: svgs.slice(0, 120), images, typography, buttons };
}

function themeInPage(): Omit<ThemeInfo, "toggled"> {
  const pg = (window as unknown as { __pg: Pg }).__pg;
  const root = document.documentElement;
  const rootAttributes: Record<string, string> = {};
  for (const el of [root, document.body]) {
    for (const a of Array.from(el.attributes)) if (/theme|mode|scheme|dark|light/i.test(`${a.name}=${a.value}`) && a.name !== "class") rootAttributes[`${el.tagName.toLowerCase()} ${a.name}`] = a.value.slice(0, 60);
  }
  const rootClasses = [...Array.from(root.classList), ...Array.from(document.body.classList)].filter((c) => /theme|mode|dark|light/i.test(c));
  const themeSelectors: ThemeInfo["themeSelectors"] = [];
  let prefersDarkRules = 0;
  const walk = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule && /\[data-(theme|mode|color-scheme)|\.dark\b|\.light\b|\.theme-|:root\.|html\./i.test(rule.selectorText)) {
        let vars = 0;
        for (let i = 0; i < rule.style.length; i++) if (rule.style.item(i).startsWith("--")) vars++;
        if (vars > 0 && themeSelectors.length < 20) themeSelectors.push({ selector: rule.selectorText.slice(0, 120), variables: vars });
      } else if (rule instanceof CSSMediaRule) {
        if (/prefers-color-scheme:\s*dark/.test(rule.conditionText)) prefersDarkRules++;
        walk(rule.cssRules);
      } else if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules) walk((rule as CSSGroupingRule).cssRules);
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walk(sheet.cssRules);
    } catch {
      // cross-origin
    }
  }
  const toggles = Array.from(document.querySelectorAll("button, [role=switch], a"))
    .filter((b) => pg.visible(b) && /theme|dark|light|mode|appearance|다크|라이트|테마/i.test(`${b.getAttribute("aria-label") ?? ""} ${b.getAttribute("title") ?? ""}`))
    .slice(0, 3)
    .map((b) => ({ id: pg.mark(b, "data-pg-t"), label: (b.getAttribute("aria-label") ?? b.getAttribute("title") ?? "").slice(0, 60) }));
  return { rootClasses, rootAttributes, colorScheme: getComputedStyle(root).colorScheme, themeSelectors, prefersDarkRules, toggles };
}

function structureInPage(): Structure {
  const pg = (window as unknown as { __pg: Pg }).__pg;
  const clear = (c: string) => c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);
  const bgOf = (el: Element | null): string => {
    while (el) {
      const c = getComputedStyle(el).backgroundColor;
      if (!clear(c)) return c;
      el = el.parentElement;
    }
    return "transparent";
  };
  const columnsOf = (el: Element) => {
    let best = 1;
    for (const e of [el, ...Array.from(el.querySelectorAll("*")).slice(0, 300)]) {
      const cs = getComputedStyle(e);
      if (cs.display === "grid") best = Math.max(best, cs.gridTemplateColumns.split(" ").filter((t) => t && t !== "none").length);
      else if (cs.display === "flex" && cs.flexDirection.startsWith("row")) {
        const kids = Array.from(e.children).filter((k) => k.getBoundingClientRect().width > 120);
        if (kids.length >= 2 && kids.every((k) => Math.abs(k.getBoundingClientRect().top - kids[0]!.getBoundingClientRect().top) < 4)) best = Math.max(best, kids.length);
      }
    }
    return Math.min(best, 12);
  };
  const header = document.querySelector("header");
  const hs = header ? getComputedStyle(header) : null;
  let root: Element = document.querySelector("main") ?? document.body;
  while (root.children.length === 1) root = root.children[0]!;
  const sections = Array.from(root.children)
    .filter((e) => pg.visible(e) && e.getBoundingClientRect().height > 120 && e.tagName !== "HEADER" && e.tagName !== "FOOTER")
    .slice(0, 40)
    .map((e) => {
      const r = e.getBoundingClientRect();
      const cs = getComputedStyle(e);
      const inner = Array.from(e.querySelectorAll("*")).slice(0, 400).filter((c) => c.getBoundingClientRect().width > 0);
      const contentWidth = Math.round(Math.max(0, ...inner.filter((c) => (c as HTMLElement).innerText?.trim()).map((c) => c.getBoundingClientRect().width).filter((w) => w < innerWidth * 0.98)));
      return {
        top: Math.round(r.top + scrollY),
        height: Math.round(r.height),
        background: bgOf(e),
        fullBleed: r.width >= innerWidth * 0.98,
        contentWidth,
        columns: columnsOf(e),
        heading: e.querySelector("h1, h2, h3")?.tagName.toLowerCase() ?? "",
        media: [...new Set(Array.from(e.querySelectorAll("img, svg, video, canvas")).filter((m) => m.getBoundingClientRect().width > 48).map((m) => m.tagName.toLowerCase()))],
        paddingY: `${cs.paddingTop} ${cs.paddingBottom}`,
        textAlign: cs.textAlign,
      };
    });
  const footer = document.querySelector("footer");
  return {
    header: header && hs ? { position: hs.position, height: Math.round(header.getBoundingClientRect().height), background: bgOf(header), backdropFilter: hs.backdropFilter, borderBottom: `${hs.borderBottomWidth} ${hs.borderBottomColor}` } : null,
    sections,
    footer: footer ? { background: bgOf(footer), columns: columnsOf(footer), height: Math.round(footer.getBoundingClientRect().height) } : null,
    maxContentWidth: Math.max(0, ...sections.map((s) => s.contentWidth)),
  };
}

// ---------------------------------------------------------------------------------------------------
// Node side
// ---------------------------------------------------------------------------------------------------

async function prepare(page: Page): Promise<void> {
  await shimNames(page);
  await page.evaluate(installHelpers);
}

/** A screenshot of one marked element (scrolled to the middle of the viewport), with some margin. */
async function clipShot(page: Page, selector: string, padRatio = 0.08, maxPad = 64): Promise<Buffer | null> {
  const rect = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    el.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height, vw: innerWidth, vh: innerHeight };
  }, selector);
  if (!rect || rect.w < 2 || rect.h < 2) return null;
  const pad = Math.min(maxPad, Math.max(8, Math.max(rect.w, rect.h) * padRatio));
  const x = Math.max(0, rect.x - pad);
  const y = Math.max(0, rect.y - pad);
  const width = Math.min(rect.vw - x, rect.w + pad * 2);
  const height = Math.min(rect.vh - y, rect.h + pad * 2);
  if (width < 4 || height < 4) return null;
  try {
    return await page.screenshot({ clip: { x, y, width, height } });
  } catch {
    return null;
  }
}

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Lays out labeled frames on one image so the analyst can read a sequence at a glance. */
async function contactSheet(page: Page, title: string, frames: Array<{ label: string; png: Buffer }>, file: string): Promise<string | null> {
  if (!frames.length) return null;
  mkdirSync(dirname(file), { recursive: true });
  const sheet = await page.context().newPage();
  try {
    const figures = frames.map((f) => `<figure><img src="data:image/png;base64,${f.png.toString("base64")}"><figcaption>${escapeHtml(f.label)}</figcaption></figure>`).join("");
    await sheet.setContent(
      `<!doctype html><style>body{margin:0;background:#e6e6e6;font:12px ui-monospace,monospace}main{display:inline-flex;flex-wrap:wrap;gap:10px;padding:12px;max-width:1760px}h1{flex-basis:100%;font-size:12px;margin:0}figure{margin:0;background:#fff;padding:6px}img{display:block;max-width:720px;max-height:400px}figcaption{margin-top:4px;color:#333}</style><main><h1>${escapeHtml(title)}</h1>${figures}</main>`,
    );
    await sheet.locator("main").screenshot({ path: file });
    return file;
  } finally {
    await sheet.close();
  }
}

async function scanMotion(page: Page): Promise<{ animations: MotionItem[]; reveals: MotionReport["reveals"] }> {
  await page.evaluate(markReveal);
  const seen = new Map<string, MotionItem>();
  const collect = async () => {
    for (const item of await page.evaluate(collectRunning)) {
      const key = `${item.target}|${item.kind}|${item.name}`;
      if (!seen.has(key)) seen.set(key, item);
    }
  };
  await collect();
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round((page.viewportSize()?.height ?? 900) * 0.7);
  for (let y = step, i = 0; y < height && i < 40; y += step, i++) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(320);
    await collect();
  }
  await page.waitForTimeout(500);
  await collect();
  const reveals = await page.evaluate(readReveal);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  return { animations: [...seen.values()].slice(0, 200), reveals };
}

/** Frame sequences of the most visible animations: restarted, then captured at even intervals. */
async function motionFrames(page: Page, items: MotionItem[], outDir: string, key: string, max = 8): Promise<MotionReport["frames"]> {
  const candidates = [...new Map(items.filter((i) => i.kind !== "css-transition" && i.box && i.box.w * i.box.h >= 400).map((i) => [i.id, i])).values()]
    .sort((a, b) => Number(b.inSvg) - Number(a.inSvg) || Number(b.iterations === "infinite") - Number(a.iterations === "infinite") || b.box!.w * b.box!.h - a.box!.w * a.box!.h)
    .slice(0, max);
  const out: MotionReport["frames"] = [];
  for (const [n, item] of candidates.entries()) {
    const marker = `[data-pg-a="${item.id}"]`;
    const restarted = await page.evaluate((sel) => {
      const t = document.querySelector(sel);
      if (!t) return null;
      const root = (t.closest("svg") ?? t) as Element;
      const host = root.parentElement && root.parentElement.getBoundingClientRect().width < root.getBoundingClientRect().width * 2 ? root.parentElement : root;
      host.setAttribute("data-pg-frame", "1");
      for (const a of root.getAnimations({ subtree: true })) {
        try {
          a.cancel();
          a.play();
        } catch {
          // finished transitions cannot replay
        }
      }
      return true;
    }, marker);
    if (!restarted) continue;
    const span = item.iterations === "infinite" ? Math.min(Math.max(item.durationMs, 800), 4000) : Math.min(Math.max(item.durationMs + item.delayMs, 600), 4000);
    const count = 8;
    const frames: Array<{ label: string; png: Buffer }> = [];
    const start = Date.now();
    for (let f = 0; f < count; f++) {
      const due = start + (span * f) / (count - 1);
      const wait = due - Date.now();
      if (wait > 0) await page.waitForTimeout(wait);
      const png = await clipShot(page, "[data-pg-frame]", 0.25);
      if (png) frames.push({ label: `t=${Date.now() - start}ms`, png });
    }
    await page.evaluate(() => document.querySelector("[data-pg-frame]")?.removeAttribute("data-pg-frame"));
    const file = await contactSheet(
      page,
      `${item.name || item.kind} · ${item.durationMs}ms × ${item.iterations} · ${item.easing} · ${item.target}`,
      frames,
      join(outDir, "motion", `${key}-m${n + 1}.png`),
    );
    if (file) out.push({ file, target: item.target, name: item.name, durationMs: item.durationMs, iterations: item.iterations, spanMs: span });
  }
  return out;
}

function diff(a: Record<string, string>, b: Record<string, string> | null): Record<string, [string, string]> {
  const out: Record<string, [string, string]> = {};
  if (!b) return out;
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (k.startsWith("transition")) continue;
    if ((a[k] ?? "") !== (b[k] ?? "")) out[k] = [a[k] ?? "", b[k] ?? ""];
  }
  return out;
}

function transitionWait(styles: Record<string, string>): number {
  const longest = Math.max(0, ...(styles.transitionDuration ?? "0s").split(",").map((d) => parseFloat(d) * (d.trim().endsWith("ms") ? 1 : 1000)));
  return Math.min(1000, longest + 120);
}

async function probeInteractions(page: Page, outDir: string, key: string): Promise<InteractionRecord[]> {
  const candidates = await page.evaluate(interactionCandidates);
  const records: InteractionRecord[] = [];
  const startUrl = page.url();
  for (const [n, c] of candidates.entries()) {
    const sel = `[data-pg-i="${c.id}"]`;
    const frames: Array<{ label: string; png: Buffer }> = [];
    const record: InteractionRecord = { kind: c.kind, target: c.target, base: {}, file: null };
    try {
      await page.mouse.move(1, 1);
      const loc = page.locator(sel).first();
      await loc.scrollIntoViewIfNeeded({ timeout: 2500 });
      await page.waitForTimeout(200);
      const base = await page.evaluate(readStyles, c.id);
      if (!base) continue;
      record.base = base;
      const still = await clipShot(page, sel, 0.3);
      if (still) frames.push({ label: "default", png: still });

      await loc.hover({ timeout: 2500 });
      await page.waitForTimeout(transitionWait(base));
      record.hover = diff(base, await page.evaluate(readStyles, c.id));
      const hovered = await clipShot(page, sel, 0.3);
      if (hovered) frames.push({ label: "hover", png: hovered });

      if (c.kind === "button" || c.kind === "card") {
        await page.mouse.down();
        await page.waitForTimeout(140);
        record.press = diff(base, await page.evaluate(readStyles, c.id));
        const pressed = await clipShot(page, sel, 0.3);
        if (pressed) frames.push({ label: "press", png: pressed });
        // Release away from the element: no click, no navigation.
        await page.mouse.move(1, 1);
        await page.mouse.up();
        await page.waitForTimeout(transitionWait(base));
      }

      await page.mouse.move(1, 1);
      await loc.focus({ timeout: 2000 });
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      await page.waitForTimeout(transitionWait(base));
      const focused = await page.evaluate((s) => document.activeElement === document.querySelector(s), sel);
      if (focused) {
        record.focus = diff(base, await page.evaluate(readStyles, c.id));
        const shot = await clipShot(page, sel, 0.3);
        if (shot) frames.push({ label: "focus-visible (keyboard)", png: shot });
      } else record.focus = "not focusable";
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());

      if (c.kind === "disclosure" || c.kind === "tab") {
        // The opened state is shown with its surroundings: the closest list item or section.
        await page.evaluate((s) => {
          const el = document.querySelector(s);
          // Tabs: the tab list with its panel; disclosures: the one item that opens.
          const host = el?.closest("[role=tablist]")?.parentElement ?? el?.closest("details, li, [class*=accordion-item i], [class*=faq-item i]") ?? el?.parentElement;
          host?.setAttribute("data-pg-host", "1");
        }, sel);
        const before = await clipShot(page, "[data-pg-host]", 0.02);
        if (before) frames.push({ label: "closed", png: before });
        await loc.click({ timeout: 2500 });
        await page.waitForTimeout(60);
        const started = await page.evaluate(() => {
          const host = document.querySelector("[data-pg-host]") ?? document.body;
          return host.getAnimations({ subtree: true }).map((a) => {
            const effect = a.effect as KeyframeEffect | null;
            let props: string[] = [];
            try {
              props = [...new Set((effect?.getKeyframes() ?? []).flatMap((k) => Object.keys(k)).filter((p) => !["offset", "easing", "composite", "computedOffset"].includes(p)))];
            } catch {
              // ignore
            }
            const named = a as unknown as { animationName?: string; transitionProperty?: string };
            return { name: named.animationName ?? named.transitionProperty ?? "", durationMs: Number(effect?.getTiming().duration) || 0, easing: String(effect?.getTiming().easing ?? ""), props };
          });
        });
        await page.waitForTimeout(700);
        const navigated = page.url() !== startUrl;
        record.open = { animations: started.slice(0, 20), navigated };
        if (navigated) {
          await page.goBack({ waitUntil: "domcontentloaded" }).catch(() => {});
          await prepare(page);
        } else {
          const after = await clipShot(page, "[data-pg-host]", 0.02);
          if (after) frames.push({ label: "open", png: after });
          if (c.kind === "disclosure") await loc.click({ timeout: 2500 }).catch(() => {});
        }
        await page.evaluate(() => document.querySelector("[data-pg-host]")?.removeAttribute("data-pg-host"));
      }
    } catch (e) {
      // A control that can't be hovered or clicked here is a gap in the evidence, not an error.
      record.gap = (e as Error).message.split("\n")[0]!.slice(0, 200);
    }
    record.file = await contactSheet(page, `${c.kind} · ${c.target}`, frames, join(outDir, "interactions", `${key}-${c.kind}-${n + 1}.png`));
    records.push(record);
    if (page.url() !== startUrl) {
      await page.goto(startUrl, { waitUntil: "domcontentloaded" }).catch(() => {});
      await prepare(page);
    }
  }
  return records;
}

async function probeInventory(page: Page, outDir: string, rawDir: string, key: string): Promise<Inventory> {
  const inv = await page.evaluate(inventoryInPage);
  const illustrations = inv.svgs.filter((s) => s.role === "illustration").slice(0, 12);
  for (const [n, s] of illustrations.entries()) {
    const png = await clipShot(page, `[data-pg-s="${s.id}"]`, 0.05);
    if (png) {
      const file = join(outDir, "illustrations", `${key}-i${n + 1}.png`);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, png);
      s.file = file;
    }
    // The markup is evidence for stroke structure only; it lives in the gitignored raw folder.
    const markup = await page.evaluate((id) => document.querySelector(`[data-pg-s="${id}"]`)?.outerHTML.slice(0, 300_000) ?? "", s.id);
    if (markup) {
      const raw = join(rawDir, "svg", `${key}-i${n + 1}.svg`);
      mkdirSync(dirname(raw), { recursive: true });
      writeFileSync(raw, markup);
      s.raw = raw;
    }
  }
  const iconFrames: Array<{ label: string; png: Buffer }> = [];
  for (const s of inv.svgs.filter((x) => x.role === "icon").slice(0, 30)) {
    const png = await clipShot(page, `[data-pg-s="${s.id}"]`, 0.4);
    if (png) iconFrames.push({ label: `${s.box.w}×${s.box.h} ${Object.keys(s.strokeWidths)[0] ?? "fill"}`, png });
  }
  const buttonFrames: Array<{ label: string; png: Buffer }> = [];
  for (const [n, b] of inv.buttons.entries()) {
    const png = await clipShot(page, `[data-pg-b="${b.example}"]`, 0.25);
    if (png) buttonFrames.push({ label: `v${n + 1} ×${b.count}`, png });
  }
  return {
    ...inv,
    files: {
      icons: await contactSheet(page, "icons", iconFrames, join(outDir, "icons", `${key}-icons.png`)),
      buttons: await contactSheet(page, "button variants (v1 = most used)", buttonFrames, join(outDir, "components", `${key}-button-variants.png`)),
    },
  };
}

async function probeTheme(page: Page, outDir: string, key: string, darkDiffers: boolean): Promise<ThemeInfo> {
  const theme: ThemeInfo = await page.evaluate(themeInPage);
  // A site that ignores prefers-color-scheme may still have a toggle: try it once and keep the result.
  if (!darkDiffers && theme.toggles.length) {
    const bodyBefore = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    try {
      await page.locator(`[data-pg-t="${theme.toggles[0]!.id}"]`).first().click({ timeout: 2500 });
      await page.waitForTimeout(800);
      const bodyAfter = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      let screenshot: string | null = null;
      if (bodyAfter !== bodyBefore) {
        screenshot = join(outDir, "screenshots", `${key}-desktop-toggled.png`);
        await page.screenshot({ path: screenshot, fullPage: true });
      }
      theme.toggled = { changed: bodyAfter !== bodyBefore, screenshot, bodyBefore, bodyAfter };
    } catch {
      theme.toggled = { changed: false, screenshot: null, bodyBefore, bodyAfter: bodyBefore };
    }
  }
  return theme;
}

/**
 * Deep capture of one page. The page must be freshly loaded with motion allowed and not yet scrolled,
 * so scroll-triggered reveals can be observed.
 */
/** Elements in view that may be drawn by script or canvas; marked data-pg-v. Runs in the page. */
function visualCandidates(): Array<{ id: string; kind: "lottie" | "canvas" | "svg" | "image"; target: string; box: Box }> {
  const pg = (window as unknown as { __pg: Pg }).__pg;
  const inView = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.top >= -r.height * 0.25 && r.bottom <= innerHeight + r.height * 0.25 && r.width > 0;
  };
  const out: Array<{ id: string; kind: "lottie" | "canvas" | "svg" | "image"; target: string; box: Box; area: number }> = [];
  const take = (el: Element, kind: "lottie" | "canvas" | "svg" | "image") => {
    if (el.hasAttribute("data-pg-v") || !pg.visible(el) || !inView(el)) return;
    const b = pg.box(el);
    out.push({ id: pg.mark(el, "data-pg-v"), kind, target: pg.path(el), box: b, area: b.w * b.h });
  };
  for (const s of Array.from(document.querySelectorAll("svg"))) {
    if (s.parentElement?.closest("svg")) continue;
    const r = s.getBoundingClientRect();
    if (Math.max(r.width, r.height) < 48) continue;
    take(s, s.querySelector("[id^=__lottie], clipPath[id*=lottie i]") ? "lottie" : "svg");
  }
  for (const c of Array.from(document.querySelectorAll("canvas"))) if (c.getBoundingClientRect().width >= 64) take(c, "canvas");
  for (const i of Array.from(document.querySelectorAll<HTMLImageElement>("img"))) {
    if (/\.(gif|apng|webp)(\?|$)/i.test(i.currentSrc || i.src) && i.getBoundingClientRect().width >= 64) take(i, "image");
  }
  return out.sort((a, b) => Number(b.kind === "lottie") - Number(a.kind === "lottie") || b.area - a.area).map(({ area: _a, ...rest }) => rest);
}

/**
 * Walks down a freshly loaded page; each script-, canvas- or image-driven element that comes into view is
 * filmed right away (so play-on-enter animations are caught from the start) and kept if its pixels change.
 */
async function visualMotion(page: Page, outDir: string, key: string, max = 8): Promise<MotionReport["visual"]> {
  const out: MotionReport["visual"] = [];
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round((page.viewportSize()?.height ?? 900) * 0.6);
  let filmed = 0;
  for (let y = 0, i = 0; y < height && i < 40 && filmed < max * 2; y += step, i++) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(250);
    for (const c of await page.evaluate(visualCandidates)) {
      if (out.length >= max || filmed >= max * 2) break;
      filmed++;
      const frames: Array<{ label: string; png: Buffer }> = [];
      const start = Date.now();
      for (let f = 0; f < 10; f++) {
        const wait = start + f * 280 - Date.now();
        if (wait > 0) await page.waitForTimeout(wait);
        const png = await clipShot(page, `[data-pg-v="${c.id}"]`, 0.04);
        if (png) frames.push({ label: `t=${Date.now() - start}ms`, png });
      }
      const changed = frames.some((fr) => !fr.png.equals(frames[0]!.png));
      if (!changed) continue;
      const file = await contactSheet(page, `${c.kind} (pixels change) · ${c.target}`, frames, join(outDir, "motion", `${key}-v${out.length + 1}.png`));
      if (file) out.push({ kind: c.kind, target: c.target, box: c.box, file });
    }
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  return out;
}

export async function deepCapture(page: Page, refDir: string, key: string, options: { darkDiffers: boolean; lottie?: () => Promise<LottieSummary[]> }): Promise<DeepCapture> {
  await prepare(page);
  const { animations, reveals } = await scanMotion(page);
  const statics = await page.evaluate(motionStatics, [...new Set(animations.map((a) => a.name))]);
  const frames = await motionFrames(page, animations, refDir, key);
  const inventory = await probeInventory(page, refDir, join(refDir, "raw"), key);
  const structure = await page.evaluate(structureInPage);
  if (structure.header) {
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
    await page.waitForTimeout(400);
    const after = await page.evaluate((): Record<string, string> => {
      const h = document.querySelector("header");
      if (!h) return {};
      const cs = getComputedStyle(h);
      return { height: String(Math.round(h.getBoundingClientRect().height)), background: cs.backgroundColor, backdropFilter: cs.backdropFilter, boxShadow: cs.boxShadow, borderBottom: `${cs.borderBottomWidth} ${cs.borderBottomColor}`, top: String(Math.round(h.getBoundingClientRect().top)) };
    });
    structure.header.afterScroll = after;
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }
  const interactions = await probeInteractions(page, refDir, key);
  // Script- and canvas-driven motion on a fresh load, so play-on-enter animations start from the beginning.
  await page.reload({ waitUntil: "load" }).catch(() => {});
  await page.waitForTimeout(800);
  await prepare(page);
  const visual = await visualMotion(page, refDir, key);
  const theme = await probeTheme(page, refDir, key, options.darkDiffers);
  const lottieFiles = (await options.lottie?.()) ?? [];
  return { url: page.url(), motion: { animations, reveals, frames, visual, lottieFiles, ...statics }, interactions, inventory, theme, structure };
}

/**
 * Motion evidence for an agent-built app (the evaluation, not the reference): what moves, frame sequences
 * of the most visible animations, and how many illustrations and line drawings the app has.
 */
export async function motionEvidence(page: Page, outDir: string, key: string): Promise<{
  animations: number;
  loops: number;
  inSvg: number;
  keyframes: string[];
  illustrations: number;
  lineDrawings: number;
  frames: string[];
}> {
  await prepare(page);
  const { animations } = await scanMotion(page);
  const frames = await motionFrames(page, animations, outDir, key, 4);
  const inv = await page.evaluate(inventoryInPage);
  const illustrations = inv.svgs.filter((s) => s.role !== "icon");
  return {
    animations: animations.length,
    loops: animations.filter((a) => a.iterations === "infinite").length,
    inSvg: animations.filter((a) => a.inSvg).length,
    keyframes: [...new Set(animations.filter((a) => a.kind === "css-animation").map((a) => a.name))],
    illustrations: illustrations.length,
    lineDrawings: illustrations.filter((s) => Object.keys(s.strokeWidths).length > 0 && Object.keys(s.fills).length <= 1).length,
    frames: frames.map((f) => f.file),
  };
}
