import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

interface AppMeta {
  routes: { path: string; name: string; capture: boolean }[];
}

const meta = JSON.parse(readFileSync(new URL('../pigment.app.json', import.meta.url), 'utf8')) as AppMeta;

test('root redirects to profile and the side nav switches sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/settings\/profile$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Profile' })).toBeVisible();
  await expect(page.getByTestId('nav-profile')).toHaveAttribute('aria-current', 'page');

  const sections = [
    { testId: 'nav-notifications', path: /\/settings\/notifications$/, heading: 'Notifications' },
    { testId: 'nav-security', path: /\/settings\/security$/, heading: 'Security' },
    { testId: 'nav-billing', path: /\/settings\/billing$/, heading: 'Billing' },
    { testId: 'nav-profile', path: /\/settings\/profile$/, heading: 'Profile' },
  ];
  for (const section of sections) {
    await page.getByTestId(section.testId).click();
    await expect(page).toHaveURL(section.path);
    await expect(page.getByRole('heading', { level: 1, name: section.heading })).toBeVisible();
    await expect(page.getByTestId(section.testId)).toHaveAttribute('aria-current', 'page');
  }
});

test('profile shows validation errors, then a saved status once fixed', async ({ page }) => {
  await page.goto('/settings/profile');
  await expect(page.getByTestId('profile-avatar')).toHaveText('JL');
  const status = page.getByRole('status');
  await expect(status).toHaveText('');

  await page.getByTestId('profile-name').fill('');
  await page.getByTestId('profile-email').fill('not-an-email');
  await page.getByTestId('profile-save').click();
  await expect(page.getByTestId('error-name')).toHaveText('Enter your full name.');
  await expect(page.getByTestId('error-email')).toContainText('Enter a valid email address');
  await expect(page.getByTestId('profile-name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByTestId('profile-name')).toBeFocused();
  await expect(status).toHaveText('');

  await page.getByTestId('profile-name').fill('Avery Stone');
  await page.getByTestId('profile-email').fill('avery@example.com');
  await page.getByTestId('profile-timezone').selectOption('Europe/London');
  await page.getByTestId('profile-bio').fill('Hello there.');
  await expect(page.getByTestId('bio-count')).toHaveText('12 / 160 characters');
  await page.getByTestId('profile-save').click();
  await expect(page.getByTestId('error-name')).toHaveCount(0);
  await expect(page.getByTestId('error-email')).toHaveCount(0);
  await expect(status).toHaveText('Saved');
  await expect(page.getByTestId('profile-avatar')).toHaveText('AS');
});

test('notification switches toggle their checked state', async ({ page }) => {
  await page.goto('/settings/notifications');
  await expect(page.getByRole('group', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('switch')).toHaveCount(6);
  await expect(page.getByTestId('notifications-count')).toHaveText('3 of 6 notifications on');

  const summary = page.getByRole('switch', { name: 'Weekly summary' });
  await expect(summary).not.toBeChecked();
  await summary.click();
  await expect(summary).toBeChecked();
  await expect(page.getByTestId('notifications-count')).toHaveText('4 of 6 notifications on');

  const mentions = page.getByTestId('switch-push-mentions');
  await expect(mentions).toBeChecked();
  await mentions.press('Space');
  await expect(mentions).not.toBeChecked();
  await expect(page.getByTestId('notifications-count')).toHaveText('3 of 6 notifications on');
});

test('password change shows a mismatch error, then succeeds', async ({ page }) => {
  await page.goto('/settings/security');
  const strength = page.getByTestId('password-strength');
  await expect(strength).toHaveAttribute('data-level', 'none');

  await page.getByTestId('password-current').fill('old-password-1');
  await page.getByTestId('password-new').fill('short');
  await expect(strength).toHaveText('Strength: Too short');
  await page.getByTestId('password-new').fill('Better-Passw0rd');
  await expect(strength).toHaveText('Strength: Strong');
  await page.getByTestId('password-confirm').fill('Better-Passw0rd!');
  await page.getByTestId('password-submit').click();
  await expect(page.getByTestId('error-password-confirm')).toHaveText('Passwords do not match.');
  await expect(page.getByTestId('password-status')).toHaveText('');

  await page.getByTestId('password-confirm').fill('Better-Passw0rd');
  await page.getByTestId('password-submit').click();
  await expect(page.getByTestId('error-password-confirm')).toHaveCount(0);
  await expect(page.getByTestId('password-status')).toHaveText('Password updated');
  await expect(page.getByTestId('password-new')).toHaveValue('');
});

test('revoking a session removes its row', async ({ page }) => {
  await page.goto('/settings/security');
  const rows = page.getByTestId('session-row');
  await expect(rows).toHaveCount(4);
  await expect(page.getByTestId('current-session')).toHaveCount(1);

  await page.getByTestId('revoke-s3').click();
  await expect(rows).toHaveCount(3);
  await expect(page.getByTestId('sessions-table')).not.toContainText('Firefox on Ubuntu');
  await expect(page.getByTestId('sessions-status')).toHaveText('Signed out of Firefox on Ubuntu.');

  await page.getByRole('button', { name: 'Revoke Safari on iPhone' }).click();
  await page.getByTestId('revoke-s4').click();
  await expect(rows).toHaveCount(1);
  await expect(page.getByTestId('sessions-empty')).toBeVisible();
});

test('change-plan dialog cancels, closes with Escape, and confirms', async ({ page }) => {
  await page.goto('/settings/billing');
  await expect(page.getByTestId('invoice-row')).toHaveCount(5);
  await expect(page.getByTestId('plan-card-pro')).toHaveAttribute('data-current', 'true');
  await expect(page.getByTestId('plan-card-pro')).toContainText('Current plan');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveCount(0);

  // Cancel keeps the current plan.
  await page.getByTestId('choose-plan-business').click();
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Switch to the Business plan?');
  await expect(page.getByTestId('plan-dialog-cancel')).toBeFocused();
  await page.getByTestId('plan-dialog-cancel').click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('current-plan-name')).toHaveText('Pro');

  // Escape closes it too.
  await page.getByTestId('choose-plan-free').click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('plan-card-pro')).toHaveAttribute('data-current', 'true');

  // Confirm switches the plan.
  await page.getByTestId('choose-plan-business').click();
  await page.getByTestId('plan-dialog-confirm').click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('current-plan-name')).toHaveText('Business');
  await expect(page.getByTestId('plan-card-business')).toHaveAttribute('data-current', 'true');
  await expect(page.getByTestId('plan-card-business')).toContainText('Current plan');
  await expect(page.getByTestId('plan-card-pro')).toHaveAttribute('data-current', 'false');
  await expect(page.getByTestId('choose-plan-pro')).toBeVisible();
  await expect(page.getByTestId('plan-status')).toHaveText('Your plan is now Business.');
});

test('unknown settings sections show the not-found page', async ({ page }) => {
  await page.goto('/settings/does-not-exist');
  await expect(page.getByTestId('not-found')).toBeVisible();
  await expect(page.getByTestId('settings-nav')).toBeVisible();
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
