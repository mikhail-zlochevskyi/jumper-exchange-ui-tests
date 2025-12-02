import { Page } from '@playwright/test';

/**
 * Helper utilities for tests
 */

/**
 * Wait for a specific amount of time
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random amount between min and max
 */
export function generateRandomAmount(min: number = 0.1, max: number = 10): string {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(4);
}

/**
 * Format wallet address (shorten it)
 */
export function formatWalletAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Validate Ethereum address
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate transaction hash
 */
export function isValidTransactionHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await wait(delay);
      }
    }
  }

  throw lastError || new Error('Max retries reached');
}

/**
 * Extract error message from page
 */
export async function getPageErrorMessage(page: Page): Promise<string | null> {
  try {
    const errorElement = await page.locator('[data-testid="error-message"]').textContent();
    return errorElement;
  } catch {
    return null;
  }
}

/**
 * Check if element is in viewport
 */
export async function isElementInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(page: Page, selector: string): Promise<void> {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, selector);
}

/**
 * Get all text content from elements
 */
export async function getAllTextContent(page: Page, selector: string): Promise<string[]> {
  return await page.evaluate((sel) => {
    const elements = document.querySelectorAll(sel);
    return Array.from(elements).map(el => el.textContent || '');
  }, selector);
}

/**
 * Check if page has console errors
 */
export async function hasConsoleErrors(page: Page): Promise<boolean> {
  let hasErrors = false;
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      hasErrors = true;
    }
  });
  return hasErrors;
}

/**
 * Get all network requests
 */
export async function captureNetworkRequests(page: Page): Promise<string[]> {
  const requests: string[] = [];
  page.on('request', (request) => {
    requests.push(request.url());
  });
  return requests;
}

/**
 * Mock API response
 */
export async function mockApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  responseData: any
): Promise<void> {
  await page.route(urlPattern, (route) => {
    route.abort('blockedbyresponse');
    route.continue();
  });
}

/**
 * Get local storage value
 */
export async function getLocalStorageValue(page: Page, key: string): Promise<string | null> {
  return await page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * Set local storage value
 */
export async function setLocalStorageValue(
  page: Page,
  key: string,
  value: string
): Promise<void> {
  await page.evaluate(
    ({ k, v }) => localStorage.setItem(k, v),
    { k: key, v: value }
  );
}

/**
 * Clear local storage
 */
export async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
}

/**
 * Get session storage value
 */
export async function getSessionStorageValue(page: Page, key: string): Promise<string | null> {
  return await page.evaluate((k) => sessionStorage.getItem(k), key);
}

/**
 * Clear session storage
 */
export async function clearSessionStorage(page: Page): Promise<void> {
  await page.evaluate(() => sessionStorage.clear());
}

/**
 * Parse JSON response
 */
export function parseJSON(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error}`);
  }
}

/**
 * Generate unique ID
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
