import { test, expect } from "@playwright/test";

/**
 * ============================================
 * BEST PRACTICES FOR LOGIN/LOGOUT TESTING
 * ============================================
 *
 * 1. SESSION MANAGEMENT TESTING
 *    - Verify proper login flow
 *    - Test logout functionality
 *    - Ensure session is cleared after logout
 *
 * 2. NAVIGATION VERIFICATION
 *    - Verify correct page redirects
 *    - Check URL changes after actions
 *    - Validate user is on expected page
 *
 * 3. STATE VERIFICATION
 *    - Check logged-in state indicators
 *    - Verify logged-out state
 *    - Ensure UI reflects current state
 *
 * 4. SECURITY BEST PRACTICES
 *    - Test that logout clears session
 *    - Verify protected pages require login
 *    - Check that back button doesn't restore session
 */

test.describe("User Login and Logout Flow", () => {
  // Best Practice: Store credentials securely
  // In production, use environment variables or config files
  const testUser = {
    email: "Priyanshu@playwright.com",
    password: "TestPassword123!",
    name: "Playwright User",
  };

  test("User can login and logout successfully", async ({ page }) => {
    // Step 1: Launch browser
    // (Automatically handled by Playwright)

    // Step 2: Navigate to URL
    await page.goto("http://automationexercise.com");

    // Step 3: Verify that home page is visible successfully
    await expect(page).toHaveTitle(/Automation Exercise/);
    const featuresSection = page.locator(".features_items");
    await expect(featuresSection).toBeVisible();

    // Step 4: Click on 'Signup / Login' button
    await page.getByRole("link", { name: "Signup / Login" }).click();

    // Step 5: Verify 'Login to your account' is visible
    const loginHeader = page.locator('h2:has-text("Login to your account")');
    await expect(loginHeader).toBeVisible();

    // Step 6: Enter correct email address and password
    await page.locator('input[data-qa="login-email"]').fill(testUser.email);
    await page
      .locator('input[data-qa="login-password"]')
      .fill(testUser.password);

    // Step 7: Click 'login' button
    await page.locator('button[data-qa="login-button"]').click();

    // Step 8: Verify that 'Logged in as username' is visible
    const loggedInUser = page.locator('a:has-text("Logged in as")');
    await expect(loggedInUser).toBeVisible();
    await expect(loggedInUser).toContainText(testUser.name);

    // Best Practice: Verify we're redirected to home page after login
    await expect(page).toHaveURL("https://automationexercise.com");

    // Step 9: Click 'Logout' button
    await page.getByRole("link", { name: "Logout" }).click();

    // Step 10: Verify that user is navigated to login page
    // Best Practice: Multiple verifications to ensure proper navigation

    // Check URL contains login page path
    await expect(page).toHaveURL(/\/login/);

    // Verify login page elements are visible
    const loginPageHeader = page.locator(
      'h2:has-text("Login to your account")',
    );
    await expect(loginPageHeader).toBeVisible();

    // Best Practice: Verify logged-out state - user indicator should not be visible
    const loggedInIndicator = page.locator('a:has-text("Logged in as")');
    await expect(loggedInIndicator).not.toBeVisible();

    // Verify login form is present
    const emailInput = page.locator('input[data-qa="login-email"]');
    const passwordInput = page.locator('input[data-qa="login-password"]');
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});

/**
 * ============================================
 * RUNNING THESE TESTS
 * ============================================
 *
 * Run all tests:
 *   npx playwright test
 *
 * Run in headed mode:
 *   npx playwright test --headed
 *
 * Run specific test:
 *   npx playwright test -g "login and logout successfully"
 *
 * Run with trace for debugging:
 *   npx playwright test --trace on
 *
 * Generate report:
 *   npx playwright test --reporter=html
 */

/**
 * ============================================
 * SESSION MANAGEMENT BEST PRACTICES
 * ============================================
 *
 * 1. VERIFY COMPLETE LOGOUT
 *    ✓ Check URL changes to login page
 *    ✓ Verify logged-in indicator disappears
 *    ✓ Ensure login form is visible
 *
 * 2. TEST SESSION SECURITY
 *    ✓ Verify back button doesn't restore session
 *    ✓ Check that session cookies are cleared
 *    ✓ Ensure protected pages require re-login
 *
 * 3. TEST FROM MULTIPLE STATES
 *    ✓ Logout from different pages
 *    ✓ Test multiple login/logout cycles
 *    ✓ Verify consistent behavior
 *
 * 4. PRODUCTION CONSIDERATIONS
 *    ✓ Use environment variables for credentials
 *    ✓ Test with different user roles
 *    ✓ Verify session timeout behavior
 *    ✓ Check "Remember Me" functionality
 */
