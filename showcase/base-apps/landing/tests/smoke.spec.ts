import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

interface StateStep {
  action: 'click' | 'hover' | 'focus' | 'fill' | 'press' | 'goto';
  testid?: string;
  value?: string;
}

interface AppMeta {
  routes: { path: string; name: string; capture: boolean }[];
  states: { name: string; route: string; steps: StateStep[] }[];
}

const meta = JSON.parse(readFileSync(new URL('../pigment.app.json', import.meta.url), 'utf8')) as AppMeta;

const MOBILE = { width: 390, height: 844 };

test('home renders every section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Meetings that book themselves' })).toBeVisible();
  await expect(page.getByTestId('hero-title')).toHaveText('Meetings that book themselves');
  await expect(page.getByTestId('hero-image').getByRole('img')).toBeVisible();
  await expect(page.getByTestId('logo-item')).toHaveCount(6);
  await expect(page.getByTestId('feature-card')).toHaveCount(6);
  await expect(page.getByTestId('step-item')).toHaveCount(3);
  await expect(page.getByTestId('stat-value')).toHaveText(['12,000+', '3.2M', '4.8/5']);
  await expect(page.getByTestId('testimonial')).toHaveCount(3);
  await expect(page.getByTestId('faq').getByTestId('faq-item')).toHaveCount(5);
  await expect(page.getByTestId('cta-band')).toBeVisible();
  await expect(page.getByTestId('footer-column')).toHaveCount(3);
});

test('hero and header calls to action lead to sign up and the how-it-works section', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('hero-secondary-cta').click();
  await expect(page).toHaveURL(/\/#how-it-works$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Set up in an afternoon' })).toBeInViewport();

  await page.getByTestId('hero-primary-cta').click();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Create your Hourglade account' })).toBeVisible();

  await page.getByTestId('brand-link').click();
  await page.getByTestId('header-signup').click();
  await expect(page).toHaveURL(/\/signup$/);
});

test('header navigation reaches pricing, customers and the features section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('menu-toggle')).toBeHidden();
  await page.getByTestId('nav-pricing').click();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(page.getByTestId('nav-pricing')).toHaveAttribute('aria-current', 'page');

  await page.getByTestId('nav-customers').click();
  await expect(page).toHaveURL(/\/customers$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Teams that run on Hourglade' })).toBeVisible();

  await page.getByTestId('nav-features').click();
  await expect(page).toHaveURL(/\/#features$/);
  await expect(page.getByRole('heading', { level: 2, name: /Everything scheduling needs/ })).toBeInViewport();
});

test('on a narrow screen the nav collapses into a menu that opens and closes', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto('/');
  const toggle = page.getByTestId('menu-toggle');
  await expect(page.getByTestId('primary-nav')).toBeHidden();
  await expect(page.getByTestId('header-signup')).toBeVisible();
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByTestId('mobile-nav')).toHaveCount(0);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByTestId('mobile-nav')).toBeVisible();
  await expect(page.getByTestId('mobile-nav').getByRole('link')).toHaveCount(4);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByTestId('mobile-nav')).toHaveCount(0);

  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();
  await page.getByTestId('mobile-nav-pricing').click();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByTestId('mobile-nav')).toHaveCount(0);
});

test('FAQ items expand and collapse', async ({ page }) => {
  await page.goto('/');
  const faq = page.getByTestId('faq');
  const toggles = faq.getByTestId('faq-toggle');
  const panels = faq.getByTestId('faq-panel');
  await expect(toggles).toHaveCount(5);
  for (const toggle of await toggles.all()) await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panels.first()).toBeHidden();

  await faq.getByRole('button', { name: 'Is there a free trial?' }).click();
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'true');
  await expect(panels.first()).toBeVisible();
  await expect(panels.first()).toContainText('14-day trial');

  await toggles.nth(1).click();
  await expect(panels.nth(1)).toBeVisible();
  await expect(panels.first()).toBeVisible();

  await toggles.first().click();
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'false');
  await expect(panels.first()).toBeHidden();
});

