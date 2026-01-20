import { test, expect } from "@playwright/test";

test("trying navigation", async ({ page }) => {
  // 1. Launch browser
  await page.goto("https://automationexercise.com/");

  // 2. Navigate to url 'http://automationexercise.com'

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle("Automation Exercise");

  // 4. Click on 'Signup / Login' button
  await page.click("a[href='/login']");
  // 5. Verify 'New User Signup!' is visible
  await expect(page.locator("h2:has-text('New User Signup!')")).toBeVisible();
  // 6. Enter name and email address
  await page.fill("input[name='name']", "TestUser");
  await page.fill("input[data-qa='signup-email']", "testuser@example.com");
  // 7. Click 'Signup' button
  await page.click("butto[data-qa='signup-button']");
  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  // 9. Fill details: Title, Name, Email, Password, Date of birth
  // 10. Select checkbox 'Sign up for our newsletter!'
  // 11. Select checkbox 'Receive special offers from our partners!'
  // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  // 13. Click 'Create Account button'
  // 14. Verify that 'ACCOUNT CREATED!' is visible
  // 15. Click 'Continue' button
  // 16. Verify that 'Logged in as username' is visible
  // 17. Click 'Delete Account' button
  // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
});
