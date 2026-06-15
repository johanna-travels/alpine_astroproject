import { test, expect } from '@playwright/test';

test.describe('Voyaflair Site Tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Voyaflair/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('nav links have correct hrefs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Check all nav links exist with correct hrefs (regardless of viewport visibility)
    await expect(page.locator('nav a[href="/contact/"]')).toHaveCount(1);
    await expect(page.locator('nav a[href="/destinations/"]')).toHaveCount(1);
    await expect(page.locator('nav a[href="/services/"]')).toHaveCount(1);
    await expect(page.locator('nav a[href="/about/"]')).toHaveCount(1);
  });

  test('all main pages load', async ({ page }) => {
    const pages = [
      { path: '/contact',      h1: /Contact/i },
      { path: '/destinations', h1: /Destination/i },
      { path: '/services',     h1: /Service/i },
      { path: '/about',        h1: /About/i },
    ];

    for (const { path, h1 } of pages) {
      await page.goto(`${path}/`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('h1').first()).toBeVisible();
      await expect(page.locator('h1').first()).toHaveText(h1);
    }
  });

  test('contact form is visible', async ({ page }) => {
    await page.goto('/contact/');
    await page.waitForLoadState('load');
    // First check element is in DOM (attached), then check visible
    await page.waitForSelector('#name', { state: 'attached', timeout: 15000 });
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('#contact-consent')).toBeAttached();
  });

  test('contact form validation works', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'webkit dev-mode form event quirk — works in real Safari');
    await page.goto('/contact/');
    // disabled={!hydrated} ensures click waits until React has mounted
    await page.click('button[type="submit"]', { timeout: 15000 });
    await expect(page.locator('#name[aria-invalid="true"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#email[aria-invalid="true"]')).toBeVisible({ timeout: 10000 });
  });

  test('article pages are accessible', async ({ page }) => {
    const articles = [
      '/articles/kyoto-itinerary',
      '/articles/bali-cafes',
      '/articles/rhodes-itinerary',
      '/articles/bruges-guide',
    ];

    for (const article of articles) {
      await page.goto(`${article}/`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('carousel links to article pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('#carousel');

    const links = page.locator('#carousel a.slide');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toMatch(/\/articles\//);
    }
  });

  test('mobile logo (VF) is visible on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('[data-testid="mobile-logo"]')).toBeVisible();
  });

  test('desktop logo (VOYAFLAIR) is visible on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('[data-testid="desktop-logo"]')).toBeVisible();
  });
});
