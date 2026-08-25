// M14 Practice: Implementing Playwright Plugins
// Note: Some of these require specific npm packages to be installed first.

import { test, expect } from '@playwright/test';

// 1. Allure Playwright Plugin Example
// Requires: npm i -D allure-playwright

test.describe('Allure Plugin Integrations', () => {

  test('Embed screenshot directly into Allure report', async ({ page }, testInfo) => {
    await page.goto('https://www.wikipedia.org/');
    
    // Perform an action
    const searchInput = page.locator('input[name="search"]');
    await searchInput.fill('Playwright');

    // Capture screenshot and attach it to the Allure report object dynamically
    const screenshotBuffer = await page.screenshot();
    await testInfo.attach('search_state_screenshot', { 
        body: screenshotBuffer, 
        contentType: 'image/png' 
    });

    await expect(page).toHaveURL(/wikipedia.org/);
  });

});

// 2. ESLint Plugin Examples (Conceptual)
// Requires: eslint-plugin-playwright

/*
  The linter will automatically flag the "Bad Example" in your IDE.
  
  BAD EXAMPLE (Will trigger ESLint warning/error):
  test('Check Page Title', async ({ page }) => {
      let title;
      page.goto('https://example.com'); // Missing 'await'!
      expect(title).toBe('Example Domain'); 
  });

  GOOD EXAMPLE (Linting passes):
  test('Check Page Title', async ({ page }) => {
      let title: string; // Explicit TypeScript annotation
      await page.goto('https://example.com'); // Correctly awaited
      title = await page.title();
      expect(title).toBe('Example Domain'); 
  });
*/

// 3. Playwright-Extra Stealth Plugin Example
// Requires: npm install playwright-extra playwright-extra-plugin-stealth
// Note: This plugin uses its own browser launcher rather than the default test runner.

/* 
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

// Apply the stealth plugin to the browser
chromium.use(stealth());

// Standalone execution script for scraping/bypassing bots
(async () => {
    // Launch browser in headful mode to visually verify
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // Navigate to a site known for aggressive bot detection
    await page.goto('https://bot.sannysoft.com/');
    
    // Capture proof that the bot detection was bypassed
    await page.screenshot({ path: 'stealth-test-results.png' });
    
    await browser.close();
})();
*/