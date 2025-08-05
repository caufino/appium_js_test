import loginPage from '../pages/LoginPage.js';
import dashboardPage from '../pages/DashboardPage.js';

// Params for app handling between tests
// TODO: Wonder how many parameters we will have, based on that we should decide if we want to set those up as ENV variables or store them in configuration file
const appPackage = 'com.mentortools.academy';
const child_process = await import('child_process');
const execSync = child_process.execSync;

// Test params
// Fetch working credentials for tests
const testEmail = process.env.TEST_EMAIL;
const testPassword = process.env.TEST_PASSWORD;

// If we want to test all the login combinations, create all combinations for parametrization
const loginOptions = [["wrong@email.com", "WrongPassword123!", true]];

if (testEmail && testPassword) {
  loginOptions.push(
    [testEmail, testPassword, false],
    [testEmail, "WrongPassword123!", true],
    ["wrong@email.com", testPassword, true]    
  );
}

describe('Mobile Login Tests', () => {
  beforeEach(async () => {
    // Clear app data before each test to ensure clean test separation
    execSync(`adb shell pm clear ${appPackage}`);

    // Grant notifications permissions, so we are not bothered during testing with prompts
    execSync(`adb shell pm grant ${appPackage} android.permission.POST_NOTIFICATIONS`);

    // Run app
    await driver.activateApp(appPackage);
  });

  loginOptions.forEach(([email, password, expectLoginError]) => {
    it(`Login with Email: "${email}", password: "${password}", should expect Login error: ${expectLoginError}`, async () => {
      // Type in Email, Password & proceed with Login
      await loginPage.typeEmail(email);
      await loginPage.typePassword(password);
      await loginPage.pressLoginButton();

      // Check for Login error if expected
      await loginPage.isLoginErrorDisplayed(expectLoginError);

      if (!expectLoginError) {
        // If we successfully log in, check if we landed on dashboard correctly
        await dashboardPage.isDashboardLoaded();
      }
    });
  });
});
