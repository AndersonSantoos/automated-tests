const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "6h7m16",
  e2e: {
    //testIsolation: false
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
