// pages/ProductDetailPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class ProductDetailPage extends BasePage {
    private addToCartButton = this.page.locator("button[id*='add-to-cart']");
    private removeButton = this.page.locator("button[id*='remove']");
    private backToProductsButton = this.page.locator("#back-to-products");
    readonly productName = this.page.locator(".inventory_details_name");
    readonly productPrice = this.page.locator(".inventory_details_price");

    constructor(page: Page) {
        super(page);
    }

    async addProductToCart() {
        logStep("Adding product to cart");
        await this.clickElement(this.addToCartButton, "Add To Cart Button");
    }

    async removeProductFromCart() {
        logStep("Removing product from cart");
        await this.clickElement(this.removeButton, "Remove Button");
    }

    async backToProducts() {
        logStep("Back to products");
        await this.clickElement(this.backToProductsButton, "Back To Products Button");
    }
}