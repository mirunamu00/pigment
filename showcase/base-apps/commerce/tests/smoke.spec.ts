import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

interface AppMeta {
  routes: { path: string; name: string; capture: boolean }[];
}

const meta = JSON.parse(readFileSync(new URL('../pigment.app.json', import.meta.url), 'utf8')) as AppMeta;

/** Adds the Canvas Field Tote to the cart from its detail page and opens the cart. */
async function addToteAndOpenCart(page: Page) {
  await page.goto('/products/canvas-field-tote');
  await page.getByTestId('add-to-cart').click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await page.getByTestId('cart-button').click();
  await expect(page).toHaveURL(/\/cart$/);
}

test('product grid renders every product with a header cart badge at zero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Shop all goods' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  await expect(page.getByTestId('product-card')).toHaveCount(11);
  await expect(page.getByTestId('result-count')).toHaveText('Showing 11 products');
  await expect(page.getByTestId('category-filter-all')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('cart-count')).toHaveText('0');
});

test('category chips filter the grid', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('category-filter-apparel').click();
  await expect(page.getByTestId('category-filter-apparel')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('category-filter-all')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByTestId('product-card')).toHaveCount(3);
  await expect(page.getByTestId('product-link')).toHaveText([
    'Merino Crew Sweater',
    'Heavyweight Pocket Tee',
    'Cotton Chore Coat',
  ]);

  await page.getByTestId('category-filter-all').click();
  await expect(page.getByTestId('product-card')).toHaveCount(11);
});

test('sort select orders products by price and name', async ({ page }) => {
  await page.goto('/');
  const sort = page.getByTestId('sort-select');
  const firstName = page.getByTestId('product-link').first();
  const firstPrice = page.getByTestId('product-price').first();

  await sort.selectOption('price-asc');
  await expect(firstName).toHaveText('Leather Key Ring');
  await expect(firstPrice).toHaveText('$16.00');

  await sort.selectOption('price-desc');
  await expect(firstName).toHaveText('Weekender Duffel');
  await expect(firstPrice).toHaveText('$148.00');

  await sort.selectOption('name');
  await expect(firstName).toHaveText('Canvas Field Tote');
  await expect(page.getByTestId('product-link').last()).toHaveText('Weekender Duffel');
});

test('filters with no matches show the empty state and clear restores the grid', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('category-filter-accessories').click();
  await expect(page.getByTestId('product-card')).toHaveCount(2);
  await page.getByTestId('in-stock-toggle').check();
  await expect(page.getByTestId('product-card')).toHaveCount(0);
  await expect(page.getByTestId('products-empty')).toBeVisible();
  await expect(page.getByTestId('result-count')).toHaveText('Showing 0 products');

  await page.getByTestId('clear-filters').click();
  await expect(page.getByTestId('product-card')).toHaveCount(11);
  await expect(page.getByTestId('in-stock-toggle')).not.toBeChecked();
});

test('product card opens the detail page with variants and quantity', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('product-link').filter({ hasText: 'Merino Crew Sweater' }).click();
  await expect(page).toHaveURL(/\/products\/merino-crew-sweater$/);
  await expect(page.getByTestId('product-title')).toHaveText('Merino Crew Sweater');
  await expect(page.getByTestId('product-detail-price')).toHaveText('$88.00');
  await expect(page.getByTestId('product-image')).toBeVisible();

  await expect(page.getByTestId('variant-option-s')).toBeChecked();
  await page.getByTestId('variant-option-l').check();
  await expect(page.getByTestId('variant-option-l')).toBeChecked();
  await expect(page.getByTestId('variant-option-s')).not.toBeChecked();

  await expect(page.getByTestId('quantity-input')).toHaveValue('1');
  await expect(page.getByTestId('quantity-decrement')).toBeDisabled();
  await page.getByTestId('quantity-increment').click();
  await expect(page.getByTestId('quantity-input')).toHaveValue('2');

  await page.goto('/products/leather-key-ring');
  await expect(page.getByTestId('add-to-cart')).toBeDisabled();
});

