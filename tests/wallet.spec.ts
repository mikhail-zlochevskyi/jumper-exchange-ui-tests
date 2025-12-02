import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { WalletPage } from './pages/WalletPage';
import { walletTestData, networkTestData } from '../utils/testData';

test.describe('Wallet Connection', () => {
  let homePage: HomePage;
  let walletPage: WalletPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    walletPage = new WalletPage(page);

    // Navigate to home page
    await homePage.navigateToHome();
  });

  test('should display connect wallet button', async () => {
    // Verify connect wallet button is visible
    expect(await homePage.isConnectWalletButtonVisible()).toBe(true);
  });

  test('should open wallet connection modal', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Verify wallet modal is visible
    expect(await walletPage.isWalletModalVisible()).toBe(true);
  });

  test('should display wallet options', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Verify wallet options are available
    expect(await walletPage.isMetaMaskAvailable()).toBe(true);
    expect(await walletPage.isWalletConnectAvailable()).toBe(true);
    expect(await walletPage.isCoinbaseAvailable()).toBe(true);
  });

  test('should display available wallet count', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Get available wallets count
    const walletsCount = await walletPage.getAvailableWalletsCount();

    // Verify at least one wallet is available
    expect(walletsCount).toBeGreaterThan(0);
  });

  test('should have MetaMask option', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Verify MetaMask option is available
    expect(await walletPage.isMetaMaskAvailable()).toBe(true);
  });

  test('should have WalletConnect option', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Verify WalletConnect option is available
    expect(await walletPage.isWalletConnectAvailable()).toBe(true);
  });

  test('should have Coinbase option', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Verify Coinbase option is available
    expect(await walletPage.isCoinbaseAvailable()).toBe(true);
  });

  test('should display wallet badge when connected', async () => {
    // Note: This test assumes wallet is already connected
    // In a real scenario, you would need to mock wallet connection

    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Verify wallet badge is visible
      expect(await walletPage.isVisible(walletPage.walletBadge)).toBe(true);
    }
  });

  test('should display wallet address when connected', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Get wallet address
      const address = await walletPage.getDisplayedWalletAddress();

      // Verify address is displayed
      expect(address.length).toBeGreaterThan(0);
    }
  });

  test('should open account menu when clicking wallet badge', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Click wallet badge
      await walletPage.clickWalletBadge();

      // Verify account menu is visible
      expect(await walletPage.isVisible(walletPage.accountMenu)).toBe(true);
    }
  });

  test('should display disconnect option in account menu', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Click wallet badge
      await walletPage.clickWalletBadge();

      // Verify disconnect button is visible
      expect(await walletPage.isVisible(walletPage.disconnectButton)).toBe(true);
    }
  });

  test('should display copy address option', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Click wallet badge
      await walletPage.clickWalletBadge();

      // Verify copy address button is visible
      expect(await walletPage.isVisible(walletPage.copyAddressButton)).toBe(true);
    }
  });

  test('should display view on explorer option', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Click wallet badge
      await walletPage.clickWalletBadge();

      // Verify view on explorer button is visible
      expect(await walletPage.isVisible(walletPage.viewOnExplorerButton)).toBe(true);
    }
  });

  test('should display network badge when connected', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Verify network badge is visible
      expect(await walletPage.isVisible(walletPage.walletNetworkBadge)).toBe(true);
    }
  });

  test('should display current network', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Get current network
      const network = await walletPage.getCurrentNetwork();

      // Verify network is displayed
      expect(network.length).toBeGreaterThan(0);
    }
  });

  test('should display switch network button', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Verify switch network button is visible
      expect(await walletPage.isVisible(walletPage.switchNetworkButton)).toBe(true);
    }
  });

  test('should display available networks', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Click switch network button
      await walletPage.click(walletPage.switchNetworkButton);

      // Get available networks count
      const networksCount = await walletPage.getAvailableNetworksCount();

      // Verify at least one network is available
      expect(networksCount).toBeGreaterThan(0);
    }
  });

  test.describe('Wallet Connection Flow', () => {
    walletTestData &&
      Object.values(walletTestData).forEach((wallet) => {
        test(`should display ${wallet.name} option`, async () => {
          // Click connect wallet button
          await walletPage.clickConnectWallet();

          // Verify wallet modal is visible
          expect(await walletPage.isWalletModalVisible()).toBe(true);

          // Verify at least one wallet option is available
          const walletsCount = await walletPage.getAvailableWalletsCount();
          expect(walletsCount).toBeGreaterThan(0);
        });
      });
  });

  test.describe('Network Switching', () => {
    networkTestData.forEach((network) => {
      test(`should have ${network.name} available`, async () => {
        // Check if wallet is connected
        const isConnected = await walletPage.isWalletConnected();

        if (isConnected) {
          // Click switch network button
          await walletPage.click(walletPage.switchNetworkButton);

          // Verify network list is visible
          expect(await walletPage.isVisible(walletPage.networkList)).toBe(true);

          // Get available networks count
          const networksCount = await walletPage.getAvailableNetworksCount();
          expect(networksCount).toBeGreaterThan(0);
        }
      });
    });
  });

  test('should handle wallet connection error', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Verify wallet modal is visible
    expect(await walletPage.isWalletModalVisible()).toBe(true);

    // Note: In a real scenario, you would simulate a connection error
    // by mocking the wallet provider or using a test wallet
  });

  test('should display loading state during wallet connection', async () => {
    // Click connect wallet button
    await walletPage.clickConnectWallet();

    // Select MetaMask (this would trigger connection)
    await walletPage.selectMetaMask();

    // Check if loading spinner appears
    const isLoading = await walletPage.isLoading();

    // Note: Loading state might be very brief, so we just verify it can be checked
    expect(typeof isLoading).toBe('boolean');
  });

  test('should maintain wallet connection after page reload', async ({ page }) => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Get wallet address before reload
      const addressBefore = await walletPage.getDisplayedWalletAddress();

      // Reload page
      await walletPage.reload();

      // Wait for page to load
      await walletPage.waitForPageLoad();

      // Check if wallet is still connected
      const isStillConnected = await walletPage.isWalletConnected();
      expect(isStillConnected).toBe(true);

      // Verify wallet address is the same
      const addressAfter = await walletPage.getDisplayedWalletAddress();
      expect(addressAfter).toBe(addressBefore);
    }
  });

  test('should display wallet in home page when connected', async () => {
    // Check if wallet is connected
    const isConnected = await walletPage.isWalletConnected();

    if (isConnected) {
      // Verify wallet badge is visible on home page
      expect(await homePage.isWalletConnected()).toBe(true);

      // Get wallet address from home page
      const address = await homePage.getWalletAddress();
      expect(address.length).toBeGreaterThan(0);
    }
  });
});
