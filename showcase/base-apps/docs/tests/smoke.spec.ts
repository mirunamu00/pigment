import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

interface AppMeta {
  routes: { path: string; name: string; capture: boolean }[];
}

const meta = JSON.parse(readFileSync(new URL('../pigment.app.json', import.meta.url), 'utf8')) as AppMeta;

const INSTALLATION = '/docs/getting-started/installation';
const CONFIGURATION = '/docs/guides/configuration';

test('docs home shows the intro, the section cards and the quick start', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Ferrule documentation' })).toBeVisible();
  await expect(page.getByTestId('version-label')).toHaveText('v3.2.0');
  await expect(page.getByTestId('section-card')).toHaveCount(4);
  await expect(page.getByTestId('home-quick-start').getByTestId('code-block')).toContainText('npx ferrule init');

  await page.getByTestId('section-card-link').filter({ hasText: 'Guides' }).click();
  await expect(page).toHaveURL(new RegExp(`${CONFIGURATION}$`));
  await expect(page.getByTestId('doc-title')).toHaveText('Configuration');
});

test('sidebar groups collapse and expand', async ({ page }) => {
  await page.goto(INSTALLATION);
  const toggle = page.getByTestId('nav-group-toggle-guides');
  const list = page.getByTestId('nav-group-list-guides');
  await expect(page.getByTestId('nav-group')).toHaveCount(4);
  await expect(page.getByTestId('sidebar')).toBeVisible();
  await expect(page.getByTestId('menu-button')).toBeHidden();
  await expect(page.getByTestId('drawer-close')).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(list.getByTestId('sidebar-link')).toHaveCount(3);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(list).toBeHidden();
  await expect(page.getByTestId('nav-group-list-getting-started')).toBeVisible();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(list).toBeVisible();
});

test('the current page is marked with aria-current in the sidebar', async ({ page }) => {
  await page.goto(INSTALLATION);
  const sidebar = page.getByTestId('sidebar');
  const current = sidebar.locator('[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveText('Installation');

  await sidebar.getByTestId('sidebar-link').filter({ hasText: 'Configuration' }).click();
  await expect(page).toHaveURL(new RegExp(`${CONFIGURATION}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Configuration');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveText('Configuration');
  await expect(page.getByTestId('breadcrumb')).toContainText('Guides');
});

test('table of contents links point to existing headings and navigate to them', async ({ page }) => {
  await page.goto(CONFIGURATION);
  const headingIds = await page
    .getByTestId('doc-body')
    .getByTestId('doc-heading')
    .evaluateAll((elements) => elements.map((element) => element.id));
  const tocLinks = page.getByTestId('toc').getByTestId('toc-link');
  const hrefs = await tocLinks.evaluateAll((elements) => elements.map((element) => element.getAttribute('href')));

  expect(hrefs.length).toBeGreaterThan(5);
  expect(hrefs).toEqual(headingIds.map((id) => `#${id}`));

  await tocLinks.filter({ hasText: 'Validating your config' }).click();
  await expect(page).toHaveURL(/#validating-your-config$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Validating your config' })).toBeInViewport();
});

test('reference page renders every content element type', async ({ page }) => {
  await page.goto(CONFIGURATION);
  const body = page.getByTestId('doc-body');
  await expect(body.getByTestId('callout')).toHaveCount(3);
  for (const variant of ['note', 'warning', 'danger']) {
    expect(await body.locator(`[data-testid="callout"][data-variant="${variant}"]`).count()).toBeGreaterThanOrEqual(1);
  }
  await expect(body.getByTestId('params-table')).toHaveCount(4);
  const header = body.getByTestId('params-table').first().getByRole('columnheader');
  await expect(header).toHaveText(['Name', 'Type', 'Default', 'Description']);
  await expect(body.getByTestId('params-table').first().getByTestId('param-row')).toHaveCount(5);
  await expect(body.getByTestId('steps-list').getByRole('listitem')).toHaveCount(3);
  await expect(body.getByTestId('kbd').filter({ hasText: 'Ctrl' })).toHaveCount(1);
  await expect(body.locator('code.inline-code').first()).toBeVisible();
  await expect(body.getByTestId('code-language').first()).toHaveText('json');
});

test('search filters pages by title and shows the empty state', async ({ page }) => {
  await page.goto('/');
  const search = page.getByTestId('doc-search');
  await expect(page.getByRole('searchbox', { name: 'Search docs' })).toBeVisible();

  await search.fill('api');
  const results = page.getByTestId('search-result');
  await expect(results).toHaveCount(2);
  await expect(results).toContainText(['Task API', 'Plugin API']);
  await expect(page.getByTestId('search-count')).toHaveText('2 results');

  await search.fill('zzzz no match');
  await expect(results).toHaveCount(0);
  await expect(page.getByTestId('search-empty')).toContainText('No results');

  await search.fill('install');
  await expect(results).toHaveCount(1);
  await results.first().click();
  await expect(page).toHaveURL(new RegExp(`${INSTALLATION}$`));
  await expect(page.getByTestId('doc-title')).toHaveText('Installation');
  await expect(search).toHaveValue('');
  await expect(page.getByTestId('search-panel')).toHaveCount(0);
});

test.describe('copy button', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('copies the code and shows "Copied" feedback for two seconds', async ({ page }) => {
    await page.goto(CONFIGURATION);
    const block = page.getByTestId('doc-body').getByTestId('code-block').first();
    const button = block.getByTestId('copy-button');
    await expect(button).toHaveText('Copy');
    await button.click();
    await expect(button).toHaveText('Copied');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('"concurrency": 4');
    await expect(button).toHaveText('Copy', { timeout: 4000 });
  });
});

test('copy button still shows feedback when the clipboard is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('blocked')) },
    });
  });
  await page.goto(INSTALLATION);
  const button = page.getByTestId('copy-button').first();
  await button.click();
  await expect(button).toHaveText('Copied');
});

