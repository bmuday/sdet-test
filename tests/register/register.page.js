// playwright-dev-page.js
const { expect } = require("@playwright/test");

// Page object for /login screen

exports.RegisterPage = class {
  constructor(page) {
    this.page = page;

    // locators
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.termsCheckbox = page.locator('[data-test="terms"]');
    this.policyCheckbox = page.locator('[data-test="policy"]');
    this.nextStepButton = page.locator('[data-test="next"]');
  }

  // helpers

  // actions
  async registerWithMissingFields() {
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.lastNameInput).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.termsCheckbox).toBeVisible()
    await expect(this.policyCheckbox).toBeVisible()
    await expect(this.nextStepButton).toBeVisible()

    await this.firstNameInput.fill("")
    await this.lastNameInput.fill("")
    await this.emailInput.fill("")
    await this.passwordInput.fill("")

    await this.nextStepButton.click();
  }

  async register(infos) {
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.lastNameInput).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.termsCheckbox).toBeVisible()
    await expect(this.policyCheckbox).toBeVisible()
    await expect(this.nextStepButton).toBeVisible()

    // fill register form
    await this.firstNameInput.fill(infos.firstName)
    await this.lastNameInput.fill(infos.lastName)
    await this.emailInput.fill(infos.email)
    await this.passwordInput.fill(infos.password)
    await this.termsCheckbox.check()
    await this.policyCheckbox.check()
    // manage captcha 

    await this.nextStepButton.click();
    await expect(this.page).toHaveURL(/.*signup-form/);
  }

  async registerLastInfos(elements) {
    // step 1
    await expect(elements.continueButton).toBeDisabled();
    await elements.choice.click()
    await expect(elements.continueButton).toBeEnabled();
    await elements.continueButton.click()

    // step 2
    await expect(elements.validateButton).toBeDisabled();
    await elements.bigChoice.click()
    await expect(elements.validateButton).toBeEnabled();
    await elements.validateButton.click()
  }

  async goto() {
    await this.page.goto("/create-account");
    await expect(this.page).toHaveURL(/.*create-account/);
  }
};
