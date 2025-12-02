import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model
 * Represents the Jumper Exchange home page
 */
export class HomePage extends BasePage {
  // Selectors
  readonly swapButton: Locator = this.page.locator('button:has-text("Swap")');
  readonly bridgeButton: Locator = this.page.locator('button:has-text("Bridge")');
  readonly connectWalletButton: Locator = this.page.locator('button:has-text("Connect Wallet")');
  readonly walletConnectedBadge: Locator = this.page.locator('[data-testid="wallet-badge"]');
  readonly headerLogo: Locator = this.page.locator('[data-testid="header-logo"]');
  readonly navigationMenu: Locator = this.page.locator('[data-testid="nav-menu"]');
  readonly featureHighlights: Locator = this.page.locator('[data-testid="feature-highlights"]');
  readonly recentTransactions: Locator = this.page.locator('[data-testid="recent-transactions"]');
  readonly supportedChainsSection: Locator = this.page.locator('[data-testid="supported-chains"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to home page
   */
  async navigateToHome(): Promise<void> {
    await this.goToHome();
    await this.waitForPageLoad();
  }

  /**
   * Click on Swap button
   */
  async clickSwapButton(): Promise<void> {
    await this.click(this.swapButton);
  }

  /**
   * Click on Bridge button
   */
  async clickBridgeButton(): Promise<void> {
    await this.click(this.bridgeButton);
  }

  /**
   * Click on Connect Wallet button
   */
  async clickConnectWalletButton(): Promise<void> {
    await this.click(this.connectWalletButton);
  }

  /**
   * Check if wallet is connected
   */
  async isWalletConnected(): Promise<boolean> {
    return await this.isVisible(this.walletConnectedBadge);
  }

  /**
   * Get wallet address from badge
   */
  async getWalletAddress(): Promise<string> {
    return await this.getText(this.walletConnectedBadge);
  }

  /**
   * Verify home page is loaded
   */
  async verifyHomePageLoaded(): Promise<boolean> {
    return await this.isVisible(this.headerLogo);
  }

  /**
   * Check if Swap button is visible
   */
  async isSwapButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.swapButton);
  }

  /**
   * Check if Bridge button is visible
   */
  async isBridgeButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.bridgeButton);
  }

  /**
   * Check if Connect Wallet button is visible
   */
  async isConnectWalletButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.connectWalletButton);
  }

  /**
   * Get count of recent transactions
   */
  async getRecentTransactionCount(): Promise<number> {
    return await this.getElementCount('[data-testid="transaction-item"]');
  }

  /**
   * Get count of supported chains
   */
  async getSupportedChainsCount(): Promise<number> {
    return await this.getElementCount('[data-testid="chain-badge"]');
  }

  /**
   * Verify all main elements are visible
   */
  async verifyMainElementsVisible(): Promise<boolean> {
    const logoVisible = await this.isVisible(this.headerLogo);
    const swapVisible = await this.isVisible(this.swapButton);
    const bridgeVisible = await this.isVisible(this.bridgeButton);
    
    return logoVisible && swapVisible && bridgeVisible;
  }
}
