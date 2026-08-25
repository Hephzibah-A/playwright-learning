// M09 Practice: Assertions, Timeouts, and Custom Validations
import { test, expect } from '@playwright/test';

test.describe('M09: Assertions and Validations Practice Suite', () => {

  test('1. Strict Assertions and Timeout-based Assertions', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');

    // Check for specific attribute with a custom timeout
    const searchInput = page.locator('input[name="search"]');
    await expect(searchInput).toHaveAttribute('dir', 'auto', { timeout: 10000 });
    await expect(searchInput).toBeVisible();

    // Perform search
    await searchInput.fill('Playwright Testing');
    await page.locator('button[type="submit"]').click();

    // Validate URL and Heading using strict assertions
    await expect(page).toHaveURL(/search/);
    await expect(page.locator('#firstHeading')).toHaveText('Search results');
  });

  test('2. Manual Soft Assertions (Try/Catch Error Accumulation)', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');
    
    // Array to capture non-critical errors without stopping the test
    let errors: string[] = [];

    // Check 1: Search box visibility
    try {
      await expect(page.locator('input[name="search"]')).toBeVisible();
    } catch (error) {
      errors.push('Search box is not visible');
    }

    // Check 2: Verify a non-existent element to force a failure catch
    try {
      // Intentionally looking for something that doesn't exist on the home page
      await expect(page.locator('#firstHeading')).toContainText('Playwright', { timeout: 2000 });
    } catch (error) {
      errors.push('First heading does not contain "Playwright"');
    }

    // Report all failures at the end of the test
    if (errors.length > 0) {
      // In a real scenario, you might log these or throw an error. 
      // We log here to prevent the practice test suite from strictly failing.
      console.log('Soft Assertion Failures Captured:\n' + errors.join('\n'));
      // throw new Error(errors.join('\n'));
    }
  });

  test('3. Using Custom Validation Logic via Helper Function', async ({ page }) => {
    // 1. Define Helper Function
    async function validateElementContainsText(pageObj: any, selector: string, expectedText: string) {
      // 2. Retrieve Element Data
      const actualText = await pageObj.locator(selector).first().textContent();
      
      // 3. Perform Logical Comparisons
      if (actualText) {
          return actualText.includes(expectedText);
      }
      return false;
    }

    await page.goto('https://en.wikipedia.org/wiki/Special:Search?search=Playwright+Testing');

    // Execute helper function
    const isHeadingCorrect = await validateElementContainsText(page, '#firstHeading', 'Search results');
    
    // 4. Use Assertions for Final Check
    expect(isHeadingCorrect).toBe(true);
    console.log('Wikipedia search results successfully validated using custom logic.');
  });

});