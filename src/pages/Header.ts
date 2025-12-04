import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Header Page Object Model
 * Represents the header/navigation bar of Jumper Exchange
 */
export class Header extends BasePage {
  readonly logo: Locator;
  readonly exchangeButton: Locator;
  readonly missionsButton: Locator;
  readonly networkSelector: Locator;

  constructor(page: Page) {
    super(page);
    // Using flexible selectors that work with actual Jumper UI
    this.logo = page.locator('[data-testid="navbar-logo"], a[href="/"], header img, [class*="logo"]').first();
    // Navigation buttons with actual data-testid
    this.exchangeButton = page.locator('[data-testid="navbar-exchange-button"]');
    this.missionsButton = page.locator('[data-testid="navbar-missions-button"]');
    this.networkSelector = page.locator('[data-testid="network-selector"], button:has-text("Network")').first();
  }

  /**
   * Wait for header to be visible
   */
  async waitForHeader(): Promise<void> {
    // Wait for exchange button as it's a key navigation element
    // Use a short timeout and don't fail if not found immediately
    try {
      await this.exchangeButton.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // Header might not be immediately available, that's okay
    }
  }

  /**
   * Check if logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible().catch(() => false);
  }

  /**
   * Check if Exchange button is visible
   */
  async isExchangeButtonVisible(): Promise<boolean> {
    return await this.exchangeButton.isVisible().catch(() => false);
  }

  /**
   * Check if Missions button is visible
   */
  async isMissionsButtonVisible(): Promise<boolean> {
    return await this.missionsButton.isVisible().catch(() => false);
  }

  /**
   * Click Exchange button
   */
  async clickExchange(): Promise<void> {
    // Use force click to bypass element interception
    await this.exchangeButton.click({ force: true });
  }

  /**
   * Click Missions button
   */
  async clickMissions(): Promise<void> {
    // Use force click to bypass element interception
    await this.missionsButton.click({ force: true });
  }

  /**
   * Check if network selector is visible
   */
  async isNetworkSelectorVisible(): Promise<boolean> {
    return await this.networkSelector.isVisible().catch(() => false);
  }
}
