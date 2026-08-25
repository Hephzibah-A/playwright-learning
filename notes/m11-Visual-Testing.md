## M11: Visual Testing

### Screenshot Capture Techniques
Playwright provides powerful built-in methods to capture screenshots for visual validation and debugging.
* **Viewport Screenshots:** Captures only the currently visible part of the page in the browser's viewport.
  * `await page.screenshot({ path: 'viewport.png' });`
* **Full Page Screenshots:** Captures the entire scrollable length of the page.
  * `await page.screenshot({ path: 'full_page.png', fullPage: true });`
* **Element Screenshots:** Captures only a specific targeted DOM element.
  * `await page.locator('.header').screenshot({ path: 'element.png' });`
* **Screenshots on Failure:** You can wrap actions in a `try/catch` block, take a screenshot in the `catch` block if an assertion fails, and then rethrow the error to ensure the test still properly registers as failed.

### Embedding Screenshots in Reports
Screenshots can be embedded into test reports to provide clear evidence of failures or test states.

**1. HTML Reporter (Built-in)**
* **Configuration (`playwright.config.ts`):** Add `use: { screenshot: 'only-on-failure' }` (or `'on'`) to automatically capture screenshots.
* **Execution:** `npx playwright test --reporter=html`
* **Viewing:** `npx playwright show-report`

**2. Allure Report (Third-party)**
* **Setup:**
  1. Install dependencies: `npm i -D @playwright/test allure-playwright`
  2. Install CLI: `npm i -g allure-commandline` (verify with `allure --version`)
  3. Configure in `playwright.config.ts`: `reporter: [['allure-playwright']]`
* **Execution & Viewing:** 
  1. Run tests: `npx playwright test`
  2. Generate report: `allure generate allure-results -o allure-report --clean`
  3. Open report: `allure open allure-report`

### Visual Regression Testing
Visual regression testing ensures that an application's UI remains visually consistent over time by comparing current screenshots against a saved baseline snapshot. 

* **Why it matters:** Functional tests might pass even if a button shifts off-screen or CSS breaks. Visual testing catches these layout and design issues.
* **Generating a Baseline:** If a test runs for the first time, it needs a reference image. Run the test with the `--update-snapshots` flag to generate and save the baseline image (usually to a `tests/snapshots/` folder).
  * `npx playwright test --update-snapshots`
* **Comparing Snapshots:** During subsequent runs, Playwright automatically compares the new screenshot to the baseline.
  * **Syntax:** `expect(await page.screenshot()).toMatchSnapshot('homepage.png');`