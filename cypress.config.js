const { defineConfig } = require("cypress");

module.exports = defineConfig({
	video: true,
	viewportWidth: 1500,
	viewportHeight: 800,
	chromeWebSecurity: false,
	watchForFileChanges: false,
	requestTimeout: 10000,
	defaultCommandTimeout: 4000,

	e2e: {
		baseUrl: "https://app.test.jibble.io",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
