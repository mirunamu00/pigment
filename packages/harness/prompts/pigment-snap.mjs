// Self-check for the agent doing the restyle: builds the app, serves it, and screenshots every capture
// route at desktop and mobile, light and dark, into ./.snaps. Also reports pages wider than the viewport.
// Usage: node pigment-snap.mjs                 every capture route
//        node pigment-snap.mjs /path [/path…]  just these paths, which need not be capture routes — e.g. a
//                                              temporary page for reviewing one piece up close
//        node pigment-snap.mjs --measure /path "<css selector>" [more selectors…] [--mobile] [--dark]
//                                              prints each match's box, spacing, type and borders, and the
//                                              gap to the next element, as JSON (no screenshots)
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { chromium } from "@playwright/test";

const meta = JSON.parse(readFileSync("pigment.app.json", "utf8"));
// Git Bash on Windows rewrites "/path" arguments into "C:/Program Files/Git/path"; undo that.
const args = process.argv.slice(2).map((a) => a.replace(/^[A-Za-z]:\/.*?\/Git(?=\/)/, ""));
const measuring = args.includes("--measure");
const paths = measuring ? args.filter((a) => a.startsWith("/")).slice(0, 1) : args.filter((a) => a.startsWith("/"));
const win = process.platform === "win32";
const build = spawnSync("npm", ["run", "build"], { stdio: "inherit", shell: win });
if (build.status !== 0) process.exit(build.status ?? 1);

const server = spawn("npm", ["run", "preview"], { shell: win, stdio: "ignore" });
const url = `http://localhost:${meta.port}`;
for (let i = 0; i < 120; i++) {
  try {
    if ((await fetch(url)).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

if (measuring) {
  const selectors = args.filter((a) => !a.startsWith("/") && !a.startsWith("--"));
  const mobile = args.includes("--mobile");
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      colorScheme: args.includes("--dark") ? "dark" : "light",
      isMobile: mobile,
    });
    const page = await context.newPage();
    await page.goto(url + (paths[0] ?? "/"), { waitUntil: "networkidle" });
    const out = {};
    for (const selector of selectors) {
      out[selector] = await page.$$eval(selector, (els) =>
        els.slice(0, 20).map((el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          const next = el.nextElementSibling?.getBoundingClientRect();
          const px = (v) => Math.round(parseFloat(v) * 10) / 10;
          return {
            text: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40),
            box: { x: Math.round(r.left), y: Math.round(r.top + scrollY), width: Math.round(r.width), height: Math.round(r.height) },
            padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(px),
            margin: [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft].map(px),
            gap: cs.display.includes("flex") || cs.display.includes("grid") ? [cs.rowGap, cs.columnGap].map((g) => (g === "normal" ? 0 : px(g))) : undefined,
            font: `${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily.split(",")[0]}`,
            color: cs.color,
            background: cs.backgroundColor,
            border: [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(px),
            radius: cs.borderTopLeftRadius,
            gapToNext: next ? { below: Math.round(next.top - r.bottom), right: Math.round(next.left - r.right) } : undefined,
            clipped: el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1,
          };
        }),
      );
    }
    for (const [selector, items] of Object.entries(out)) {
      console.log(`${selector}: ${items.length ? "" : "no match"}`);
      for (const item of items) console.log(`  ${JSON.stringify(item)}`);
    }
  } finally {
    await browser.close();
    if (win && server.pid) spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"]);
    else server.kill();
  }
  process.exit(0);
}

// A run for chosen paths keeps the earlier full set; a full run starts clean.
if (!paths.length) rmSync(".snaps", { recursive: true, force: true });
mkdirSync(".snaps", { recursive: true });
const browser = await chromium.launch();
const problems = [];
try {
  for (const route of paths.length ? paths.map((path) => ({ path })) : meta.routes.filter((r) => r.capture)) {
    const slug = route.path === "/" ? "home" : route.path.slice(1).replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
    for (const [viewport, size] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
      for (const scheme of ["light", "dark"]) {
        const context = await browser.newContext({ viewport: size, colorScheme: scheme, isMobile: viewport === "mobile" });
        const page = await context.newPage();
        await page.goto(url + route.path, { waitUntil: "networkidle" });
        const over = await page.evaluate(
          (w) => Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) - w,
          size.width,
        );
        if (over > 1) problems.push(`${route.path} ${viewport} ${scheme}: page is ${over}px wider than the viewport`);
        await page.screenshot({ path: `.snaps/${slug}-${viewport}-${scheme}.png`, fullPage: true });
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  if (win && server.pid) spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"]);
  else server.kill();
}
console.log(`Screenshots written to .snaps/ — open each PNG and compare it with the specification.`);
console.log(problems.length ? `Problems:\n- ${problems.join("\n- ")}` : "No horizontal overflow.");
