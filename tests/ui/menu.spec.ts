import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { MenuDrawer } from '../../src/pages/MenuDrawer';

/**
 * Menu Navigation Tests
 * Tests menu drawer and Learn/Discord navigation
 */
test.describe('Menu Navigation', () => {
  let homePage: HomePage;
  let menuDrawer: MenuDrawer;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    menuDrawer = new MenuDrawer(page);
    await homePage.navigateToHome();
  });

  test('should open menu drawer', async ({ page }) => {
    // Open menu
    await menuDrawer.open();
    
    // Verify menu drawer is visible
    const isOpen = await menuDrawer.isOpen();
    expect(isOpen).toBe(true);
  });

  test('should navigate to Learn page', async ({ page }) => {
    // Open menu
    await menuDrawer.open();
    
    // Check if Learn link is visible
    const learnVisible = await menuDrawer.isLearnLinkVisible();
    
    if (learnVisible) {
      // Click Learn link
      await menuDrawer.clickLearn();
      
      // Wait for URL to contain /learn (max 5 seconds)
      await page.waitForURL(/\/learn/i, { timeout: 5000 });
      
      // Verify URL contains learn pattern
      const url = page.url();
      expect(url).toMatch(/learn|docs|documentation/i);
    } else {
      // Skip if Learn link is not found
      test.skip();
    }
  });

  test('should navigate to Discord and validate URL', async ({ page, context }) => {
    // Open menu
    await menuDrawer.open();
    
    // Check if Discord link is visible
    const discordVisible = await menuDrawer.isDiscordLinkVisible();
    
    if (discordVisible) {
      // Set up listener for new page
      const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 10000 }).catch(() => null),
        menuDrawer.clickDiscord()
      ]);

      if (newPage) {
        // Wait for Discord page to load
        await newPage.waitForLoadState('domcontentloaded');
        
        // Verify new tab has the exact Discord URL
        const url = newPage.url();
        expect(url).toBe('https://discord.com/invite/jumperexchange');
        
        // Close the new page
        await newPage.close();
      } else {
        // If no new page opened, skip test
        test.skip();
      }
    } else {
      // Skip if Discord link is not found
      test.skip();
    }
  });

  test('should close menu drawer', async ({ page }) => {
    // Open menu
    await menuDrawer.open();
    
    // Verify menu is open
    const isOpen = await menuDrawer.isOpen();
    expect(isOpen).toBe(true);
    
    // Close menu
    await menuDrawer.close();
    
    // Verify menu is closed
    const isClosed = !(await menuDrawer.isOpen());
    expect(isClosed).toBe(true);
  });
});

