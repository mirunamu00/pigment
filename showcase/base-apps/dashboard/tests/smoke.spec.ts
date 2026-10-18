import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

interface AppMeta {
  routes: { path: string; name: string; capture: boolean }[];
}

const meta = JSON.parse(readFileSync(new URL('../pigment.app.json', import.meta.url), 'utf8')) as AppMeta;

test('overview shows KPIs, chart, activity and the full projects table', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Overview' })).toBeVisible();
  await expect(page.getByTestId('kpi-card')).toHaveCount(4);
  await expect(page.getByTestId('chart-bar')).toHaveCount(6);
  await expect(page.getByTestId('activity-item')).toHaveCount(5);
  await expect(page.getByTestId('project-row')).toHaveCount(8);
  await expect(page.getByTestId('result-count')).toHaveText('Showing 8 of 8 projects');
});

test('refresh shows a loading state, then the metrics again', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('refresh-metrics').click();
  await expect(page.getByTestId('kpi-card-loading')).toHaveCount(4);
  await expect(page.getByTestId('kpi-grid')).toHaveAttribute('aria-busy', 'true');
  await expect(page.getByTestId('refresh-metrics')).toBeDisabled();
  await expect(page.getByTestId('kpi-card')).toHaveCount(4);
  await expect(page.getByTestId('kpi-grid')).toHaveAttribute('aria-busy', 'false');
  await expect(page.getByTestId('refresh-metrics')).toHaveText('Refresh');
});

test('status filter reduces the table to matching rows', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('status-filter-paused').click();
  await expect(page.getByTestId('status-filter-paused')).toHaveAttribute('aria-pressed', 'true');
  const rows = page.getByTestId('project-row');
  await expect(rows).toHaveCount(2);
  for (const pill of await page.getByTestId('status-pill').all()) {
    await expect(pill).toHaveText('Paused');
  }
  await page.getByTestId('status-filter-all').click();
  await expect(rows).toHaveCount(8);
});

test('text search filters rows and shows the empty state when nothing matches', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('project-search').fill('billing');
  await expect(page.getByTestId('project-row')).toHaveCount(1);
  await expect(page.getByTestId('project-row')).toContainText('Billing Revamp');

  await page.getByTestId('project-search').fill('no-such-project-xyz');
  await expect(page.getByTestId('project-row')).toHaveCount(0);
  await expect(page.getByTestId('projects-empty')).toBeVisible();

  await page.getByTestId('clear-filters').click();
  await expect(page.getByTestId('project-row')).toHaveCount(8);
});

test('clicking a column header sorts the table and toggles direction', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('sort-budget').click();
  await expect(page.getByTestId('column-budget')).toHaveAttribute('aria-sort', 'ascending');
  await expect(page.getByTestId('project-row').first()).toContainText('Data Retention Policy');

  await page.getByTestId('sort-budget').click();
  await expect(page.getByTestId('column-budget')).toHaveAttribute('aria-sort', 'descending');
  await expect(page.getByTestId('project-row').first()).toContainText('Apollo Migration');
});

test('project detail opens from the table and tabs switch panels', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('project-link').filter({ hasText: 'Apollo Migration' }).click();
  await expect(page).toHaveURL(/\/projects\/apollo-migration$/);
  await expect(page.getByTestId('project-title')).toHaveText('Apollo Migration');
  await expect(page.getByTestId('panel-overview')).toBeVisible();

  await page.getByTestId('tab-files').click();
  await expect(page.getByTestId('tab-files')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('file-row')).toHaveCount(3);
});

test('toggling a task updates the progress count', async ({ page }) => {
  await page.goto('/projects/apollo-migration');
  await page.getByTestId('tab-tasks').click();
  await expect(page.getByTestId('task-progress')).toHaveText('2 of 6 tasks complete');

  const checkbox = page.getByTestId('task-checkbox-t3');
  await expect(checkbox).not.toBeChecked();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await expect(page.getByTestId('task-progress')).toHaveText('3 of 6 tasks complete');

  await page.getByTestId('task-checkbox-t1').uncheck();
  await expect(page.getByTestId('task-progress')).toHaveText('2 of 6 tasks complete');
});

test('sidebar navigation and global search route correctly', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('nav-team').click();
  await expect(page).toHaveURL(/\/team$/);
  await expect(page.getByTestId('team-row')).toHaveCount(6);

  await page.getByTestId('global-search').fill('vendor');
  await page.getByTestId('global-search-submit').click();
  await expect(page).toHaveURL(/\/projects\?q=vendor$/);
  await expect(page.getByTestId('project-row')).toHaveCount(1);
  await expect(page.getByTestId('project-row')).toContainText('Vendor Portal');
});

test('user menu opens and closes', async ({ page }) => {
  await page.goto('/');
  const button = page.getByTestId('user-menu-button');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByTestId('user-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('user-menu')).toHaveCount(0);
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
  }
  expect(errors).toEqual([]);
});
