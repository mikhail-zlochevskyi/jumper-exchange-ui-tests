/**
 * Helper script to collect selectors interactively
 * Run: node collect-selectors.js
 * 
 * This will open a browser and help you identify selectors
 */

import { chromium } from 'playwright';

async function collectSelectors() {
  console.log('🚀 Opening browser to collect selectors...\n');
  console.log('📋 Instructions:');
  console.log('1. Interact with the page');
  console.log('2. Use DevTools (F12) to inspect elements');
  console.log('3. Copy selectors from the console or DevTools\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://jumper.exchange');
  await page.waitForLoadState('domcontentloaded');

  console.log('✅ Page loaded. Now you can:');
  console.log('   - Open DevTools (F12)');
  console.log('   - Use element selector tool (Ctrl+Shift+C / Cmd+Shift+C)');
  console.log('   - Click elements to see their selectors\n');

  // Add a helper to log element info when clicked
  await page.evaluate(() => {
    document.addEventListener('click', (e) => {
      const target = e.target;
      const info = {
        tag: target.tagName,
        id: target.id,
        classes: target.className,
        dataTestId: target.getAttribute('data-testid'),
        text: target.textContent?.trim().substring(0, 50),
        href: target.href || target.closest('a')?.href,
      };
      console.log('🔍 Clicked element info:', info);
    }, true);
  });

  console.log('💡 Tip: Click elements on the page and check the console for element info');
  console.log('⏸️  Press Ctrl+C to close the browser when done\n');

  // Keep browser open
  await new Promise(() => {}); // Never resolves, keeps browser open
}

collectSelectors().catch(console.error);

