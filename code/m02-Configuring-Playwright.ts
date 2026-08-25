// M02 Practice: Test Structure and Basic Configuration
import { test, expect } from '@playwright/test';

// Grouping tests together using describe block
test.describe('Login Functionality', () => {
  
  // beforeEach hook runs before every single test in this block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  // Individual test script
  test('Valid Login', async ({ page }) => {
    // Interacting with elements
    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('button[type="submit"]');

    // Assertion to verify successful navigation
    await expect(page).toHaveURL(/.*practicetestautomation/);
  });
});