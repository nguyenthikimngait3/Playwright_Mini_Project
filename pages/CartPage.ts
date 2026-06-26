// pages/CartPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";
export class CartPage extends BasePage {
    private checkoutButton = this.page.locator("#checkout");
    private continueShoppingButton = this.page.locator("#continue-shopping");
    readonly cartItems = this.page.locator(".cart_item");

    constructor(page: Page) {
        super(page);
    }

    private cartItem(productName: string) {
        return this.page.locator(`.cart_item:has-text("${productName}")`);
    }

    getRemoveButton(productName: string) {
        return this.cartItem(productName).locator("button");
    }

    async removeProduct(productName: string) {
        logStep(`Removing product: ${productName}`);
        await this.clickElement(this.getRemoveButton(productName), `Remove button of ${productName}`);
    }

    async checkout() {
        logStep("Navigating to checkout");
        await this.clickElement(this.checkoutButton, "Checkout Button");
    }

    async continueShopping() {
        logStep("Continue shopping");
        await this.clickElement(this.continueShoppingButton, "Continue Shopping Button");
    }
}