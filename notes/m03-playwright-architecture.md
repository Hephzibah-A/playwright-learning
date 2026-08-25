## M03: Playwright Architecture

### Configuration & Test Runner
* The `playwright.config.ts` file is the backbone of the setup, centralizing all test settings, browser options, and directory paths.
* Playwright Test Runner features native TypeScript support, simplifies parallel execution, and generates robust HTML/JSON reports.
* Tests are organized using `test.describe()` blocks for grouping, alongside hooks like `beforeAll`, `beforeEach`, and `afterAll` for setup and teardown logic.

### Record & Playback (Codegen)
* Codegen accelerates script creation by recording your browser interactions and automatically generating TypeScript code.
* **Workflow:**
  1. Initialize project (`npm init -y`) and install Playwright.
  2. Launch Codegen using the CLI tool.
  3. Perform actions in the browser; review the auto-generated code in the Playwright inspector.
  4. Save the script to a `.spec.ts` file and execute it.

### CLI Commands (Recap)
* `npx playwright test --headed` - Runs tests with the browser UI visible.
* `npx playwright test --workers=4` - Executes tests in parallel using multiple workers.
* `npx playwright test --debug` - Triggers debug mode for troubleshooting.

### Synchronization & Auto-Waiting
* Playwright automatically waits for elements to become actionable (e.g., visible, attached to the DOM, ready to interact) before executing commands like `page.click()` or `page.fill()`.
* This eliminates the need for manual `sleep` statements and significantly reduces flaky tests.