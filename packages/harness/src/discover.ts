import type { APIRequestContext } from "playwright";

/**
 * Where a site's pages are: robots.txt (its rules and sitemap pointers) and the sitemaps. The survey
 * (survey.ts) adds the links it finds on every page it opens. Only pages in the seeds' locale are taken —
 * other locales are translations of the same design.
 */

const TRACKING = /^(utm_.+|gclid|gbraid|wbraid|dclid|fbclid|msclkid|mc_cid|mc_eid|_hsenc|_hsmi|ref_src|igshid|yclid)$/i;

/** Accepts "example.com", strips fragments and tracking parameters (utm_*, gclid, gbraid…). */
export function cleanUrl(raw: string): string {
  let s = raw.trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  const u = new URL(s);
  u.hash = "";
  for (const key of [...u.searchParams.keys()]) if (TRACKING.test(key)) u.searchParams.delete(key);
  return u.toString();
}

const LOCALES = new Set(
  "en ko ja zh de fr es it pt ru nl sv pl tr ar hi id th vi he cs da fi no nb uk el ro hu ms fil bg hr sk sl lt lv et".split(" "),
);

/** Not design: sign-in and checkout flows, legal text, files. */
export const EXCLUDE =
  /\/(log-?in|sign-?in|sign-?up|register|logout|auth|oauth|sso|account|cart|checkout|search)(\/|$)|\/(legal|privacy|terms|cookies?|policies|policy|dpa|imprint|impressum|sitemap)(\/|$)|\.(pdf|zip|xml|json|rss|atom|png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|mp3|txt|csv)$/i;

export function localeOf(pathname: string): string | null {
  const first = pathname.split("/").filter(Boolean)[0]?.toLowerCase() ?? "";
  const base = first.split(/[-_]/)[0] ?? "";
  return LOCALES.has(base) && first.length <= 7 ? first : null;
}

/** Origin + path without trailing slash, query or fragment; null for other origins and non-http links. */
export function normalize(href: string, origin: string): string | null {
  try {
    const u = new URL(href, origin);
    if (u.origin !== origin || !/^https?:$/.test(u.protocol)) return null;
    return origin + (u.pathname.replace(/\/+$/, "") || "/");
  } catch {
    return null;
  }
}

/** Path shape used to group pages: "home", "/pricing", "/blog/*", "/docs/*\/*". */
export function groupKey(url: string, locale: string | null): string {
  const parts = new URL(url).pathname.split("/").filter(Boolean);
  if (locale && parts[0]?.toLowerCase() === locale) parts.shift();
  if (parts.length === 0) return "home";
  return `/${parts[0]}${parts.length > 1 ? "/*" : ""}${parts.length > 2 ? "/*" : ""}`;
}

export function parseRobots(text: string): { disallow: string[]; sitemaps: string[] } {
  const disallow: string[] = [];
  const sitemaps: string[] = [];
  let applies = false;
  let inAgentLines = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = /^([a-z-]+)\s*:\s*(.*)$/i.exec(line);
    if (!m) continue;
    const key = m[1]!.toLowerCase();
    const value = m[2]!.trim();
    if (key === "user-agent") {
      // Consecutive User-agent lines share one group.
      applies = inAgentLines ? applies || value === "*" : value === "*";
      inAgentLines = true;
      continue;
    }
    inAgentLines = false;
    if (key === "sitemap") sitemaps.push(value);
    else if (key === "disallow" && applies && value) disallow.push(value);
  }
  return { disallow, sitemaps };
}

export function allowedByRobots(pathname: string, disallow: string[]): boolean {
  return !disallow.some((rule) => {
    const anchored = rule.endsWith("$");
    const body = (anchored ? rule.slice(0, -1) : rule).replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    return new RegExp(`^${body}${anchored ? "$" : ""}`).test(pathname);
  });
}

export interface SiteSources {
  origin: string;
  locale: string | null;
  robots: { found: boolean; disallow: string[]; sitemaps: string[] };
  sitemapUrls: string[];
}

export async function siteSources(request: APIRequestContext, seeds: string[]): Promise<SiteSources> {
  const first = new URL(seeds[0]!);
  const origin = first.origin;
  const locale = localeOf(first.pathname);
  let robots: SiteSources["robots"] = { found: false, disallow: [], sitemaps: [] };
  try {
    const res = await request.get(`${origin}/robots.txt`, { timeout: 15_000 });
    if (res.ok()) robots = { found: true, ...parseRobots(await res.text()) };
  } catch {
    // no robots.txt: nothing disallowed
  }
  const queue = robots.sitemaps.length ? [...robots.sitemaps] : [`${origin}/sitemap.xml`];
  const seen = new Set<string>();
  const urls = new Set<string>();
  while (queue.length && seen.size < 20 && urls.size < 10_000) {
    const url = queue.shift()!;
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      const res = await request.get(url, { timeout: 15_000 });
      if (!res.ok()) continue;
      const xml = await res.text();
      const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]!.replace(/&amp;/g, "&"));
      if (/<sitemapindex/i.test(xml)) {
        // Child sitemaps for the seeds' locale first.
        locs.sort((a, b) => Number(!!locale && b.includes(`/${locale}`)) - Number(!!locale && a.includes(`/${locale}`)));
        queue.push(...locs);
      } else {
        for (const loc of locs) {
          const n = normalize(loc, origin);
          if (n) urls.add(n);
        }
      }
    } catch {
      // unreachable sitemap: the links on the pages still lead there
    }
  }
  return { origin, locale, robots, sitemapUrls: [...urls] };
}

/** Same locale, not excluded, allowed by robots.txt. */
export function inScope(url: string, sources: SiteSources): boolean {
  const path = new URL(url).pathname;
  if (EXCLUDE.test(path) || !allowedByRobots(path, sources.robots.disallow)) return false;
  const l = localeOf(path);
  return sources.locale ? l === sources.locale : l === null;
}
