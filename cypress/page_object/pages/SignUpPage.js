export class SignUpPage {
	getVisitSignUpPage() {
		cy.visit("/login");
		cy.get('[data-testid="sign-up-today"]').click();
		cy.url().should("include", "/signup");
		cy.get('[data-testid="onboarding-create-team"] > .v-btn__content')
			.should("have.text", " Create a new organization ")
			.click();
		cy.url().should("include", "/create-account");
	}

	getSignUpPageDataFillIn(fullname, email, password) {
		cy.get('[data-testid="full-name"]').type(fullname);
		cy.get('[data-testid="email"]').type(email);
		cy.get('[data-testid="password"]').type(password);
	}

	getRecapchaEnabled() {
		cy.get('[style="width: 304px; height: 78px;"] > div > iframe')
			.first()
			.its("0.contentDocument.body")
			.should("not.be.undefined")
			.and("not.be.empty")
			.then(cy.wrap)
			.find("#recaptcha-anchor")
			.should("be.visible")
			.click({ force: true });
	}

	getSubmitSignUpPage() {
		return cy
			.get('[data-testid="onboarding-team-create-account"]')
			.should("not.be.disabled")
			.click();
	}

	getOrganizationNameAndPhoneNumber(OrganisationName, phoneNumber) {
		cy.wait(5000);
		cy.intercept("https://identity.test.jibble.io/connect/userinfo").as(
			"getLoginIdentity"
		);
		cy.wait("@getLoginIdentity").its("response.statusCode").should("eq", 200);
		cy.intercept(
			"https://authorization.test.jibble.io/v1/Info/currentUserInfo"
		).as("getIntergration");
		cy.wait("@getIntergration").its("response.statusCode").should("eq", 200);
		cy.get('[data-testid="input-organisation-name"]').type(OrganisationName); // organization name
		cy.get('[data-testid="phone-number"]').type(phoneNumber); // phone number
	}

	SelectOrganizationCountry() {
		// country
		// country code
	}

	selectOrganizationIndustry() {
		cy.get(
			".col > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections"
		).click(); // show list of industry
		cy.get('[data-testid="Advertising"]').click({ force: true }); // select industry
	}

	selectOrganizationSizeFrom1To10() {
		cy.get('[data-testid="From1To10"] > .v-btn__content')
			.should("have.text", " 21-50 ")
			.click();
	}

	selectOrganizationSizeFrom11To20() {
		cy.get('[data-testid="From11To20"] > .v-btn__content')
			.should("have.text", " 11-50 ")
			.click();
	}

	selectOrganizationSizeFrom21To50() {
		cy.get('[data-testid="From21To50"] > .v-btn__content')
			.should("have.text", " 21-50 ")
			.click();
	}

	selectOrganizationSizeFrom51To100() {
		cy.get('[data-testid="From51To100"] > .v-btn__content')
			.should("have.text", " 51-100 ")
			.click();
	}

	selectOrganizationSizeFrom51To100() {
		cy.get('[data-testid="MoreThan100"] > .v-btn__content')
			.should("have.text", " 100+ ")
			.click();
	}

	getSubmitOrganizationPage() {
		return cy
			.get('[data-testid="onboarding-create-organisation"] > .v-btn__content')
			.should("be.visible")
			.click(); // click continue button
	}

	selectMonitorGoal() {
		return cy.get(
			'[data-testid="Monitor"] > .my-4 > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
		);
	}

	selectApprovalGoal() {
		return cy.get(
			'[data-testid="Approve"] > .my-4 > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
		);
	}

	selectTrackTimeGoal() {
		return cy.get(
			'[data-testid="TrackTime"] > .my-4 > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
		);
	}

	getSubmitGoalsPage() {
		return cy.get(".v-btn__content").should("be.visible").click(); // goals continue button
	}

	selectMobileDevice() {
		return cy.get(
			'[data-testid="Mobile Apps"] > .my-4 > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
		);
	}
	selectKioskDevice() {
		return cy.get(
			'[data-testid="Shared Kiosk"] > .my-4 > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
		);
	}

	selectPersonalModeDevice() {
		return cy.get(
			'[data-testid="Personal Computers"] > .my-4 > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
		);
	}

	getSubmitDevicePage() {
		return cy.get(".v-btn__content").should("be.visible").click(); // Device continue button
	}

	selectReferrerTvAdvertisement() {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(1) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
	}

	selectReferrerSearchEngine() {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(3) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
	}

	selectReferrerSocialmedia() {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(5) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
	}

	selectReferrerPayrollPandateam() {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(7) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
	}
	selectReferrerAfriendOrColleague() {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(2) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
	}

	selectReferrerReviewWebsite() {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(4) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
	}

	selectReferrerAppStoreOrPlayStore() {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(6) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
	}

	selectReferrerOther(otherReason) {
		cy.url().should("include", "/onboarding/referrer");
		cy.get(
			":nth-child(8) > .v-card > .align-center > .v-radio > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
		).click();
		cy.get('[data-testid="other-field"]').type(otherReason);
	}

	getSubmitReferrerPage() {
		return cy
			.get('[data-testid="onboarding-devices"]')
			.should("be.visible")
			.click();
	}
}

export const onSignUpPage = new SignUpPage();
