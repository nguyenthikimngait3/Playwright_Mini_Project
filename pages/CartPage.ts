import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class CartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    getCartItem(productName: string): Locator {
        return this.page.locator(`.cart_item:has-text("${productName}")`);
    }

    getRemoveButton(productName: string): Locator {
        return this.page.locator( `.cart_item:has-text("${productName}") button`);
    }

    getCheckoutButton(): Locator {
        return this.page.locator("#checkout");
    }

    getContinueShoppingButton(): Locator {
        return this.page.locator("#continue-shopping");
    }

    async removeProduct(productName: string) {
        logStep(`🗑️ Removing product: ${productName}`);
        await this.clickElement(this.getRemoveButton(productName),`Remove button of ${productName}` );
    }

    async checkout() {
        logStep("💳 Navigating to checkout");
        await this.clickElement(this.getCheckoutButton(),"Checkout Button");
    }

    async continueShopping() {
        logStep("🛍️ Continue shopping");
        await this.clickElement(this.getContinueShoppingButton(),"Continue Shopping Button");
    }
}