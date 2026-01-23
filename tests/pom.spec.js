import { test, expect } from "@playwright/test";
import Homepage from "../pages/HomePage.js";
import LoginSignupPage from "../pages/LoginSignupPage.js";
import SignupFormPage from "../pages/SignupFormPage.js";

test("Homepage check", async ({ page }) => {
  const home = new Homepage(page);
  const login = new LoginSignupPage(page);
  const signup = new SignupFormPage(page);

  const user = {
    name: "Priyanshu",
    email: "priyanshu@example.com",
    password: "Test@123",
    day: "10",
    month: "7",
    year: "2000",
    firstName: "Test",
    lastName: "User",
    address: "Delhi",
    country: "India",
    state: "Delhi",
    city: "Delhi",
    zip: "110001",
    mobile: "9999999999",
  };

  await home.goto();
  await home.clickSignupLogin();
  await login.verifyNewUserSignup();
  await login.signup(user.name, user.email);
  await signup.verifyAccountInfo();
  await signup.fillForm(user);
});
