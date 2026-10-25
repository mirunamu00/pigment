import type { Page } from "playwright";

/**
 * Some sites scroll inside a full-height box (an app shell) instead of the document, so a full-page screenshot ends
 * at the first screen. Before a full-page capture, the box that holds the page's scroll is let out to its full
 * height (and its ancestors with it), so the document carries the whole page. Returns the page height it reached,
 * or null when the document already scrolled on its own.
 */
export async function expandScrollContainers(page: Page): Promise<number | null> {
  const grown = await page.evaluate(() => {
    const root = document.scrollingElement ?? document.documentElement;
    if (root.scrollHeight > window.innerHeight + 50) return null;
    const scrollable = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((el) => {
      const cs = getComputedStyle(el);
      return /(auto|scroll|overlay)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 100 && el.clientHeight >= window.innerHeight * 0.6;
    });
    const box = scrollable.sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
    if (!box) return null;
    // No named helpers in here: the page runs this function as source text, without the bundler's helpers.
    for (let el: HTMLElement | null = box; el; el = el.parentElement) {
      el.style.setProperty("height", "auto", "important");
      el.style.setProperty("max-height", "none", "important");
      el.style.setProperty("overflow", "visible", "important");
    }
    return root.scrollHeight;
  });
  if (grown === null) return null;
  // Content that loads as it scrolls into view: pass through once, then back to the top.
  for (let y = 0; y < grown; y += 800) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  return page.evaluate(() => (document.scrollingElement ?? document.documentElement).scrollHeight);
}
