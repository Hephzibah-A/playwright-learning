// M04 Practice: Independent Initialization, Contexts, and Tabs
import { test, chromium, Browser, BrowserContext, Page } from '@playwright/test';

test('Handling multiple contexts and tabs independently', async () => {
  //Independent browser initialization in headed mode
  const browser: Browser = await chromium.launch({ headless: false });
  
  // Creating an isolated browser context
  const context1: BrowserContext = await browser.newContext();
  
  // Creating a new page (tab) within the context
  const page1: Page = await context1.newPage();
  await page1.goto('https://example.com');
  
  // Creating a second tab in the very same context
  const page2: Page = await context1.newPage();
  await page2.goto('https://playwright.dev');
  
  // Using browser navigation controls on the second tab
  await page2.goBack();
  await page2.reload();

  // Explicitly waiting for a specific load state on the first tab
  await page1.waitForLoadState('domcontentloaded');
  
  // Cleaning up by closing the context and the browser instance
  await context1.close();
  await browser.close();
});