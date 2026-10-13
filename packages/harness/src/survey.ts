import type { Browser, Page } from "playwright";
import { groupKey, inScope, normalize, siteSources, type SiteSources } from "./discover.ts";
import { shimNames } from "./extract.ts";

/**
 * The survey: open as many of the site's pages as allowed (up to a budget) and record which design
 * features each one uses — motion, line drawings, disclosures, tabs, forms, tables, card grids, button
 * styles… That gives the site-wide frequency of every pattern (what the site *often* does, not just what
 * the home page shows) and picks the pages for the deep capture so every feature is captured at least once.
 */

export interface SurveyPage {
  url: string;
  group: string;
  title: string;
  features: string[];
  /** Distinct button styles: background / color / border / radius / padding / size / weight. */
  buttons: string[];
  counts: Record<string, number>;
  /** One entry per top-level section: background|heading level|has media. */
  sections: string[];
  error?: string;
}

export interface Survey extends Omit<SiteSources, "sitemapUrls"> {
  sitemapUrls: number;
  known: number;
  pages: SurveyPage[];
  /** feature → pages using it (share of surveyed pages). */
  frequency: Array<{ feature: string; pages: number; share: number }>;
  buttonStyles: Array<{ style: string; pages: number }>;
  groups: Array<{ key: string; known: number; surveyed: number; collection: boolean }>;
}

interface Found {
  features: string[];
  buttons: string[];
  counts: Record<string, number>;
  sections: string[];
  title: string;
  links: Array<{ href: string; where: "nav" | "footer" | "body" }>;
}

/** Motion features of what is animating right now. Called at several scroll positions. Runs in the page. */
function motionTags(): string[] {
  const tags = new Set<string>();
  for (const a of document.getAnimations()) {
    const effect = a.effect as KeyframeEffect | null;
    if (!effect) continue;
    const timing = effect.getTiming();
    const target = effect.target as Element | null;
    let frames: ComputedKeyframe[] = [];
    try {
      frames = effect.getKeyframes();
    } catch {
      // cross-origin or detached
    }
    const props = new Set(frames.flatMap((k) => Object.keys(k)));
    const transforms = frames.map((k) => String((k as Record<string, unknown>).transform ?? (k as Record<string, unknown>).rotate ?? "")).join(" ");
    const loop = timing.iterations === Infinity;
    tags.add(a.constructor.name === "CSSTransition" ? "motion:transition" : "motion:animation");
    if (loop) tags.add("motion:loop");
    if (target?.closest?.("svg")) tags.add("motion:svg");
    if (/rotate/.test(transforms)) tags.add("motion:rotate");
    if (props.has("strokeDashoffset") || props.has("strokeDasharray")) tags.add("motion:draw-on");
    if (props.has("offsetDistance")) tags.add("motion:path");
    if (props.has("d")) tags.add("motion:morph");
    if (loop && /translate/.test(transforms)) tags.add("motion:marquee");
    if (!loop && props.has("opacity") && /translate/.test(transforms)) tags.add("motion:reveal");
  }
  return [...tags];
}

