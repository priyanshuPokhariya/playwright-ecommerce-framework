import { test, expect } from "@playwright/test";

test("Contact Us form submission", async ({ page }) => {
  // 1. Launch browser (handled by Playwright)

  // 2. Navigate to url
  await page.goto("http://automationexercise.com");

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Contact Us' button
  await page.getByRole("link", { name: "Contact Us" }).click();

  // 5. Verify 'GET IN TOUCH' is visible
  await expect(
    page.getByRole("heading", { name: "Get In Touch" }),
  ).toBeVisible();

  // 6. Enter name, email, subject and message
  await page.fill('input[name="name"]', "Priyanshu");
  await page.fill('input[name="email"]', "test@test.com");
  await page.fill('input[name="subject"]', "Automation Testing");
  await page.fill(
    'textarea[name="message"]',
    "This is a Playwright automation test.",
  );

  // 7. Upload file
  await page.setInputFiles(
    'input[name="upload_file"]',
    "tests/data/testfile.txt",
  );
  // 8 & 9. Click Submit button and accept alert
  page.on("dialog", (dialog) => {
    console.log(dialog.message());
    dialog.accept();
  });
  await page.locator('input[name="submit"]').click();

  //   // 10. Verify success message (WAIT correctly for DOM update)
  //   const successMessage = page.locator(".status");

  //   await expect(successMessage).toHaveText(
  //     "Success! Your details have been submitted successfully.",
  //     { timeout: 10000 },
  //   );

  // 11. Click 'Home' button and verify landed to home page
  await page.locator('a[href="/"]').click();
  await expect(page).toHaveURL("http://automationexercise.com/");
});
