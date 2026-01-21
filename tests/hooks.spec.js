import { test, expect } from "@playwright/test";

test.beforeAll(async () => {
  console.log("Before All Tests");
});

test.beforeEach(async () => {
  console.log("Before Each Test");
});
test.afterEach(async () => {
  console.log("After Each Test");
});

test("Test 1", async ({ page }) => {
  console.log("Test 1");
});

test("Test 2", async ({ page }) => {
  console.log("Test 2");
});

test.afterAll(async () => {
  console.log("After All Tests");
});
