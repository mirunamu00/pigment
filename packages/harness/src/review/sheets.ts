import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import type { ReviewItem } from "@pigment/schema";
import { paths } from "../paths.ts";

/**
 * Comparison sheets: every sample of one checklist item side by side in one image, so a reviewer sees whether a
 * flaw recurs without opening each capture, and opens the originals (listed under the sheet) only to look closer.
 */

/** Column width per kind of image, in CSS px. Full pages are scaled to it; drawings keep their size up to it. */
const WIDTH = { desktop: 560, mobile: 250, drawing: 300, motion: 300 };
/** Taller captures are cut here; the original is listed under the sheet. */
const MAX_HEIGHT = 2600;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export function sheetHtml(title: string, columns: Array<{ label: string; images: string[] }>, width: number, sheetDir: string): string {
  const src = (f: string) => relative(sheetDir, join(paths.root, f)).replaceAll("\\", "/");
  const cols = columns
    .map(
      (c) => `<section><h2>${esc(c.label)}</h2>${
        c.images.length
          ? c.images.map((f) => `<figure><div class="cut"><img src="${esc(src(f))}"></div><figcaption>${esc(f.split("/").slice(-2).join("/"))}</figcaption></figure>`).join("")
          : `<p class="none">no capture in this sample</p>`
      }</section>`,
    )
    .join("");
  return `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:16px;background:#fff;color:#111;font:13px/1.35 system-ui,sans-serif}
h1{font-size:15px;margin:0 0 12px}
main{display:flex;gap:16px;align-items:flex-start}
section{width:${width}px;flex:none}
h2{font-size:13px;margin:0 0 6px}
figure{margin:0 0 10px}
.cut{max-height:${MAX_HEIGHT}px;overflow:hidden;border:1px solid #ccc}
img{display:block;max-width:${width}px;width:auto;height:auto}
img[src*="screenshots/"]{width:${width}px}
figcaption{font:11px ui-monospace,monospace;color:#555;margin-top:3px;word-break:break-all}
.none{color:#a00}
</style><h1>${esc(title)}</h1><main>${cols}</main>`;
}

function itemColumns(item: ReviewItem): { width: number; columns: Array<{ label: string; images: string[] }> } {
  const width = item.kind === "drawings" ? WIDTH.drawing : item.kind === "motion" ? WIDTH.motion : item.viewport === "mobile" ? WIDTH.mobile : WIDTH.desktop;
  const columns = item.sources.map((images, k) => ({ label: item.sources.length > 1 ? `sample ${k + 1}` : "the run", images }));
  return { width, columns };
}

/** Renders every item's sheet (and the reference sheet) with one browser. Returns the files written. */
export async function renderSheets(items: ReviewItem[], reference: { file: string; images: string[] } | null): Promise<string[]> {
  const browser = await chromium.launch();
  const written: string[] = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
    const render = async (file: string, title: string, columns: Array<{ label: string; images: string[] }>, width: number) => {
      const out = join(paths.root, file);
      mkdirSync(dirname(out), { recursive: true });
      const html = out.replace(/\.png$/, ".html");
      writeFileSync(html, sheetHtml(title, columns, width, dirname(out)));
      await page.setViewportSize({ width: Math.min(4000, 32 + columns.length * (width + 16)), height: 800 });
      await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
      await page.screenshot({ path: out, fullPage: true });
      written.push(file);
    };
    for (const item of items) {
      const { width, columns } = itemColumns(item);
      const where = item.kind === "page" || item.kind === "state" ? ` · ${item.viewport} · ${item.scheme}` : "";
      await render(item.sheet, `${item.app}${item.holdout ? " (holdout)" : ""} · ${item.kind} · ${item.subject}${where}`, columns, width);
    }
    if (reference && reference.images.length) {
      // Reference: screenshots and drawing crops, three per row.
      const rows: Array<{ label: string; images: string[] }> = [];
      for (let i = 0; i < reference.images.length; i += 3) rows.push({ label: "", images: reference.images.slice(i, i + 3) });
      const columns = [0, 1, 2].map((c) => ({ label: c === 0 ? "reference" : "", images: rows.flatMap((r) => (r.images[c] ? [r.images[c]!] : [])) }));
      await render(reference.file, "The reference (what the system is derived from)", columns, WIDTH.desktop);
    }
  } finally {
    await browser.close();
  }
  return written;
}