test('package manager tabs switch the install command', async ({ page }) => {
  await page.goto(INSTALLATION);
  const tabs = page.getByTestId('pm-tabs').first();
  await expect(tabs.getByRole('tablist')).toBeVisible();
  await expect(tabs.getByTestId('pm-tab-npm')).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.getByTestId('pm-panel-npm')).toContainText('npm install --save-dev ferrule');
  await expect(tabs.getByTestId('pm-panel-pnpm')).toBeHidden();

  await tabs.getByTestId('pm-tab-pnpm').click();
  await expect(tabs.getByTestId('pm-tab-pnpm')).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.getByTestId('pm-tab-npm')).toHaveAttribute('aria-selected', 'false');
  await expect(tabs.getByTestId('pm-panel-pnpm')).toBeVisible();
  await expect(tabs.getByTestId('pm-panel-pnpm')).toContainText('pnpm add --save-dev ferrule');
  await expect(tabs.getByTestId('pm-panel-npm')).toBeHidden();

  await page.keyboard.press('ArrowRight');
  await expect(tabs.getByTestId('pm-tab-yarn')).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.getByTestId('pm-tab-yarn')).toBeFocused();
  await expect(tabs.getByTestId('pm-panel-yarn')).toContainText('yarn add --dev ferrule');
});

test('feedback buttons show a thank-you message', async ({ page }) => {
  await page.goto(INSTALLATION);
  const feedback = page.getByTestId('feedback');
  await expect(feedback.getByRole('heading', { name: 'Was this page helpful?' })).toBeVisible();
  await feedback.getByTestId('feedback-yes').click();
  await expect(feedback.getByTestId('feedback-thanks')).toContainText('Thanks for your feedback');
  await expect(feedback.getByTestId('feedback-yes')).toHaveCount(0);

  await page.goto(CONFIGURATION);
  await page.getByTestId('feedback-no').click();
  await expect(page.getByTestId('feedback-thanks')).toContainText('Thanks for letting us know');
});

test('previous and next links navigate between pages', async ({ page }) => {
  await page.goto(INSTALLATION);
  await expect(page.getByTestId('pager-prev')).toContainText('Introduction');
  await expect(page.getByTestId('pager-next')).toContainText('Quick start');

  await page.getByTestId('pager-next').click();
  await expect(page).toHaveURL(/\/docs\/getting-started\/quick-start$/);
  await expect(page.getByTestId('doc-title')).toHaveText('Quick start');

  await page.getByTestId('pager-next').click();
  await expect(page).toHaveURL(new RegExp(`${CONFIGURATION}$`));
  await expect(page.getByTestId('doc-title')).toHaveText('Configuration');

  await page.getByTestId('pager-prev').click();
  await expect(page).toHaveURL(/\/docs\/getting-started\/quick-start$/);

  await page.goto('/docs/getting-started/introduction');
  await expect(page.getByTestId('pager-prev')).toHaveCount(0);
  await expect(page.getByTestId('pager-next')).toContainText('Installation');
});

test('changelog lists releases newest first with tagged changes', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('nav-changelog').click();
  await expect(page).toHaveURL(/\/changelog$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Changelog' })).toBeVisible();
  await expect(page.getByTestId('release-version')).toHaveText(['v3.2.0', 'v3.1.1', 'v3.1.0', 'v3.0.0', 'v2.9.4']);
  await expect(page.getByTestId('release-date').first()).toHaveText('October 6, 2026');
  const badges = await page.getByTestId('change-badge').allTextContents();
  expect(new Set(badges)).toEqual(new Set(['Added', 'Fixed', 'Changed']));
  await expect(page.getByTestId('release').first().getByTestId('change-item')).toHaveCount(4);
});

test('unknown routes show the not found page', async ({ page }) => {
  await page.goto('/no-such-page');
  await expect(page.getByTestId('not-found')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();

  await page.goto('/docs/guides/no-such-guide');
  await expect(page.getByTestId('doc-not-found')).toBeVisible();
});

test.describe('narrow screens', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the sidebar becomes a drawer opened from the menu button', async ({ page }) => {
    await page.goto(INSTALLATION);
    const menu = page.getByTestId('menu-button');
    const sidebar = page.getByTestId('sidebar');
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(sidebar).toBeHidden();

    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(sidebar).toBeVisible();
    await expect(page.getByTestId('drawer-close')).toBeFocused();

    await page.getByTestId('drawer-close').click();
    await expect(sidebar).toBeHidden();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();

    await menu.click();
    await page.keyboard.press('Escape');
    await expect(sidebar).toBeHidden();

    await menu.click();
    await sidebar.getByTestId('sidebar-link').filter({ hasText: 'Caching' }).click();
    await expect(page).toHaveURL(/\/docs\/guides\/caching$/);
    await expect(sidebar).toBeHidden();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
  });

  test('the page does not scroll sideways', async ({ page }) => {
    for (const route of meta.routes.filter((item) => item.capture)) {
      await page.goto(route.path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, route.path).toBeLessThanOrEqual(1);
    }
  });
});

test('every captured route renders without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  for (const route of meta.routes) {
    await page.goto(route.path);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByTestId('not-found')).toHaveCount(0);
    await expect(page.getByTestId('doc-not-found')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
