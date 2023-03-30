// @ts-check
// eslint-disable-next-line import/no-extraneous-dependencies
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    ['html', { open: process.env.CI ? 'never' : true }],
    ['junit', { embedAttachmentsAsProperty: 'testrun_evidence', outputFile: 'results.xml' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.URL || 'http://dev.lemlist.com:8000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: false, // 'on-first-retry',   // off because, if on, it will close the browser after tests, same  for screenshot and video, disabled on dev
    screenshot: process.env.CI && 'only-on-failure', // Capture screenshot after each test failure.
    video: process.env.CI && 'retain-on-failure', // Record video only when retrying a test for the first time.
    headless: !!process.env.CI,
    viewport: { width: 1024, height: 768 },
    storageState: 'userStorageState.json',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        baseURL: process.env.URL || 'http://dev.lemlist.com:8000',
        ...devices['Desktop Chrome'],
        launchOptions: {
          // Put your chromium-specific args here
    // chromium bug with disable-web-security, use chrome instead..
    // args: ['--disable-web-security'],
        },
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     baseURL: process.env.URL || 'http://dev.lemlist.com:8000',
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     baseURL: process.env.URL || 'http://dev.lemlist.com:8000',
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     baseURL: process.env.URL || 'http://dev.lemlist.com:8000',
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     baseURL: process.env.URL || 'http://dev.lemlist.com:8000',
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     baseURL: process.env.URL || 'http://dev.lemlist.com:8000',
    //     channel: 'msedge',
    //   },
    // },

    // {
    //   name: 'Google Chrome',
    //   use: {
    //     baseURL: process.env.URL || 'http://dev.lemlist.com:8000',

    //     channel: 'chrome',
    //     ...devices['Desktop Chrome'],
    //     launchOptions: {
    //       // Put your chromium-specific args here
    //       args: ['--disable-web-security', '--use-gl=desktop'],
    //     },
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
