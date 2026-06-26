import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { MenuPage } from "../../pages/MenuPage";

const PRODUCT = "Sauce Labs Backpack";

test.describe("Reset App State Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        menuPage = new MenuPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
        await inventoryPage.addProductToCart(PRODUCT);
    });

    test("should remove all products from cart after resetting app state", async () => {
        logTitle("START TEST: should remove all products from cart after resetting app state");

        await menuPage.openMenu();
        await menuPage.resetAppState();
        await menuPage.closeMenu();

        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();

        logTitle("PASS: All products removed from cart after reset");
    });

    test("should reset inventory page to default state", async () => {
        logTitle("START TEST: should reset inventory page to default state");

        await menuPage.openMenu();
        await menuPage.resetAppState();
        await menuPage.closeMenu();

        await expect(inventoryPage.productNames).toHaveCount(6);

        logTitle("PASS: Inventory page reset to default state");
    });
});