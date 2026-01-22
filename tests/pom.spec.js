import { test, expect } from "@playwright/test";
import Homepage from "../pages/HomePage.js";
test("Homepage check", async ({ page }) => {
  const home = new Homepage(page);
  await home.goto();
});
