import type { Page } from "playwright";
import { shimNames } from "./extract.ts";

/**
 * Layout defects that a reviewer would otherwise estimate by eye from scaled-down screenshots, measured on the
 * rendered page instead. Reported for the critic (it confirms and grades them), never gated: a measurement can
 * flag a deliberate choice, and the critic checks it against the reference.
 */
export type LayoutKind = "clipped-text" | "overlapping-text" | "uneven-row" | "double-rule" | "repeated-drawing";

export interface LayoutFinding {
  kind: LayoutKind;
  /** A short locator: tag, test id or first class, and the start of the text. */
  where: string;
  detail: string;
}

export interface LayoutReport {
  route: string;
  viewport: "desktop" | "mobile";
  scheme: "light" | "dark";
  findings: LayoutFinding[];
}

/** Runs inside the browser. Must stay self-contained: Playwright serializes it. */
function measure(): LayoutFinding[] {
  const out: LayoutFinding[] = [];
  const MAX_PER_KIND = 12;
  const counts: Record<string, number> = {};
  const add = (kind: LayoutFinding["kind"], el: Element, detail: string) => {
    counts[kind] = (counts[kind] ?? 0) + 1;
    if (counts[kind]! > MAX_PER_KIND) return;
    out.push({ kind, where: locate(el), detail });
  };
  const locate = (el: Element): string => {
    const testid = el.closest("[data-testid]")?.getAttribute("data-testid");
    const cls = (el.getAttribute("class") ?? "").split(/\s+/).filter(Boolean)[0];
    const text = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40);
    return [el.tagName.toLowerCase() + (cls ? `.${cls}` : ""), testid ? `[${testid}]` : "", text ? `"${text}"` : ""].filter(Boolean).join(" ");
  };
  const visible = (el: Element) =>
    (el as HTMLElement).checkVisibility?.({ checkOpacity: true, checkVisibilityCSS: true } as CheckVisibilityOptions) ?? true;
  const transparent = (c: string) => c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);
  const docW = document.documentElement.scrollWidth;
  const docH = document.documentElement.scrollHeight;
  // Screen-reader-only content is clipped on purpose.
  const srOnly = (el: Element) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width <= 2 || r.height <= 2 || (cs.clip !== "auto" && cs.clip !== "") || cs.clipPath !== "none";
  };

  const clipCache = new Map<Element, boolean>();
  const clippedAway = (el: Element | null): boolean => {
    if (!el || el === document.body) return false;
    const hit = clipCache.get(el);
    if (hit !== undefined) return hit;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const own = ((cs.overflow !== "visible" && (r.width <= 2 || r.height <= 2)) || (cs.clip !== "auto" && cs.clip !== ""));
    const value = own || clippedAway(el.parentElement);
    clipCache.set(el, value);
    return value;
  };

  // The part of the page an element can paint into: its ancestors that hide overflow cut it (page coordinates).
  const windowCache = new Map<Element, DOMRect | null>();
  const paintWindow = (el: Element | null): DOMRect | null => {
    if (!el || el === document.body) return null;
    if (windowCache.has(el)) return windowCache.get(el)!;
    const outer = paintWindow(el.parentElement);
    const cs = getComputedStyle(el);
    let value = outer;
    if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
      const r = el.getBoundingClientRect();
      const own = new DOMRect(r.left + scrollX, r.top + scrollY, r.width, r.height);
      value = outer ? intersect(own, outer) : own;
    }
    windowCache.set(el, value);
    return value;
  };
  const intersect = (a: DOMRect, b: DOMRect): DOMRect => {
    const left = Math.max(a.left, b.left);
    const top = Math.max(a.top, b.top);
    return new DOMRect(left, top, Math.max(0, Math.min(a.right, b.right) - left), Math.max(0, Math.min(a.bottom, b.bottom) - top));
  };

  // Text: every text node's line boxes, page coordinates; `seen` is the part not cut off by an ancestor.
  const lines: Array<{ el: Element; node: Text; r: DOMRect; seen: DOMRect }> = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const node = n as Text;
    const el = node.parentElement;
    if (!el || !(node.textContent ?? "").trim() || !visible(el) || clippedAway(el)) continue;
    if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(el.tagName)) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    for (const r of Array.from(range.getClientRects())) {
      if (r.width < 2 || r.height < 2) continue;
      const pr = new DOMRect(r.left + scrollX, r.top + scrollY, r.width, r.height);
      if (pr.right < 0 || pr.left > docW || pr.bottom < 0 || pr.top > docH) continue;
      const win = paintWindow(el);
      const seen = win ? intersect(pr, win) : pr;
      lines.push({ el, node, r: pr, seen });
    }
  }

  // Clipped text: a line box that runs past an ancestor that hides overflow, with no ellipsis or line clamp.
  const clippedSeen = new Set<Element>();
  for (const { el, r } of lines) {
    if (clippedSeen.has(el)) continue;
    for (let a: Element | null = el; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      const hidesX = cs.overflowX === "hidden" || cs.overflowX === "clip";
      const hidesY = cs.overflowY === "hidden" || cs.overflowY === "clip";
      if (!hidesX && !hidesY) continue;
      if (srOnly(a)) break;
      const ar = a.getBoundingClientRect();
      const left = ar.left + scrollX;
      const top = ar.top + scrollY;
      const overX = hidesX ? Math.max(r.right - (left + ar.width), left - r.left) : 0;
      const overY = hidesY ? Math.max(r.bottom - (top + ar.height), top - r.top) : 0;
      const ellipsis = getComputedStyle(el).textOverflow === "ellipsis" || cs.textOverflow === "ellipsis";
      const clamp = (getComputedStyle(el) as CSSStyleDeclaration & { webkitLineClamp?: string }).webkitLineClamp;
      const clamped = !!clamp && clamp !== "none";
      if ((overX > 1 && !ellipsis) || (overY > 1 && !clamped)) {
        clippedSeen.add(el);
        add("clipped-text", el, `text runs ${Math.round(Math.max(overX, overY))}px past ${locate(a).split(" ")[0]}, which hides overflow`);
      }
      break;
    }
  }

  // Overlapping text: the visible parts of line boxes of different text nodes that cover each other.
  const shown = lines.filter((l) => l.seen.width >= 2 && l.seen.height >= 2).map((l) => ({ ...l, r: l.seen }));
  shown.sort((a, b) => a.r.top - b.r.top);
  const overlapSeen = new Set<Element>();
  for (let i = 0; i < shown.length; i++) {
    const a = shown[i]!;
    for (let j = i + 1; j < shown.length && shown[j]!.r.top < a.r.bottom; j++) {
      const b = shown[j]!;
      if (a.node === b.node || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w <= 0 || h <= 0) continue;
      const smaller = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
      if ((w * h) / smaller < 0.25 || overlapSeen.has(a.el) || overlapSeen.has(b.el)) continue;
      overlapSeen.add(a.el);
      overlapSeen.add(b.el);
      add("overlapping-text", a.el, `covers ${locate(b.el)} (${Math.round(w)}×${Math.round(h)}px)`);
    }
  }

  const boxed = (el: Element) => {
    const cs = getComputedStyle(el);
    const border = ["Top", "Right", "Bottom", "Left"].some(
      (s) => parseFloat(cs.getPropertyValue(`border-${s.toLowerCase()}-width`)) > 0 && cs.getPropertyValue(`border-${s.toLowerCase()}-style`) !== "none" && !transparent(cs.getPropertyValue(`border-${s.toLowerCase()}-color`)),
    );
    return border || !transparent(cs.backgroundColor) || cs.boxShadow !== "none";
  };

  // Uneven rows: panels side by side whose tops or bottoms miss each other by a few pixels — a near miss
  // reads as a mistake, a large difference as a choice.
  for (const parent of Array.from(document.querySelectorAll("body *"))) {
    const cs = getComputedStyle(parent);
    const flexRow = cs.display.includes("flex") && !cs.flexDirection.startsWith("column");
    if (!flexRow && !cs.display.includes("grid")) continue;
    const kids = Array.from(parent.children).filter((k) => visible(k) && boxed(k));
    if (kids.length < 2) continue;
    const rects = kids.map((k) => ({ k, r: k.getBoundingClientRect() })).filter((x) => x.r.width > 40 && x.r.height > 24);
    for (let i = 0; i < rects.length; i++)
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i]!;
        const b = rects[j]!;
        const sideBySide = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top) > Math.min(a.r.height, b.r.height) * 0.5 && (a.r.right <= b.r.left + 1 || b.r.right <= a.r.left + 1);
        if (!sideBySide) continue;
        const dt = Math.abs(a.r.top - b.r.top);
        const db = Math.abs(a.r.bottom - b.r.bottom);
        if ((dt >= 1 && dt <= 8) || (db >= 1 && db <= 8)) {
          add("uneven-row", a.k, `next to ${locate(b.k)}: tops differ ${Math.round(dt)}px, bottoms ${Math.round(db)}px`);
          i = rects.length;
          break;
        }
      }
  }

  // Double rules: two horizontal borders (or an <hr>) of different elements drawn on top of or right next to each
  // other — a doubled hairline.
  const rules: Array<{ el: Element; y: number; x1: number; x2: number }> = [];
  for (const el of Array.from(document.querySelectorAll("body *"))) {
    const r = el.getBoundingClientRect();
    if (r.width < 24 || !visible(el)) continue;
    const cs = getComputedStyle(el);
    const drawn = (side: "top" | "bottom") =>
      parseFloat(cs.getPropertyValue(`border-${side}-width`)) > 0 && cs.getPropertyValue(`border-${side}-style`) !== "none" && !transparent(cs.getPropertyValue(`border-${side}-color`));
    if (el.tagName === "HR" && r.height <= 4) rules.push({ el, y: r.top + scrollY, x1: r.left, x2: r.right });
    else {
      if (drawn("top")) rules.push({ el, y: r.top + scrollY, x1: r.left, x2: r.right });
      if (drawn("bottom")) rules.push({ el, y: r.bottom + scrollY, x1: r.left, x2: r.right });
    }
  }
  rules.sort((a, b) => a.y - b.y);
  const ruleSeen = new Set<Element>();
  for (let i = 0; i < rules.length; i++) {
    const a = rules[i]!;
    for (let j = i + 1; j < rules.length && rules[j]!.y - a.y <= 3; j++) {
      const b = rules[j]!;
      if (a.el === b.el || ruleSeen.has(a.el)) continue;
      const shared = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
      if (shared < 0.5 * Math.min(a.x2 - a.x1, b.x2 - b.x1)) continue;
      // A short line inside a longer one's box is an indicator on a rule (an active tab's underline), not a double.
      const nested = a.el.contains(b.el) || b.el.contains(a.el);
      if (nested && Math.min(a.x2 - a.x1, b.x2 - b.x1) < 0.8 * Math.max(a.x2 - a.x1, b.x2 - b.x1)) continue;
      ruleSeen.add(a.el);
      add("double-rule", a.el, `a line of ${locate(b.el).split(" ")[0]} runs ${Math.round(b.y - a.y)}px from its own`);
    }
  }

  // Repeated drawings: the same picture (image source or SVG markup) shown more than once at illustration size.
  const drawings = new Map<string, Element[]>();
  for (const el of Array.from(document.querySelectorAll("img, svg"))) {
    if (el.parentElement?.closest("svg")) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 64 || r.height < 64 || !visible(el)) continue;
    const key = el.tagName === "IMG" ? (el as HTMLImageElement).currentSrc : el.outerHTML.replace(/\s(id|class|style|aria-[a-z]+|data-[a-z-]+)="[^"]*"/g, "").replace(/\s+/g, " ");
    if (!key) continue;
    drawings.set(key, [...(drawings.get(key) ?? []), el]);
  }
  for (const els of drawings.values()) if (els.length > 1) add("repeated-drawing", els[0]!, `the same drawing appears ${els.length} times on the page`);

  for (const [kind, n] of Object.entries(counts)) {
    if (n > MAX_PER_KIND) out.push({ kind: kind as LayoutKind, where: "", detail: `${n - MAX_PER_KIND} more not listed` });
  }
  return out;
}

export async function layoutChecks(page: Page): Promise<LayoutFinding[]> {
  await shimNames(page);
  return page.evaluate(measure);
}
