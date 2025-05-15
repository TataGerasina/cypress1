const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    retries: 1,
    baseUrl:'http://localhost:3000/',
    prodactUrl: 'laptop',

    setupNodeEvents(on, config) {
      config.viewportWidth = 1366;
      config.viewportHeight = 768;
      return config;
    },
       
  },
  chromeWebSecurity: false,
});


//npm run test:laptop
