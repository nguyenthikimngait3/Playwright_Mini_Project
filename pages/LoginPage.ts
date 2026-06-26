// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    // selectors
    private usernameInput = this.page.locator("input[data-test='username']");
    private passwordInput = this.page.locator("input[data-test='password']");
    private loginButton = this.page.locator("input[data-test='login-button']");
    private errorMessage = this.page.locator("h3[data-test='error']");

    constructor(page: Page) {
        super(page);
    }

    // Method to perform login action
    async loginToApplication(username: string, password: string) {
        await this.inputText(this.usernameInput, username, 'Username');
        await this.inputText(this.passwordInput, password, 'Password');
        await this.clickElement(this.loginButton, 'Login Button');
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.innerText();
    }
}
