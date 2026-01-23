import { expect } from "@playwright/test";

class Homepage {
  constructor(page) {
    this.page = page;
    this.signupLoginLink = page.locator("a[href='/login']");
    this.loggedinTest = (username) =>
      page.locator(`text=Logged in as ${username}`);
  }

  async goto() {
    await this.page.goto("https://automationexercise.com");
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
    await expect(this.page).toHaveTitle("Automation Exercise - Signup / Login");
  }
  async verifyUser(username) {
    await expect(this.loggedinTest(username)).toBeVisible();
  }
}

export default Homepage;
