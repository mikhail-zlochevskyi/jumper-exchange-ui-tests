import { expect, Page } from '@playwright/test';

/**
 * Custom assertion helpers
 * Provides reusable assertion utilities
 */

/**
 * Assert element is visible
 */
export async function assertElementVisible(page: Page, selector: string, message?: string): Promise<void> {
  await expect(page.locator(selector)).toBeVisible({ timeout: 10000 });
}

/**
 * Assert element is hidden
 */
export async function assertElementHidden(page: Page, selector: string, message?: string): Promise<void> {
  await expect(page.locator(selector)).toBeHidden({ timeout: 5000 });
}

/**
 * Assert URL contains pattern
 */
export async function assertUrlContains(page: Page, pattern: string | RegExp): Promise<void> {
  await expect(page).toHaveURL(pattern, { timeout: 10000 });
}

/**
 * Assert element count
 */
export async function assertElementCount(page: Page, selector: string, count: number): Promise<void> {
  await expect(page.locator(selector)).toHaveCount(count);
}

/**
 * Assert element has text
 */
export async function assertElementText(page: Page, selector: string, text: string | RegExp): Promise<void> {
  await expect(page.locator(selector)).toHaveText(text);
}

