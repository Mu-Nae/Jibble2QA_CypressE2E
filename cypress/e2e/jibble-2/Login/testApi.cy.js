/// <reference types="cypress" />
import { onLoginPage } from "../../../page_object/pages/LoginPage";

describe("SC002_Login", () => {
	before(() => {
		cy.SignUp();
		cy.GetToken();
		cy.CreateOrganization();
		cy.GrabOwnerToken();
		cy.AcceptTrackingCookies();
		cy.ClickGetStarted();
		cy.CreateWorkSchedule();
		cy.CreatePeople();
	});

	it("TC001_Ability to login successfully and dashboard page appear as default page", () => {
		onLoginPage.getLoginPageUrl();
		onLoginPage.getEmail(`${Cypress.env("NewEmail")}`);
		onLoginPage.getPassword("testing123");
		onLoginPage.getSubmitLoginPage().click();
	});
});
