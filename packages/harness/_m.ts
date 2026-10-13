import { chromium } from "playwright";
import { surveySite } from "./src/survey.ts";
const browser = await chromium.launch();
const start = Date.now();
const s = await surveySite(browser, ["https://claude.com/ko"], { maxPages: 150, patience: 20 });
await browser.close();
console.log(JSON.stringify({
  minutes: Math.round((Date.now() - start) / 6000) / 10,
  stoppedBy: s.stoppedBy,
  surveyed: s.pages.length,
  errors: s.pages.filter((p) => p.error).length,
  lastNewAt: s.lastNewAt,
  known: s.known,
  features: s.frequency.length,
  groupsSeen: new Set(s.pages.map((p) => p.group)).size,
  groupsKnown: s.groups.length,
  top: s.frequency.slice(0, 12).map((f) => `${f.feature} ${Math.round(f.share * 100)}%`),
  rare: s.frequency.filter((f) => f.pages <= 2).map((f) => `${f.feature} (${f.pages})`),
}, null, 1));
