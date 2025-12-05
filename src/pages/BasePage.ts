import { Page, Locator } from '@playwright/test';
import { config } from '../config/env';

/**
 * Base Page Object Model
 * Provides common functionality for all page objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL using baseURL
   */
  async goto(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${config.baseURL}${path}`;
    await this.page.goto(url);
  }

  /**
   * Wait for page to load
   * Waits for DOM to be ready and ensures page is interactive
   * Uses load state instead of networkidle for better reliability with dynamic SPAs
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for page to be interactive (load event fired)
    // This is more reliable than networkidle for dynamic SPAs
    try {
      await this.page.waitForLoadState('load', { timeout: 5000 });
    } catch {
      // Load event may not fire for SPAs, that's okay - domcontentloaded is sufficient
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator | string, timeout: number = 10000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(locator: Locator | string, timeout: number = 10000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForURL(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }
}

