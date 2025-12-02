import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SwapPage } from './pages/SwapPage';
import { WalletPage } from './pages/WalletPage';
import { swapTestCases, invalidSwapTestCases } from '../utils/testData';

test.describe('Swap Functionality', () => {
  let homePage: HomePage;
  let swapPage: SwapPage;
  let walletPage: WalletPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    swapPage = new SwapPage(page);
    walletPage = new WalletPage(page);

    // Navigate to home page
    await homePage.navigateToHome();
  });

  test('should display home page with swap button', async () => {
    // Verify home page is loaded
    expect(await homePage.verifyHomePageLoaded()).toBe(true);

    // Verify swap button is visible
    expect(await homePage.isSwapButtonVisible()).toBe(true);
  });

  test('should navigate to swap page', async () => {
    // Click swap button
    await homePage.clickSwapButton();

    // Verify swap page is loaded
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);
  });

  test('should display all main elements on swap page', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Verify main elements are visible
    expect(await swapPage.isVisible(swapPage.fromTokenButton)).toBe(true);
    expect(await swapPage.isVisible(swapPage.toTokenButton)).toBe(true);
    expect(await swapPage.isVisible(swapPage.amountInput)).toBe(true);
    expect(await swapPage.isVisible(swapPage.switchTokensButton)).toBe(true);
  });

  test('should select from token', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select from token
    await swapPage.selectFromToken('ETH');

    // Verify token is selected (check if modal closed)
    expect(await swapPage.isVisible(swapPage.tokenSearchInput)).toBe(false);
  });

  test('should select to token', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select to token
    await swapPage.selectToToken('USDC');

    // Verify token is selected
    expect(await swapPage.isVisible(swapPage.tokenSearchInput)).toBe(false);
  });

  test('should enter swap amount', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Enter amount
    const testAmount = '1.5';
    await swapPage.enterAmount(testAmount);

    // Verify amount is entered
    expect(await swapPage.getAmount()).toBe(testAmount);
  });

  test('should switch tokens', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');

    // Switch tokens
    await swapPage.switchTokens();

    // Verify tokens are switched (page reloaded)
    expect(await swapPage.verifySwapPageLoaded()).toBe(true);
  });

  test('should search for token', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Click on token button to open search
    await swapPage.click(swapPage.fromTokenButton);

    // Search for token
    await swapPage.searchToken('USDC');

    // Verify search results are displayed
    const resultsCount = await swapPage.getTokenSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });

  test('should display quote after entering amount', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens and enter amount
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');
    await swapPage.enterAmount('1');

    // Wait for quote to load
    await swapPage.waitForElement(swapPage.quoteDisplay, 10000);

    // Verify quote is displayed
    expect(await swapPage.isVisible(swapPage.quoteDisplay)).toBe(true);
  });

  test('should display exchange rate', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens and enter amount
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');
    await swapPage.enterAmount('1');

    // Wait for exchange rate to load
    await swapPage.waitForElement(swapPage.exchangeRate, 10000);

    // Verify exchange rate is displayed and not empty
    const rate = await swapPage.getExchangeRate();
    expect(rate.length).toBeGreaterThan(0);
  });

  test('should display gas fee', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens and enter amount
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');
    await swapPage.enterAmount('1');

    // Wait for gas fee to load
    await swapPage.waitForElement(swapPage.gasFee, 10000);

    // Verify gas fee is displayed
    const fee = await swapPage.getGasFee();
    expect(fee.length).toBeGreaterThan(0);
  });

  test('should display price impact', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens and enter amount
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');
    await swapPage.enterAmount('1');

    // Wait for price impact to load
    await swapPage.waitForElement(swapPage.priceImpact, 10000);

    // Verify price impact is displayed
    const impact = await swapPage.getPriceImpact();
    expect(impact.length).toBeGreaterThan(0);
  });

  test('should handle zero amount error', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');

    // Enter zero amount
    await swapPage.enterAmount('0');

    // Try to review swap
    await swapPage.clickReviewSwap();

    // Verify error is displayed
    expect(await swapPage.isErrorDisplayed()).toBe(true);
  });

  test('should handle insufficient balance error', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');

    // Enter very large amount
    await swapPage.enterAmount('999999');

    // Try to review swap
    await swapPage.clickReviewSwap();

    // Verify error is displayed
    expect(await swapPage.isErrorDisplayed()).toBe(true);
  });

  test('should show loading state during quote fetch', async () => {
    // Navigate to swap page
    await swapPage.navigateToSwap();

    // Select tokens and enter amount
    await swapPage.selectFromToken('ETH');
    await swapPage.selectToToken('USDC');
    await swapPage.enterAmount('1');

    // Check if loading spinner appears
    const isLoading = await swapPage.isLoading();
    expect(isLoading).toBe(true);

    // Wait for loading to complete
    await swapPage.waitForElementHidden(swapPage.loadingSpinner, 15000);
  });

  test.describe('Swap Test Cases', () => {
    swapTestCases.forEach((testCase) => {
      test(`should handle ${testCase.name}`, async () => {
        // Navigate to swap page
        await swapPage.navigateToSwap();

        // Select tokens
        await swapPage.selectFromToken(testCase.fromToken);
        await swapPage.selectToToken(testCase.toToken);

        // Enter amount
        await swapPage.enterAmount(testCase.amount);

        // Wait for quote
        await swapPage.waitForElement(swapPage.quoteDisplay, 10000);

        // Verify quote is displayed
        expect(await swapPage.isVisible(swapPage.quoteDisplay)).toBe(true);

        // Verify exchange rate is displayed
        const rate = await swapPage.getExchangeRate();
        expect(rate.length).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Invalid Swap Cases', () => {
    invalidSwapTestCases.forEach((testCase) => {
      test(`should handle ${testCase.name}`, async () => {
        // Navigate to swap page
        await swapPage.navigateToSwap();

        // Select tokens
        await swapPage.selectFromToken(testCase.fromToken);
        await swapPage.selectToToken(testCase.toToken);

        // Enter amount
        await swapPage.enterAmount(testCase.amount);

        // Try to review swap
        await swapPage.clickReviewSwap();

        // Verify error is displayed
        expect(await swapPage.isErrorDisplayed()).toBe(true);

        // Verify error message contains expected text
        const errorMessage = await swapPage.getErrorMessage();
        expect(errorMessage.toLowerCase()).toContain(testCase.expectedError.toLowerCase());
      });
    });
  });
});
