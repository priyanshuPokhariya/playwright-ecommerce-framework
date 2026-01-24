import { test, expect } from "@playwright/test";

test.describe("User Registration Flow", () => {
  test("Complete user registration and deletion", async ({ page }) => {
    const testUser = {
      email: "Priyanshu@playwright.com",
      password: "TestPassword123!",
      name: "Playwright User",
    };

    // 1. Launch browser (handled by Playwright)
    // 2. Navigate to URL
    await page.goto("http://automationexercise.com");

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveTitle(/Automation Exercise/);
    const homeFeatures = page.locator(".features_items");
    await expect(homeFeatures).toBeVisible();

    // 4. Click on 'Signup / Login' button
    await page.getByRole("link", { name: "Signup / Login" }).click();

    // 5. Verify 'New User Signup!' is visible
    const newUserSignup = page.locator('h2:has-text("New User Signup!")');
    await expect(newUserSignup).toBeVisible();

    // 6. Enter name and email address

    await page.locator('input[data-qa="signup-name"]').fill(testUser.name);
    await page.locator('input[data-qa="signup-email"]').fill(testUser.email);

    // 7. Click 'Signup' button
    await page.locator('button[data-qa="signup-button"]').click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    const accountInfoHeader = page.locator(
      'b:has-text("Enter Account Information")',
    );
    await expect(accountInfoHeader).toBeVisible();

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // Select title (Mr.)
    await page.locator("#id_gender1").check();

    // Password
    await page.locator('input[data-qa="password"]').fill(testUser.password);

    // Date of birth
    await page.locator('select[data-qa="days"]').selectOption("15");
    await page.locator('select[data-qa="months"]').selectOption("6");
    await page.locator('select[data-qa="years"]').selectOption("1990");

    // 10. Select checkbox 'Sign up for our newsletter!'
    await page.locator("#newsletter").check();

    // 11. Select checkbox 'Receive special offers from our partners!'
    await page.locator("#optin").check();

    // 12. Fill details: First name, Last name, Company, Address, etc.
    await page.locator('input[data-qa="first_name"]').fill("Playwright");
    await page.locator('input[data-qa="last_name"]').fill("User");
    await page.locator('input[data-qa="company"]').fill("Test Company Inc");
    await page.locator('input[data-qa="address"]').fill("123 Main Street");
    await page.locator('input[data-qa="address2"]').fill("Apt 4B");

    // Country
    await page
      .locator('select[data-qa="country"]')
      .selectOption("United States");

    // State, City, Zipcode, Mobile Number
    await page.locator('input[data-qa="state"]').fill("California");
    await page.locator('input[data-qa="city"]').fill("Los Angeles");
    await page.locator('input[data-qa="zipcode"]').fill("90001");
    await page.locator('input[data-qa="mobile_number"]').fill("+1234567890");

    // 13. Click 'Create Account' button
    await page.locator('button[data-qa="create-account"]').click();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    const accountCreated = page.locator('h2[data-qa="account-created"]');
    await expect(accountCreated).toBeVisible();
    await expect(accountCreated).toHaveText("Account Created!");

    // 15. Click 'Continue' button
    await page.locator('a[data-qa="continue-button"]').click();

    // 16. Verify that 'Logged in as username' is visible
    const loggedInUser = page.locator('a:has-text("Logged in as")');
    await expect(loggedInUser).toBeVisible();
    await expect(loggedInUser).toContainText(testUser.name);

    // 17. Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    const accountDeleted = page.locator('h2[data-qa="account-deleted"]');
    await expect(accountDeleted).toBeVisible();
    await expect(accountDeleted).toHaveText("Account Deleted!");

    await page.locator('a[data-qa="continue-button"]').click();
  });
});
