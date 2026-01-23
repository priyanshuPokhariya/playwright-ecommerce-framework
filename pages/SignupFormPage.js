import { expect } from "@playwright/test";

class SignupFormPage {
  constructor(page) {
    this.page = page;
    this.accountInfoText = "text=Enter Account Information";
    this.password = "#password";
    this.day = "#days";
    this.month = "#months";
    this.year = "#years";
    this.newsletter = "#newsletter";
    this.offers = "#optin";
    this.firstName = "#first_name";
    this.lastName = "#last_name";
    this.address = "#address1";
    this.country = "#country";
    this.state = "#state";
    this.city = "#city";
    this.zip = "#zipcode";
    this.mobile = "#mobile_number";
    this.createAccountBtn = 'button[data-qa="create-account"]';
  }

  async verifyAccountInfo() {
    await expect(this.page.locator(this.accountInfoText)).toBeVisible();
  }

  async fillForm(data) {
    await this.page.check("#id_gender1");
    await this.page.fill(this.password, data.password);
    await this.page.selectOption(this.day, data.day);
    await this.page.selectOption(this.month, data.month);
    await this.page.selectOption(this.year, data.year);

    await this.page.check(this.newsletter);
    await this.page.check(this.offers);

    await this.page.fill(this.firstName, data.firstName);
    await this.page.fill(this.lastName, data.lastName);
    await this.page.fill(this.address, data.address);
    await this.page.selectOption(this.country, data.country);
    await this.page.fill(this.state, data.state);
    await this.page.fill(this.city, data.city);
    await this.page.fill(this.zip, data.zip);
    await this.page.fill(this.mobile, data.mobile);

    await this.page.click(this.createAccountBtn);
  }
}

export default SignupFormPage;
