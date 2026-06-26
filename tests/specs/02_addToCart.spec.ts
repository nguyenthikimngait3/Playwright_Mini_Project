import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

const PRODUCT = "Sauce Labs Backpack";

test.describe("Add Product To Cart Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
    });

    test("should add product to shopping cart", async () => {
        logTitle("START TEST: should add product to shopping cart");

        await inventoryPage.addProductToCart(PRODUCT);

        await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

        logTitle("PASS: Product added to cart successfully");
    });
});