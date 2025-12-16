
# 🚀 Cypress E2E Automation Playground

![Cypress](https://img.shields.io/badge/Cypress-E2E-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Mochawesome](https://img.shields.io/badge/Reports-Mochawesome-orange)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub%20Pages-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📌 Project Overview

This repository contains a **comprehensive End-to-End (E2E) test automation framework built with Cypress**.  
The project is designed as a **portfolio-ready automation showcase**, focusing on real-world UI testing scenarios commonly encountered in production web applications.

🔗 **Live Test Report (GitHub Pages)**  
👉 [https://alexandrubostanica.github.io/e2eAutomationProjectWithCypress/](https://alexandrubostanica.github.io/e2eAutomationProjectWithCypress/)

---

## 🧪 What This Project Demonstrates

From a QA Automation / SDET standpoint, this project demonstrates:

- ✅ Strong understanding of **Cypress fundamentals**
- ✅ Ability to automate **realistic end-to-end user flows**
- ✅ Handling of **complex UI components and interactions**
- ✅ Clean, readable, and meaningful test naming
- ✅ Data-driven testing using **@faker-js/faker**
- ✅ Validation of:
  - Authentication flows
  - Forms (inline, grid, basic, block, horizontal)
  - Dialogs & modals (standard, delayed, iframe-based)
  - Web tables (CRUD operations and filtering)
  - Tooltips and hover interactions
  - Drag-and-drop functionality
  - Sliders, dropdowns, checkboxes, and radio buttons
- ✅ Professional **HTML test reporting**
- ✅ Public report hosting via **GitHub Pages**

---

## 🏗️ Tech Stack

- **Cypress** – End-to-end testing framework
- **JavaScript (ES6+)**
- **[@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)** – Dynamic test data generation
- **[cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)** – HTML test reports
- **GitHub Pages** – Public report hosting
- **Node.js / npm**

---

## 📂 Project Structure

```text
cypress/
 ├── e2e/                 # Feature-based E2E test specifications
 ├── page-objects/        # Page Object Model (navigation only)
 ├── reports/             # Mochawesome HTML reports
 ├── fixtures/            # Test data (optional)
 └── support/             # Cypress configuration & support files
```

💡 Tests are intentionally explicit and readable to clearly communicate intent and Cypress usage.

---

## ▶️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Open Cypress Test Runner (interactive mode)

```bash
npm run cypress:open
```

### 3️⃣ Run tests headlessly

```bash
npm run cypress:run
```

---

## 📊 Test Reporting (Mochawesome)

This project uses `cypress-mochawesome-reporter` to generate professional HTML reports.

### Report Features

- Single consolidated HTML file
- Test execution summary
- Visual charts
- Embedded screenshots for failed tests

The report is generated automatically when running tests in headless mode.

---

## 🌍 Publish Report to GitHub Pages

### One-command deployment

```bash
npm run deploy:report
```

This command performs the following steps:

1. Cleans previous reports
2. Executes all Cypress tests
3. Generates the Mochawesome HTML report
4. Renames the report to `index.html`
5. Deploys the report to the `gh-pages` branch

📍 The report becomes publicly accessible at:

```
https://alexandrubostanica.github.io/e2eAutomationProjectWithCypress/
```

---

## 📜 NPM Scripts Overview

| Script           | Description                                      |
|------------------|--------------------------------------------------|
| `cypress:open`   | Opens Cypress Test Runner                        |
| `cypress:run`    | Runs tests headlessly                            |
| `clean:reports`  | Deletes previous reports                         |
| `test:report`    | Runs tests and generates report                  |
| `deploy:report`  | Generates and deploys report to GitHub Pages     |

---

## 🧠 Design Decisions

- **Minimal abstraction**  
  No overuse of custom commands; Cypress logic remains visible and reviewable.

- **Navigation-only Page Object Model**  
  Improves readability without hiding test behavior.

- **Dynamic test data**  
  Reduces flakiness and simulates realistic user input.

- **Explicit assertions**  
  Makes test intent clear to reviewers and recruiters.

---

## 🔮 Future Improvements

- CI integration using GitHub Actions
- API testing layer
- Visual regression testing
- Accessibility validations
- Parallel test execution
- Cross-browser testing
