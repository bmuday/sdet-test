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
    const submitPasswordNotification = await page.locator(".noty_body");

    await loginPage.goto();
    await loginPage.login("-----"); // replace with test email

    // empty password input
    await loginPage.passwordInput.fill("");
    await expect(loginPage.loginButton).toBeDisabled();

    // bad password
    await loginPage.loginWithPassword("badpassword");
    await expect(submitPasswordNotification).toContainText("Incorrect");
  });

  test("LOGIN_03: check forgot password request", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const modal = await page.locator(".swal2-modal");
    const confirmButton = await page.locator(".swal2-confirm");
    const elements = {modal, confirmButton}
    const passwordRequestNotification = await page.locator(".noty_body");

    // request new password
    await loginPage.goto();
    await loginPage.login("-----"); // replace with test email

    await loginPage.forgotPasswordRequest(elements);
    await expect(passwordRequestNotification).toContainText("just sent");
  });

  test("LOGIN_04: should allow login with correct email/password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // good email
    await loginPage.goto();
    await loginPage.login("-----"); // replace with test email
    await loginPage.loginWithPassword("-----"); // replace with test password

    // check dashboard info
    await expect(page).toHaveURL(/.*tea_.*/)
    // await loginPage.team()._id.toContainText(/.*tea_.*/)
    // await loginPage.user()._id.toContainText(/.*usr_.*/);
  });
});
