// M01 Practice: Basic Browser Launch and Navigation
import { chromium, Browser, Page } from 'playwright';

(async () => {
  // Launching the Chromium browser in headful mode (UI visible)
  const browser: Browser = await chromium.launch({ 
      headless: false 
  });
  
  // Creating a new page/tab context
  const page: Page = await browser.newPage();
  
  // Navigating to the sample practice site mentioned in the notes
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  
  // Closing the browser instance
  await browser.close();
})();