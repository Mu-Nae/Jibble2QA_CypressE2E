/// <reference types="cypress" />
import { onLoginPage } from "../../../page_object/pages/LoginPage";

describe("SC002_Login Validation with multiple data", () => {
	beforeEach(() => {
		onLoginPage.getLoginPageUrl();
	});

	it("TC001_Invalid Email and Invalid Password", () => {
		cy.fixture("InvalidCredential").then((data) => {
			data.forEach((userdata) => {
				onLoginPage.getEmail(userdata.email);
				onLoginPage.getPassword(userdata.password);
				onLoginPage.getSubmitLoginPage().should("not.be.disabled").click();
				onLoginPage
					.displayUsernameErrorMessage()
					.should("be.visible")
					.and("have.text", "Invalid email or phone number format");
				onLoginPage
					.displayPasswordErrorMessage()
					.should("be.visible")
					.and("have.text", "Password must be at least 6 characters long");
				onLoginPage.getEmailText().clear();
				onLoginPage.getPasswordText().clear();
				onLoginPage
					.getSubmitLoginPage()
					.should("be.visible")
					.and("be.disabled");
			});
		});
	});
	it("TC002_valid Email and invalid Password", () => {
		onLoginPage.getEmail("Cypress@gmail.com");
		onLoginPage.getPassword("Seat."); // password less than 6 number and with include space
		onLoginPage.getSubmitLoginPage().click();
		onLoginPage.displayUsernameErrorMessage().should("not.exist");
		onLoginPage
			.displayPasswordErrorMessage()
			.should("be.visible")
			.and("have.text", "Password must be at least 6 characters long");
		onLoginPage.getEmailText().clear();
		onLoginPage.getPasswordText().clear();
	});
	it("TC003_invalid Email and valid Password", () => {
		onLoginPage.getEmail("Cypress@gmail");
		onLoginPage.getPassword("Test. "); // password less than 6 number and with include space
		onLoginPage.getSubmitLoginPage().click();
		onLoginPage
			.displayUsernameErrorMessage()
			.should("be.visible")
			.and("have.text", "Invalid email or phone number format");
		onLoginPage.displayPasswordErrorMessage().should("not.exist");
		onLoginPage.getEmailText().clear();
		onLoginPage.getPasswordText().clear();
	});
});
