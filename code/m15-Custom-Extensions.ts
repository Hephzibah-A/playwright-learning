// M15 Practice: Custom Extensions and Fixtures

import { test as base, expect, Page } from '@playwright/test';

// 1. Custom Function
// Create a reusable function to perform a specific action, such as logging in to a website.
export async function loginFunction(page: Page, username: string, password: string) {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#submit');
}

// 2. Custom Class
// Encapsulate related functionality into a class to organize code.
export class CustomActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#submit');
  }
}

// 3. Custom Fixture
// Extend Playwright's test fixtures to add custom functionality.
type MyFixtures = {
  customActions: CustomActions;
};

//Extend the base test object with our custom actions class
export const test = base.extend<MyFixtures>({
  customActions: async ({ page }, use) => {
    const actions = new CustomActions(page);
    await use(actions);
  },
});

// 4. Test Execution Using Extensions & Tags

// Use Playwright's tags to group tests and run them selectively (e.g., @smoke).
// Usage of Custom Fixtures to login to a website.
test('Validate login using Custom Fixtures @smoke', async ({ customActions, page }) => {
  // The customActions fixture is automatically instantiated and passed in
  await customActions.login('student', 'Password123');
  
  await expect(page).toHaveURL(/.*logged-in-successfully/);
});

// Usage of Custom Function to log in to a website.
test('Validate login using Custom Function @regression', async ({ page }) => {
  await loginFunction(page, 'student', 'Password123');
  
  await expect(page).toHaveURL(/.*logged-in-successfully/);
});