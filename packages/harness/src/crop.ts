import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium, type Browser } from "playwright";

/**
 * First-screen crops at native resolution. Full-page captures are thousands of pixels tall, so anything that shows
 * them whole (a sheet, an image viewer) shrinks them until type, outlines and shadows can't be judged. A crop of
 * the first screen keeps every pixel, which is what a comparison of craft needs.
 */

/** Height per width of one screen: desktop 1440×900, mobile 390×844. */
export const SCREEN_ASPECT = { desktop: 900 / 1440, mobile: 844 / 390 } as const;

export interface CropJob {
  src: string;
  out: string;
  viewport: keyof typeof SCREEN_ASPECT;
}

/** Writes each job's first screen; returns the jobs that worked. Reuses one browser for the batch. */
export async function cropFirstScreens(jobs: CropJob[], browser?: Browser): Promise<CropJob[]> {
  if (!jobs.length) return [];
  const own = !browser;
  const b = browser ?? (await chromium.launch());
  const done: CropJob[] = [];
  try {
    const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
    for (const job of jobs) {
      try {
        // A file page, so the image (also a file) may load.
        mkdirSync(dirname(job.out), { recursive: true });
        const html = join(dirname(job.out), ".crop.html");
        writeFileSync(html, `<html><body style="margin:0;background:#fff"><img id="i" src="${pathToFileURL(job.src).href}" style="display:block"></body></html>`);
        await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
        rmSync(html, { force: true });
        const width = await page.evaluate(async () => {
          const img = document.getElementById("i") as HTMLImageElement;
          if (!img.complete) await new Promise((r) => img.addEventListener("load", r, { once: true }));
          return img.naturalWidth;
        });
        if (!width) continue;
        const height = Math.round(width * SCREEN_ASPECT[job.viewport]);
        await page.setViewportSize({ width, height });
        await page.screenshot({ path: job.out, clip: { x: 0, y: 0, width, height } });
        done.push(job);
      } catch {
        // an unreadable image is skipped; the caller reports what is missing
      }
    }
  } finally {
    if (own) await b.close();
  }
  return done;
}
