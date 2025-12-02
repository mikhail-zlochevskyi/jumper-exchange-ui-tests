import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object Model class
 * Provides common functionality for all page objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Navigate to home page
   */
  async goToHome(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click an element
   */
  async click(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click();
  }

  /**
   * Fill input field
   */
  async fill(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(text);
  }

  /**
   * Type text (character by character)
   */
  async type(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.type(text);
  }

  /**
   * Get text content
   */
  async getText(locator: Locator | string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.textContent() || '';
  }

  /**
   * Get input value
   */
  async getInputValue(locator: Locator | string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.inputValue();
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isEnabled();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator | string, timeout: number = 5000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(locator: Locator | string, timeout: number = 5000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Get attribute value
   */
  async getAttribute(locator: Locator | string, attribute: string): Promise<string | null> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.getAttribute(attribute);
  }

  /**
   * Press keyboard key
   */
  async press(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `reports/${name}.png` });
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  /**
   * Wait for URL to match
   */
  async waitForURL(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }

  /**
   * Execute JavaScript
   */
  async executeScript(script: string, args?: any[]): Promise<any> {
    return await this.page.evaluate(script, args);
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Get count of elements
   */
  async getElementCount(locator: string): Promise<number> {
    return await this.page.locator(locator).count();
  }

  /**
   * Check if element exists
   */
  async elementExists(locator: string): Promise<boolean> {
    return (await this.page.locator(locator).count()) > 0;
  }
}
