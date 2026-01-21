import { test } from "@playwright/test";

test.only("Screenshot Test", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.screenshot({
    path: "screenshots/" + Date.now() + "screenshot.png",
  });
});
test("Full Page Screenshot", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.screenshot({
    path: "screenshots/" + Date.now() + "fullpage.png",
    fullPage: true,
  });
});
test.only("Element Screenshot", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.locator(".recommended_items").screenshot({
    path: "screenshots/" + Date.now() + "element.png",
  });
});
