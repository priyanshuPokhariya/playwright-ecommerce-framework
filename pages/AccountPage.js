import { expect } from "@playwright/test";
class AccountPage {
  constructor(page) {
    this.page = page;
    this.accountCreatedText = "text=Account Created!";
    this.accountDeletedText = "text=Account Deleted!";
    this.continueBtn = 'a[data-qa="continue-button"]';
    this.deleteAccountBtn = 'a[href="/delete_account"]';
  }

  async verifyAccountCreated() {
    await expect(this.page.locator(this.accountCreatedText)).toBeVisible();
    await this.page.click(this.continueBtn);
  }

  async deleteAccount() {
    await this.page.click(this.deleteAccountBtn);
  }

  async verifyAccountDeleted() {
    await expect(this.page.locator(this.accountDeletedText)).toBeVisible();
    await this.page.click(this.continueBtn);
  }
}

export default AccountPage;