test('adding to cart increments the header badge', async ({ page }) => {
  await page.goto('/products/merino-crew-sweater');
  await expect(page.getByTestId('cart-count')).toHaveText('0');

  await page.getByTestId('variant-option-m').check();
  await page.getByTestId('quantity-increment').click();
  await page.getByTestId('add-to-cart').click();
  await expect(page.getByTestId('cart-count')).toHaveText('2');
  await expect(page.getByTestId('added-message')).toContainText('Added 2 items');

  await page.getByTestId('add-to-cart').click();
  await expect(page.getByTestId('cart-count')).toHaveText('3');

  await page.getByTestId('cart-button').click();
  await expect(page.getByTestId('cart-line')).toHaveCount(1);
  await expect(page.getByTestId('cart-line-variant')).toHaveText('Size: M');
  await expect(page.getByTestId('line-quantity-input')).toHaveValue('3');
});

test('changing a line quantity updates subtotal, shipping and total', async ({ page }) => {
  await addToteAndOpenCart(page);
  await expect(page.getByTestId('cart-subtotal')).toHaveText('$48.00');
  await expect(page.getByTestId('cart-shipping')).toHaveText('$8.00');
  await expect(page.getByTestId('cart-total')).toHaveText('$56.00');

  await page.getByTestId('line-quantity-increment').click();
  await expect(page.getByTestId('line-total')).toHaveText('$96.00');
  await expect(page.getByTestId('cart-total')).toHaveText('$104.00');

  await page.getByTestId('line-quantity-increment').click();
  await expect(page.getByTestId('cart-subtotal')).toHaveText('$144.00');
  await expect(page.getByTestId('cart-shipping')).toHaveText('Free');
  await expect(page.getByTestId('cart-total')).toHaveText('$144.00');
  await expect(page.getByTestId('cart-count')).toHaveText('3');

  await page.getByTestId('line-quantity-decrement').click();
  await expect(page.getByTestId('cart-total')).toHaveText('$104.00');
});

test('removing the last item shows the empty cart', async ({ page }) => {
  await addToteAndOpenCart(page);
  await expect(page.getByTestId('cart-line')).toHaveCount(1);
  await page.getByTestId('line-remove').click();
  await expect(page.getByTestId('cart-line')).toHaveCount(0);
  await expect(page.getByTestId('cart-empty')).toBeVisible();
  await expect(page.getByTestId('cart-count')).toHaveText('0');
});

test('checkout shows validation errors, then a confirmation', async ({ page }) => {
  await addToteAndOpenCart(page);

  await page.getByTestId('place-order').click();
  await expect(page.getByTestId('error-name')).toHaveText('Enter your full name.');
  await expect(page.getByTestId('error-email')).toHaveText('Enter your email address.');
  await expect(page.getByTestId('error-address')).toHaveText('Enter a shipping address.');
  await expect(page.getByTestId('checkout-name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByTestId('checkout-name')).toBeFocused();

  await page.getByTestId('checkout-name').fill('Jordan Lee');
  await page.getByTestId('checkout-email').fill('jordan@example');
  await page.getByTestId('place-order').click();
  await expect(page.getByTestId('error-name')).toHaveCount(0);
  await expect(page.getByTestId('error-email')).toHaveText('Enter an email address like name@example.com.');
  await expect(page.getByTestId('order-confirmation')).toHaveCount(0);

  await page.getByTestId('checkout-email').fill('jordan@example.com');
  await page.getByTestId('checkout-address').fill('12 Harbor Road, Portland, ME 04101');
  await page.getByTestId('place-order').click();
  await expect(page.getByTestId('order-confirmation')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Thank you for your order' })).toBeVisible();
  await expect(page.getByTestId('confirmation-total')).toHaveText('$56.00');
  await expect(page.getByTestId('cart-count')).toHaveText('0');
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
    await expect(page.getByTestId('product-not-found')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
