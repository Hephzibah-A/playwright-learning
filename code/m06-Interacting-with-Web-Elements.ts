// M06 Practice: Comprehensive Web Element Interactions
import { test, expect } from '@playwright/test';

test.describe('M06: Interacting with Web Elements Practice Suite', () => {

  test('1. Mouse Actions: Click, Right-Click, Double-Click, and Hover', async ({ page }) => {
    // Left Click Navigation
    await page.goto('https://www.wikipedia.org/');
    await page.fill('input[name="search"]', 'Playwright Testing');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/search/);

    // Right Click (Context Menu)
    await page.goto('https://the-internet.herokuapp.com/context_menu');
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('You selected a context menu');
      await dialog.accept();
    });
    await page.locator('#hot-spot').click({ button: 'right' });

    // Hover
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const userAvatar = page.locator('.figure').first();
    await userAvatar.hover();
    await expect(page.getByText('name: user1')).toBeVisible();
  });

  test('2. Typing: fill() vs pressSequentially()', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    // Instant fill
    const userNameInput = page.locator('#userName');
    await userNameInput.fill('John Doe');

    // Character-by-character typing with delay
    const emailInput = page.locator('#userEmail');
    await emailInput.pressSequentially('john.doe@example.com', { delay: 50 });

    // Fetch and validate value
    const enteredName = await userNameInput.inputValue();
    expect(enteredName).toBe('John Doe');
  });

  test('3. Dynamic Suggestion Dropdowns', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');

    // Type query
    await page.fill('input[name="search"]', 'Playwright');

    // Wait for auto-suggestions to appear
    await page.waitForSelector('.suggestion-title');

    // Click first suggestion
    await page.locator('.suggestion-title').first().click();
    await expect(page).toHaveURL(/Playwright/);
  });

  test('4. Web Tables: Extract and Validate Cell Content', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const bookTable = page.locator('table[name="BookTable"]');
    await bookTable.waitFor();

    // Extract text from specific row and column (Row 2, Column 2 - Author)
    const authorName = await page.locator('table[name="BookTable"] tbody tr:nth-child(2) td:nth-child(2)').textContent();
    console.log('Extracted Author Name:', authorName);

    // Validate table text content
    await expect(bookTable).toContainText('Learn Selenium');
  });

  test('5. Checkboxes and Radio Buttons', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');

    // Toggle tree and select checkbox
    await page.click('button[title="Toggle"]');
    const desktopCheckbox = page.locator('label[for="tree-node-desktop"]');
    await desktopCheckbox.click();
    await expect(page.locator('input#tree-node-desktop')).toBeChecked();

    // Radio button handling
    await page.goto('https://demoqa.com/radio-button');
    const yesRadioLabel = page.locator('label[for="yesRadio"]');
    await yesRadioLabel.click();
    await expect(page.locator('input#yesRadio')).toBeChecked();
  });

  test('6. JavaScript Dialogs: Alert, Confirm, Prompt', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/alerts/alert-test.html');

    // 1. Alert Handling
    page.once('dialog', async (dialog) => {
      console.log('Alert text:', dialog.message());
      await dialog.accept();
    });
    await page.locator('#alertexamples').click();

    // 2. Confirm Handling (Dismiss / Cancel)
    page.once('dialog', async (dialog) => {
      console.log('Confirm text:', dialog.message());
      await dialog.dismiss();
    });
    await page.locator('#confirmexample').click();

    // 3. Prompt Handling (Entering input)
    page.once('dialog', async (dialog) => {
      console.log('Prompt text:', dialog.message());
      await dialog.accept('Playwright Demo');
    });
    await page.locator('#promptexample').click();
  });

  test('7. Complete Form Submission with Calendars and Dropdowns', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/form');

    // Text inputs
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#job-title', 'Software Engineer');

    // Radio button & Checkbox
    await page.check('input[value="radio-button-2"]');
    await page.check('input[value="checkbox-1"]');

    // Static Dropdown (<select>)
    await page.selectOption('#select-menu', '2'); // Selects '2-4 years'

    // Date picker direct fill
    await page.fill('#datepicker', '2026-03-25');

    // Scroll into view & click submit
    const submitBtn = page.locator('.btn.btn-lg.btn-primary');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    // Validate confirmation message
    const alertMsg = page.locator('.alert');
    await expect(alertMsg).toContainText('The form was successfully submitted!');
  });

});