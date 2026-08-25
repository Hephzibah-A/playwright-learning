## M02: Configuring Playwright

### Installation & Setup
* **Prerequisites:** Requires Node.js and NPM installed.
* **Init Command:** Run `npm init playwright@latest` to set up a new project, install dependencies, and create the `package.json`.

### Playwright Configuration (`playwright.config.ts`)
* Acts as the backbone of the Playwright test setup, centralizing test settings like browser options and directories.
* Supports parallel execution and simplifies customization across different environments.
* **Common Settings:**
  * `timeout`: Sets max execution time (e.g., 30000ms).
  * `retries`: Number of times to retry failed tests.
  * `use`: Global options for browsers, such as `headless: true`, `viewport`, `baseURL`, `screenshot: 'only-on-failure'`, and `video: 'retain-on-failure'`.
  * `projects`: Defines different configs for parallel execution on multiple browsers (Chromium, Firefox, WebKit).
  * `reporter`: Configures how test reports are displayed (e.g., HTML, JSON).

### Playwright Test Runner & Structure
* An inbuilt framework optimized for UI automation, featuring native TypeScript support, robust reporting, and parallel execution.
* **Test Structure:** 
  * Each test is a function inside a `test()` block.
  * Uses hooks like `beforeAll`, `afterAll`, and `beforeEach` for test setup and teardown.

### Codegen (Record & Playback)
* Generates TypeScript scripts automatically by recording your browser interactions, which accelerates script creation.
* **Command:** `npx playwright codegen` launches a browser and the Playwright inspector. 
* Code can be reviewed, edited, and saved into a `spec.ts` file.

### CLI Execution Commands
* `npx playwright test` - Runs all tests in headless mode by default.
* `npx playwright test login.spec.ts` - Runs a specific test file.
* `npx playwright test --debug` - Runs in debug mode.
* `npx playwright test --headed` - Runs tests with a visible browser UI.
* `npx playwright test --project=chromium` - Runs tests on a specific browser.
* `npx playwright test --workers=4` - Runs tests in parallel using 4 workers.
* `npx playwright test --max-failures=2` - Stops execution after 2 test failures.

### Synchronization & Auto-Waiting
* Automatically waits for elements to become actionable (e.g., visible, attached to the DOM, ready to interact).
* Eliminates the need for hardcoded sleeps, significantly reducing flaky tests caused by timing issues.