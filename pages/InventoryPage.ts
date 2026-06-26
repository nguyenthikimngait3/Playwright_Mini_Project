// pages/InventoryPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class InventoryPage extends BasePage {
    readonly productHeader = this.page.locator("span.title");
    private shoppingCartLink = this.page.locator("a.shopping_cart_link");
    readonly shoppingCartBadge = this.page.locator("span.shopping_cart_badge");
    private productSortDropdown = this.page.locator("select[data-test='product-sort-container']");
    readonly productNames = this.page.locator(".inventory_item_name");

    constructor(page: Page) {
        super(page);
    }

    // Hàm lấy nút Add to Cart dựa theo tên sản phẩm
    getProductAddToCartButton(productName: string) {
        const kebabName = productName.toLowerCase().replace(/ /g, "-");
        return this.page.locator(`button[data-test='add-to-cart-${kebabName}']`);
    }

    // Hàm lấy nút Remove dựa theo tên sản phẩm
    getProductRemoveButton(productName: string) {
        const kebabName = productName.toLowerCase().replace(/ /g, "-");
        return this.page.locator(`button[data-test='remove-${kebabName}']`);
    }

    // Hàm lấy link tiêu đề sản phẩm để click vào xem chi tiết
    getProductTitleLink(productName: string) {
        return this.page.locator(`div.inventory_item_name`, { hasText: productName });
    }

    async goToCart() {
        logStep("Navigating to cart");
        await this.clickElement(this.shoppingCartLink, "Shopping Cart Link");
    }

    async sortProducts(value: string) {
        logStep(`Sorting products by: ${value}`);
        await BasePage.selectDropdown(this.productSortDropdown, value, "Product Sort Dropdown");
    }

    // Thêm sản phẩm vào giỏ
    async addProductToCart(productName: string) {
        logStep(`Adding product to cart: ${productName}`);
        await this.clickElement(this.getProductAddToCartButton(productName), `Add to cart button for ${productName}`);
    }

    // Xóa sản phẩm từ giỏ
    async removeProductFromCart(productName: string) {
        logStep(`Removing product from cart: ${productName}`);
        await this.clickElement(this.getProductRemoveButton(productName), `Remove button for ${productName}`);
    }

    // Click sản phẩm
    async clickProductTitle(productName: string) {
        logStep(`Clicking on product title: ${productName}`);
        await this.clickElement(this.getProductTitleLink(productName), `Product title: ${productName}`);
    }
}