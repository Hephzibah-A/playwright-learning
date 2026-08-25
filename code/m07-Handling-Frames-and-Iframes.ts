// M07 Practice: Handling Frames, Iframes, and Nested Frames
import { test, expect } from '@playwright/test';

test.describe('M07: Frames and Iframes Practice Suite', () => {

  test('1. Accessing Frames using Frame Objects (Name and URL)', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Frames.html');

    // Access Frame by its name attribute
    const frameByName = page.frame({ name: 'SingleFrame' });
    if (frameByName) {
      await frameByName.locator('input[type="text"]').fill('Test Frame by Name');
    }

    // Access Frame by its URL using regex
    const frameByUrl = page.frame({ url: /SingleFrame/ });
    if (frameByUrl) {
      await frameByUrl.locator('input[type="text"]').fill('Test Frame by URL');
    }
  });

  test('2. Accessing Frames using CSS Selectors and contentFrame()', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Frames.html');

    // Locate the iframe element using a CSS selector, then get its content frame
    const iframeElement = page.locator('iframe').nth(0); 
    const frame = await iframeElement.contentFrame();
    
    // Interact with elements inside the fetched frame
    if (frame) {
        await frame.locator('input[type="text"]').fill('Testing Frames with CSS');
    }
  });

  test('3. Accessing Frames by Index', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Frames.html');

    // Get all frames on the page
    const frames = page.frames();
    console.log(`Total frames: ${frames.length}`);

    // Access Frame 1 (index 1, since index 0 is the main page)
    if (frames.length > 1) {
      const frame1 = frames[1];
      const inputField = frame1.locator('input[type="text"]');
      await inputField.fill('Frame 1 via Index');
    }
  });

  test('4. Navigating and Interacting with Nested (Child) Frames', async ({ page }) => {
    await page.goto('https://letcode.in/frame');

    // Log total number of frames currently on the page
    const allframes = page.frames();
    console.log("No. of frames: " + allframes.length);

    // Step 1: Locate the outer (parent) frame using a frame locator
    const parentFrame = page.frameLocator('#firstFr');

    // Interact with elements in the parent frame
    await parentFrame.locator('input[name="fname"]').fill('Aurora');
    await parentFrame.locator('input[name="lname"]').fill('Test');

    // Step 2 & 3: Locate the inner (child) frame nested within the parent frame
    const innerFrame = parentFrame.frameLocator('iframe[src="innerFrame"]');

    // Step 4 & 5: Interact with elements inside the inner child frame
    const emailInput = innerFrame.locator('input[name="email"]');
    await emailInput.hover();
    await emailInput.fill('benAurora@gmail.com');
    
    // Switch back to interacting with the parent frame to prove context isolation
    await parentFrame.locator('input[name="fname"]').fill('Frames Test');
  });

});