import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Bridge Page Object Model
 * Represents the bridge functionality page
 */
export class BridgePage extends BasePage {
  // Selectors
  readonly fromChainButton: Locator = this.page.locator('[data-testid="from-chain-button"]');
  readonly toChainButton: Locator = this.page.locator('[data-testid="to-chain-button"]');
  readonly fromTokenButton: Locator = this.page.locator('[data-testid="from-token-button"]');
  readonly toTokenButton: Locator = this.page.locator('[data-testid="to-token-button"]');
  readonly amountInput: Locator = this.page.locator('[data-testid="amount-input"]');
  readonly bridgeButton: Locator = this.page.locator('button:has-text("Bridge")');
  readonly reviewBridgeButton: Locator = this.page.locator('button:has-text("Review Bridge")');
  readonly confirmBridgeButton: Locator = this.page.locator('button:has-text("Confirm Bridge")');
  readonly bridgeFee: Locator = this.page.locator('[data-testid="bridge-fee"]');
  readonly estimatedTime: Locator = this.page.locator('[data-testid="estimated-time"]');
  readonly chainSearchInput: Locator = this.page.locator('[data-testid="chain-search"]');
  readonly chainList: Locator = this.page.locator('[data-testid="chain-list"]');
  readonly tokenSearchInput: Locator = this.page.locator('[data-testid="token-search"]');
  readonly tokenList: Locator = this.page.locator('[data-testid="token-list"]');
  readonly switchChainsButton: Locator = this.page.locator('[data-testid="switch-chains-button"]');
  readonly loadingSpinner: Locator = this.page.locator('[data-testid="loading-spinner"]');
  readonly errorMessage: Locator = this.page.locator('[data-testid="error-message"]');
  readonly successMessage: Locator = this.page.locator('[data-testid="success-message"]');
  readonly transactionHash: Locator = this.page.locator('[data-testid="transaction-hash"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to bridge page
   */
  async navigateToBridge(): Promise<void> {
    await this.goto('/bridge');
    await this.waitForPageLoad();
  }

  /**
   * Select from chain
   */
  async selectFromChain(chainName: string): Promise<void> {
    await this.click(this.fromChainButton);
    await this.waitForElement(this.chainSearchInput);
    await this.fill(this.chainSearchInput, chainName);
    await this.page.locator(`[data-testid="chain-option-${chainName}"]`).click();
  }

  /**
   * Select to chain
   */
  async selectToChain(chainName: string): Promise<void> {
    await this.click(this.toChainButton);
    await this.waitForElement(this.chainSearchInput);
    await this.fill(this.chainSearchInput, chainName);
    await this.page.locator(`[data-testid="chain-option-${chainName}"]`).click();
  }

  /**
   * Select from token
   */
  async selectFromToken(tokenName: string): Promise<void> {
    await this.click(this.fromTokenButton);
    await this.waitForElement(this.tokenSearchInput);
    await this.fill(this.tokenSearchInput, tokenName);
    await this.page.locator(`[data-testid="token-option-${tokenName}"]`).click();
  }

  /**
   * Select to token
   */
  async selectToToken(tokenName: string): Promise<void> {
    await this.click(this.toTokenButton);
    await this.waitForElement(this.tokenSearchInput);
    await this.fill(this.tokenSearchInput, tokenName);
    await this.page.locator(`[data-testid="token-option-${tokenName}"]`).click();
  }

  /**
   * Enter bridge amount
   */
  async enterAmount(amount: string): Promise<void> {
    await this.fill(this.amountInput, amount);
  }

  /**
   * Get current amount
   */
  async getAmount(): Promise<string> {
    return await this.getInputValue(this.amountInput);
  }

  /**
   * Switch from and to chains
   */
  async switchChains(): Promise<void> {
    await this.click(this.switchChainsButton);
    await this.waitForPageLoad();
  }

  /**
   * Get bridge fee
   */
  async getBridgeFee(): Promise<string> {
    return await this.getText(this.bridgeFee);
  }

  /**
   * Get estimated time
   */
  async getEstimatedTime(): Promise<string> {
    return await this.getText(this.estimatedTime);
  }

  /**
   * Click review bridge button
   */
  async clickReviewBridge(): Promise<void> {
    await this.click(this.reviewBridgeButton);
  }

  /**
   * Click confirm bridge button
   */
  async clickConfirmBridge(): Promise<void> {
    await this.click(this.confirmBridgeButton);
  }

  /**
   * Execute a complete bridge
   */
  async executeBridge(
    fromChain: string,
    toChain: string,
    fromToken: string,
    toToken: string,
    amount: string
  ): Promise<void> {
    await this.selectFromChain(fromChain);
    await this.selectToChain(toChain);
    await this.selectFromToken(fromToken);
    await this.selectToToken(toToken);
    await this.enterAmount(amount);
    await this.clickReviewBridge();
    await this.clickConfirmBridge();
  }

  /**
   * Check if bridge is loading
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
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessDisplayed(): Promise<boolean> {
    return await this.isVisible(this.successMessage);
  }

  /**
   * Get transaction hash
   */
  async getTransactionHash(): Promise<string> {
    return await this.getText(this.transactionHash);
  }

  /**
   * Verify bridge page is loaded
   */
  async verifyBridgePageLoaded(): Promise<boolean> {
    return await this.isVisible(this.fromChainButton) && await this.isVisible(this.toChainButton);
  }

  /**
   * Search for chain
   */
  async searchChain(chainName: string): Promise<void> {
    await this.fill(this.chainSearchInput, chainName);
    await this.waitForElement(this.chainList);
  }

  /**
   * Get chain search results count
   */
  async getChainSearchResultsCount(): Promise<number> {
    return await this.getElementCount('[data-testid="chain-option"]');
  }
}
