import { getElement, areElementsDisplayed } from "../utils/elementUtils";

class DashboardPage {
  dashboardIdentifiers = [
    { findBy: "text", value: "You haven’t started any courses yet."},
    { findBy: "text", value: "My courses"},
    { findBy: "text", value: "Paid"},
    { findBy: "text", value: "Free"}
  ];

  async isDashboardLoaded() {
    // Wait for last element on the page to be loaded
    const first = await getElement(this.dashboardIdentifiers[0].findBy, this.dashboardIdentifiers[0].value);
    await first.waitForDisplayed({ timeout: 5000 });

    // Check if all other dashboard elements were properly loaded
    await areElementsDisplayed(this.dashboardIdentifiers);
  }
}

export default new DashboardPage();
