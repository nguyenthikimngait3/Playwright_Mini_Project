import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

const PRODUCT = "Sauce Labs Backpack";

test.describe("Checkout Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
        await inventoryPage.addProductToCart(PRODUCT);
        await inventoryPage.goToCart();
        await cartPage.checkout();
    });

    test("should complete checkout with valid customer information", async ({ page }) => {
        logTitle("START TEST: should complete checkout with valid customer information");

        await checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
        await checkoutPage.continueCheckout();
        await checkoutPage.finishCheckout();

        await expect(page).toHaveURL(/checkout-complete/);

        logTitle("PASS: Checkout completed successfully");
    });

    test("should show error message when first name is empty", async () => {
        logTitle("START TEST: should show error message when first name is empty");

        await checkoutPage.fillCheckoutInformation("", "Doe", "12345");
        await checkoutPage.continueCheckout();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain("First Name is required");

        logTitle("PASS: Error message displayed for empty first name");
    });

    test("should show error message when last name is empty", async () => {
        logTitle("START TEST: should show error message when last name is empty");

        await checkoutPage.fillCheckoutInformation("John", "", "12345");
        await checkoutPage.continueCheckout();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain("Last Name is required");

        logTitle("PASS: Error message displayed for empty last name");
    });

    test("should show error message when postal code is empty", async () => {
        logTitle("START TEST: should show error message when postal code is empty");

        await checkoutPage.fillCheckoutInformation("John", "Doe", "");
        await checkoutPage.continueCheckout();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain("Postal Code is required");

        logTitle("PASS: Error message displayed for empty postal code");
    });
});