/** Everything else, once per page. Runs in the page; must stay self-contained. */
function pageFeatures(): Omit<Found, "features"> & { features: string[] } {
  const q = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
  const visible = (el: Element) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden" && Number(cs.opacity) > 0.01;
  };
  const clear = (c: string) => c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);
  const f = new Set<string>();
  const counts: Record<string, number> = {};

  if (q("animate, animateTransform, animateMotion").length) f.add("motion:smil");
  const w = window as unknown as Record<string, unknown>;
  if (q("lottie-player, dotlottie-player, dotlottie-wc, [class*=lottie i], [id*=lottie i]").length || w.lottie || w.bodymovin) f.add("media:lottie");
  if (w.rive) f.add("media:rive");
  const videos = q<HTMLVideoElement>("video").filter(visible);
  if (videos.length) f.add("media:video");
  if (videos.some((v) => v.autoplay || v.loop)) f.add("media:autoplay-video");
  if (q("canvas").some((c) => c.getBoundingClientRect().width > 100)) f.add("media:canvas");

  const svgs = q<SVGSVGElement>("svg").filter((s) => !s.parentElement?.closest("svg") && visible(s));
  const size = (el: Element) => {
    const r = el.getBoundingClientRect();
    return Math.max(r.width, r.height);
  };
  counts.svgIcons = svgs.filter((s) => size(s) <= 32).length;
  counts.svgIllustrations = svgs.filter((s) => size(s) >= 96).length;
  if (counts.svgIcons) f.add("svg:icon");
  if (counts.svgIllustrations) f.add("svg:illustration");
  const lineDrawing = svgs.filter((s) => {
    if (size(s) < 48) return false;
    const shapes = Array.from(s.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect"));
    const stroked = shapes.filter((p) => {
      const cs = getComputedStyle(p);
      return cs.stroke !== "none" && parseFloat(cs.strokeWidth) > 0 && (cs.fill === "none" || clear(cs.fill));
    });
    return shapes.length > 0 && stroked.length / shapes.length >= 0.5;
  });
  counts.lineDrawings = lineDrawing.length;
  if (lineDrawing.length) f.add("svg:line-drawing");

  const imgs = q<HTMLImageElement>("img").filter(visible);
  counts.images = imgs.length;
  if (imgs.some((i) => i.getBoundingClientRect().width >= 480)) f.add("media:large-image");
  // A logo wall: one parent with five or more small images or svgs side by side.
  const parents = new Map<Element, number>();
  for (const el of [...imgs, ...svgs]) {
    const r = el.getBoundingClientRect();
    if (r.height > 12 && r.height <= 80 && el.parentElement?.parentElement) {
      const p = el.parentElement.parentElement;
      parents.set(p, (parents.get(p) ?? 0) + 1);
    }
  }
  if ([...parents.values()].some((n) => n >= 5)) f.add("layout:logo-wall");

  const notChrome = (el: Element) => !el.closest("header, nav, footer, [role=navigation]");
  const has = (selector: string, feature: string, chromeToo = false) => {
    if (q(selector).some((el) => visible(el) && (chromeToo || notChrome(el)))) f.add(feature);
  };
  has("details > summary, [aria-expanded]", "ui:disclosure");
  has("[role=tablist], [role=tab]", "ui:tabs");
  has("[aria-roledescription=carousel], [class*=carousel i], [class*=swiper i], [class*=slider i], [class*=marquee i]", "ui:carousel");
  has("form", "ui:form");
  has("input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, select", "ui:input");
  has("input[type=checkbox], input[type=radio], [role=switch]", "ui:choice");
  has("table", "ui:table");
  has("pre", "ui:code-block");
  has("blockquote", "ui:quote");
  has("[aria-label*=breadcrumb i]", "ui:breadcrumb", true);
  has("[class*=badge i], [class*=chip i], [class*=pill i], [class*=tag i]", "ui:badge");
  has("[role=tooltip], [data-tooltip]", "ui:tooltip", true);
  has("hr", "ui:divider");
  has("[aria-current=page]", "ui:current-page-marker", true);
  if (q("dialog, [role=dialog]").length) f.add("ui:dialog");
  const header = document.querySelector("header");
  if (header) {
    const p = getComputedStyle(header).position;
    if (p === "sticky" || p === "fixed") f.add("layout:sticky-header");
    if (getComputedStyle(header).backdropFilter.includes("blur")) f.add("layout:blurred-header");
  }
  if (q("button, a, [role=switch]").some((b) => /theme|dark|light|mode|appearance|다크|라이트|테마/i.test(`${b.getAttribute("aria-label") ?? ""} ${b.getAttribute("title") ?? ""}`))) {
    f.add("ui:theme-toggle");
  }
  // Card grids: a grid or wrapping row with three or more sizeable children of the same kind.
  for (const el of q("main *, body > div *").slice(0, 4000)) {
    const cs = getComputedStyle(el);
    if (cs.display !== "grid" && !(cs.display === "flex" && cs.flexWrap === "wrap")) continue;
    const kids = Array.from(el.children).filter((k) => {
      const r = k.getBoundingClientRect();
      return r.width >= 160 && r.height >= 120;
    });
    if (kids.length >= 3 && new Set(kids.map((k) => k.tagName)).size === 1) {
      f.add("layout:card-grid");
      break;
    }
  }

  // Sections: unwrap single-child wrappers, then one entry per tall child.
  let root: Element = document.querySelector("main") ?? document.body;
  while (root.children.length === 1) root = root.children[0]!;
  const sections = Array.from(root.children)
    .filter((e) => visible(e) && e.getBoundingClientRect().height > 120)
    .slice(0, 40)
    .map((e) => {
      const bg = getComputedStyle(e).backgroundColor;
      const h = e.querySelector("h1, h2, h3")?.tagName.toLowerCase() ?? "-";
      const media = e.querySelector("video, canvas") ? "video" : e.querySelector("svg path, img") ? "media" : "-";
      return `${clear(bg) ? "·" : bg}|${h}|${media}`;
    });
  counts.sections = sections.length;
  if (new Set(sections.map((s) => s.split("|")[0])).size >= 3) f.add("layout:banded-sections");

  const buttons = q("button, [role=button], a[class*=btn i], a[class*=button i], input[type=submit]")
    .filter((b) => {
      const r = b.getBoundingClientRect();
      return visible(b) && r.width >= 24 && r.height >= 18 && r.height <= 80;
    })
    .map((b) => {
      const cs = getComputedStyle(b);
      return [cs.backgroundColor, cs.color, `${cs.borderTopWidth} ${cs.borderTopColor}`, cs.borderTopLeftRadius, `${cs.paddingTop} ${cs.paddingLeft}`, cs.fontSize, cs.fontWeight].join(" / ");
    });
  counts.buttons = buttons.length;

  const links = q<HTMLAnchorElement>("a[href]").map((a) => ({
    href: a.href,
    where: (a.closest("header, nav, [role=navigation]") ? "nav" : a.closest("footer, [role=contentinfo]") ? "footer" : "body") as "nav" | "footer" | "body",
  }));
  return { title: document.title.slice(0, 120), features: [...f], buttons: [...new Set(buttons)], counts, sections, links };
}

