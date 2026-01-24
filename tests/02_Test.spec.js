import { test, expect } from "@playwright/test";

/**
 * ============================================
 * BEST PRACTICES EXPLAINED (Simple Approach)
 * ============================================
 *
 * 1. DESCRIPTIVE TEST NAMES
 *    - Use clear, business-focused test names
 *    - Anyone should understand what the test does
 *
 * 2. STEP-BY-STEP COMMENTS
 *    - Each step matches the test case requirements
 *    - Makes debugging easier
 *    - Helps with test documentation
 *
 * 3. STABLE LOCATORS
 *    - Use data-qa attributes when available (most stable)
 *    - Use getByRole for semantic elements
 *    - Avoid XPath and complex CSS when possible
 *
 * 4. EXPLICIT ASSERTIONS
 *    - Use expect() for all verifications
 *    - Playwright auto-waits for elements
 *    - Clear error messages when tests fail
 *
 * 5. TEST DATA MANAGEMENT
 *    - Store credentials in variables
 *    - Easy to update in one place
 *    - Consider using .env files for sensitive data
 *
 * 6. INDEPENDENT TESTS
 *    - Each test should run independently
 *    - Don't rely on other tests
 */

test.describe("User Login Tests", () => {
  // Best Practice: Store test data at the top for easy modification
  const testUser = {
    email: "Priyanshu@playwright.com",
    password: "TestPassword123!",
    name: "Playwright User",
  };

  test("Login with valid credentials and delete account", async ({ page }) => {
    // Step 1: Launch browser
    // (Automatically handled by Playwright)

    // Step 2: Navigate to URL
    // Best Practice: Use goto() for navigation
    await page.goto("http://automationexercise.com");

    // Step 3: Verify that home page is visible successfully
    // Best Practice: Multiple assertions for thorough verification
    await expect(page).toHaveTitle(/Automation Exercise/);
    const featuresSection = page.locator(".features_items");
    await expect(featuresSection).toBeVisible();

    // Step 4: Click on 'Signup / Login' button
    // Best Practice: Use getByRole when possible (more semantic and stable)
    await page.getByRole("link", { name: "Signup / Login" }).click();

    // Step 5: Verify 'Login to your account' is visible
    // Best Practice: Use text-based locators for headers
    const loginHeader = page.locator('h2:has-text("Login to your account")');
    await expect(loginHeader).toBeVisible();

    // Step 6: Enter correct email address and password
    // Best Practice: Use data-qa attributes (most stable selector strategy)
    await page.locator('input[data-qa="login-email"]').fill(testUser.email);
    await page
      .locator('input[data-qa="login-password"]')
      .fill(testUser.password);

    // Step 7: Click 'login' button
    await page.locator('button[data-qa="login-button"]').click();

    // Step 8: Verify that 'Logged in as username' is visible
    // Best Practice: Store locators in variables for reuse
    const loggedInUser = page.locator('a:has-text("Logged in as")');
    await expect(loggedInUser).toBeVisible();
    await expect(loggedInUser).toContainText(testUser.name);

    // Step 9: Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // Step 10: Verify that 'ACCOUNT DELETED!' is visible
    // Best Practice: Use data-qa attribute when available
    const accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
    await expect(accountDeletedHeader).toBeVisible();
    await expect(accountDeletedHeader).toHaveText("Account Deleted!");
  });

  // Best Practice: Include negative test cases
  test("Login with invalid credentials shows error", async ({ page }) => {
    await page.goto("http://automationexercise.com");
    await page.getByRole("link", { name: "Signup / Login" }).click();

    // Attempt login with invalid credentials
    await page
      .locator('input[data-qa="login-email"]')
      .fill("invalid@example.com");
    await page.locator('input[data-qa="login-password"]').fill("wrongpassword");
    await page.locator('button[data-qa="login-button"]').click();

    // Verify error message appears
    const errorMessage = page.locator(
      'p:has-text("Your email or password is incorrect")',
    );
    await expect(errorMessage).toBeVisible();
  });

  // Best Practice: Test with empty fields
  test("Login with empty credentials shows validation", async ({ page }) => {
    await page.goto("http://automationexercise.com");
    await page.getByRole("link", { name: "Signup / Login" }).click();

    // Click login without entering credentials
    await page.locator('button[data-qa="login-button"]').click();

    // Verify we're still on login page (form validation prevents submission)
    const loginHeader = page.locator('h2:has-text("Login to your account")');
    await expect(loginHeader).toBeVisible();
  });
});

/**
 * ============================================
 * HOW TO RUN THESE TESTS
 * ============================================
 *
 * 1. Install Playwright:
 *    npm init playwright@latest
 *
 * 2. Save this file as: tests/login.spec.js
 *
 * 3. Run all tests:
 *    npx playwright test
 *
 * 4. Run specific test file:
 *    npx playwright test login.spec.js
 *
 * 5. Run in headed mode (see browser):
 *    npx playwright test --headed
 *
 * 6. Run in UI mode (interactive):
 *    npx playwright test --ui
 *
 * 7. Run specific test by name:
 *    npx playwright test -g "Login with valid credentials"
 *
 * 8. Generate HTML report:
 *    npx playwright test --reporter=html
 *
 * 9. Debug mode:
 *    npx playwright test --debug
 */

/**
 * ============================================
 * LOCATOR STRATEGY PRIORITY (BEST PRACTICES)
 * ============================================
 *
 * 1st Choice: data-qa attributes
 *    page.locator('input[data-qa="login-email"]')
 *    ✓ Most stable
 *    ✓ Designed for testing
 *    ✓ Won't change with styling
 *
 * 2nd Choice: Role-based selectors
 *    page.getByRole('button', { name: 'Login' })
 *    ✓ Semantic
 *    ✓ Accessibility-friendly
 *    ✓ Clear intent
 *
 * 3rd Choice: Text content
 *    page.getByText('Login to your account')
 *    ✓ Human-readable
 *    ✓ Easy to understand
 *    ⚠ May break with text changes
 *
 * 4th Choice: CSS selectors
 *    page.locator('.login-button')
 *    ⚠ Can break with styling changes
 *    ⚠ Less stable
 *
 * Avoid: XPath
 *    page.locator('//div[@class="login"]//button')
 *    ✗ Hard to read
 *    ✗ Fragile
 *    ✗ Slow performance
 */
