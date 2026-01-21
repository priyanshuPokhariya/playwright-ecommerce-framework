import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page.getByText("AutomationExercise Full-").nth(1).click();
  await page.locator(".left").first().click();
  await page.locator(".product-overlay").first().click();
  await page.getByRole("link", { name: " View Product" }).first().click();
  await page.locator("#quantity").click();
  await page.locator("#quantity").click();
  await page.locator("#quantity").click();
  await page.locator("#quantity").click();
  await page.locator("#quantity").click();
  await page.locator("#quantity").fill("5");
  await page.getByRole("button", { name: " Add to cart" }).click();
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await page.getByRole("link", { name: " Cart" }).click();
  await page.getByRole("button", { name: "5" }).click();
  await page.getByText("Proceed To Checkout").click();
  await page.getByRole("button", { name: "Continue On Cart" }).click();
});
