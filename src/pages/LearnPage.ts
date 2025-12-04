import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Learn Page Object Model
 * Represents the Learn/Documentation section
 */
export class LearnPage extends BasePage {
  readonly learnHeading: any;
  readonly learnContent: any;

  constructor(page: Page) {
    super(page);
    
    // Flexible selectors for Learn page content
    this.learnHeading = page.locator(
      'h1:has-text("Learn"), ' +
      'h1:has-text("Documentation"), ' +
      'h1:has-text("Docs"), ' +
      '[data-testid="learn-heading"]'
    ).first();

    this.learnContent = page.locator(
      '[data-testid="learn-content"], ' +
      'main, ' +
      'article, ' +
      '[role="main"]'
    ).first();
  }

  /**
   * Verify Learn page is loaded
   */
  async verifyLearnPageLoaded(): Promise<boolean> {
    const url = this.getCurrentUrl();
    const isLearnUrl = url.includes('/learn') || url.includes('/docs') || url.includes('/documentation');
    
    // Check for heading or content
    const hasHeading = await this.learnHeading.isVisible().catch(() => false);
    const hasContent = await this.learnContent.isVisible().catch(() => false);
    
    return isLearnUrl && (hasHeading || hasContent);
  }

  /**
   * Get Learn page heading text
   */
  async getHeadingText(): Promise<string> {
    return await this.learnHeading.textContent().catch(() => '');
  }

  /**
   * Check if Learn content is visible
   */
  async isContentVisible(): Promise<boolean> {
    return await this.learnContent.isVisible().catch(() => false);
  }
}

