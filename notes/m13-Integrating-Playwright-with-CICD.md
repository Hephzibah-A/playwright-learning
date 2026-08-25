## M13: Integrating Playwright with CI/CD

### CI/CD & Version Control Integration
Continuous Integration (CI) is the practice of frequently merging source code into a common repository to ensure the latest integrated code is stable and functional. 
* Git automates this integration. Core commands include `git init` (initialize), `git add .` (stage), `git commit -m "msg"` (commit), and `git push origin main` (push to remote).
* Secure communication with GitHub is established using SSH keys. Generate a key using `ssh-keygen`, add it to the SSH agent, paste the public key into GitHub's settings, and verify the connection with `ssh -T git@github.com`.

### Automation with GitHub Actions & Jenkins
* **GitHub Actions:** Provides continuous, cross-browser testing triggered by code pushes or pull requests. Workflows are defined in `.github/workflows/playwright.yml`. You can monitor jobs, view execution logs, and download HTML reports directly from the repository's "Actions" tab.
* **Jenkins:** An essential CI server for executing tests consistently. Setup involves installing Jenkins, creating a "Freestyle project", connecting your Git repository URL and credentials, targeting the appropriate branch (e.g., `*/main`), and initiating execution via "Build Now".

### Test Sharding & CI Optimization
Optimizing tests for CI environments improves execution speed, reliability, and maintainability.
* **Sharding:** Splits a large test suite into smaller chunks ("shards") that run in parallel across multiple CI machines. Execution is controlled via the CLI (e.g., `npx playwright test --shard=1/4`).
* **Optimization Strategies:** 
  * Execute tests in headless mode to conserve resources.
  * Use `process.env.CI` in `playwright.config.ts` to dynamically configure workers, retries, and reporters.
  * Cache Node.js modules and Playwright browser binaries to accelerate pipeline setups.

### Advanced Logging & Reporting
* **Logging:** Implement structured logging using libraries like `winston`. By creating a custom logger instance, you can capture detailed execution steps and output them to a local file (e.g., `logs/test.log`) for advanced debugging.
* **Allure Reporting:** Generates highly visual and interactive test dashboards. It requires installing `allure-playwright` and `allure-commandline`, updating the config reporter array, and using the CLI commands `npx allure generate` and `npx allure open` to view the final dashboard.