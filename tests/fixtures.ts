import { test as base, Page } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SwapPage } from './pages/SwapPage';
import { BridgePage } from './pages/BridgePage';
import { WalletPage } from './pages/WalletPage';

/**
 * Custom fixtures for Playwright tests
 * Provides page objects and utilities to all tests
 */

type TestFixtures = {
  homePage: HomePage;
  swapPage: SwapPage;
  bridgePage: BridgePage;
  walletPage: WalletPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  swapPage: async ({ page }, use) => {
    const swapPage = new SwapPage(page);
    await use(swapPage);
  },

  bridgePage: async ({ page }, use) => {
    const bridgePage = new BridgePage(page);
    await use(bridgePage);
  },

  walletPage: async ({ page }, use) => {
    const walletPage = new WalletPage(page);
    await use(walletPage);
  },
});

export { expect } from '@playwright/test';
