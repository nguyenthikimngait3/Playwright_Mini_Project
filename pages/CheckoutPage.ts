// pages/CheckoutPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class CheckoutPage extends BasePage {
    private firstNameInput = this.page.locator("#first-name");
    private lastNameInput = this.page.locator("#last-name");
    private postalCodeInput = this.page.locator("#postal-code");
    private continueButton = this.page.locator("#continue");
    private finishButton = this.page.locator("#finish");
    private cancelButton = this.page.locator("#cancel");
    private errorMessage = this.page.locator("[data-test='error']");

    constructor(page: Page) {
        super(page);
    }

    async getErrorMessage() {
        return await this.errorMessage.innerText();
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        logStep("Filling checkout information");
        await this.inputText(this.firstNameInput, firstName, "First Name");
        await this.inputText(this.lastNameInput, lastName, "Last Name");
        await this.inputText(this.postalCodeInput, postalCode, "Postal Code");
    }

    async continueCheckout() {
        logStep("Continuing checkout");
        await this.clickElement(this.continueButton, "Continue Button");
    }

    async finishCheckout() {
        logStep("Finishing checkout");
        await this.clickElement(this.finishButton, "Finish Button");
    }

    async cancelCheckout() {
        logStep("Cancelling checkout");
        await this.clickElement(this.cancelButton, "Cancel Button");
    }
}