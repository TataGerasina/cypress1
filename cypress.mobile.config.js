const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    retries: 1,
    baseUrl:'http://localhost:3000/',
    prodactUrl: 'mobile',

    setupNodeEvents(on, config) {
      config.viewportWidth = 375; // iPhone X
      config.viewportHeight = 812;
      return config;
    },
  },
   chromeWebSecurity: false,
});

//npm run test:mobile