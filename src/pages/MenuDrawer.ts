import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Menu Drawer Page Object Model
 * Represents the menu/navigation drawer
 */
export class MenuDrawer extends BasePage {
  readonly menuButton: Locator;
  readonly menuDrawer: Locator;
  readonly learnLink: Locator;
  readonly discordLink: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Menu button - using id selector
    this.menuButton = page.locator('#main-burger-menu-button');

    // Menu drawer/modal - check if Learn/Discord links are visible as indicator
    this.menuDrawer = page.locator('nav, [role="navigation"], [role="menu"]').first();

    // Learn link - from codegen
    this.learnLink = page.getByRole('link', { name: 'Learn' });

    // Discord link - from codegen
    this.discordLink = page.getByRole('link', { name: 'Discord social link' });

    // Close button
    this.closeButton = page.locator(
      '[data-testid="menu-close"], ' +
      'button[aria-label*="close" i], ' +
      'button[aria-label*="Close" i], ' +
      'svg[data-testid="close-icon"]'
    ).first();
  }

  /**
   * Open menu drawer
   */
  async open(): Promise<void> {
    await this.menuButton.click();
    // Wait for menu links to be visible as indicator menu is open
    // Try Learn link first, then Discord as fallback
    try {
      await this.learnLink.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      try {
        await this.discordLink.waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        // Menu might be open but links not immediately visible - that's okay
      }
    }
  }

  /**
   * Close menu drawer
   */
  async close(): Promise<void> {
    if (await this.closeButton.isVisible().catch(() => false)) {
      await this.closeButton.click();
    } else {
      // Try clicking outside or pressing Escape
      await this.page.keyboard.press('Escape');
    }
    await this.waitForElementHidden(this.menuDrawer);
  }

  /**
   * Check if menu drawer is visible
   * Checks if Learn or Discord links are visible as indicator menu is open
   */
  async isOpen(): Promise<boolean> {
    // Check if menu links are visible as indicator
    const learnVisible = await this.isLearnLinkVisible();
    const discordVisible = await this.isDiscordLinkVisible();
    return learnVisible || discordVisible;
  }

  /**
   * Click Learn link
   */
  async clickLearn(): Promise<void> {
    await this.learnLink.click();
  }

  /**
   * Click Discord link
   */
  async clickDiscord(): Promise<void> {
    await this.discordLink.click();
  }

  /**
   * Check if Learn link is visible
   */
  async isLearnLinkVisible(): Promise<boolean> {
    return await this.learnLink.isVisible().catch(() => false);
  }

  /**
   * Check if Discord link is visible
   */
  async isDiscordLinkVisible(): Promise<boolean> {
    return await this.discordLink.isVisible().catch(() => false);
  }
}

