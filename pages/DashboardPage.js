import { getElement } from "../utils/elementUtils";

class DashboardPage {
  dashboardLocators = [
      'android=new UiSelector().text("You haven’t started any courses yet.")',
      '~My courses', // ACCESSIBILITY_ID locators
      '~Paid',
      '~Free'
    ];

  async isDashboardLoaded() {
    // Wait for last element on the page to be loaded
    const firstOption = await getElement(this.dashboardLocators[0]);
    await firstOption.waitForDisplayed({ timeout: 5000 });

    // Check if all other dashboard elements were properly loaded
    for (const locator of this.dashboardLocators) {
      const element = await getElement(locator);
      if (!(await element.isDisplayed())) {
        throw new Error('User dashboard was not loaded (or failed to load in time)! Login failed!');
      }
    }
  }
}

export default new DashboardPage();