async function surveyPage(page: Page, url: string): Promise<Found> {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(1200);
  await shimNames(page);
  // Scroll through: lazy content renders and scroll-triggered motion starts; collect motion at each stop.
  const motion = new Set<string>(await page.evaluate(motionTags));
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 700, i = 0; y < height && i < 14; y += 700, i++) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(220);
    for (const t of await page.evaluate(motionTags)) motion.add(t);
  }
  const found = await page.evaluate(pageFeatures);
  return { ...found, features: [...new Set([...found.features, ...motion])].sort() };
}

export async function surveySite(
  browser: Browser,
  seeds: string[],
  options: { maxPages: number; perCollection?: number; log?: (m: string) => void },
): Promise<Survey> {
  const log = options.log ?? (() => {});
  const perCollection = options.perCollection ?? 5;
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  const sources = await siteSources(context.request, seeds);
  log(`robots.txt ${sources.robots.found ? `found (${sources.robots.disallow.length} disallow rules)` : "absent"}, ${sources.sitemapUrls.length} sitemap URL(s)`);

  const known = new Map<string, { nav: number; footer: number; body: number; sitemap: boolean }>();
  const remember = (url: string | null, where: "nav" | "footer" | "body" | "sitemap") => {
    if (!url || !inScope(url, sources)) return;
    const k = known.get(url) ?? { nav: 0, footer: 0, body: 0, sitemap: false };
    if (where === "sitemap") k.sitemap = true;
    else k[where]++;
    known.set(url, k);
  };
  for (const u of sources.sitemapUrls) remember(u, "sitemap");
  const seedUrls = seeds.map((s) => normalize(s, sources.origin)).filter((s): s is string => !!s);
  const home = normalize(sources.locale ? `/${sources.locale}` : "/", sources.origin)!;
  for (const u of [home, ...seedUrls]) remember(u, "nav");

  const groupMembers = () => {
    const g = new Map<string, string[]>();
    for (const url of known.keys()) {
      const key = groupKey(url, sources.locale);
      g.set(key, [...(g.get(key) ?? []), url]);
    }
    return g;
  };
  const isCollection = (key: string, groups: Map<string, string[]>) => key.includes("*") && (groups.get(key)?.length ?? 0) >= 6;
  const priority = (url: string) => {
    if (seedUrls.includes(url)) return 10_000;
    if (url === home) return 9_000;
    const k = known.get(url)!;
    const depth = new URL(url).pathname.split("/").filter(Boolean).length;
    return Math.min(k.nav, 3) * 30 + Math.min(k.footer, 3) * 5 + Math.min(k.body, 10) * 2 + (k.sitemap ? 1 : 0) - depth * 3;
  };

  const page = await context.newPage();
  const pages: SurveyPage[] = [];
  const visited = new Set<string>();
  const surveyedPerGroup = new Map<string, number>();
  while (pages.length < options.maxPages) {
    const groups = groupMembers();
    const next = [...known.keys()]
      .filter((u) => !visited.has(u))
      .filter((u) => {
        const key = groupKey(u, sources.locale);
        return !isCollection(key, groups) || (surveyedPerGroup.get(key) ?? 0) < perCollection;
      })
      .sort((a, b) => priority(b) - priority(a))[0];
    if (!next) break;
    visited.add(next);
    const group = groupKey(next, sources.locale);
    try {
      const found = await surveyPage(page, next);
      for (const l of found.links) remember(normalize(l.href, sources.origin), l.where);
      pages.push({ url: next, group, title: found.title, features: found.features, buttons: found.buttons, counts: found.counts, sections: found.sections });
      surveyedPerGroup.set(group, (surveyedPerGroup.get(group) ?? 0) + 1);
      log(`surveyed ${pages.length}: ${new URL(next).pathname} (${found.features.length} features)`);
    } catch (e) {
      pages.push({ url: next, group, title: "", features: [], buttons: [], counts: {}, sections: [], error: (e as Error).message.split("\n")[0] });
    }
    await page.waitForTimeout(250); // be polite
  }
  await context.close();

  const ok = pages.filter((p) => !p.error);
  const featureCount = new Map<string, number>();
  for (const p of ok) for (const f of p.features) featureCount.set(f, (featureCount.get(f) ?? 0) + 1);
  const buttonCount = new Map<string, number>();
  for (const p of ok) for (const b of p.buttons) buttonCount.set(b, (buttonCount.get(b) ?? 0) + 1);
  const groups = groupMembers();
  return {
    origin: sources.origin,
    locale: sources.locale,
    robots: sources.robots,
    sitemapUrls: sources.sitemapUrls.length,
    known: known.size,
    pages,
    frequency: [...featureCount.entries()]
      .map(([feature, n]) => ({ feature, pages: n, share: Math.round((n / Math.max(1, ok.length)) * 100) / 100 }))
      .sort((a, b) => b.pages - a.pages),
    buttonStyles: [...buttonCount.entries()].map(([style, n]) => ({ style, pages: n })).sort((a, b) => b.pages - a.pages).slice(0, 30),
    groups: [...groups.entries()]
      .map(([key, urls]) => ({ key, known: urls.length, surveyed: surveyedPerGroup.get(key) ?? 0, collection: isCollection(key, groups) }))
      .sort((a, b) => b.known - a.known),
  };
}

