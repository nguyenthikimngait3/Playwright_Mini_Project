// pages/InventoryPage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class InventoryPage extends BasePage {
    readonly productHeader: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productSortDropdown: Locator;
    logName: string | null = null;

    constructor(page: Page) {
        super(page);
        this.productHeader = this.page.locator("span.title");
        this.shoppingCartLink = this.page.locator("a.shopping_cart_link");
        this.shoppingCartBadge = this.page.locator("span.shopping_cart_badge");
        this.productSortDropdown = this.page.locator("select[data-test='product-sort-container']");
    }

    setLog(logName: string): InventoryPage {
        this.logName = logName;
        return this;
    }

    // Hàm lấy nút Add to Cart dựa theo tên sản phẩm
    getProductAddToCartButton(productName: string): Locator {
        const kebabName = productName.toLowerCase().replace(/ /g, "-");
        return this.page.locator(`button[data-test='add-to-cart-${kebabName}']`);
    }

    // Hàm lấy nút Remove dựa theo tên sản phẩm
    getProductRemoveButton(productName: string): Locator {
        const kebabName = productName.toLowerCase().replace(/ /g, "-");
        return this.page.locator(`button[data-test='remove-${kebabName}']`);
    }

    // Hàm lấy link tiêu đề sản phẩm để click vào xem chi tiết
    getProductTitleLink(productName: string): Locator {
        return this.page.locator(`div.inventory_item_name`, { hasText: productName });
    }

    // Thêm sản phẩm vào giỏ
    async addProductToCart(productName: string) {
        logStep(`🛒 Adding product to cart: ${productName}`);
        await this.clickElement(this.getProductAddToCartButton(productName), `Add to cart button for ${productName}`);
    }

    // Xóa sản phẩm từ giỏ
    async removeProductFromCart() {
        logStep(`🗑️ Removing product from cart: ${this.logName}`);
        await this.clickElement(this.getProductRemoveButton(this.logName ?? ''), `Remove button for ${this.logName}`);
    }

    // Click sản phẩm
    async clickProductTitle(productName: string) {
        logStep(`🔗 Clicking on product title: ${productName}`);
        await this.clickElement(this.getProductTitleLink(productName), `Title link of ${productName}`);
    }

    // Sort sản phẩm
    async sortProducts(optionValue: string) {
        logStep(`🔍 Sorting products by option: ${optionValue}`);
        await this.productSortDropdown.selectOption(optionValue);
    }
}