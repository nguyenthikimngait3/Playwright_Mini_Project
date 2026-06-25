// tests/specs/addToCart.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { logTitle, logStep } from "../../helpers/Logger";
import { config } from "../../config";

test.describe("Add To Cart Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    // HOOK CHUẨN: Tự động chạy trước mỗi test case để đăng nhập vào hệ thống
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
        await expect(inventoryPage.productHeader).toBeVisible();
    });

    /**
     * CASE 1: Thêm sp vào giỏ hàng và verify số sp hiển thị trên giỏ hàng
     */
    test("should update shopping cart badge when adding an item", async ({ page }) => {
        logTitle("START TEST: should update shopping cart badge when adding an item");

        const targetProduct = "Sauce Labs Backpack";

        // Thêm sản phẩm vào giỏ
        await inventoryPage.addProductToCart(targetProduct);

        // Kiểm tra xem Badge giỏ hàng có hiển thị số '1' hay không
        await expect(inventoryPage.shoppingCartBadge).toBeVisible();
        await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

        logStep("🎉 Add to cart verified successfully!");
    });
});