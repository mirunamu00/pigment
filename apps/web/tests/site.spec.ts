import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ID = "fixture-system";
// The fixture registry publishes fixture-system on this date. Versions are internal: nothing user-facing shows one.
const UPDATED = "2026-10-11";

test.describe("gallery", () => {
  test("lists the published system and filters by tone", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("not a prompt");
    await expect(page.getByRole("heading", { name: "Fixture System" })).toBeVisible();
    await expect(page.getByText("1 system", { exact: true })).toBeVisible();
    await page.getByRole("group", { name: "Tone" }).getByRole("button", { name: "Brutalist" }).click();
    await expect(page.getByText("No system matches that mix yet")).toBeVisible();
    await page.getByRole("group", { name: "Tone" }).getByRole("button", { name: "All" }).click();
    await expect(page.getByRole("heading", { name: "Fixture System" })).toBeVisible();
  });

  test("copy prompt puts a ready-made prompt on the clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.getByRole("button", { name: "Copy prompt" }).first().click();
    await expect(page.getByRole("button", { name: "Copied" }).first()).toBeVisible();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toContain(`Apply design system ${ID} to this project.`);
    expect(text).not.toMatch(/\d+\.\d+\.\d+/);
    expect(text).toContain("Preserve features");
  });

  for (const tag of ["", "@mobile "]) {
    test(`${tag}pages never scroll sideways`, async ({ page }) => {
      for (const path of ["/", `/s/${ID}`, "/compare", "/connect", "/docs/existing-project"]) {
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, path).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe("system detail", () => {
  test("shows tokens, components and a dated changelog", async ({ page }) => {
    await page.goto(`/s/${ID}`);
    await expect(page.getByRole("heading", { level: 1, name: "Fixture System" })).toBeVisible();
    await expect(page.getByText(`Updated ${UPDATED}`)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Changelog" })).toBeVisible();
    expect(await page.locator("main, .page").first().innerText()).not.toMatch(/\bv?\d+\.\d+\.\d+\b/);
    await expect(page.getByText("text.primary", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Components" })).toBeVisible();
    await expect(page.getByText("data-display / table")).toBeVisible();
  });

  test("apply panel builds the prompt from the chosen options", async ({ page }) => {
    await page.goto(`/s/${ID}`);
    const panel = page.locator("#apply");
    await panel.getByRole("group", { name: "Spec delivery" }).getByRole("button", { name: "Spec URL" }).click();
    await expect(panel.locator("pre").last()).toContainText(`/s/${ID}/agent.md`);
    await panel.getByRole("group", { name: "Project" }).getByRole("button", { name: "New" }).click();
    await expect(panel.locator("pre").last()).toContainText("Set up design system");
    await panel.getByRole("group", { name: "Spec delivery" }).getByRole("button", { name: "MCP" }).click();
    await expect(panel.getByRole("button", { name: "Copy command" })).toBeVisible();
    await expect(panel.locator(".apply__ask")).toContainText(`Set up the Pigment design system ${ID} in this project`);
    await panel.getByRole("group", { name: "Agent" }).getByRole("button", { name: "Codex" }).click();
    await expect(panel.getByText("Exact config format follows")).toBeVisible();
  });

  test("unknown system is a 404", async ({ page }) => {
    const res = await page.goto("/s/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("This page washed")).toBeVisible();
  });

  test("@mobile shows the sticky apply bar", async ({ page }) => {
    await page.goto(`/s/${ID}`);
    await expect(page.locator(".mobile-apply").getByRole("link", { name: "Apply this system" })).toBeVisible();
  });
});

test.describe("API and downloads", () => {
  test("list, system, tokens, component and guide — no versions anywhere", async ({ request }) => {
    const list = await (await request.get("/api/v1/design-systems")).json();
    expect(list.items.map((i: { id: string }) => i.id)).toEqual([ID]);
    expect(list.items[0].updated).toBe(UPDATED);
    expect(JSON.stringify(list)).not.toMatch(/"version|"latest"/);

    const system = await (await request.get(`/api/v1/design-systems/${ID}`)).json();
    expect(system.manifest.version).toBeUndefined();
    expect(system.manifest.updated).toBe(UPDATED);
    expect(system.artifacts.components.length).toBeGreaterThanOrEqual(12);
    expect(system.artifacts.spec).toBe(`/s/${ID}/agent.md`);

    const tokens = await (await request.get(`/api/v1/design-systems/${ID}/tokens`)).json();
    expect(tokens.modes.light["color.text.primary"]).toMatch(/^#[0-9a-f]{6}$/);
    expect(tokens.modes.dark).toBeTruthy();

    const button = await (await request.get(`/api/v1/design-systems/${ID}/components/button`)).json();
    expect(button.markdown).toContain("### Button");

    const guide = await (await request.get(`/api/v1/design-systems/${ID}/guides/existing`)).json();
    expect(guide.markdown).toContain("## Existing project");
    expect(guide.markdown).toContain("## Verification");
  });

  test("errors carry stable codes", async ({ request }) => {
    const cases: Array<[string, number, string]> = [
      ["/api/v1/design-systems/nope", 404, "unknown_template"],
      [`/api/v1/design-systems/${ID}/components/carousel`, 404, "invalid_component"],
      [`/api/v1/design-systems/${ID}/guides/sometimes`, 400, "invalid_mode"],
    ];
    for (const [url, status, code] of cases) {
      const res = await request.get(url);
      expect(res.status(), url).toBe(status);
      expect((await res.json()).error.code, url).toBe(code);
    }
  });

  test("spec URL serves agent.md and the package downloads", async ({ request }) => {
    const spec = await request.get(`/s/${ID}/agent.md`);
    expect(spec.headers()["content-type"]).toContain("text/markdown");
    const md = await spec.text();
    expect(md).toContain(`\`${ID}, updated ${UPDATED}\``);
    expect(md).not.toContain("1.0.0");
    expect(md).toContain("## Semantic color tokens — light");

    const zip = await request.get(`/download/${ID}`);
    expect(zip.headers()["content-disposition"]).toContain(`${ID}.zip`);
    expect(zip.status()).toBe(200);
    expect(zip.headers()["content-type"]).toBe("application/zip");
    expect(zip.headers()["x-content-sha256"]).toMatch(/^[0-9a-f]{64}$/);
    const bytes = await zip.body();
    expect(bytes.subarray(0, 2).toString()).toBe("PK");
  });
});

test.describe("other pages", () => {
  test("connect tabs switch the snippets", async ({ page }) => {
    await page.goto("/connect");
    await expect(page.getByText("claude mcp add --transport http pigment")).toBeVisible();
    await page.getByRole("tab", { name: "Cursor" }).click();
    await expect(page.getByRole("tab", { name: "Cursor" })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("pre").first()).toContainText('"mcpServers"');
  });

  test("compare explains when there is nothing to compare", async ({ page }) => {
    await page.goto("/compare");
    await expect(page.getByText("Nothing to compare yet.")).toBeVisible();
  });

  test("docs navigate between guides", async ({ page }) => {
    await page.goto("/docs");
    await page.getByRole("navigation", { name: "Docs" }).getByRole("link", { name: "Existing project" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Apply a system to an existing project");
    await expect(page.getByText("Two approval points")).toBeVisible();
  });
});

test.describe("accessibility", () => {
  for (const path of ["/", `/s/${ID}`, "/compare", "/connect", "/docs", "/docs/existing-project"]) {
    test(`no serious violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      const result = await new AxeBuilder({ page }).analyze();
      const serious = result.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
    });
  }
});
