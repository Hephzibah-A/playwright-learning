## M12: Data-Driven Testing

### 1. Importance of Data-Driven Testing (DDT)
Data-driven testing is an automation approach where the same test case is executed multiple times using different sets of input data. 
* **Reduces Redundancy:** Eliminates the need to write multiple manual test cases for different inputs.
* **Efficient Edge Case Validation:** Easily validates different edge cases by just adding new rows of data.
* **Enhances Coverage:** Ensures a wide variety of inputs are tested against the same logic.
* **Common Use Cases:** Form submissions, testing login credentials (valid/invalid), and API testing.

### 2. The Data-Driven Framework Architecture
A structured approach to DDT involves separating test logic from test data. Key components include:
1. **Test Scripts (`tests/`):** Contains the actual Playwright test logic.
2. **Test Data Files (`data/`):** External data sources storing the inputs (e.g., JSON, CSV, Excel).
3. **Utility Functions (`utils/`):** Helper functions configured to load and parse the external data.
4. **Test Runner:** Playwright itself, which executes the scripts using the parsed data inputs.

### 3. Test Parameterization
Parameterization allows you to run the same test dynamically with multiple datasets, making the suite flexible, reusable, and scalable.
* **Inline Parameterization:** Storing data in an array directly within the test file and using a `for...of` loop or `.forEach()` to iterate over the test block.
* **External Parameterization:** Loading the array of objects from external files to keep the test scripts clean and maintainable.

### 4. Loading Data from External Sources
Storing data externally ensures high scalability (easily extend coverage), maintainability (update data without touching test scripts), and reusability.

* **JSON (`.json`)**
  * Store credentials/inputs in standard JSON format.
  * *Prerequisite:* Ensure `"resolveJsonModule": true` is set in your `tsconfig.json` file.
  * *Usage:* Use `fs.readFileSync()` and `JSON.parse()`, or directly import the JSON file.
* **CSV (`.csv`)**
  * *Prerequisite:* Install the parser via `npm install -D csv-parse`.
  * *Usage:* Create a utility function using `fs.readFileSync()` and `parse()` from `csv-parse/sync` to convert rows into iterable objects.
* **Excel (`.xlsx`)**
  * *Prerequisite:* Install the library via `npm install xlsx`.
  * *Usage:* Create a utility function using `XLSX.readFile()` and `XLSX.utils.sheet_to_json()` to convert sheet data into JSON objects.

### 5. Managing Data in End-to-End (E2E) Tests
Effective data management ensures tests remain consistent, isolated, scalable, and maintainable.
* **External Data Storage:** Avoid hardcoding; store data separately in JSON, CSV, or databases.
* **Parameterization:** Run the same logic against multiple external data inputs.
* **Environment-Specific Data:** Use environment variables (e.g., `.env`) to store sensitive data like credentials, URLs, and API keys securely.
* **State Management:** Reset the application state before each test to ensure consistency and prevent one test from interfering with another.
* **Mocking & Seeding:** Simulate real-world scenarios by mocking APIs or preloading test data, reducing dependency on external databases or third-party services.