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

  test("Register_01: fails with bad email", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // empty input
    await registerPage.goto();
    await registerPage.registerInput.fill("");
    await expect(registerPage.continueButton).toBeDisabled();

    // bad email
    await registerPage.register("bademail@email.com");
    await expect(registerPage.alertMessage).toContainText("no account exists");
  });

  test.skip("Register_02: should allow register with correct email /password", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);

    // good input
    await registerPage.goto();
    await registerPage.register("dev.ci.lempire@gmail.com");
  });
});