test('pricing toggle switches between monthly and yearly prices', async ({ page }) => {
  await page.goto('/pricing');
  await expect(page.getByRole('heading', { level: 1, name: 'Simple pricing for every team' })).toBeVisible();
  const cards = page.getByTestId('plan-card');
  await expect(cards).toHaveCount(3);
  await expect(page.getByTestId('plan-popular')).toHaveCount(1);
  await expect(cards.filter({ has: page.getByTestId('plan-popular') }).getByTestId('plan-name')).toHaveText('Team');
  await expect(page.getByTestId('billing-monthly')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('plan-price')).toHaveText(['$10', '$15', '$30']);

  await page.getByTestId('billing-yearly').click();
  await expect(page.getByTestId('billing-yearly')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('billing-monthly')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByTestId('plan-price')).toHaveText(['$8', '$12', '$24']);
  await expect(page.getByTestId('billing-note')).toHaveText('Billed yearly. You save 20%.');
  await expect(cards.nth(1).getByTestId('plan-billed')).toHaveText('$144 per user, billed yearly');

  await page.getByTestId('billing-monthly').click();
  await expect(page.getByTestId('plan-price')).toHaveText(['$10', '$15', '$30']);

  await cards.nth(1).getByTestId('plan-cta').click();
  await expect(page).toHaveURL(/\/signup$/);
});

test('pricing shows the comparison table and the billing FAQ', async ({ page }) => {
  await page.goto('/pricing');
  const table = page.getByTestId('comparison-table');
  await expect(table.getByRole('columnheader')).toHaveText(['Feature', 'Starter', 'Team', 'Business']);
  await expect(table.getByTestId('comparison-row')).toHaveCount(8);
  const sso = table.getByTestId('comparison-row').filter({ hasText: 'Single sign-on' });
  await expect(sso.getByTestId('comparison-cell')).toHaveText(['—Not included', '—Not included', '✓Included']);

  const faq = page.getByTestId('pricing-faq');
  await expect(faq.getByTestId('faq-item')).toHaveCount(3);
  await faq.getByTestId('faq-toggle').last().click();
  await expect(faq.getByTestId('faq-panel').last()).toBeVisible();
});

test('customer stories filter by industry', async ({ page }) => {
  await page.goto('/customers');
  await expect(page.getByTestId('featured-quote')).toContainText('Marisol Ortega');
  const cards = page.getByTestId('case-study-card');
  await expect(cards).toHaveCount(8);
  await expect(page.getByTestId('customer-count')).toHaveText('Showing 8 of 8 customers');
  await expect(page.getByTestId('industry-filter-all')).toHaveAttribute('aria-pressed', 'true');

  await page.getByTestId('industry-filter-education').click();
  await expect(page.getByTestId('industry-filter-education')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('industry-filter-all')).toHaveAttribute('aria-pressed', 'false');
  await expect(cards).toHaveCount(2);
  await expect(page.getByTestId('customer-count')).toHaveText('Showing 2 of 8 customers');
  for (const card of await cards.all()) await expect(card.getByTestId('case-study-industry')).toHaveText('Education');

  await page.getByTestId('industry-filter-logistics').click();
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Kestrel Freight');

  await page.getByTestId('industry-filter-all').click();
  await expect(cards).toHaveCount(8);
});

