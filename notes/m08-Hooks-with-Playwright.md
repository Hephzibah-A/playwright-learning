## M08: Hooks with Playwright

### What are Hooks?
* Hooks are special functions in TypeScript that execute code at specific points in the software testing lifecycle.
* **Primary Uses:** They are used to set up preconditions (fresh state) before test runs and to perform cleanup activities after tests are completed.
* **Benefits:** 
  * Better test organization and code reusability.
  * Increased efficiency and easier management of isolated tests.
  * Ensures tests do not interfere with each other, leading to predictable results.

### The 4 Types of Hooks
1. **`test.beforeAll()`**: Executed exactly once per worker process *before* all tests start. 
   * *Use case:* Initializing global resources like launching a browser instance or setting up a database.
2. **`test.beforeEach()`**: Executed *before each individual test*. 
   * *Use case:* Setting up data or application state (like navigating to a URL or logging in) for a fresh slate every time.
3. **`test.afterEach()`**: Executed *after each individual test*. 
   * *Use case:* Cleaning up specific test data, resetting resources, or capturing failure screenshots.
4. **`test.afterAll()`**: Executed exactly once per worker *after* all tests have finished. 
   * *Use case:* Global cleanup activities, like closing the browser or wiping a test database.

### Hook Execution Flow
The standard lifecycle of a test file with hooks looks like this:
`beforeAll` &rarr; (`beforeEach` &rarr; **Test 1** &rarr; `afterEach`) &rarr; (`beforeEach` &rarr; **Test 2** &rarr; `afterEach`) &rarr; `afterAll`

### Key Features & Syntax
* **Scoping:** Hooks can be placed at the file level (runs for all tests in the file) or inside a `test.describe()` block (runs only for tests within that specific group).
* **Ordering:** If multiple hooks of the same type are added, they execute in the order they were registered.
* **Custom Titles:** You can optionally pass a string title to a hook for better reporting logs.
  * *Example:* `test.beforeEach('Login to portal', async ({ page }) => { ... })`

### Handling Mouse Actions in Hooks
* You can place standard Playwright mouse actions (like `click()`, `fill()`, `hover()`, or drag-and-drop operations) directly inside hooks.
* *Example Strategy:* Use `beforeEach` to navigate and input login details via `.click()` and `.fill()`, keeping the actual `test()` block entirely focused on the specific feature being validated. Then, use `afterEach` to `.click()` the logout button.