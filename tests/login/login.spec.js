const { test, expect } = require("@playwright/test");
const { LoginPage } = require("./login.page");

// @ts-check
// eslint-disable-next-line import/no-extraneous-dependencies

test.describe("Lemlist login", () => {
  test.use({ baseURL: "https://app.lemlist.com" });
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(({ page }) => {
    page.context().clearCookies();
  });

  test("LOGIN_01: fails with bad email", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // empty email input
    await loginPage.goto();
    await loginPage.loginInput.fill("");
    await expect(loginPage.continueButton).toBeDisabled();

    // bad email
    await loginPage.login("bademail@email.com");
    await expect(loginPage.alertMessage).toContainText("no account exists");
  });

  test("LOGIN_02: fails with bad password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const submitPasswordNotification = await page.locator("noty_body");

    // empty password input
    await loginPage.goto();
    await loginPage.passwordInput.fill("");
    await expect(loginPage.continueButton).toBeDisabled();

    // bad password
    await loginPage.loginWithPassword("badpassword");
    await expect(submitPasswordNotification).toContainText("Incorrect");
  });

  test("LOGIN_03: check forgot password request", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const passwordRequestNotification = await page.locator("noty_body");

    // request new password
    await loginPage.goto();
    await loginPage.forgotPasswordRequest();
    await expect(passwordRequestNotification).toContainText("just sent");
  });

  test("LOGIN_04: should allow login with correct email/password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // good email
    await loginPage.goto();
    await loginPage.login("bmuday@live.fr");
    await loginPage.loginWithPassword("-----");
  });
});
