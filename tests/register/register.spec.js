const { test, expect } = require("@playwright/test");
const { RegisterPage } = require("./register.page");

// @ts-check
// eslint-disable-next-line import/no-extraneous-dependencies

test.describe("Lemlist Register", () => {
  test.use({ baseURL: "https://app.lemlist.com" });
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(({ page }) => {
    page.context().clearCookies();
  });

  test("REGISTER_01: fails if at least one field is missing", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const missingFieldNotification = await page.locator(".noty_body");

    // missing field(s)
    await registerPage.goto();
    await registerPage.registerWithMissingFields();
    await expect(missingFieldNotification).toBeVisible();
  });

  test("REGISTER_02: should allow register with correct infos", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const infos = {
      firstName: process.env.TEST_FIRSTNAME, // replace with test firstName
      lastName: process.env.TEST_LASTNAME, // replace with test lastName
      email: process.env.TEST_EMAIL, // replace with test email
      password: process.env.TEST_PASSWORD, // replace with test password
    };
    const choice = await page.locator(".choice").first();
    const continueButton = await page.locator("button").first();
    const bigChoice = await page.locator(".choice .big").first();
    const validateButton = await page.locator("button").first();
    const elements = { choice, continueButton, bigChoice, validateButton };

    await registerPage.goto();
    await registerPage.register(infos);
    await registerPage.registerLastInfos(elements);

    // check dashboard info
    await expect(page).toHaveURL(/.*tea_.*/);
    // await loginPage.team()._id.toContainText(/.*tea_.*/)
    // await loginPage.user()._id.toContainText(/.*usr_.*/);
  });
});
