// M12 Practice: Data-Driven Testing (Parameterization & External Data)
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';


// Example 1: Inline Parameterization

const inlineLoginData = [
  { username: 'standard_user', password: 'secret_sauce', expectedResult: 'Success' },
  { username: 'locked_out_user', password: 'secret_sauce', expectedResult: 'Failure' },
  { username: 'wrong_user', password: 'wrong_password', expectedResult: 'Failure' }
];

test.describe('Data-Driven Login Tests - Inline Data', () => {
  // Loop through the data array and generate a test for each object
  for (const data of inlineLoginData) {
    test(`Login test with ${data.username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      
      // Fill credentials
      await page.fill('#user-name', data.username);
      await page.fill('#password', data.password);
      await page.click('#login-button');

      // Conditional validation based on expected result
      if (data.expectedResult === 'Success') {
        await expect(page).toHaveURL(/inventory.html/);
      } else {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
      }
    });
  }
});

// Example 2: Loading Data from JSON
// Note: In a real project, ensure loginData.json exists in your data folder
// and tsconfig.json has "resolveJsonModule": true.

// Mocking the file read process for practice syntax
// const rawJsonData = fs.readFileSync(path.resolve(__dirname, '../data/loginData.json'), 'utf-8');
// const externalJsonData = JSON.parse(rawJsonData);

const externalJsonData = [
  { username: 'problem_user', password: 'secret_sauce' } // Mocking parsed JSON
];

test.describe('Data-Driven Login Tests - JSON', () => {
  externalJsonData.forEach((user) => {
    test(`JSON Login test for ${user.username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      
      await page.fill('#user-name', user.username);
      await page.fill('#password', user.password);
      await page.click('#login-button');

      // Validation
      if (user.password === 'secret_sauce') {
         await expect(page.locator('.inventory_list')).toBeVisible();
      }
    });
  });
});


// Example 3: Utility Function Concepts (CSV & XLSX)
/* 
  If you were to implement CSV or XLSX, you would create a utility file 
  like 'utils/dataLoader.ts' with functions similar to these:

  // --- CSV Parser Utility ---
  import { parse } from 'csv-parse/sync';
  export function readCSV(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf8');
    return parse(content, { columns: true, skip_empty_lines: true });
  }

  // --- XLSX Parser Utility ---
  import * as XLSX from 'xlsx';
  export function readExcel(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  }
*/