import { getElement } from "../utils/elementUtils";

class LoginPage {
  async typeEmail(email) {
    const emailField = await getElement("text", "Your email");
    await emailField.setValue(email);
  }

  async typePassword(password) {
    const passwordField = await getElement("text", "Your password");
    await passwordField.setValue(password);
  }

  async pressLoginButton() {
    const loginButton = await getElement("description", "Login");
    await loginButton.click();
  }

  async isLoginErrorDisplayed(expected = false) {
    // Wait for Login error to be loaded
    const loginError = await getElement("text", "Login not successful").catch(() => null);
    const isDisplayed = loginError ? await loginError.isDisplayed() : false;

    // Handle error properly
    if (isDisplayed && !expected) {
      throw new Error("Login error popup was displayed when it should not be! Login failed!");
    }
    if (!isDisplayed && expected) {
      throw new Error("Expected login error popup, but none was displayed!");
    }
  }
}

export default new LoginPage();
