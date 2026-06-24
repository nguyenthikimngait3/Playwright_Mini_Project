// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.locator("input[data-test='username']");
        this.passwordInput = this.page.locator("input[data-test='password']");
        this.loginButton = this.page.locator("input[data-test='login-button']");
        this.errorMessage = this.page.locator("h3[data-test='error']");
    }

    async loginToApplication(username: string, password: string) {
        await this.inputText(this.usernameInput, username, "Username");
        await this.inputText(this.passwordInput, password, "Password");
        await this.clickElement(this.loginButton, "Login Button");
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.innerText();
    }
}