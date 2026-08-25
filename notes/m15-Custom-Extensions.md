## M15: Custom Extensions

### 1. Creating Custom Scripts
* In Playwright, tests can be triggered directly from the `package.json` file.
* Step 1: Set up Playwright with TypeScript using the command `npm init playwright@latest`.
* Step 2: Ensure TypeScript is configured using the command `npx tsc --init`.
* Step 3: Install the necessary dependencies using `npm install`.
* Step 4: Add custom scripts under the `"scripts"` section of your `package.json` file.
* Examples of custom scripts include `"test:chrome": "playwright test --project=chromium"` and `"test:report": "playwright test --reporter=html"`.
* You can execute these scripts using the command format `npm run <script-name>`, such as `npm run test:chrome`.

### 2. Organizing Tests and Using Tags
* You can organize tests into specific suites by creating a folder structure like `tests/smoke-tests/` and `tests/regression-tests/`.
* Tests can be grouped and run selectively by adding tags to the test title, such as `@smoke` or `@regression`.
* You can execute these tagged tests by adding a custom script with the `--grep` flag, for example, `"test:smoke": "playwright test --grep @smoke"`.

### 3. Writing Custom Playwright Extensions
* Playwright provides a rich API for interacting with web elements, handling network requests, and managing browser sessions.
* Custom extensions typically involve wrapping or extending these native APIs.
* Custom extensions can be implemented as functions, classes, or plugins that enhance Playwright's core capabilities.
* **Custom Function:** You can create a reusable function to perform a specific action, such as logging into a website.
* **Custom Class:** You can encapsulate related functionality into a dedicated class to organize your code, such as creating a class that accepts `page` in its constructor.
* **Custom Fixture:** You can extend Playwright's test fixtures to add custom functionality natively into your test blocks.
* **Custom Plugin:** You can create a custom plugin to modify Playwright's behavior globally by exporting custom configurations.