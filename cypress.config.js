const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
     retries: 1,
    baseUrl:'http://localhost:3000/',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
 browsers: [
    {
      name: 'electron',
      family: 'chromium',
      displayName: 'Electron 130',
      version: 'latest',
      channel: 'stable',
    },
  {
      name: 'chrome',
      family: 'chromium',
      displayName: 'Chrome',
      version: 'latest',
      channel: 'stable',
    }
  ]
});

//Запуск тестов во всех конфигурациях: npm run test:all