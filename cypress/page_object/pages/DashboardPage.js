export class DashboardPage {
	waitForDashboardPageLoadFully() {
		cy.wait(5000);
		cy.intercept("https://identity.test.jibble.io/connect/userinfo").as(
			"getLoginIdentity"
		);
		cy.wait("@getLoginIdentity").its("response.statusCode").should("eq", 200);
		cy.intercept(
			" https://integrations.test.jibble.io/v1/intercom/getHash?platform=web"
		).as("getIntergration");
		cy.wait("@getIntergration").its("response.statusCode").should("eq", 200);
		cy.intercept(
			"https://time-tracking.test.jibble.io/v1/In?%24expand=latestTimeEntry%28%24select%3Doffset%29&%24orderby=latestTimeEntryTime%20desc%2CfullName%20asc&%24select=fullName%2ClatestTimeEntryTime%2Cid%2CpictureId&searchTerm="
		).as("getAttendanceTT");
		cy.wait("@getAttendanceTT").its("response.statusCode").should("eq", 200);
	}

	verifyDashboardUrl() {
		return cy.url().should("include", "/dashboard");
	}

	acceptDataTrackingCookies() {
		cy.get('[data-testid="accept-data-tracking"] > .v-btn__content').click();
	}

	clickGetStarted() {
		cy.get(".my-7 > .v-btn__content").click();
	}

	VerifyDashboardWelcomeUserName(AccountholderName) {
		cy.get(".pr-3 > .v-card > .pa-6 > h1").should(
			"have.text",
			AccountholderName
		);
	}
}
export const onDashboardPage = new DashboardPage();
