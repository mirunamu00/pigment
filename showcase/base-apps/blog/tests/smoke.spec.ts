import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

interface AppMeta {
  routes: { path: string; name: string; capture: boolean }[];
}

const meta = JSON.parse(readFileSync(new URL('../pigment.app.json', import.meta.url), 'utf8')) as AppMeta;

const FEATURED_SLUG = 'shipping-a-design-system';
const FEATURED_TITLE = 'What We Learned Shipping a Design System to Twelve Teams';

test('home shows the featured post and the full post list', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Field Notes' })).toBeVisible();
  await expect(page.getByTestId('featured-post')).toContainText(FEATURED_TITLE);
  await expect(page.getByTestId('post-card')).toHaveCount(6);
  await expect(page.getByTestId('result-count')).toHaveText('Showing 6 of 6 posts');
  await expect(page.getByTestId('tag-filter-all')).toHaveAttribute('aria-pressed', 'true');
});

test('tag filter narrows the list and search shows the empty state', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('tag-filter-remote-work').click();
  await expect(page.getByTestId('tag-filter-remote-work')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('tag-filter-all')).toHaveAttribute('aria-pressed', 'false');
  const cards = page.getByTestId('post-card');
  await expect(cards).toHaveCount(2);
  for (const card of await cards.all()) {
    await expect(card.getByTestId('post-tag').filter({ hasText: 'Remote work' })).toHaveCount(1);
  }

  await page.getByTestId('post-search').fill('no-such-post-xyz');
  await expect(cards).toHaveCount(0);
  await expect(page.getByTestId('posts-empty')).toBeVisible();

  await page.getByTestId('clear-filters').click();
  await expect(cards).toHaveCount(6);
  await expect(page.getByTestId('tag-filter-all')).toHaveAttribute('aria-pressed', 'true');
});

test('featured post link opens the article', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('featured-post-link').click();
  await expect(page).toHaveURL(new RegExp(`/posts/${FEATURED_SLUG}$`));
  await expect(page.getByTestId('article-title')).toHaveText(FEATURED_TITLE);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(FEATURED_TITLE);
});

test('article renders metadata and every body element type', async ({ page }) => {
  await page.goto(`/posts/${FEATURED_SLUG}`);
  const article = page.getByRole('article').filter({ has: page.getByTestId('article-title') });
  await expect(article).toBeVisible();
  await expect(page.getByTestId('article-author')).toHaveText('Maya Okafor');
  await expect(page.getByTestId('article-date')).toHaveText('September 28, 2026');
  await expect(page.getByTestId('article-reading-time')).toHaveText(/^\d+ min read$/);

  const body = page.getByTestId('article-body');
  await expect(body.getByTestId('body-heading')).toHaveCount(5);
  await expect(body.getByRole('heading', { level: 2, name: 'Start with an inventory' })).toBeVisible();
  expect(await body.getByTestId('body-paragraph').count()).toBeGreaterThanOrEqual(8);
  await expect(body.getByTestId('body-quote')).toHaveCount(1);
  await expect(body.getByTestId('body-code')).toContainText('ui-codemods');
  await expect(body.getByTestId('body-ordered-list').getByRole('listitem')).toHaveCount(5);
  await expect(body.getByTestId('body-figure').getByRole('img')).toBeVisible();
  await expect(body.getByTestId('figure-caption')).toHaveText(
    'The inventory board after grouping: forty-one buttons, six actual jobs.',
  );
});

test('table of contents links point to existing headings and navigate to them', async ({ page }) => {
  await page.goto(`/posts/${FEATURED_SLUG}`);
  const headingIds = await page
    .getByTestId('body-heading')
    .evaluateAll((elements) => elements.map((element) => element.id));
  const tocLinks = page.getByTestId('toc').getByTestId('toc-link');
  const hrefs = await tocLinks.evaluateAll((elements) => elements.map((element) => element.getAttribute('href')));

  expect(hrefs.length).toBeGreaterThan(0);
  expect(hrefs).toEqual(headingIds.map((id) => `#${id}`));

  await tocLinks.filter({ hasText: 'What we would do again' }).click();
  await expect(page).toHaveURL(/#what-we-would-do-again$/);
  await expect(page.getByRole('heading', { level: 2, name: 'What we would do again' })).toBeInViewport();
});

test('related posts link to other articles', async ({ page }) => {
  await page.goto(`/posts/${FEATURED_SLUG}`);
  const related = page.getByTestId('related-posts');
  await expect(related.getByTestId('related-post')).toHaveCount(3);
  await related.getByTestId('related-post-link').filter({ hasText: 'The Case for Smaller Pull Requests' }).click();
  await expect(page).toHaveURL(/\/posts\/smaller-pull-requests$/);
  await expect(page.getByTestId('article-title')).toHaveText('The Case for Smaller Pull Requests');
});

test('newsletter form validates the email and then confirms the subscription', async ({ page }) => {
  await page.goto('/');
  const email = page.getByTestId('newsletter-email');
  await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();

  await page.getByTestId('newsletter-submit').click();
  await expect(page.getByTestId('newsletter-error')).toHaveText('Enter your email address.');

  await email.fill('not-an-email');
  await page.getByTestId('newsletter-submit').click();
  await expect(page.getByTestId('newsletter-error')).toContainText('valid email');
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByTestId('newsletter-success')).toHaveCount(0);

  await email.fill('reader@example.com');
  await page.getByTestId('newsletter-submit').click();
  await expect(page.getByTestId('newsletter-success')).toContainText('reader@example.com');
  await expect(page.getByTestId('newsletter-error')).toHaveCount(0);
});

test('about page opens from the header navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('nav-about').click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1, name: 'About Field Notes' })).toBeVisible();
  await expect(page.getByTestId('author-card')).toHaveCount(3);

  await page.getByTestId('nav-home').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId('featured-post')).toBeVisible();
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
    await expect(page.getByTestId('post-not-found')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
