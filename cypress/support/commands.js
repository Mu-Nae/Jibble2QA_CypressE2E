/// <reference types="Cypress" />
import { v4 as uuidv4 } from "uuid";
import { onLoginPage } from "../page_object/pages/LoginPage";
import { onDashboardPage } from "../page_object/pages/DashboardPage";
const Chance = require("chance");
const chance = new Chance();

var x = Math.floor(Math.random() * (100 - 1)) + 1;
const y = chance.animal({ type: "zoo" });
var EmailId_Owner = "Autosign+" + x + y + "@jibble.io";
var EmailId_UserA = "citradevi+userA" + x + y + "@jibble.io";
var EmailId_UserB = "citradevi+userB" + x + y + "@jibble.io";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("PerformLoginSession", (username, password) => {
	cy.session("login", () => {
		onLoginPage.getRedirectLoginUrl();
		onLoginPage.getEmail(username);
		onLoginPage.getPassword(password);
		onLoginPage.getSubmitLoginPage().should("not.be.disabled").click();
		onDashboardPage.waitForDashboardPageLoadFully();
	});
});

Cypress.Commands.add("SignUp", () => {
	//window.localStorage.setItem(NewEmail, JSON.stringify(EmailId_Owner))

	cy.api({
		method: "POST",
		url: "https://identity.test.jibble.io/v1/register",
		body: {
			fullName: "Cypress Autosign",
			emailOrPhoneNumber: EmailId_Owner,
			password: "testing123",
			agreeOnNewsletters: true,
		},
	}).then((response) => {
		cy.log(EmailId_Owner);
		expect(response.status).to.eq(201);
	});
});

Cypress.Commands.add("GetToken", () => {
	cy.api({
		method: "POST",
		url: "https://identity.test.jibble.io/connect/token",
		body: {
			redirect_uri: "/",
			client_id: "ro.client",
			grant_type: "password",
			username: EmailId_Owner,
			password: "testing123",
		},
		form: true,
	}).then((response) => {
		cy.log(EmailId_Owner);
		Cypress.env("token", response.body.access_token);
		//accessToken = response.body.access_token
		//window.localStorage.setItem(accessToken, response.body.access_token)
	});
});
Cypress.Commands.add("CreateOrganization", () => {
	cy.api({
		method: "POST",
		url: "https://workspace.test.jibble.io/v1/Organizations",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/plain",
			"X-Jibble-Billing-External-Plan-Id": "ultimate-monthly-usd",
			Authorization: `Bearer ${Cypress.env("token")}`,
		},
		body: {
			name: "Auto",
			"ICultureSettings/TimeZone": "Asia/Kuala_Lumpur",
			"IOnboardingSettings/CompanySize": "From21To50",
			"IOnboardingSettings/Industry": "Construction",
			"IOrganizationProfileSettings/PhoneNumber": "6012314234324",
			"IClientBillingSettings/CurrencyCode": "MYR",
			"IOrganizationProfileSettings/CountryCode": "MY",
			"IOnboardingSettings/Objectives": ["Monitor", "Approve", "TrackTime"],
			"IOnboardingSettings/Objectives@odata.type": "#Collection(String)",
			"ITimeTrackingSettings/AllowedDevices": ["Mobile", "Kiosk", "Web"],
			"ITimeTrackingSettings/AllowedDevices@odata.type": "#Collection(String)",
			"IOnboardingSettings/Referer": "PayrollPanda",
		},
	}).then((response) => {
		expect(response.status).to.eq(201);
		//	const orgId = response.body.id
		Cypress.env("orgId", response.body.id);

		cy.api({
			method: "GET",
			url: "https://identity.test.jibble.io/connect/userinfo",
			headers: {
				"Content-Type": "application/json",
				Accept: "text/plain",
				Authorization: `Bearer ${Cypress.env("token")}`,
			},
			body: {
				email: EmailId_Owner,
			},
		}).then((response) => {
			Cypress.env("NewEmail", response.body.email);

			//	window.localStorage.setItem('NewEmail', response.body.email)
		});
	});
});

Cypress.Commands.add("GrabOwnerToken", () => {
	cy.api({
		method: "GET",
		url: `https://identity.test.jibble.io/v1/people?$filter=organizationId eq+ ${Cypress.env(
			"orgId"
		)}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "text/plain",
			Authorization: `Bearer ${Cypress.env("token")}`,
		},
	}).then((response) => {
		expect(response.status).to.eq(200);
		Cypress.env("personId", response.body.value[0].id);
		Cypress.env("userId", response.body.value[0].userId);
		//	const personId = response.body.value[0].id
		//	const userId = response.body.value[0].userId
		cy.log(Cypress.env("personId"));

		cy.api({
			method: "POST",
			url: "https://identity.test.jibble.io/connect/token",
			headers: {
				Authorization: `Bearer ${Cypress.env("token")}`,
			},
			body: {
				redirect_uri: "/",
				client_id: "ro.client",
				grant_type: "password",
				username: EmailId_Owner,
				password: "testing123",
				acr_values: `prsid:${Cypress.env("personId")}`,
			},
			form: true,
		}).then((response) => {
			cy.log(EmailId_Owner);
			Cypress.env("personAccessToken", response.body.access_token);
		});
	});
});

Cypress.Commands.add("AcceptTrackingCookies", () => {
	cy.api({
		method: "PATCH",
		url: `https://workspace.test.jibble.io/v1/Users(${Cypress.env("userId")})`,
		headers: {
			"Content-Type": "application/json",
			Accept: "text/plain",
			Authorization: `Bearer ${Cypress.env("personAccessToken")}`,
		},
		body: {
			"IDataPrivacySettings/AllowTracking": true,
			"IDataPrivacySettings/SendUpdates": true,
			"IDataPrivacySettings/SendPromotions": true,
		},
	}).then((response) => {
		expect(response.status).to.eq(204);
	});
});

