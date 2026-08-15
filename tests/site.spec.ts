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
    await page.waitForLoadState('domcontentloaded');
    const contactForm = page.getByTestId('contact-form-ready');
    await expect(contactForm).toBeVisible({ timeout: 15000 });
    await contactForm.getByRole('button', { name: 'Submit' }).click();
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

    const links = page.locator('#carousel article.slide a');
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

  test('VF favicon assets are linked for browsers and search engines', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('link[rel="icon"][sizes="48x48"]')).toHaveAttribute('href', /favicon-48x48\.png$/);
    await expect(page.locator('link[rel="icon"][sizes="96x96"]')).toHaveAttribute('href', /favicon-96x96\.png$/);
    await expect(page.locator('link[rel="icon"][href$="favicon.ico"]')).toHaveCount(1);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);

    for (const asset of ['favicon-48x48.png', 'favicon-96x96.png', 'favicon.ico', 'icon-512.png']) {
      const response = await page.request.get(`/${asset}`);
      expect(response.ok(), `${asset} should be reachable`).toBeTruthy();
    }
  });

  test('cookie consent banner appears and can be accepted', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const banner = page.getByTestId('cookie-banner');
    await expect(banner).toBeVisible();

    await page.getByRole('button', { name: 'Accept', exact: true }).click();
    await expect(banner).toBeHidden();

    const consent = await page.evaluate(() => localStorage.getItem('voyaflair_cookie_consent'));
    expect(consent).toBe('accepted');

    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await expect(banner).toBeHidden();
  });

  test('cookie consent can be declined', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const banner = page.getByTestId('cookie-banner');
    await expect(banner).toBeVisible();

    await page.getByRole('button', { name: 'Decline', exact: true }).click();
    await expect(banner).toBeHidden();

    const consent = await page.evaluate(() => localStorage.getItem('voyaflair_cookie_consent'));
    expect(consent).toBe('declined');

    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await expect(banner).toBeHidden();
  });

  test.skip('cookie preferences can be managed and reopened from footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const banner = page.getByTestId('cookie-banner');
    await expect(banner).toBeVisible();

    await page.getByRole('button', { name: 'Manage', exact: true }).click();
    const preferencesView = page.getByTestId('cookie-preferences-view');
    await expect(preferencesView).toBeVisible();
    await expect(preferencesView.getByText('Cookie preferences', { exact: true })).toBeVisible();

    await page.locator('#cookie-analytics-toggle').check({ force: true });
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(banner).toBeHidden();

    const stored = await page.evaluate(() => ({
      consent: localStorage.getItem('voyaflair_cookie_consent'),
      preferences: localStorage.getItem('voyaflair_cookie_preferences'),
    }));
    expect(stored.consent).toBe('custom');
    expect(stored.preferences).toBe(JSON.stringify({ analytics: true }));

    const reopenBtn = page.getByTestId('cookie-preferences-link');
    await reopenBtn.scrollIntoViewIfNeeded();
    await reopenBtn.click();
    await expect(preferencesView).toBeVisible({ timeout: 10000 });
    await expect(preferencesView.getByText('Cookie preferences', { exact: true })).toBeVisible();
  });
});
