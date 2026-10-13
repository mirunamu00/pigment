import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const env = "NEXT_TELEMETRY_DISABLED=1 NEXT_DIST_DIR=.next-test PIGMENT_CONTENT_DIR=tests/fixtures/content";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  retries: 0,
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } }, grepInvert: /@mobile/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, grep: /@mobile/ },
  ],
  webServer: {
    // The site is built against fixture content: one published test system.
    command: process.platform === "win32"
      ? `set NEXT_TELEMETRY_DISABLED=1&& set NEXT_DIST_DIR=.next-test&& set PIGMENT_CONTENT_DIR=tests/fixtures/content&& npx next build && npx next start --port ${PORT}`
      : `${env} npx next build && ${env} npx next start --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
