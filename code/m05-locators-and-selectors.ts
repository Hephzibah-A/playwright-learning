// M05 Practice: Locators, Selectors, Shadow DOM, and Element State Validations
import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('M05: Locator and Selector Practice Suite', () => {

  test('1. Semantic Locators (getByRole, getByText, getByLabel, getByPlaceholder)', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // getByLabel: Form field input via associated <label>
    const usernameInput = page.getByLabel('Username');
    await usernameInput.fill('student');

    // Retrieve input value to confirm entry
    const enteredUsername = await usernameInput.inputValue();
    expect(enteredUsername).toBe('student');

    // getByPlaceholder: Locates input field by placeholder attribute
    const passwordInput = page.getByPlaceholder('Password');
    await passwordInput.fill('Password123');

    // getByRole: Target semantic button element
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    // getByText: Target static confirmation text with exact match
    const successHeader = page.getByText('Logged In Successfully', { exact: true });
    await expect(successHeader).toBeVisible();
  });

  test('2. CSS and XPath Selectors with page.locator()', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');

    // CSS Selector: Tag + Attribute
    const searchBoxCss = page.locator('input[name="search"]');
    await searchBoxCss.fill('Playwright Testing');

    // XPath Selector: Tag + Attribute
    const searchBtnXpath = page.locator('//button[@type="submit"]');
    await searchBtnXpath.click();

    // Validate navigation URL query
    await page.waitForURL(/search=Playwright\+Testing/);
    await expect(page).toHaveURL(/search=Playwright\+Testing/);
  });

  test('3. Open Shadow DOM Handling', async ({ page }) => {
    await page.goto('https://books-pwakit.appspot.com/');

    // Step 1: Locate the shadow host element
    const shadowHost = page.locator('book-app');

    // Step 2: Locate the input field nested inside the Shadow DOM
    const searchInput = shadowHost.locator('input#input');

    // Step 3: Fill value and validate
    await searchInput.fill('Playwright Testing');
    await expect(searchInput).toHaveValue('Playwright Testing');
  });

  test('4. Custom Test Attributes & Element State Validations', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Visibility check using custom data-test attribute
    const usernameField = page.locator('[data-test="username"]');
    await expect(usernameField).toBeVisible();

    // Enabled check before interaction
    const passwordField = page.locator('[data-test="password"]');
    await expect(passwordField).toBeEnabled();
    await passwordField.fill('secret_sauce');

    // Button state verification (visible and enabled)
    const loginButton = page.locator('[data-test="login-button"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    // Validate error message text state on incorrect/missing login
    const errorMessage = page.locator('[data-test="error"]');
    if (await errorMessage.isVisible()) {
      await expect(errorMessage).toHaveText('Epic sadface: Username is required');
    }

    // Interactive breakpoint for Playwright Inspector (uncomment to debug)
    // await page.pause();
  });

  test('5. Checkbox State Validations (.toBeChecked / .not.toBeChecked)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');

    // Locate first checkbox and verify it is unchecked by default
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(firstCheckbox).not.toBeChecked();

    // Locate second checkbox and verify it is checked by default
    const secondCheckbox = page.locator('input[type="checkbox"]').last();
    await expect(secondCheckbox).toBeChecked();

    // Check the first checkbox and validate updated state
    await firstCheckbox.click();
    await expect(firstCheckbox).toBeChecked();
  });

});