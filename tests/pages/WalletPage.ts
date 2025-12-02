import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Wallet Page Object Model
 * Represents wallet connection and management functionality
 */
export class WalletPage extends BasePage {
  // Selectors
  readonly connectWalletButton: Locator = this.page.locator('button:has-text("Connect Wallet")');
  readonly walletModal: Locator = this.page.locator('[data-testid="wallet-modal"]');
  readonly metaMaskOption: Locator = this.page.locator('[data-testid="wallet-option-metamask"]');
  readonly walletConnectOption: Locator = this.page.locator('[data-testid="wallet-option-walletconnect"]');
  readonly coinbaseOption: Locator = this.page.locator('[data-testid="wallet-option-coinbase"]');
  readonly walletBadge: Locator = this.page.locator('[data-testid="wallet-badge"]');
  readonly walletAddress: Locator = this.page.locator('[data-testid="wallet-address"]');
  readonly walletBalance: Locator = this.page.locator('[data-testid="wallet-balance"]');
  readonly disconnectButton: Locator = this.page.locator('button:has-text("Disconnect")');
  readonly accountMenu: Locator = this.page.locator('[data-testid="account-menu"]');
  readonly copyAddressButton: Locator = this.page.locator('[data-testid="copy-address-button"]');
  readonly viewOnExplorerButton: Locator = this.page.locator('[data-testid="view-on-explorer-button"]');
  readonly walletNetworkBadge: Locator = this.page.locator('[data-testid="network-badge"]');
  readonly switchNetworkButton: Locator = this.page.locator('[data-testid="switch-network-button"]');
  readonly networkList: Locator = this.page.locator('[data-testid="network-list"]');
  readonly loadingSpinner: Locator = this.page.locator('[data-testid="loading-spinner"]');
  readonly errorMessage: Locator = this.page.locator('[data-testid="error-message"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Click connect wallet button
   */
  async clickConnectWallet(): Promise<void> {
    await this.click(this.connectWalletButton);
    await this.waitForElement(this.walletModal);
  }

  /**
   * Select MetaMask wallet
   */
  async selectMetaMask(): Promise<void> {
    await this.click(this.metaMaskOption);
  }

  /**
   * Select WalletConnect
   */
  async selectWalletConnect(): Promise<void> {
    await this.click(this.walletConnectOption);
  }

  /**
   * Select Coinbase wallet
   */
  async selectCoinbase(): Promise<void> {
    await this.click(this.coinbaseOption);
  }

  /**
   * Check if wallet is connected
   */
  async isWalletConnected(): Promise<boolean> {
    return await this.isVisible(this.walletBadge);
  }

  /**
   * Get wallet address
   */
  async getWalletAddress(): Promise<string> {
    return await this.getText(this.walletAddress);
  }

  /**
   * Get wallet balance
   */
  async getWalletBalance(): Promise<string> {
    return await this.getText(this.walletBalance);
  }

  /**
   * Get displayed wallet address from badge
   */
  async getDisplayedWalletAddress(): Promise<string> {
    return await this.getText(this.walletBadge);
  }

  /**
   * Click on wallet badge to open account menu
   */
  async clickWalletBadge(): Promise<void> {
    await this.click(this.walletBadge);
    await this.waitForElement(this.accountMenu);
  }

  /**
   * Disconnect wallet
   */
  async disconnectWallet(): Promise<void> {
    await this.clickWalletBadge();
    await this.click(this.disconnectButton);
  }

  /**
   * Copy wallet address
   */
  async copyWalletAddress(): Promise<void> {
    await this.clickWalletBadge();
    await this.click(this.copyAddressButton);
  }

  /**
   * View wallet on explorer
   */
  async viewOnExplorer(): Promise<void> {
    await this.clickWalletBadge();
    await this.click(this.viewOnExplorerButton);
  }

  /**
   * Get current network
   */
  async getCurrentNetwork(): Promise<string> {
    return await this.getText(this.walletNetworkBadge);
  }

  /**
   * Switch network
   */
  async switchNetwork(networkName: string): Promise<void> {
    await this.click(this.switchNetworkButton);
    await this.waitForElement(this.networkList);
    await this.page.locator(`[data-testid="network-option-${networkName}"]`).click();
  }

  /**
   * Check if wallet modal is visible
   */
  async isWalletModalVisible(): Promise<boolean> {
    return await this.isVisible(this.walletModal);
  }

  /**
   * Check if MetaMask option is available
   */
  async isMetaMaskAvailable(): Promise<boolean> {
    return await this.isVisible(this.metaMaskOption);
  }

  /**
   * Check if WalletConnect option is available
   */
  async isWalletConnectAvailable(): Promise<boolean> {
    return await this.isVisible(this.walletConnectOption);
  }

  /**
   * Check if Coinbase option is available
   */
  async isCoinbaseAvailable(): Promise<boolean> {
    return await this.isVisible(this.coinbaseOption);
  }

  /**
   * Check if wallet is loading
   */
  async isLoading(): Promise<boolean> {
    return await this.isVisible(this.loadingSpinner);
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Get count of available networks
   */
  async getAvailableNetworksCount(): Promise<number> {
    return await this.getElementCount('[data-testid="network-option"]');
  }

  /**
   * Get count of available wallets
   */
  async getAvailableWalletsCount(): Promise<number> {
    return await this.getElementCount('[data-testid="wallet-option"]');
  }
}
