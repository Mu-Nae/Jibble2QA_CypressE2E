/// <reference types="Cypress" />
///// <reference types="cypress-iframe" />
import { onSignUpPage } from "../../../page_object/pages/SignUpPage";
import { onDashboardPage } from "../../../page_object/pages/DashboardPage";
const Chance = require("chance");
const chance = new Chance();

describe("Signup Process", function () {
	var x = Math.floor(Math.random() * (100 - 1)) + 1;
	const y = chance.animal({ type: "zoo" });
	var Email_Id = "Autosign+" + x + y + "@jibble.io";

	it("Signup", function () {
		//    cy.log("Enter signup detail for email" + Email_Id)
		onSignUpPage.getVisitSignUpPage();
		onSignUpPage.getSignUpPageDataFillIn(
			"Cypress End to End Test",
			Email_Id,
			"testing123"
		);
		onSignUpPage.getRecapchaEnabled();
		onSignUpPage.getSubmitSignUpPage();
		onSignUpPage.getOrganizationNameAndPhoneNumber(
			"Cypress End to End Test",
			"0173316941"
		);
		onSignUpPage.selectOrganizationIndustry();
		onSignUpPage.selectOrganizationSizeFrom21To50();
		onSignUpPage.getSubmitOrganizationPage();
		onSignUpPage.selectApprovalGoal().click();
		onSignUpPage.getSubmitGoalsPage();
		onSignUpPage.selectMobileDevice().click();
		onSignUpPage.selectKioskDevice().click();
		onSignUpPage.selectPersonalModeDevice().click();
		onSignUpPage.getSubmitDevicePage();
		onSignUpPage.selectReferrerPayrollPandateam();
		onSignUpPage.getSubmitReferrerPage();

		onDashboardPage.waitForDashboardPageLoadFully();
		onDashboardPage.acceptDataTrackingCookies();
		onDashboardPage.clickGetStarted();
	});
});
