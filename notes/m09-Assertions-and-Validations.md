## M09: Assertions and Validations

### 1. What are Assertions?
Assertions in Playwright are conditions used to verify expected outcomes in test scripts. They act as the checkpoints that determine whether a specific test case passes or fails.

**Commonly Used Built-in Assertions:**
* `toBeVisible()`: Verifies if an element is currently rendered and visible on the page.
* `toHaveText()`: Ensures the element contains the exact expected text.
* `toHaveAttribute()`: Checks if an element has a specific HTML attribute (and optionally, a specific value).
* `toHaveURL()`: Confirms that the current page URL matches the expected string or regular expression.
* `toBeChecked()`: Validates whether a checkbox or radio button is currently selected.

### 2. Types of Assertions
Playwright supports different assertion strategies depending on how you want to handle failures and wait times.

* **Strict Assertions (Default):** 
  * Test execution stops immediately upon failure.
  * Best for critical checks that must pass before the test can logically proceed.
* **Soft Assertions:** 
  * Test execution continues even if the assertion fails, reporting all accumulated failures at the end.
  * Useful for verifying multiple non-dependent conditions together on a single page (e.g., checking UI layouts).
  * *Note on Implementation:* The course material demonstrates a manual soft assertion pattern using `try/catch` blocks and an `errors` array to collect failures, throwing a single error at the end if the array is not empty.
* **Timeout-Based Assertions:** 
  * Automatically waits for elements to reach the expected state before failing, reducing test flakiness.
  * Playwright assertions have a default timeout (usually 5 seconds), but you can pass a custom timeout option (e.g., `{ timeout: 10000 }`) to allow extra time for slow-loading dynamic content.

### 3. Custom Validation Logic
Sometimes, built-in assertions are limited to predefined checks. Custom validation logic allows you to handle complex test conditions.

* **When to use custom logic:**
  * Verifying dynamically generated messages based on variables.
  * Checking backend API response data against front-end UI elements.
  * Validating dynamic date/time formats dynamically.
* **Steps to Implement Custom Validation:**
  1. **Define a Helper Function:** Create a reusable function to handle the validation (e.g., `validateSearchResult()`).
  2. **Retrieve Element Data:** Inside the function, extract text, attributes, or styles dynamically.
  3. **Perform Logical Comparisons:** Apply standard JavaScript conditions (`if`, `.includes()`, etc.).
  4. **Use Assertions for Final Check:** Return a boolean from the helper and assert it in the test using `expect(isValid).toBe(true)`.