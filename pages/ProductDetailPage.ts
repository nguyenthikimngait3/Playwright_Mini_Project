import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class ProductDetailPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    getAddToCartButton(): Locator {
        return this.page.locator("button[id*='add-to-cart']");
    }

    getRemoveButton(): Locator {
        return this.page.locator("button[id*='remove']");
    }

    getBackToProductsButton(): Locator {
        return this.page.locator("#back-to-products");
    }

    async addProductToCart() {
        logStep("🛒 Adding product to cart");
        await this.clickElement(this.getAddToCartButton(),"Add To Cart Button");
    }

    async removeProductFromCart() {
        logStep("🗑️ Removing product from cart");
        await this.clickElement(this.getRemoveButton(),"Remove Button");
    }

    async backToProducts() {
        logStep("🔙 Back to products");
        await this.clickElement(this.getBackToProductsButton(),"Back To Products Button");
    }
}