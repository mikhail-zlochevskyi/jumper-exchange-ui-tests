import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Discord Page Object Model
 * Handles external Discord link validation
 */
export class DiscordPage extends BasePage {
  /**
   * Verify Discord URL pattern
   * Checks if URL contains Discord invite/community link
   */
  async verifyDiscordUrl(): Promise<boolean> {
    const url = this.getCurrentUrl();
    return url.includes('discord.gg') || 
           url.includes('discord.com/invite') || 
           url.includes('discord.com/channels');
  }

  /**
   * Get Discord URL
   */
  getDiscordUrl(): string {
    return this.getCurrentUrl();
  }

  /**
   * Wait for Discord page to load
   */
  async waitForDiscordPage(): Promise<void> {
    await this.waitForURL(/discord/);
  }
}

