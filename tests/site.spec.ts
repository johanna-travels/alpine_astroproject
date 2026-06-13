import { test, expect } from '@playwright/test';

const BASE = '/alpine_astroproject';

test.describe('Voyaflair Site Tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Alpine AstroProject/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('nav links have correct hrefs', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.waitForLoadState('domcontentloaded');
    // Check all nav links exist with correct hrefs (regardless of viewport visibility)
    await expect(page.locator(`nav a[href="${BASE}/contact"]`)).toHaveCount(1);
    await expect(page.locator(`nav a[href="${BASE}/destinations"]`)).toHaveCount(1);
    await expect(page.locator(`nav a[href="${BASE}/services"]`)).toHaveCount(1);
    await expect(page.locator(`nav a[href="${BASE}/about"]`)).toHaveCount(1);
  });

  test('all main pages load', async ({ page }) => {
    const pages = [
      { path: '/contact',      h1: /Contact/i },
      { path: '/destinations', h1: /Destination/i },
      { path: '/services',     h1: /Service/i },
      { path: '/about',        h1: /About/i },
    ];

    for (const { path, h1 } of pages) {
      await page.goto(BASE + path);
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('h1').first()).toBeVisible();
      await expect(page.locator('h1').first()).toHaveText(h1);
    }
  });

  test('contact form is visible', async ({ page }) => {
    await page.goto(BASE + '/contact');
    await page.waitForLoadState('load');
    // First check element is in DOM (attached), then check visible
    await page.waitForSelector('#name', { state: 'attached', timeout: 15000 });
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('#contact-consent')).toBeAttached();
  });

  test('contact form validation works', async ({ page }) => {
    await page.goto(BASE + '/contact');
    await page.waitForSelector('button[type="submit"]', { state: 'visible', timeout: 15000 });
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Please enter your full name.')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Please enter your email address.')).toBeVisible({ timeout: 10000 });
  });

  test('article pages are accessible', async ({ page }) => {
    const articles = [
      '/articles/kyoto-itinerary',
      '/articles/bali-cafes',
      '/articles/rhodes-itinerary',
      '/articles/bruges-guide',
    ];

    for (const article of articles) {
      await page.goto(BASE + article);
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('carousel links to article pages', async ({ page }) => {
    await page.goto(BASE + '/');
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
    await page.goto(BASE + '/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('[data-testid="mobile-logo"]')).toBeVisible();
  });

  test('desktop logo (VOYAFLAIR) is visible on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE + '/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('[data-testid="desktop-logo"]')).toBeVisible();
  });
});
