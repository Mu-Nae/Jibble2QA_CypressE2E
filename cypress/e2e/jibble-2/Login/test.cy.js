/// <reference types="cypress" />
import { onLoginPage } from "../../../page_object/pages/LoginPage";
import { onDashboardPage } from "../../../page_object/pages/DashboardPage";

describe("SC002_Login", () => {
	it("TC001_Ability to login successfully and dashboard page appear as default page", () => {
		// cy.visit("https://app.test.jibble.io/login");
		// cy.url().should("include", "/login");
		// cy.get('[data-testid="emailOrPhone"]').type("citradevi@jibble.io");
		// cy.get('[data-testid="password"]').type("testing123");
		// cy.get('[data-testid="login-button"] > .v-btn__content').click();

		onLoginPage.getLoginPageUrl();
		onLoginPage.getEmail(`citradevi@jibble.io`);
		onLoginPage.getPassword("testing123");
		onLoginPage.getSubmitLoginPage().click();
		onDashboardPage.waitForDashboardPageLoadFully();
		// onDashboardPage.verifyDashboardUrl()
		// onDashboardPage.acceptDataTrackingCookies()
		// onDashboardPage.clickGetStarted()
		// onDashboardPage.VerifyDashboardWelcomeUserName('Hello Cypress')
	});
});
