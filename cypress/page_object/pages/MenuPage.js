export class MenuPage {
	getVisitDashboardUrl() {
		cy.visit("https://app.test.jibble.io/dashboard");
		cy.url().should("include", "/dashboard");
	}

	getVerifyDashboardUrl() {
		cy.url().should("include", "/dashboard");
	}

	selectTimesheetMenu() {
		cy.get('[href="/timesheets"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/timesheets/overview");
	}

	selectLiveLocationsMenu() {
		cy.get(
			'[href="/live-locations"] > .v-list-item__content > .menu-item__text'
		);
		cy.url().should("include", "/live-locations");
	}

	selectTimeOffMenu() {
		cy.get('[href="/time-off"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/time-off/overview");
	}

	selectReportsMenu() {
		cy.get('[href="//reports"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/reports/types");
	}

	selectPeopleMenu() {
		cy.get(
			'[href="/people"] > .v-list-item__content > .menu-item__text'
		).click();
		cy.url().should("include", "/people");
	}
	getPeoplePageUrl() {
		cy.visit("https://app.test.jibble.io/people");
		cy.url().should("include", "/people");
	}
	selectTimesheetMenu() {
		cy.get('[href="/timesheets"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/timesheets/overview");
	}
	selectTimeTrackingMenu() {
		cy.get(
			'[href="/time-tracking"] > .v-list-item__content > .menu-item__text'
		);
		cy.url().should("include", "/time-tracking/policies");
	}
	selectSchedulesMenu() {
		cy.get('[href="/schedules"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/schedules");
	}
	selectTimeOffAndHolidayMenu() {
		cy.get(
			'[href="/time-off-settings"] > .v-list-item__content > .menu-item__text'
		);
		cy.url().should("include", "/time-off-settings/holidays");
	}
	selectLocationMenu() {
		cy.get('[href="/locations"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/locations");
	}
	selectActivityAndProjectMenu() {
		cy.get('[href="/settings"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/settings/activities");
	}
	selectOrganizationMenu() {
		cy.get('[href="/organization"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/organization/profile");
	}

	selectIntegrationMenu() {
		cy.get('[href="/integrations"] > .v-list-item__content > .menu-item__text');
		cy.url().should("include", "/integrations");
	}
	selectYourAccountSettingMenu() {
		cy.get('[data-testid="authorized-person"]').click();
		cy.wait(500);
		cy.get('[data-testid="account-settings"]').should("be.visible").click();
	}
	selectSignOutMenu() {
		cy.get('[data-testid="authorized-person"]').click();
		cy.wait(500);
		cy.get('[data-testid="sign-out"]').should("be.visible").click();
	}

	verifyPageAlreadySignedOut() {
		cy.wait(10000);
		cy.url().should("include", "/login"); // need to verify text instead url
	}
}
export const onMenuPage = new MenuPage();
