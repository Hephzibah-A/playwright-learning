// M11 Practice: Screenshot Techniques and Visual Regression
import { test, expect } from '@playwright/test';

test.describe('M11: Visual Testing Practice Suite', () => {

  test('1. Basic Screenshot Techniques', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');

    // Viewport Screenshot
    await page.screenshot({ path: 'viewport_screenshot.png' });

    // Full Page Screenshot
    await page.screenshot({ path: 'full_page_screenshot.png', fullPage: true });

    // Element Screenshot
    const searchContainer = page.locator('.search-container');
    if (await searchContainer.isVisible()) {
      await searchContainer.screenshot({ path: 'search_element.png' });
    }
  });

  test('2. Manual Screenshot on Test Failure', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');
    
    try {
      // Intentional failure: checking for a title that doesn't exist
      await expect(page.locator('h1')).toHaveText('Non-Existing Title', { timeout: 2000 });
    } catch (error) {
      // Capture screenshot right when the error occurs
      await page.screenshot({ path: 'error_screenshot.png' });
      // Rethrow the error so the test still officially fails
      throw error; 
    }
  });

  test('3. Visual Regression Snapshot Comparison', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');
    
    // Note: The first time you run this, it will fail because there is no baseline.
    // Run the command `npx playwright test --update-snapshots` in your terminal to create the baseline.
    // On subsequent runs, it will compare the current UI against that saved baseline.
    
    expect(await page.screenshot()).toMatchSnapshot('wikipedia_homepage.png');
  });

});