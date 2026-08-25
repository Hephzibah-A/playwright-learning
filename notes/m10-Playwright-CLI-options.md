## M10: Playwright CLI Options

### Running Tests (Basic Commands)
* **Run all tests:** `npx playwright test`
  * Executes all test cases found in your designated test folder across all browsers configured in `playwright.config.ts`.
* **Run a single test file:** `npx playwright test <file_name>`
  * *Example:* `npx playwright test example.spec.ts`

### Running Sets of Test Files
You can execute specific groups of tests by providing their paths.
* **By specific file names:** `npx playwright test tests/test1.spec.ts tests/todoPages/test2.spec.ts`
* **By specific directory:** `npx playwright test tests/`
* **By specific folders:** `npx playwright test tests/landingPages/ tests/todoPages/`

### Controlling Execution Flow (Parallel vs. Serial)
By default, Playwright runs tests in parallel across multiple workers to speed up execution.
* **Parallel Mode (Custom Workers):** `npx playwright test --workers=<number>`
  * *Example:* `npx playwright test --workers=3` (Runs using exactly 3 workers).
* **Serial Mode:** `npx playwright test --workers=1`
  * Forces tests to run one after another. Useful for debugging or when tests share a state that prevents parallel execution.

### Browser-Specific Execution (Overriding Config)
You can run tests in specific browsers directly from the CLI using the `--project` flag, bypassing the default configuration.
* **Chromium only:** `npx playwright test --project=chromium`
* **Firefox only:** `npx playwright test --project=firefox`
* **WebKit only:** `npx playwright test --project=webkit`
* **Chaining multiple specific browsers:** 
  * `npx playwright test --project=firefox && npx playwright test --project=webkit`

### Viewing Reports
* **Open the HTML report:** `npx playwright show-report`
  * After test execution finishes, use this command to view a detailed breakdown of passes, failures, and execution times in your browser.