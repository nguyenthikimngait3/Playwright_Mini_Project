import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

const PRODUCT = "Sauce Labs Backpack";

test.describe("Remove Product From Cart Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
        await inventoryPage.addProductToCart(PRODUCT);
    });

    test("should remove product from shopping cart", async () => {
        logTitle("START TEST: should remove product from shopping cart");

        await inventoryPage.removeProductFromCart(PRODUCT);

        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();

        logTitle("PASS: Product removed from cart successfully");
    });
});