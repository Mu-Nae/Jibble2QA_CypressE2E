export class LoginPage {
	getLoginPageUrl() {
		cy.visit("/login");
		cy.url().should("include", "/login");
	}

	getRedirectLoginPageUrl() {
		cy.visit(
			"https://app.test.jibble.io/login?ReturnUrl=https%3A%2F%2Fidentity.test.jibble.io%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dspa.client%26redirect_uri%3Dhttps%253A%252F%252Fapp.test.jibble.io%252Flogin%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520api1%2520email%2520phone%26state%3D242aef9566584000bd786e63d4db4b56%26code_challenge%3DCicoInU3r10ddbsjGssIVaKsOVZjNukTIj_UuixLYvE%26code_challenge_method%3DS256%26response_mode%3Dquery"
		);
		cy.url().should("include", "/login");
	}

	getEmail(email) {
		return cy.get('[data-testid="emailOrPhone"]').type(email);
	}

	getEmailText() {
		return cy.get('[data-testid="emailOrPhone"]');
	}

	getPassword(password) {
		return cy.get('[data-testid="password"]').type(password);
	}

	getPasswordText() {
		return cy.get("#input-65");
	}

	clickEyeButton() {
		cy.get(".v-input__append-inner > .v-icon > .v-icon__component");
	}

	getSubmitLoginPage() {
		return cy.get('[data-testid="login-button"]');
	}

	displayUsernameErrorMessage() {
		return cy.get(
			".v-input.mb-5 > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message"
		);
	}

	displayPasswordErrorMessage() {
		return cy.get(
			'[data-testid="password"] > .v-input > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message'
		);
	}
}

export const onLoginPage = new LoginPage();
