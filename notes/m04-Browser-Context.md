## M04: Browser Context and Child Window Handling

### Browser Initialization
* **Config File (`playwright.config.ts`):** Maintains consistent settings across the entire test suite.
* **Independent Initialization:** Manual launching directly within the test script (e.g., `chromium.launch()`), offering flexibility for specific test requirements.

### Browser Contexts & Tabs
* A **Browser Context** acts as an isolated, independent session (similar to an incognito window) within a single browser instance.
* You can handle multiple browser contexts concurrently, which is perfect for multi-user testing scenarios.
* **Tabs:** Multiple individual pages (`newPage()`) can be created and managed within a single browser context to test multi-tab workflows.

### Navigation Controls & Events
* **Controls:** Scripts can programmatically navigate using `page.goto()`, `page.goBack()`, `page.goForward()`, and `page.reload()`.
* **Load States:** 
  * `load`: Indicates the page is fully loaded.
  * `domcontentloaded`: Indicates the HTML document is completely parsed.
* **Explicit Waits:** Handle specific synchronization needs using `page.waitForURL()`, `page.waitForLoadState()`, `page.waitForSelector()`, and `page.waitForEvent()`.