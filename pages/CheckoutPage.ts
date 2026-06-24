import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class CheckoutPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    getFirstNameInput(): Locator {
        return this.page.locator("#first-name");
    }

    getLastNameInput(): Locator {
        return this.page.locator("#last-name");
    }

    getPostalCodeInput(): Locator {
        return this.page.locator("#postal-code");
    }

    getContinueButton(): Locator {
        return this.page.locator("#continue");
    }

    getFinishButton(): Locator {
        return this.page.locator("#finish");
    }

    getCancelButton(): Locator {
        return this.page.locator("#cancel");
    }

    async fillCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        logStep("📝 Filling checkout information");

        await this.inputText(
            this.getFirstNameInput(),
            firstName,
            "First Name"
        );

        await this.inputText(
            this.getLastNameInput(),
            lastName,
            "Last Name"
        );

        await this.inputText(
            this.getPostalCodeInput(),
            postalCode,
            "Postal Code"
        );
    }

    async continueCheckout() {
        logStep("➡️ Continue checkout");

        await this.clickElement(
            this.getContinueButton(),
            "Continue Button"
        );
    }

    async finishCheckout() {
        logStep("✅ Finish checkout");

        await this.clickElement(
            this.getFinishButton(),
            "Finish Button"
        );
    }

    async cancelCheckout() {
        logStep("❌ Cancel checkout");

        await this.clickElement(
            this.getCancelButton(),
            "Cancel Button"
        );
    }
}