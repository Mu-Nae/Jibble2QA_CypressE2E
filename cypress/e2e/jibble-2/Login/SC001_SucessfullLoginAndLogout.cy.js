/// <reference types="cypress" />
import { onLoginPage } from "../../../page_object/pages/LoginPage";
import { onDashboardPage } from "../../../page_object/pages/DashboardPage";
import { onMenuPage } from "../../../page_object/pages/MenuPage";

describe("SC001 Successful Login and Logout", () => {
	before(() => {
		cy.SignUp();
		cy.GetToken();
		cy.CreateOrganization();
	});

	it("TC001_Ability to login and logout successfully ", () => {
		onLoginPage.getLoginPageUrl();
		onLoginPage.getEmail(Cypress.env("NewEmail"));
		onLoginPage.getPassword("testing123");
		onLoginPage.getSubmitLoginPage().should("not.be.disabled").click();
		onDashboardPage.waitForDashboardPageLoadFully();
		onDashboardPage.verifyDashboardUrl();
		onDashboardPage.acceptDataTrackingCookies();
		onDashboardPage.clickGetStarted();
		onDashboardPage.VerifyDashboardWelcomeUserName("Hello Cypress");
		onMenuPage.selectSignOutMenu();
		onMenuPage.verifyPageAlreadySignedOut();
	});
});
