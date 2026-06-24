// tests/specs/removeProduct.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { logTitle, logStep } from "../../helpers/Logger";
import { config } from "../../config";

test.describe("Remove Product Tests", () => {
    let inventoryPage: InventoryPage;

    // HOOK CHUẨN: Đăng nhập và chuẩn bị sẵn 1 sản phẩm trong giỏ hàng trước khi chạy test xóa
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
        
        // Pre-condition: Add sẵn sản phẩm vào giỏ hàng
        await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    });

    test("should decrease or hide cart badge when product is removed", async ({ page }) => {
        logTitle("START TEST: should decrease or hide cart badge when product is removed");

        const targetProduct = "Sauce Labs Bike Light";

        // Thực hiện xóa sản phẩm
        await inventoryPage.removeProductFromCart(targetProduct);

        // Kiểm tra xem Badge giỏ hàng đã bị ẩn đi (số lượng về 0) hay chưa
        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();

        logStep("🎉 Product removal verified successfully!");
        await page.waitForTimeout(1000);
    });
});