/**
 * Pages for the deep capture: the seeds and the home page, then greedily the page that adds the most
 * features not yet covered (rare features count more), then one page per page type not yet covered.
 */
export function selectDeep(survey: Survey, seeds: string[], budget: number): Array<{ url: string; reason: string }> {
  const ok = survey.pages.filter((p) => !p.error);
  const share = new Map(survey.frequency.map((f) => [f.feature, f.pages]));
  const selected: Array<{ url: string; reason: string }> = [];
  const covered = new Set<string>();
  const groups = new Set<string>();
  const take = (p: SurveyPage, reason: string) => {
    selected.push({ url: p.url, reason });
    for (const f of p.features) covered.add(f);
    groups.add(p.group);
  };
  const seedUrls = seeds.map((s) => normalize(s, survey.origin));
  for (const p of ok.filter((p) => seedUrls.includes(p.url))) take(p, "given");
  const home = ok.find((p) => p.group === "home");
  if (home && !selected.some((s) => s.url === home.url)) take(home, "home");

  while (selected.length < budget) {
    let best: { page: SurveyPage; gain: number; fresh: string[] } | null = null;
    for (const p of ok) {
      if (selected.some((s) => s.url === p.url)) continue;
      const fresh = p.features.filter((f) => !covered.has(f));
      const gain = fresh.reduce((sum, f) => sum + 1 + 1 / (share.get(f) ?? 1), 0) + (groups.has(p.group) ? 0 : 0.5);
      if (gain > 0 && (!best || gain > best.gain)) best = { page: p, gain, fresh };
    }
    if (!best) break;
    take(best.page, best.fresh.length ? `adds ${best.fresh.slice(0, 6).join(", ")}${best.fresh.length > 6 ? "…" : ""}` : `page type ${best.page.group}`);
  }
  return selected;
}
