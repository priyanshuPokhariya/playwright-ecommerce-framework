import { test, expect } from "@playwright/test";

test("Signup with already registered email shows error", async ({ page }) => {
  const testUser = {
    email: "Priyanshu@playwright.com",
    password: "TestPassword123!",
    name: "Playwright User",
  };

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

  // Step 5: Verify 'New User Signup!' is visible
  const newUserSignup = page.locator('h2:has-text("New User Signup!")');
  await expect(newUserSignup).toBeVisible();

  // Step 6: Enter name and already registered email address
  await page.locator('input[data-qa="signup-name"]').fill(testUser.name);
  await page.locator('input[data-qa="signup-email"]').fill(testUser.email);

  // Step 7: Click 'Signup' button
  await page.locator('button[data-qa="signup-button"]').click();

  // Step 8: Verify error 'Email Address already exist!' is visible
  const errorMessage = page.locator(
    'p:has-text("Email Address already exist!")',
  );
  await expect(errorMessage).toBeVisible();
});
