## M06: Interacting with Web Elements

### 1. Element & Mouse Actions
Playwright provides built-in auto-waiting for element visibility and actionability before executing mouse actions.

* **Left Click:** `await page.click('selector')` or `await locator.click()`
  * Auto-waits for the target element to be visible, stable, and enabled.
* **Right Click (Context Click):** `await locator.click({ button: 'right' })`
  * Used for triggering custom context menus, desktop file tree interactions, or email quick actions.
* **Double Click:** `await locator.dblclick()`
  * Useful for inline renaming, expanding folders, or opening spreadsheet cells for editing.
* **Hover:** `await locator.hover()`
  * Simulates hovering over elements to trigger tooltips, dynamic dropdown menus, or hover effects.

---

### 2. Typing & Text Input
* **`fill()` (Fast Input):** Clears the field and sets the value immediately. Recommended for regular forms.
  * Example: `await page.fill('#username', 'student')`
* **`pressSequentially()` (Keystroke Simulation):** Simulates a real user typing character-by-character with optional delays. Useful for triggering search debounces and auto-suggest menus.
  * Example: `await page.locator('#search').pressSequentially('Playwright', { delay: 100 })`

---

### 3. Static & Dynamic (Suggestion) Dropdowns
* **Static Dropdowns (`<select>` & `<option>`):**
  * Handled via `.selectOption()` using label, value, or index:
    * `await page.selectOption('#country', 'India')`
    * `await page.selectOption('#select-menu', { value: '2' })`
* **Suggestion / Auto-Complete Dropdowns:**
  * Dynamic dropdowns that update options based on keystrokes.
  * **Flow:** Type text with `fill()` &rarr; wait for dropdown panel via `waitForSelector()` &rarr; select the target suggestion via `.first().click()`.

---

### 4. Checkboxes & Radio Buttons
* **Selecting:**
  * `await locator.check()` (ensures state becomes checked)
  * `await locator.uncheck()` (ensures state becomes unchecked)
* **Validations:**
  * `await expect(locator).toBeChecked()`
  * `await expect(locator).not.toBeChecked()`

---

### 5. Web Tables
* Playwright seamlessly inspects dynamic and static HTML tables.
* **Extraction:** Use CSS hierarchy (`table tbody tr:nth-child(2) td:nth-child(2)`) combined with `.textContent()`.
* **Validation:** Assert content using `await expect(tableLocator).toContainText('Expected Text')`.

---

### 6. JavaScript Dialogs (Alerts, Confirms, Prompts)
Playwright auto-dismisses dialogs by default unless an explicit event listener is attached before the triggering action.

* **Listener Types:**
  * `page.on('dialog', callback)` - Listens continuously for all dialogs.
  * `page.once('dialog', callback)` - Listens only for the next single dialog (cleaner for specific actions).
* **Dialog Operations:**
  * **Alert (`alert()`):** Read text via `dialog.message()` &rarr; dismiss with `await dialog.accept()`.
  * **Confirm (`confirm()`):** Accept with `await dialog.accept()` or cancel with `await dialog.dismiss()`.
  * **Prompt (`prompt()`):** Supply response text and accept via `await dialog.accept('Input Text')`.

---

### 7. Extracting Text from Fields
* **Input Values:** Use `.inputValue()` to fetch text typed into form inputs/textboxes.
* **DOM Inner Text:** Use `.textContent()` or `.innerText()` to extract rendered labels, headings, and table cells.

---

### 8. Forms & Calendar Handling
* **Date Pickers:** Direct input entry using `fill('YYYY-MM-DD')` is the most reliable approach for automated forms.
* **Scroll into View:** Use `await locator.scrollIntoViewIfNeeded()` to ensure buttons and inputs are visible in the viewport before clicking.