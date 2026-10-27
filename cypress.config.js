const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports",
    reportPageTitle: "Automation Exercise - Relatório de testes",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  retries: { runMode: 2, openMode: 0 },
  video: false,
  e2e: {
    baseUrl: 'https://automationexercise.com',
    env: {
      LOGIN_EMAIL:'ravi_bezerra@teste.com',
      LOGIN_PASSWORD: "pwd123",
      LOGIN_NAME: 'Ravi Bezerra'
    },
    watchForFileChanges: false,
    blockHosts: ['*.googlesyndication.com', '*.doubleclick.net'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
