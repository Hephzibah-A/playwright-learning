// M10 Practice: CLI Execution Targets
// Note: This file doesn't introduce new Playwright APIs. 
// Instead, save this file and practice running the CLI commands listed below in your terminal!

/* 
  --- PRACTICE COMMANDS TO RUN IN YOUR TERMINAL ---
  1. npx playwright test M10-Playwright-CLI-options.ts
  2. npx playwright test M10-Playwright-CLI-options.ts --workers=1
  3. npx playwright test M10-Playwright-CLI-options.ts --project=chromium
  4. npx playwright show-report
*/

import { test, expect } from '@playwright/test';

test.describe('M10: CLI Execution Practice Suite', () => {

  test('Test Case 1: Simple Navigation', async ({ page }) => {
    // A quick test to practice parallel vs serial execution
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('Test Case 2: Validate Heading', async ({ page }) => {
    // Another quick test to see how workers divide tasks
    await page.goto('https://playwright.dev/');
    const heading = page.getByRole('heading', { name: 'Playwright enables reliable' });
    await expect(heading).toBeVisible();
  });

  test('Test Case 3: Get Started Link', async ({ page }) => {
    // Use this to check browser-specific execution (--project=firefox)
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

});