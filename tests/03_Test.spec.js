import { test, expect } from "@playwright/test";

/**
 * ============================================
 * BEST PRACTICES FOR NEGATIVE TESTING
 * ============================================
 *
 * 1. NEGATIVE TEST CASES
 *    - Test unhappy paths and error conditions
 *    - Verify proper error messages are displayed
 *    - Ensure system handles invalid input gracefully
 *
 * 2. ERROR MESSAGE VALIDATION
 *    - Verify exact error text
 *    - Check error visibility
 *    - Ensure errors are user-friendly
 *
 * 3. MULTIPLE INVALID SCENARIOS
 *    - Test different types of invalid data
 *    - Wrong email format, wrong password, empty fields
 *    - Edge cases and boundary conditions
 *
 * 4. CONSISTENT TEST STRUCTURE
 *    - Follow AAA pattern (Arrange, Act, Assert)
 *    - Keep tests readable and maintainable
 *    - Use descriptive variable names
 */

test.describe("Login with Invalid Credentials", () => {
  // Best Practice: Define test data clearly at the top
  const invalidCredentials = {
    email: "invalid@example.com",
    password: "wrongpassword123",
  };

  test("Login with incorrect email and password shows error message", async ({
    page,
  }) => {
    // Step 1: Launch browser
    // (Automatically handled by Playwright)

    // Step 2: Navigate to URL
    await page.goto("http://automationexercise.com");

    // Step 3: Verify that home page is visible successfully
    // Best Practice: Verify page loaded correctly before proceeding
    await expect(page).toHaveTitle(/Automation Exercise/);
    const featuresSection = page.locator(".features_items");
    await expect(featuresSection).toBeVisible();

    // Step 4: Click on 'Signup / Login' button
    await page.getByRole("link", { name: "Signup / Login" }).click();

    // Step 5: Verify 'Login to your account' is visible
    const loginHeader = page.locator('h2:has-text("Login to your account")');
    await expect(loginHeader).toBeVisible();

    // Step 6: Enter incorrect email address and password
    // Best Practice: Use clear variable names for test data
    await page
      .locator('input[data-qa="login-email"]')
      .fill(invalidCredentials.email);
    await page
      .locator('input[data-qa="login-password"]')
      .fill(invalidCredentials.password);

    // Step 7: Click 'login' button
    await page.locator('button[data-qa="login-button"]').click();

    // Step 8: Verify error 'Your email or password is incorrect!' is visible
    // Best Practice: Verify exact error message text
    const errorMessage = page.locator(
      'p:has-text("Your email or password is incorrect")',
    );
    await expect(errorMessage).toBeVisible();
    // Additional assertion for exact text match
    await expect(errorMessage).toContainText(
      "Your email or password is incorrect!",
    );
  });
});

/**
 * ============================================
 * RUNNING THESE TESTS
 * ============================================
 *
 * Run all negative tests:
 *   npx playwright test
 *
 * Run in headed mode to see browser:
 *   npx playwright test --headed
 *
 * Run specific test:
 *   npx playwright test -g "Login with incorrect email"
 *
 * Run with HTML report:
 *   npx playwright test --reporter=html
 */

/**
 * ============================================
 * WHY NEGATIVE TESTING MATTERS
 * ============================================
 *
 * 1. SECURITY
 *    - Prevents unauthorized access
 *    - Validates input sanitization
 *    - Protects against injection attacks
 *
 * 2. USER EXPERIENCE
 *    - Ensures helpful error messages
 *    - Prevents user frustration
 *    - Guides users to correct input
 *
 * 3. DATA INTEGRITY
 *    - Prevents invalid data entry
 *    - Maintains database consistency
 *    - Validates business rules
 *
 * 4. SYSTEM STABILITY
 *    - Prevents crashes from bad input
 *    - Handles edge cases gracefully
 *    - Improves overall reliability
 */
