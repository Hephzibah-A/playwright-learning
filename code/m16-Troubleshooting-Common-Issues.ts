// M16 Practice: Overrides, Debugging, Waits, and Event Handling
import { test, expect } from '@playwright/test';


// 1. Test-Level Configuration Override

test.describe('Configuration Overrides', () => {
  // Overriding global config to force this specific test to run in headed mode
  test.use({ headless: false });

  test('Test running in non-headless (UI) mode', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await expect(page).toHaveTitle(/Test Login/);
  });
});


// 2. Debugging and Explicit Waits (Pitfall Avoidance)

test.describe('Debugging and Waits', () => {

  test('Using page.pause() and explicit waitFor()', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginBtn = page.locator('#login-button');
    
    // Avoiding Pitfall 1: Explicitly wait for the element to be visible
    await loginBtn.waitFor({ state: 'visible' });

    // Uncomment the line below to freeze the test and open Playwright Inspector
    // await page.pause(); 

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await loginBtn.click();

    // Avoiding Pitfall 2: Wait for URL change to ensure navigation completed
    await page.waitForURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

});


// 3. Event Handling (Console, Network, Dialogs)

test.describe('Event Handling', () => {

  test('Capture Console Logs and API Requests', async ({ page }) => {
    // Setup listeners BEFORE navigating
    
    // Listen for console logs
    page.on('console', msg => {
      console.log(`Browser Console [${msg.type()}]: ${msg.text()}`);
    });

    // Listen for outgoing network requests
    page.on('request', request => {
      console.log(`>> Request: ${request.method()} ${request.url()}`);
    });

    // Listen for incoming network responses
    page.on('response', response => {
      console.log(`<< Response: ${response.status()} ${response.url()}`);
    });

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('Handle Unexpected Pop-ups (Dialogs)', async ({ page }) => {
    // Set up dialog listener BEFORE triggering the action
    page.on('dialog', async dialog => {
      console.log(`Alert Message: ${dialog.message()}`);
      
      // Always accept or dismiss dialogs to prevent test hangs
      await dialog.accept(); 
    });

    await page.goto('https://testpages.eviltester.com/styled/alerts/alert-test.html');
    
    // Triggering the alert
    await page.locator('#alertexamples').click();
  });

});