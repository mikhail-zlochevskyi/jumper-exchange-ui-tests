import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Wallet Modal Page Object Model
 * Represents the wallet selection modal
 */
export class WalletModal extends BasePage {
  readonly modal: Locator;
  readonly metamaskOption: Locator;
  readonly phantomOption: Locator;
  readonly closeButton: Locator;
  readonly connectingHeading: Locator;

  constructor(page: Page) {
    super(page);
    
    // Wallet modal - look for dialog or modal container
    this.modal = page.locator(
      '[role="dialog"], ' +
      '[data-testid="wallet-modal"], ' +
      '[data-testid="connect-wallet-modal"]'
    ).first();

    // MetaMask option - from codegen
    this.metamaskOption = page.getByText('MetaMask');

    // Phantom option
    this.phantomOption = page.getByText('Phantom');

    // Close button
    this.closeButton = page.locator(
      'button[aria-label*="close" i], ' +
      'button[aria-label*="Close" i], ' +
      '[data-testid="modal-close"]'
    ).first();

    // Connecting heading - from codegen
    this.connectingHeading = page.getByRole('heading', { name: 'Connecting' });
  }

  /**
   * Wait for wallet modal to be visible
   */
  async waitForModal(): Promise<void> {
    await this.waitForElement(this.modal);
  }

  /**
   * Check if modal is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.modal.isVisible().catch(() => false);
  }

  /**
   * Click MetaMask option
   */
  async clickMetaMask(): Promise<void> {
    await this.metamaskOption.click();
  }

  /**
   * Click Phantom option
   */
  async clickPhantom(): Promise<void> {
    await this.phantomOption.click();
  }

  /**
   * Check if MetaMask option is visible
   */
  async isMetaMaskVisible(): Promise<boolean> {
    return await this.metamaskOption.isVisible().catch(() => false);
  }

  /**
   * Check if Phantom option is visible
   */
  async isPhantomVisible(): Promise<boolean> {
    return await this.phantomOption.isVisible().catch(() => false);
  }

  /**
   * Close modal
   */
  async close(): Promise<void> {
    if (await this.closeButton.isVisible().catch(() => false)) {
      await this.closeButton.click();
    } else {
      // Try pressing Escape
      await this.page.keyboard.press('Escape');
    }
    await this.waitForElementHidden(this.modal);
  }

  /**
   * Wait for connecting state
   */
  async waitForConnecting(): Promise<void> {
    await this.waitForElement(this.connectingHeading);
  }
}

