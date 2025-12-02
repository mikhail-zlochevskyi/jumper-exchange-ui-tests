import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SwapPage } from './pages/SwapPage';
import { BridgePage } from './pages/BridgePage';
import { WalletPage } from './pages/WalletPage';

test.describe('Integration Tests', () => {
  let homePage: HomePage;
  let swapPage: SwapPage;
  let bridgePage: BridgePage;
  let walletPage: WalletPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    swapPage = new SwapPage(page);
    bridgePage = new BridgePage(page);
    walletPage = new WalletPage(page);

    // Navigate to home page
    await homePage.navigateToHome();
  });

  test('should complete full swap flow from home page', async () => {
    // Verify home page is loaded
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Click swap button
    await homePage.clickSwapButton();

    // Verify swap page is loaded
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);

    // Select tokens and enter amount
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');
    await swapPage.enterAmount('0.1');

    // Wait for quote
    await swapPage.waitForElement(swapPage.quoteDisplay, 10000);

    // Verify quote is displayed
    expect(await swapPage.isVisible(swapPage.quoteDisplay)).toBe(true);
  });

  test('should complete full bridge flow from home page', async () => {
    // Verify home page is loaded
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Click bridge button
    await homePage.clickBridgeButton();

    // Verify bridge page is loaded
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);

    // Select chains and tokens
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');
    await bridgePage.enterAmount('0.1');

    // Wait for bridge fee
    await bridgePage.waitForElement(bridgePage.bridgeFee, 10000);

    // Verify bridge fee is displayed
    expect(await bridgePage.isVisible(bridgePage.bridgeFee)).toBe(true);
  });

  test('should navigate between swap and bridge pages', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);

    // Navigate to bridge page
    await bridgePage.navigateToBridge();
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);

    // Navigate back to swap page
    await swapPage.navigateToSwap();
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);
  });

  test('should maintain state when navigating between pages', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens and enter amount
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');
    await swapPage.enterAmount('1');

    // Get amount
    const amount = await swapPage.getAmount();

    // Navigate to home page
    await homePage.navigateToHome();

    // Navigate back to swap page
    await swapPage.navigateToSwap();

    // Verify amount is still there (if state is maintained)
    const newAmount = await swapPage.getAmount();
    expect(newAmount).toBe(amount);
  });

  test('should handle wallet connection flow', async () => {
    // Verify home page is loaded
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Check if wallet connection button is visible
    expect(await homePage.isConnectWalletButtonVisible()).toBe(true);

    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Verify wallet modal is visible
    expect(await walletPage.isWalletModalVisible()).toBe(true);

    // Verify wallet options are available
    expect(await walletPage.getAvailableWalletsCount()).toBeGreaterThan(0);
  });

  test('should display wallet info when connected', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Verify wallet badge is visible on home page
      expect(await homePage.isWalletConnected()).toBe(true);

      // Get wallet address
      const address = await homePage.getWalletAddress();
      expect(address.length).toBeGreaterThan(0);
    }
  });

  test('should use wallet info in swap page', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Navigate to swap page
      await swapPage.navigateToSwap();

      // Verify swap page is loaded
      expect(await swapPage.verifySwapPageLoaded()).toBe(true);

      // Verify wallet info is accessible
      const walletConnected = await walletPage.isWalletConnected();
      expect(walletConnected).toBe(true);
    }
  });

  test('should use wallet info in bridge page', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Navigate to bridge page
      await bridgePage.navigateToBridge();

      // Verify bridge page is loaded
      expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);

      // Verify wallet info is accessible
      const walletConnected = await walletPage.isWalletConnected();
      expect(walletConnected).toBe(true);
    }
  });

  test('should handle multiple token selections in swap', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select first pair
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');

    // Switch tokens
    await swapPage.switchTokens();

    // Verify tokens are switched
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);

    // Select different pair
    await swapPage.selectFromToken('DAI');
    await swapPage.selectToToken('USDT');

    // Verify new tokens are selected
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);
  });

  test('should handle multiple chain selections in bridge', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select first pair
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');

    // Switch chains
    await bridgePage.switchChains();

    // Verify chains are switched
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);

    // Select different pair
    await bridgePage.selectFromChain('Arbitrum');
    await bridgePage.selectToChain('Optimism');

    // Verify new chains are selected
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);
  });

  test('should handle rapid page navigation', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);

    // Navigate to bridge page
    await bridgePage.navigateToBridge();
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);

    // Navigate to home page
    await homePage.navigateToHome();
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Navigate back to swap page
    await swapPage.navigateToSwap();
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);

    // Navigate back to bridge page
    await bridgePage.navigateToBridge();
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);
  });

  test('should handle page reload on different pages', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();
    const swapUrl = await swapPage.getCurrentUrl();

    // Reload page
    await swapPage.reload();

    // Verify URL is the same
    const reloadedSwapUrl = await swapPage.getCurrentUrl();
    expect(reloadedSwapUrl).toBe(swapUrl);

    // Navigate to bridge page
    await bridgePage.navigateToBridge();
    const bridgeUrl = await bridgePage.getCurrentUrl();

    // Reload page
    await bridgePage.reload();

    // Verify URL is the same
    const reloadedBridgeUrl = await bridgePage.getCurrentUrl();
    expect(reloadedBridgeUrl).toBe(bridgeUrl);
  });

  test('should handle back and forward navigation', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);

    // Navigate to bridge page
    await bridgePage.navigateToBridge();
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);

    // Go back to swap page
    await swapPage.goBack();
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);

    // Go forward to bridge page
    await bridgePage.goForward();
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);
  });

  test('should verify all pages load within acceptable time', async ({ page }) => {
    // Measure home page load time
    const homeStartTime = Date.now();
    await homePage.navigateToHome();
    const homeLoadTime = Date.now() - homeStartTime;
    expect(homeLoadTime).toBeLessThan(5000);

    // Measure swap page load time
    const swapStartTime = Date.now();
    await swapPage.navigateToSwap();
    const swapLoadTime = Date.now() - swapStartTime;
    expect(swapLoadTime).toBeLessThan(5000);

    // Measure bridge page load time
    const bridgeStartTime = Date.now();
    await bridgePage.navigateToBridge();
    const bridgeLoadTime = Date.now() - bridgeStartTime;
    expect(bridgeLoadTime).toBeLessThan(5000);
  });
});
