// Self-check for the agent doing the restyle: builds the app, serves it, and screenshots every capture
// route at desktop and mobile, light and dark, into ./.snaps. Also reports pages wider than the viewport.
// Usage: node pigment-snap.mjs
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { chromium } from "@playwright/test";

const meta = JSON.parse(readFileSync("pigment.app.json", "utf8"));
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

rmSync(".snaps", { recursive: true, force: true });
mkdirSync(".snaps");
const browser = await chromium.launch();
const problems = [];
try {
  for (const route of meta.routes.filter((r) => r.capture)) {
    const slug = route.path === "/" ? "home" : route.path.slice(1).replace(/[^a-z0-9]+/gi, "-");
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
