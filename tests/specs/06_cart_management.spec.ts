import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

const PRODUCT = "Sauce Labs Backpack";

test.describe("Cart Management Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
        await inventoryPage.addProductToCart(PRODUCT);
        await inventoryPage.goToCart();
    });

    test("should display added product in shopping cart", async () => {
        logTitle("START TEST: should display added product in shopping cart");

        await expect(cartPage.cartItems).toHaveCount(1);

        logTitle("PASS: Product displayed in cart correctly");
    });

    test("should remove product from shopping cart", async () => {
        logTitle("START TEST: should remove product from shopping cart");

        await cartPage.removeProduct(PRODUCT);

        await expect(cartPage.cartItems).toHaveCount(0);

        logTitle("PASS: Product removed from cart successfully");
    });

    test("should continue shopping when Continue Shopping button is clicked", async ({ page }) => {
        logTitle("START TEST: should continue shopping when Continue Shopping button is clicked");

        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory/);

        logTitle("PASS: Navigated back to inventory page successfully");
    });
});