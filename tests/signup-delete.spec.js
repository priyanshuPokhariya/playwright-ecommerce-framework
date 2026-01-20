import { test, expect } from "@playwright/test";

test("Signup and Delete Account - AutomationExercise", async ({ page }) => {
  const username = "TestUser";
  const email = `test${Date.now()}@mail.com`; // unique email
  const password = "Test@123";

  // 1 & 2. Launch browser and navigate
  await page.goto("https://automationexercise.com");

  // 3. Verify home page visible
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click Signup / Login
  await page.click('a[href="/login"]');

  // 5. Verify New User Signup visible
  await expect(page.locator("text=New User Signup!")).toBeVisible();

  // 6. Enter name & email
  await page.fill('input[data-qa="signup-name"]', username);
  await page.fill('input[data-qa="signup-email"]', email);

  // 7. Click Signup
  await page.click('button[data-qa="signup-button"]');

  // 8. Verify ENTER ACCOUNT INFORMATION
  await expect(page.locator("text=Enter Account Information")).toBeVisible();

  // 9. Fill account info
  await page.check("#id_gender1");
  await page.fill("#password", password);
  await page.selectOption("#days", "10");
  await page.selectOption("#months", "5");
  await page.selectOption("#years", "1995");

  // 10 & 11. Select checkboxes
  await page.check("#newsletter");
  await page.check("#optin");

  // 12. Fill address details
  await page.fill("#first_name", "Test");
  await page.fill("#last_name", "User");
  await page.fill("#company", "QA Company");
  await page.fill("#address1", "Street 1");
  await page.fill("#address2", "Near Park");
  await page.selectOption("#country", "India");
  await page.fill("#state", "Delhi");
  await page.fill("#city", "New Delhi");
  await page.fill("#zipcode", "110001");
  await page.fill("#mobile_number", "9999999999");

  // 13. Create Account
  await page.click('button[data-qa="create-account"]');

  // 14. Verify ACCOUNT CREATED
  await expect(page.getByText("Account Created!")).toBeVisible();

  // 15. Click Continue
  await page.click('a[data-qa="continue-button"]');

  // 16. Verify Logged in as username
  await expect(page.locator(`text=Logged in as ${username}`)).toBeVisible();

  // 17. Delete Account
  await page.click('a[href="/delete_account"]');

  // 18. Verify ACCOUNT DELETED
  await expect(page.locator("text=Account Deleted!")).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
