// M08 Practice: Using Hooks for Setup, Teardown, and Repeated Actions
import { test, expect } from '@playwright/test';

test.describe('M08: Login flow using beforeEach and afterEach hooks', () => {

  // Runs before every single test in this describe block
  test.beforeEach('Setup and Login', async ({ page }) => {
    console.log('Running before each test: Logging in...');
    await page.goto('https://www.demoblaze.com/');
    
    // Using standard mouse/keyboard actions inside the hook
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('testuser');
    await page.locator('#loginpassword').fill('testpass');
    await page.locator('button[onclick="logIn()"]').click();
  });

  // Runs after every single test in this describe block
  test.afterEach('Teardown and Logout', async ({ page }) => {
    console.log('Running after each test: Logging out...');
    await page.locator('#logout2').click();
  });

  // Test 1: Starts with a fresh login state thanks to beforeEach
  test('Verify Home Page user greeting', async ({ page }) => {
    const nameOfUser = page.locator('#nameofuser');
    await expect(nameOfUser).toContainText('Welcome testuser');
  });

  // Test 2: Starts with a fresh login state again
  test('Add a specific product to cart', async ({ page }) => {
    // Focus only on the test logic since login is already handled
    await page.locator('//a[normalize-space()="Nexus 6"]').click();
    await expect(page).toHaveURL(/.*prod.html/);
  });
});

test.describe('M08: Global setup using beforeAll and afterAll hooks', () => {
  let sharedPage;

  // Runs only once for this entire block
  test.beforeAll('Launch shared page and setup', async ({ browser }) => {
    console.log('Running beforeAll: Setting up global resources');
    sharedPage = await browser.newPage();
    await sharedPage.goto('http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html');
  });

  // Runs only once after all tests in this block are finished
  test.afterAll('Cleanup shared page', async () => {
    console.log('Running afterAll: Cleaning up global resources');
    await sharedPage.close();
  });

  test('Perform hover action on shared page', async () => {
    const source = sharedPage.locator('#box5');
    await source.hover();
    await expect(source).toBeVisible();
  });

  test('Perform drag and drop using mouse actions', async () => {
    const source = sharedPage.locator('#box6');
    const destination = sharedPage.locator('#box106');
    
    // Using mouse actions to simulate drag and drop
    await source.hover();
    await sharedPage.mouse.down();
    await destination.hover();
    await sharedPage.mouse.up();
  });
});