test('signup validates every field, toggles the password and confirms a valid submit', async ({ page }) => {
  await page.goto('/signup');
  await page.getByTestId('signup-submit').click();
  await expect(page.getByTestId('signup-name-error')).toHaveText('Enter your name.');
  await expect(page.getByTestId('signup-email-error')).toHaveText('Enter your work email.');
  await expect(page.getByTestId('signup-size-error')).toHaveText('Choose your company size.');
  await expect(page.getByTestId('signup-password-error')).toHaveText('Create a password.');
  await expect(page.getByTestId('signup-terms-error')).toHaveText('Accept the terms to continue.');
  await expect(page.getByTestId('signup-name')).toBeFocused();
  await expect(page.getByTestId('signup-success')).toHaveCount(0);

  await page.getByRole('textbox', { name: 'Full name' }).fill('Robin Example');
  await expect(page.getByTestId('signup-name-error')).toHaveCount(0);
  await page.getByTestId('signup-email').fill('robin@');
  await expect(page.getByTestId('signup-email-error')).toContainText('valid email');
  await expect(page.getByTestId('signup-email')).toHaveAttribute('aria-invalid', 'true');
  await page.getByTestId('signup-email').fill('robin@example.com');
  await page.getByLabel('Company size').selectOption('11-50');
  await page.getByTestId('signup-password').fill('short');
  await expect(page.getByTestId('signup-password-error')).toContainText('at least 8 characters');

  const password = page.getByTestId('signup-password');
  const reveal = page.getByTestId('signup-password-toggle');
  await expect(password).toHaveAttribute('type', 'password');
  await reveal.click();
  await expect(password).toHaveAttribute('type', 'text');
  await expect(reveal).toHaveAttribute('aria-pressed', 'true');
  await reveal.click();
  await expect(password).toHaveAttribute('type', 'password');

  await password.fill('calendar42');
  await page.getByTestId('signup-submit').click();
  await expect(page.getByTestId('signup-terms')).toBeFocused();
  await expect(page.getByTestId('signup-success')).toHaveCount(0);

  await page.getByRole('checkbox', { name: /I agree to the terms/ }).check();
  await page.getByTestId('signup-submit').click();
  await expect(page.getByTestId('signup-success')).toBeVisible();
  await expect(page.getByTestId('signup-success-email')).toHaveText('robin@example.com');
  await expect(page.getByTestId('signup-form')).toHaveCount(0);
});

test('footer newsletter validates the email and then confirms', async ({ page }) => {
  await page.goto('/pricing');
  const email = page.getByTestId('newsletter-email');
  await expect(page.getByRole('textbox', { name: 'Email for updates' })).toBeVisible();

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

test('footer links lead to existing pages', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.getByTestId('footer-link').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of new Set(hrefs)) {
    await page.goto(href ?? '/');
    await expect(page.getByTestId('not-found')).toHaveCount(0);
  }
});

test('unknown routes show the 404 page', async ({ page }) => {
  await page.goto('/no-such-page');
  await expect(page.getByTestId('not-found')).toBeVisible();
  await page.getByTestId('not-found-home').click();
  await expect(page.getByTestId('hero')).toBeVisible();
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

/** What each harness state must leave on screen, so the state screenshots show what they are named after. */
const STATE_RESULTS: Record<string, (page: Page) => Promise<void>> = {
  'signup-error': (page) => expect(page.getByTestId('signup-email-error')).toBeVisible(),
  'signup-success': (page) => expect(page.getByTestId('signup-success')).toBeVisible(),
  'pricing-yearly': (page) => expect(page.getByTestId('plan-price').nth(1)).toHaveText('$12'),
  'faq-open': (page) => expect(page.getByTestId('faq-panel').first()).toBeVisible(),
  'customers-filtered': (page) => expect(page.getByTestId('case-study-card')).toHaveCount(2),
  'newsletter-error': (page) => expect(page.getByTestId('newsletter-error')).toBeVisible(),
};

for (const viewport of ['desktop', 'mobile'] as const) {
  test(`every harness state runs on ${viewport}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      baseURL,
      viewport: viewport === 'desktop' ? { width: 1440, height: 900 } : MOBILE,
      isMobile: viewport === 'mobile',
    });
    try {
      for (const state of meta.states) {
        const page = await context.newPage();
        await page.goto(state.route);
        for (const step of state.steps) {
          const target = step.testid ? page.getByTestId(step.testid).first() : null;
          if (step.action === 'goto') await page.goto(step.value ?? '/');
          else if (step.action === 'press') await page.keyboard.press(step.value ?? 'Tab');
          else if (!target) throw new Error(`${state.name}: step ${step.action} has no testid`);
          else if (step.action === 'click') await target.click({ timeout: 5_000 });
          else if (step.action === 'hover') await target.hover({ timeout: 5_000 });
          else if (step.action === 'focus') await target.focus({ timeout: 5_000 });
          else if (step.action === 'fill') await target.fill(step.value ?? '', { timeout: 5_000 });
        }
        await STATE_RESULTS[state.name]?.(page);
        await page.close();
      }
    } finally {
      await context.close();
    }
  });
}
