import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { logTitle, logStep } from "../../helpers/Logger";
import { InventoryPage } from "../../pages/InventoryPage";
import { ProductDetailPage } from "../../pages/ProductDetailPage";
import { config } from "../../config";

test.describe("Product Detail Tests", () => {

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let productDetailPage: ProductDetailPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        productDetailPage = new ProductDetailPage(page);

        await loginPage.goto("");
        await loginPage.loginToApplication(
            config.valid_username,
            config.valid_password
        );
    });

    test("should navigate to product detail page", async () => {

        logTitle("START TEST: Navigate to product detail page");

        // Click sản phẩm
        await inventoryPage.clickProductTitle(
            "Sauce Labs Backpack"
        );

        // Kiểm tra tên sản phẩm hiển thị
        await expect(
            productDetailPage.productTitle
        ).toContainText("Sauce Labs Backpack");

        logStep("✅ Product detail page displayed");
    });

});