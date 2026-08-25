// M03 Practice: Test Runner Hooks and Auto-Waiting
import { test, expect } from '@playwright/test';

// Structuring tests within a describe block
test.describe('Playwright Architecture & Synchronization', () => {

  // Hook to set up the state before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('Demonstrating auto-waiting', async ({ page }) => {
    // Playwright automatically waits for inputs to be attached to the DOM and visible
    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    
    // Auto-waits for the submit button to be clickable before interacting
    await page.click('button[type="submit"]');

    // Built-in assertion waiting for the URL to change
    await expect(page).toHaveURL(/.*practicetestautomation/);
  });
});