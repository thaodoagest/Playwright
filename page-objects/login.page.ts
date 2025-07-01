import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly locators: { [key: string]: Locator };

    constructor(page: Page) {
        this.locators = {
            loginLink: page.getByRole('link', { name: 'Log in / Sign up' }),
            usernameInput: page.locator('input[name="username"]'),
            passwordInput: page.locator('input[name="password"]'),
            loginButton: page.getByRole('button', { name: 'Log In' })
        };
    }

    async logIn(page : Page, username: string, pass:string) {
        await this.locators.loginLink.click();
        await this.locators.usernameInput.fill(username);
        await this.locators.passwordInput.fill(pass);
        await this.locators.loginButton.click();
}

}


