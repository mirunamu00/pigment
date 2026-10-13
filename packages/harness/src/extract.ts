import type { Page } from "playwright";

/**
 * Measured style facts for one rendered page. Everything is weighted by how much of the screen it
 * covers, so "the color of the site" means the color people actually see, not the one declared most.
 */
export interface StyleSample {
  url: string;
  viewport: { width: number; height: number };
  scheme: "light" | "dark";
  /** rgb(a) string → painted area in px² (backgrounds) */
  backgroundArea: Record<string, number>;
  /** rgb(a) string → text weight (characters × font size²) */
  textColor: Record<string, number>;
  borderColor: Record<string, number>;
  fontFamily: Record<string, number>;
  fontSize: Record<string, number>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, number>;
  letterSpacing: Record<string, number>;
  radius: Record<string, number>;
  borderWidth: Record<string, number>;
  shadow: Record<string, number>;
  spacing: Record<string, number>;
  transition: Record<string, number>;
  cssVariables: Record<string, string>;
  mediaQueries: string[];
  fontsLoaded: string[];
  bodyBackground: string;
  elementCount: number;
}

/** Runs inside the browser. Must stay self-contained: Playwright serializes it. */
function collect(): Omit<StyleSample, "url" | "viewport" | "scheme"> {
  const bump = (map: Record<string, number>, key: string, by: number) => {
    if (!key || by <= 0) return;
    map[key] = (map[key] ?? 0) + by;
  };
  const transparent = (c: string) => c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);
  const out = {
    backgroundArea: {} as Record<string, number>,
    textColor: {} as Record<string, number>,
    borderColor: {} as Record<string, number>,
    fontFamily: {} as Record<string, number>,
    fontSize: {} as Record<string, number>,
    fontWeight: {} as Record<string, number>,
    lineHeight: {} as Record<string, number>,
    letterSpacing: {} as Record<string, number>,
    radius: {} as Record<string, number>,
    borderWidth: {} as Record<string, number>,
    shadow: {} as Record<string, number>,
    spacing: {} as Record<string, number>,
    transition: {} as Record<string, number>,
    cssVariables: {} as Record<string, string>,
    mediaQueries: [] as string[],
    fontsLoaded: [] as string[],
    bodyBackground: getComputedStyle(document.body).backgroundColor,
    elementCount: 0,
  };

  // The page canvas: body background, or html's when body is transparent. It is usually the largest area.
  const canvas = [document.body, document.documentElement]
    .map((el) => getComputedStyle(el).backgroundColor)
    .find((c) => !transparent(c));
  bump(out.backgroundArea, canvas ?? "rgb(255, 255, 255)", document.documentElement.scrollWidth * document.documentElement.scrollHeight);

  const elements = Array.from(document.querySelectorAll<HTMLElement>("body *"));
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0) continue;
    out.elementCount++;
    const area = rect.width * rect.height;

    if (!transparent(cs.backgroundColor)) bump(out.backgroundArea, cs.backgroundColor, area);

    const ownText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => n.textContent ?? "")
      .join("")
      .trim();
    if (ownText.length > 0) {
      const size = parseFloat(cs.fontSize);
      const weight = ownText.length * size * size;
      bump(out.textColor, cs.color, weight);
      bump(out.fontFamily, cs.fontFamily, ownText.length);
      bump(out.fontSize, cs.fontSize, ownText.length);
      bump(out.fontWeight, cs.fontWeight, ownText.length);
      bump(out.lineHeight, `${cs.fontSize}/${cs.lineHeight}`, ownText.length);
      bump(out.letterSpacing, `${cs.fontSize}/${cs.letterSpacing}`, ownText.length);
    }

    const bw = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderRightWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth);
    if (bw > 0) {
      const perimeter = 2 * (rect.width + rect.height);
      if (!transparent(cs.borderTopColor)) bump(out.borderColor, cs.borderTopColor, perimeter);
      bump(out.borderWidth, cs.borderTopWidth, 1);
    }
    if (cs.borderTopLeftRadius !== "0px") bump(out.radius, cs.borderTopLeftRadius, 1);
    if (cs.boxShadow !== "none") bump(out.shadow, cs.boxShadow, 1);
    for (const prop of ["paddingTop", "paddingLeft", "marginTop", "marginBottom", "rowGap", "columnGap"] as const) {
      const v = cs[prop];
      if (v && v !== "0px" && v !== "normal" && v !== "auto") bump(out.spacing, v, 1);
    }
    if (cs.transitionDuration !== "0s") bump(out.transition, `${cs.transitionDuration} ${cs.transitionTimingFunction}`, 1);
  }

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin stylesheet
    }
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule && (rule.selectorText === ":root" || rule.selectorText === "html")) {
        for (let i = 0; i < rule.style.length; i++) {
          const name = rule.style.item(i);
          if (name.startsWith("--")) out.cssVariables[name] = rule.style.getPropertyValue(name).trim();
        }
      }
      if (rule instanceof CSSMediaRule && !out.mediaQueries.includes(rule.conditionText)) {
        out.mediaQueries.push(rule.conditionText);
      }
    }
  }

  document.fonts.forEach((f) => {
    if (f.status === "loaded") out.fontsLoaded.push(`${f.family} ${f.weight} ${f.style}`);
  });
  out.fontsLoaded = Array.from(new Set(out.fontsLoaded));
  return out;
}

/** tsx/esbuild wraps named inner functions in `__name(...)`; the browser needs a no-op for it. */
async function shimNames(page: Page): Promise<void> {
  await page.evaluate("window.__name = window.__name || ((fn) => fn)");
}

export async function extractStyles(page: Page, scheme: "light" | "dark"): Promise<StyleSample> {
  await shimNames(page);
  const data = await page.evaluate(collect);
  const viewport = page.viewportSize() ?? { width: 0, height: 0 };
  return { url: page.url(), viewport, scheme, ...data };
}

/** Scrolls through the page so lazy content renders before measuring or screenshotting. */
export async function settle(page: Page): Promise<void> {
  await shimNames(page);
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

/** Merges samples into one histogram set, sorted by weight, keeping the top entries. */
export function mergeSamples(samples: StyleSample[], top = 40): Record<string, unknown> {
  const keys = [
    "backgroundArea",
    "textColor",
    "borderColor",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "lineHeight",
    "letterSpacing",
    "radius",
    "borderWidth",
    "shadow",
    "spacing",
    "transition",
  ] as const;
  const merged: Record<string, unknown> = {};
  for (const key of keys) {
    const total: Record<string, number> = {};
    for (const s of samples) for (const [k, v] of Object.entries(s[key])) total[k] = (total[k] ?? 0) + v;
    const sum = Object.values(total).reduce((a, b) => a + b, 0) || 1;
    merged[key] = Object.entries(total)
      .sort((a, b) => b[1] - a[1])
      .slice(0, top)
      .map(([value, weight]) => ({ value, share: Math.round((weight / sum) * 10000) / 100 }));
  }
  merged.cssVariables = Object.assign({}, ...samples.map((s) => s.cssVariables));
  merged.mediaQueries = Array.from(new Set(samples.flatMap((s) => s.mediaQueries)));
  merged.fontsLoaded = Array.from(new Set(samples.flatMap((s) => s.fontsLoaded)));
  return merged;
}
