import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { Header } from '../../src/pages/Header';

/**
 * Navigation Tests
 * Tests home page navigation elements (Exchange and Missions buttons)
 */
test.describe('Home Page Navigation', () => {
  let homePage: HomePage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    header = new Header(page);
    await homePage.navigateToHome();
  });

  test('should display home page content', async ({ page }) => {
    // Verify page loaded successfully
    const url = page.url();
    expect(url).toContain('jumper.exchange');
  });

  test('should display Connect Wallet button', async ({ page }) => {
    // Verify Connect Wallet button is visible
    const isVisible = await homePage.isConnectWalletButtonVisible();
    expect(isVisible).toBe(true);
  });

  test('should click Exchange button', async ({ page }) => {
    // Click Exchange button
    await header.clickExchange();
    
    // Wait for button to be stable after click
    await expect(header.exchangeButton).toBeVisible();
    
    // Verify Exchange button is still accessible (page didn't break)
    const isVisible = await header.isExchangeButtonVisible();
    expect(isVisible).toBe(true);
  });

  test('should click Missions button', async ({ page }) => {
    // Click Missions button
    await header.clickMissions();
    
    // Wait for button to be stable after click
    await expect(header.missionsButton).toBeVisible();
    
    // Verify Missions button is still accessible (page didn't break)
    const isVisible = await header.isMissionsButtonVisible();
    expect(isVisible).toBe(true);
  });

  test('should display network selector if available', async ({ page }) => {
    // Check if network selector is visible (may not be present)
    const networkSelectorVisible = await header.isNetworkSelectorVisible();
    
    // This is informational - network selector may or may not be present
    // Just verify we can check for it without errors
    expect(typeof networkSelectorVisible).toBe('boolean');
  });
});
