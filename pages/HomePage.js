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
}

export default Homepage;
