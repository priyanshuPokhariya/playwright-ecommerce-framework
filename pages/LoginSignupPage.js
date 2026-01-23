import { expect } from "@playwright/test";

class LoginSignupPage {
  constructor(page) {
    this.page = page;
    this.newUserText = "text=New User Signup!";
    this.nameInput = 'input[data-qa="signup-name"]';
    this.emailInput = 'input[data-qa="signup-email"]';
    this.signupBtn = 'button[data-qa="signup-button"]';
  }
  async verifyNewUserSignup() {
    await expect(this.page.locator(this.newUserText)).toBeVisible();
  }

  async signup(name, email) {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.signupBtn);
  }
}

export default LoginSignupPage;
