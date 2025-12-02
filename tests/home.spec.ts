import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should load home page successfully', async () => {
    // Verify page is loaded
    expect(await homePage.verifyHomePageLoaded()).toBe(true);
  });

  test('should display header logo', async () => {
    // Verify logo is visible
    expect(await homePage.isVisible(homePage.headerLogo)).toBe(true);
  });

  test('should display main navigation buttons', async () => {
    // Verify main buttons are visible
    expect(await homePage.isSwapButtonVisible()).toBe(true);
    expect(await homePage.isBridgeButtonVisible()).toBe(true);
  });

  test('should display connect wallet button when not connected', async () => {
    // Check if wallet is not connected
    const isConnected = await homePage.isWalletConnected();

    if (!isConnected) {
      // Verify connect wallet button is visible
      expect(await homePage.isConnectWalletButtonVisible()).toBe(true);
    }
  });

  test('should verify all main elements are visible', async () => {
    // Verify all main elements
    expect(await homePage.verifyMainElementsVisible()).toBe(true);
  });

  test('should display feature highlights section', async () => {
    // Verify feature highlights section is visible
    expect(await homePage.isVisible(homePage.featureHighlights)).toBe(true);
  });

  test('should display supported chains section', async () => {
    // Verify supported chains section is visible
    expect(await homePage.isVisible(homePage.supportedChainsSection)).toBe(true);
  });

  test('should display multiple supported chains', async () => {
    // Get supported chains count
    const chainsCount = await homePage.getSupportedChainsCount();

    // Verify at least one chain is displayed
    expect(chainsCount).toBeGreaterThan(0);
  });

  test('should have navigation menu', async () => {
    // Verify navigation menu is visible
    expect(await homePage.isVisible(homePage.navigationMenu)).toBe(true);
  });

  test('should navigate to swap page on button click', async () => {
    // Click swap button
    await homePage.clickSwapButton();

    // Verify URL changed to swap page
    const url = await homePage.getCurrentUrl();
    expect(url).toContain('/swap');
  });

  test('should navigate to bridge page on button click', async () => {
    // Click bridge button
    await homePage.clickBridgeButton();

    // Verify URL changed to bridge page
    const url = await homePage.getCurrentUrl();
    expect(url).toContain('/bridge');
  });

  test('should display recent transactions section', async () => {
    // Verify recent transactions section is visible
    expect(await homePage.isVisible(homePage.recentTransactions)).toBe(true);
  });

  test('should have responsive layout', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify main elements are still visible
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Verify main elements are still visible
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Verify main elements are still visible
    expect(await homePage.verifyHomePageLoaded()).toBe(true);
  });

  test('should handle page reload', async () => {
    // Get initial URL
    const initialUrl = await homePage.getCurrentUrl();

    // Reload page
    await homePage.reload();

    // Verify page is still loaded
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Verify URL is the same
    const reloadedUrl = await homePage.getCurrentUrl();
    expect(reloadedUrl).toBe(initialUrl);
  });

  test('should display all buttons in correct state', async () => {
    // Verify swap button is enabled
    expect(await homePage.isEnabled(homePage.swapButton)).toBe(true);

    // Verify bridge button is enabled
    expect(await homePage.isEnabled(homePage.bridgeButton)).toBe(true);
  });

  test('should have proper page title', async ({ page }) => {
    // Get page title
    const title = await page.title();

    // Verify title is not empty
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have proper meta description', async ({ page }) => {
    // Get meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');

    // Verify description exists
    expect(description).toBeTruthy();
  });

  test('should load all images successfully', async ({ page }) => {
    // Get all images
    const images = await page.locator('img').all();

    // Verify images are loaded
    for (const image of images) {
      const isVisible = await image.isVisible();
      if (isVisible) {
        const src = await image.getAttribute('src');
        expect(src).toBeTruthy();
      }
    }
  });

  test('should have no console errors', async ({ page }) => {
    let consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait a bit for any potential errors
    await page.waitForTimeout(2000);

    // Verify no console errors
    expect(consoleErrors.length).toBe(0);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network error
    await page.route('**/*', (route) => {
      if (Math.random() > 0.5) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // Reload page
    try {
      await homePage.reload();
    } catch (error) {
      // Network error is expected
    }

    // Verify page is still accessible
    expect(await homePage.verifyHomePageLoaded()).toBe(true);
  });
});
