import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Swap Page Object Model
 * Represents the swap functionality page
 */
export class SwapPage extends BasePage {
  // Selectors
  readonly fromTokenButton: Locator = this.page.locator('[data-testid="from-token-button"]');
  readonly toTokenButton: Locator = this.page.locator('[data-testid="to-token-button"]');
  readonly amountInput: Locator = this.page.locator('[data-testid="amount-input"]');
  readonly swapButton: Locator = this.page.locator('button:has-text("Swap")');
  readonly reviewSwapButton: Locator = this.page.locator('button:has-text("Review Swap")');
  readonly confirmSwapButton: Locator = this.page.locator('button:has-text("Confirm Swap")');
  readonly quoteDisplay: Locator = this.page.locator('[data-testid="quote-display"]');
  readonly exchangeRate: Locator = this.page.locator('[data-testid="exchange-rate"]');
  readonly gasFee: Locator = this.page.locator('[data-testid="gas-fee"]');
  readonly priceImpact: Locator = this.page.locator('[data-testid="price-impact"]');
  readonly tokenSearchInput: Locator = this.page.locator('[data-testid="token-search"]');
  readonly tokenList: Locator = this.page.locator('[data-testid="token-list"]');
  readonly switchTokensButton: Locator = this.page.locator('[data-testid="switch-tokens-button"]');
  readonly loadingSpinner: Locator = this.page.locator('[data-testid="loading-spinner"]');
  readonly errorMessage: Locator = this.page.locator('[data-testid="error-message"]');
  readonly successMessage: Locator = this.page.locator('[data-testid="success-message"]');
  readonly transactionHash: Locator = this.page.locator('[data-testid="transaction-hash"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to swap page
   */
  async navigateToSwap(): Promise<void> {
    await this.goto('/swap');
    await this.waitForPageLoad();
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
   * Enter swap amount
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
   * Switch from and to tokens
   */
  async switchTokens(): Promise<void> {
    await this.click(this.switchTokensButton);
    await this.waitForPageLoad();
  }

  /**
   * Get exchange rate
   */
  async getExchangeRate(): Promise<string> {
    return await this.getText(this.exchangeRate);
  }

  /**
   * Get gas fee
   */
  async getGasFee(): Promise<string> {
    return await this.getText(this.gasFee);
  }

  /**
   * Get price impact
   */
  async getPriceImpact(): Promise<string> {
    return await this.getText(this.priceImpact);
  }

  /**
   * Get quote
   */
  async getQuote(): Promise<string> {
    return await this.getText(this.quoteDisplay);
  }

  /**
   * Click review swap button
   */
  async clickReviewSwap(): Promise<void> {
    await this.click(this.reviewSwapButton);
  }

  /**
   * Click confirm swap button
   */
  async clickConfirmSwap(): Promise<void> {
    await this.click(this.confirmSwapButton);
  }

  /**
   * Execute a complete swap
   */
  async executeSwap(fromToken: string, toToken: string, amount: string): Promise<void> {
    await this.selectFromToken(fromToken);
    await this.selectToToken(toToken);
    await this.enterAmount(amount);
    await this.waitForElement(this.quoteDisplay);
    await this.clickReviewSwap();
    await this.clickConfirmSwap();
  }

  /**
   * Check if swap is loading
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
   * Verify swap page is loaded
   */
  async verifySwapPageLoaded(): Promise<boolean> {
    return await this.isVisible(this.fromTokenButton) && await this.isVisible(this.toTokenButton);
  }

  /**
   * Search for token
   */
  async searchToken(tokenName: string): Promise<void> {
    await this.fill(this.tokenSearchInput, tokenName);
    await this.waitForElement(this.tokenList);
  }

  /**
   * Get token search results count
   */
  async getTokenSearchResultsCount(): Promise<number> {
    return await this.getElementCount('[data-testid="token-option"]');
  }
}
