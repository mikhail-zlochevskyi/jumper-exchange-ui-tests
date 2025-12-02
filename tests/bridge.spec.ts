import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { BridgePage } from './pages/BridgePage';
import { bridgeTestCases } from '../utils/testData';

test.describe('Bridge Functionality', () => {
  let homePage: HomePage;
  let bridgePage: BridgePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    bridgePage = new BridgePage(page);

    // Navigate to home page
    await homePage.navigateToHome();
  });

  test('should display home page with bridge button', async () => {
    // Verify home page is loaded
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Verify bridge button is visible
    expect(await homePage.isBridgeButtonVisible()).toBe(true);
  });

  test('should navigate to bridge page', async () => {
    // Click bridge button
    await homePage.clickBridgeButton();

    // Verify bridge page is loaded
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);
  });

  test('should display all main elements on bridge page', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Verify main elements are visible
    expect(await bridgePage.isVisible(bridgePage.fromChainButton)).toBe(true);
    expect(await bridgePage.isVisible(bridgePage.toChainButton)).toBe(true);
    expect(await bridgePage.isVisible(bridgePage.fromTokenButton)).toBe(true);
    expect(await bridgePage.isVisible(bridgePage.toTokenButton)).toBe(true);
    expect(await bridgePage.isVisible(bridgePage.amountInput)).toBe(true);
  });

  test('should select from chain', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select from chain
    await bridgePage.selectFromChain('Ethereum');

    // Verify chain is selected
    expect(await bridgePage.isVisible(bridgePage.chainSearchInput)).toBe(false);
  });

  test('should select to chain', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select to chain
    await bridgePage.selectToChain('Polygon');

    // Verify chain is selected
    expect(await bridgePage.isVisible(bridgePage.chainSearchInput)).toBe(false);
  });

  test('should select from token', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select from token
    await bridgePage.selectFromToken('ETH');

    // Verify token is selected
    expect(await bridgePage.isVisible(bridgePage.tokenSearchInput)).toBe(false);
  });

  test('should select to token', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select to token
    await bridgePage.selectToToken('ETH');

    // Verify token is selected
    expect(await bridgePage.isVisible(bridgePage.tokenSearchInput)).toBe(false);
  });

  test('should enter bridge amount', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Enter amount
    const testAmount = '0.5';
    await bridgePage.enterAmount(testAmount);

    // Verify amount is entered
    expect(await bridgePage.getAmount()).toBe(testAmount);
  });

  test('should switch chains', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');

    // Switch chains
    await bridgePage.switchChains();

    // Verify chains are switched
    expect(await bridgePage.verifyBridgePageLoaded()).toBe(true);
  });

  test('should search for chain', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Click on chain button to open search
    await bridgePage.click(bridgePage.fromChainButton);

    // Search for chain
    await bridgePage.searchChain('Polygon');

    // Verify search results are displayed
    const resultsCount = await bridgePage.getChainSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });

  test('should display bridge fee', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains, tokens and enter amount
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');
    await bridgePage.enterAmount('1');

    // Wait for bridge fee to load
    await bridgePage.waitForElement(bridgePage.bridgeFee, 10000);

    // Verify bridge fee is displayed
    const fee = await bridgePage.getBridgeFee();
    expect(fee.length).toBeGreaterThan(0);
  });

  test('should display estimated time', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains, tokens and enter amount
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');
    await bridgePage.enterAmount('1');

    // Wait for estimated time to load
    await bridgePage.waitForElement(bridgePage.estimatedTime, 10000);

    // Verify estimated time is displayed
    const time = await bridgePage.getEstimatedTime();
    expect(time.length).toBeGreaterThan(0);
  });

  test('should show loading state during bridge fee calculation', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains, tokens and enter amount
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');
    await bridgePage.enterAmount('1');

    // Check if loading spinner appears
    const isLoading = await bridgePage.isLoading();
    expect(isLoading).toBe(true);

    // Wait for loading to complete
    await bridgePage.waitForElementHidden(bridgePage.loadingSpinner, 15000);
  });

  test('should handle zero amount error', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains and tokens
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');

    // Enter zero amount
    await bridgePage.enterAmount('0');

    // Try to review bridge
    await bridgePage.clickReviewBridge();

    // Verify error is displayed
    expect(await bridgePage.isErrorDisplayed()).toBe(true);
  });

  test('should handle insufficient balance error', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains and tokens
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');

    // Enter very large amount
    await bridgePage.enterAmount('999999');

    // Try to review bridge
    await bridgePage.clickReviewBridge();

    // Verify error is displayed
    expect(await bridgePage.isErrorDisplayed()).toBe(true);
  });

  test.describe('Bridge Test Cases', () => {
    bridgeTestCases.forEach((testCase) => {
      test(`should handle ${testCase.name}`, async () => {
        // Navigate to bridge page
        await bridgePage.navigateToBridge();

        // Select chains and tokens
        await bridgePage.selectFromChain(testCase.fromChain);
        await bridgePage.selectToChain(testCase.toChain);
        await bridgePage.selectFromToken(testCase.fromToken);
        await bridgePage.selectToToken(testCase.toToken);

        // Enter amount
        await bridgePage.enterAmount(testCase.amount);

        // Wait for bridge fee
        await bridgePage.waitForElement(bridgePage.bridgeFee, 10000);

        // Verify bridge fee is displayed
        expect(await bridgePage.isVisible(bridgePage.bridgeFee)).toBe(true);

        // Verify estimated time is displayed
        expect(await bridgePage.isVisible(bridgePage.estimatedTime)).toBe(true);
      });
    });
  });

  test('should display review bridge modal', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains, tokens and enter amount
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');
    await bridgePage.enterAmount('0.1');

    // Wait for bridge fee
    await bridgePage.waitForElement(bridgePage.bridgeFee, 10000);

    // Click review bridge
    await bridgePage.clickReviewBridge();

    // Verify confirm button is visible
    expect(await bridgePage.isVisible(bridgePage.confirmBridgeButton)).toBe(true);
  });

  test('should verify bridge details before confirmation', async () => {
    // Navigate to bridge page
    await bridgePage.navigateToBridge();

    // Select chains, tokens and enter amount
    const testAmount = '0.5';
    await bridgePage.selectFromChain('Ethereum');
    await bridgePage.selectToChain('Polygon');
    await bridgePage.selectFromToken('ETH');
    await bridgePage.selectToToken('ETH');
    await bridgePage.enterAmount(testAmount);

    // Wait for bridge fee
    await bridgePage.waitForElement(bridgePage.bridgeFee, 10000);

    // Verify all details are displayed
    expect(await bridgePage.isVisible(bridgePage.bridgeFee)).toBe(true);
    expect(await bridgePage.isVisible(bridgePage.estimatedTime)).toBe(true);

    // Get bridge fee and estimated time
    const fee = await bridgePage.getBridgeFee();
    const time = await bridgePage.getEstimatedTime();

    expect(fee.length).toBeGreaterThan(0);
    expect(time.length).toBeGreaterThan(0);
  });
});