Cypress.Commands.add("ClickGetStarted", () => {
	cy.api({
		method: "PATCH",
		url: `https://workspace.test.jibble.io/v1/Organizations(${Cypress.env(
			"orgId"
		)})`,
		headers: {
			"Content-Type": "application/json",
			Accept: "text/plain",
			Authorization: `Bearer ${Cypress.env("personAccessToken")}`,
		},
		body: {
			"ISubscriptionSettings/TrialStarted": true,
		},
	}).then((response) => {
		expect(response.status).to.eq(204);
	});
});

Cypress.Commands.add("CreateWorkSchedule", () => {
	cy.api({
		method: "POST",
		url: "https://workspace.test.jibble.io/v1/Schedules",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/plain",
			Authorization: `Bearer ${Cypress.env("personAccessToken")}`,
		},
		body: {
			//    "id": uuidv4(),
			name: "Regular",
			workArrangement: "Fixed",
			default: true,
			weeklyHours: null,
			excludeEarlyClockIn: false,
			daySchedules: [
				{
					day: "Monday",
					from: "09:00:00.0000000",
					to: "18:00:00.0000000",
					duration: "PT8H",
				},
				{
					day: "Tuesday",
					from: "09:00:00.0000000",
					to: "18:00:00.0000000",
					duration: "PT8H",
				},
				{
					day: "Wednesday",
					from: "09:00:00.0000000",
					to: "18:00:00.0000000",
					duration: "PT8H",
				},
				{
					day: "Thursday",
					from: "09:00:00.0000000",
					to: "18:00:00.0000000",
					duration: "PT8H",
				},
				{
					day: "Friday",
					from: "09:00:00.0000000",
					to: "18:00:00.0000000",
					duration: "PT8H",
				},
			],
			breaksType: "Unpaid",
			breaks: [
				{
					id: uuidv4(),
					name: "Breakfast",
					duration: "PT15M",
				},
				{
					id: uuidv4(),
					name: "Lunch",
					duration: "PT1H",
					from: "13:00:00.0000000",
					to: "14:00:00.0000000",
					allowToBeTakenFromTo: true,
				},
			],
			autoDeductions: [],
			overtime: {
				timeRangeStyle: "Hours",
				dailyOvertime: true,
				dailyOvertimeMultiplier: null,
				dailyFrom: "09:00:00.0000000",
				dailyDuration: "PT8H",
				dailyDoubleOvertime: true,
				dailyDoubleOvertimeMultiplier: null,
				dailyDoubleFrom: "09:00:00.0000000",
				dailyDoubleDuration: "PT9H",
				weeklyOvertime: false,
				weeklyOvertimeMultiplier: null,
				weeklyDuration: "PT8H",
				restDayOvertime: true,
				restDayOvertimeMultiplier: null,
				publicHolidayOvertime: true,
				publicHolidayOvertimeMultiplier: null,
				endWorkDayAt: "00:00:00.0000000",
			},
			locations: [],
		},
	}).then((response) => {
		expect(response.status).to.eq(201);
	});
});

Cypress.Commands.add("CreatePeople", () => {
	cy.api({
		method: "POST",
		url: "https://workspace.test.jibble.io/v1/$batch",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/plain",
			Authorization: `Bearer ${Cypress.env("personAccessToken")}`,
		},
		body: {
			requests: [
				{
					url: "https://workspace.test.jibble.io/v1/People",

					method: "POST",
					body: {
						fullName: "UserA",

						email: EmailId_UserA,
						"IPersonSetting/SendInviteEmail": true,
						"IPersonSetting/SendInviteSms": false,
					},
				},
				{
					url: "https://workspace.test.jibble.io/v1/People",
					method: "POST",
					body: {
						fullName: "User B",
						preferredName: "User B",
						countryCode: "MY",
						email: EmailId_UserB,
						"IPersonSetting/SendInviteEmail": true,
						"IPersonSetting/SendInviteSms": false,
					},
				},
			],
		},
	}).then((response) => {
		expect(response.status).to.eq(200);
		//	const userId_A = response.body.value[0].id;
		const userId_B = response.body.responses[1].body.id;
		cy.log(EmailId_UserA);
		cy.log(EmailId_UserB);

		cy.api({
			method: "POST",
			url: `https://identity.test.jibble.io/v1/Test/AcceptInvite?personId=${userId_B}&password=testing123`,
			headers: {
				"Content-Type": "application/json",
				Accept: "text/plain",
				Authorization: `Bearer ${Cypress.env("personAccessToken")}`,
			},
		}).then((response) => {
			expect(response.status).to.eq(200);
		});
	});
});

Cypress.Commands.add("LoginAPI", () => {
	cy.request({
		method: "POST",
		url: "https://identity.test.jibble.io/v1/authenticate",

		body: {
			returnUrl: "/",
			username: EmailId_Owner,
			password: "testing123",
		},
	}).then((response) => {
		expect(response.status).to.eq(200);
		Cypress.env("token", response.body.access_token);
	});
});
