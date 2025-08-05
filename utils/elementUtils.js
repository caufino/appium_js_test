// Get element and wait for it to be visible
export async function getElement(findBy = "text", value, timeout = 5000) {
  let selector;
  switch (findBy) {
    case "text":
      selector = `android=new UiSelector().text("${value}")`;
      break;
    case "description":
      selector = `android=new UiSelector().description("${value}")`;
      break;
    case "accessibilityId":
      selector = `~${value}`; // ACCESSIBILITY_ID selector
      break;
    default:
      selector = value; // Custom selector
  }

  const element = await $(selector);
  await element.waitForDisplayed({ timeout: timeout });
  return element;
}

// Check if all elemenents are properly visible
export async function areElementsDisplayed(identifiers) {
  for (const identifier of identifiers) {
    const element = await getElement(identifier.findBy, identifier.value).catch(() => null);
    const isDisplayed = element ? await element.isDisplayed() : false;

    if (!isDisplayed)
      throw new Error(`Element with value '${identifier.value}' was expected to be displayed, but was not!`);
  }
}
