export async function getElement(locator) {
  return await $(locator);
}

export async function typeIntoField(elementLocator, textToType) {
  const element = await getElement(elementLocator);
  await element.waitForDisplayed({ timeout: 5000 });
  await element.setValue(textToType);
}

export async function clickOnElement(elementLocator) {
  const element = await getElement(elementLocator);
  await element.waitForDisplayed({ timeout: 5000 });
  await element.click();
}

export async function areElementsDisplayed(elements) {
  for (const element of elements) {
    const displayed = await element.isDisplayed().catch(() => false);
    if (!displayed) return false;
  }
  return true;
}
