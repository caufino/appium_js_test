import { typeIntoField, clickOnElement, getElement } from "../utils/elementUtils";

class LoginPage {
  emailFieldLocator = 'android=new UiSelector().text("Your email")';
  passwordFieldLocator = 'android=new UiSelector().text("Your password")';
  loginButtonLocator = 'android=new UiSelector().description("Login")';
  loginErrorLocator = 'android=new UiSelector().text("Login not successful")';

  async typeEmail(email) {
    await typeIntoField(this.emailFieldLocator, email);
  }

  async typePassword(password) {
    await typeIntoField(this.passwordFieldLocator, password)
  }

  async pressLoginButton() {
    await clickOnElement(this.loginButtonLocator);
  }

  async isLoginErrorDisplayed(expected = false) {
    // Wait for Login error to be loaded
    const loginErrorPopup = await getElement(this.loginErrorLocator);
    const isDisplayed = await loginErrorPopup.isDisplayed({ timeout: 3000 }).catch(() => false);

    // Handle error properly
    if (isDisplayed && !expected) {
      throw new Error('Login error popup was displayed when it should not be! Login failed!');
    }
    if (!isDisplayed && expected) {
      throw new Error('Expected login error popup, but none was displayed!');
    }
    return isDisplayed;
  }
}

export default new LoginPage();
