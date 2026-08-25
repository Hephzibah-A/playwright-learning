// M13 Practice: CI Optimization, Conditional Execution, and Sharding Concepts
import { test, expect } from '@playwright/test';

// Simulated Winston Logger implementation for practice
const logger = {
  info: (msg: string) => console.log(`[INFO]: ${msg}`),
  error: (msg: string) => console.error(`[ERROR]: ${msg}`)
};

test.describe('M13: CI/CD Execution Suite', () => {

  // Test demonstrating CI-specific conditional logic
  test('Skip non-critical test during CI execution', async ({ page }) => {
    // process.env.CI is automatically set to "true" by GitHub Actions/Jenkins
    if (process.env.CI) {
      logger.info('Skipping visual-heavy test in CI environment to save time.');
      test.skip();
    }

    logger.info('Navigating to Playwright homepage');
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  // Test demonstrating fast semantic selectors optimized for CI
  test('Optimized interaction avoiding unnecessary waits', async ({ page }) => {
    logger.info('Starting optimized test block');
    await page.goto('https://www.saucedemo.com/');

    // Using auto-waiting fills and clicks instead of hardcoded timeouts
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.inventory_list')).toBeVisible();
    logger.info('Login successful, inventory visible');
  });

});

/* 
  --- CI/CD PRACTICE TERMINAL COMMANDS ---
  
  1. Sharding Execution (Run this terminal command to test shard 1 of 2):
     npx playwright test M13-Integrating-Playwright-with-CICD.ts --shard=1/2

  2. Allure Report Generation (Assuming allure-playwright is configured):
     npx playwright test M13-Integrating-Playwright-with-CICD.ts --reporter=allure-playwright
     npx allure generate ./allure-results --clean
     npx allure open
*/