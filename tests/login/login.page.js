// playwright-dev-page.js
const { expect } = require("@playwright/test");

// Page object for /login screen

exports.LoginPage = class {
  constructor(page) {
    this.page = page;

    // locators
    this.loginInput = page.locator('[data-test="login-email"]');
    this.continueButton = page.locator('[data-test="validate-email"]');
    this.signupButton = page.locator('[data-test="create"]');
    this.alertMessage = page.locator(".alert-message");
    this.passwordInput = page.locator('[data-test="login-password"]');
    this.passwordRequest = page.locator('[data-test="forgot-password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  // helpers
  async team() {
    return this.page.evaluate(() => window.Meteor.team());
  }

  async user() {
    return this.page.evaluate(() => window.Meteor.user());
  }

  // actions
  async login(email) {
    await expect(this.continueButton).toBeVisible();
    await expect(this.signupButton).toBeVisible();
    await expect(this.loginInput).toBeVisible();

    await this.loginInput.fill(email);

    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();
  }

  async loginWithPassword(password) {
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordRequest).toBeVisible();
    await expect(this.loginButton).toBeVisible();

    await this.passwordInput.fill(password);

    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }

  async forgotPasswordRequest(elements) {

    await this.passwordRequest.click();
    await expect(elements.modal).toBeVisible();
    await expect(elements.confirmButton).toBeVisible();

    await elements.confirmButton.click();
    await expect(elements.modal).toBeHidden();
  }

  async goto() {
    await this.page.goto("/login");
    await expect(this.page).toHaveURL(/.*login/);
  }
};
