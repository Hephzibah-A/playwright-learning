## M16: Troubleshooting Common Issues

### 1. Overriding Configurations
Playwright allows you to override default configurations to run tests efficiently across different environments and viewports.
* **Project-Level Override:** Applies settings to an entire project or group of tests within `playwright.config.ts`. 
  * *Use Case:* Running the entire test suite in headless mode for Chromium but headed mode for Edge to assist with browser-specific UI debugging.
* **Test-Level Override:** Modifies settings for a single, specific test using `test.use()`. 
  * *Use Case:* Running a specific test in UI (headed) mode for debugging while the rest of the suite continues to run headlessly.

### 2. Debugging Test Failures
When tests fail unexpectedly, Playwright provides powerful tools to pause execution, trace steps, and inspect elements.
* **Interactive Debug Mode (`--debug`):** Run via `npx playwright test --debug`. Opens the Playwright Inspector, allowing you to manually step through each test action, inspect elements, and verify locators.
* **Tracing (`--trace on`):** Captures screenshots, network requests, console logs, and DOM snapshots. 
  * *Use Case:* Crucial for CI/CD pipelines where direct debugging isn't possible. You can view the trace offline using `npx playwright show-trace trace.zip`.
* **Page Pause (`await page.pause()`):** Stops execution at a specific line of code and opens the Inspector, allowing you to manually interact with the browser state at that exact moment before continuing.

### 3. Handling Flaky Tests
Flaky tests pass and fail inconsistently without any code changes, reducing confidence in the test suite.
* **Causes:** Slow UI loads, ongoing animations/transitions, network delays, or race conditions.
* **Solutions:** 
  * Configure automatic retries in `playwright.config.ts` (e.g., `retries: 2`).
  * Prefer explicit waits (like `waitForSelector()`) over arbitrary time-based waits.
  * Debug flakiness using slow-motion execution or traces.

### 4. Common Pitfalls and Solutions
* **Pitfall 1: Clicking invisible elements before they load.**
  * *Incorrect:* Immediately clicking an element that might be delayed.
  * *Correct:* Using `await locator.waitFor({ state: 'visible' })` to ensure it is fully rendered before interacting.
* **Pitfall 2: Navigating before page load completes.**
  * *Incorrect:* Triggering a navigation action and immediately trying to interact with the new page, leading to "TimeoutError" or "Locator not found".
  * *Correct:* Use `await page.waitForURL()` to ensure the new page has fully loaded before executing the next steps.

### 5. Event Handling
Playwright can listen to browser events dynamically for debugging, performance monitoring, and handling asynchronous actions.
* **Key Events:**
  * `console`: Captures browser console logs (info, warnings, errors).
  * `request` / `response`: Tracks API calls made by the browser and their returned status/body.
  * `pageerror`: Detects JavaScript crashes on the page.
  * `dialog`: Handles pop-ups like alerts and prompts.
  * `download`: Listens for file download events.
* **Best Practice:** Always attach event listeners (`page.on()`) *before* navigating to the page or triggering the action to ensure no events are missed.
