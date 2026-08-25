## M05: Locator / Selector

### Overview & Importance
* Locators enable efficient element selection with automatic waiting and retries.
* **Why proper selectors matter:**
  * **Reliability:** Targets the correct element consistently.
  * **Consistency:** Works uniformly across Chromium, Firefox, and WebKit.
  * **Reduced Failures:** Prevents flakiness caused by dynamic changes or layout tweaks.
* **Common pitfalls without proper selectors:** Test execution errors from dynamic ID changes, clicking unintended elements, and performance bottlenecks caused by slow queries.

---

### Built-in Semantic Locators (Recommended)
Always prioritize built-in semantic locators over CSS/XPath to align with accessibility standards and improve stability.

* `page.getByRole(role, options)`: Selects elements based on ARIA roles (e.g., `button`, `link`, `checkbox`). Best practice for interactive controls.
* `page.getByText(text, options)`: Finds elements matching visible text content. Ideal for static headings or labels (use `{ exact: true }` to avoid unexpected partial matches).
* `page.getByLabel(text)`: Selects input fields associated with a `<label>`. Recommended for form fields.
* `page.getByPlaceholder(text)`: Finds inputs using placeholder text. Useful fallback when explicit labels are missing.
* `page.getByTestId(id)`: Targets elements using custom test attributes (`data-testid`). Ideal for dynamic components lacking static labels or roles.

---

### CSS Selectors vs. XPath (`page.locator()`)
Use `page.locator()` when semantic locators are unavailable or insufficient.

| Feature | CSS Selector (`locator('css')`) | XPath (`locator('//xpath')`) |
| :--- | :--- | :--- |
| **Speed** | Faster execution | Slower (evaluates full DOM tree) |
| **Syntax** | Simple (`#id`, `.class`, `[attr="value"]`) | Complex (`//tag[@attr='value']`) |
| **Browser Compatibility**| Fully supported across all engines | May encounter engine-specific quirks |
| **Traversal** | Limited parent/ancestor traversal | Navigates parent and ancestor nodes easily |
| **Best Practice** | Styling attributes, classes, IDs | Dynamic structures, complex hierarchies |

#### Common CSS Selector Syntax
* `#search-input` - Select by ID
* `.submit-btn` - Select by class name
* `[type="submit"]` - Select by attribute
* `input[name="search"]` - Tag name combined with attribute
* `div span` - Nested descendant elements
* `div > span` - Direct child selector

#### Common XPath Syntax
* `//input` - All elements of a specific tag type
* `//input[@name='search']` - Tag with specific attribute value
* `//*[contains(text(), 'Search')]` - Partial visible text match
* `//button[text()='Submit']` - Exact visible text match
* `//div//input` - Nested elements

---

### Playwright Inspector & Debugging
Playwright Inspector is a built-in GUI tool to inspect DOM elements, record actions, and debug automation scripts in real time.

* **Three ways to open the Inspector:**
  1. **CLI Debug Flag:** `npx playwright test --debug`
  2. **Code Breakpoint:** Add `await page.pause()` inside the test script.
  3. **Environment Variable:** `set PWDEBUG=1 && npx playwright test` (Windows) or `PWDEBUG=1 npx playwright test` (macOS/Linux).

---

### Handling Shadow DOM Elements
* **What is Shadow DOM?** A DOM encapsulation mechanism used by web components to isolate internal markup and styles from global queries like `document.querySelector()`.
* **Open vs. Closed Shadow DOM:**
  * **Open Shadow DOM:** Fully accessible. Locate the shadow host first, then chain locators into the shadow tree (`shadowHost.locator('#inner-input')`). Playwright locators also pierce open shadow roots automatically.
  * **Closed Shadow DOM:** Restricted; elements cannot be accessed directly via standard DOM locators. Requires alternative approaches like API interactions or browser extensions.

---

### Custom Web Elements (Test Attributes)
* Test attributes create stable locators that remain unaffected when CSS styles, classes, or structures change.
* **Supported Attributes & Usage:**
  * `data-testid` &rarr; `page.getByTestId('login-button')`
  * `data-test` &rarr; `page.locator('[data-test="login-button"]')`
  * `aria-label` &rarr; `page.getByRole('button', { name: 'Proceed' })`
* **Best Practices:** Keep test attributes unique and meaningful; apply them to key interactive components rather than overusing them across every single tag.

---

### Element States & Validations
Always verify an element's state to prevent race conditions and flaky tests before triggering actions.

| Element State | Description | Playwright Method |
| :--- | :--- | :--- |
| **Visibility** | Verifies element is rendered and visible on the page | `await expect(locator).toBeVisible()` |
| **Enabled** | Checks if element is interactive before clicking | `await expect(locator).toBeEnabled()` |
| **Checked** | Validates checkbox or radio button selection | `await expect(locator).toBeChecked()` / `.not.toBeChecked()` |
| **Text Match** | Validates exact or expected inner text content | `await expect(locator).toHaveText('expected')` |
