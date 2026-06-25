import { test, expect } from "@playwright/test";

test.describe("Cart Tests", () => {

    test.beforeEach(async ({ page }) => {

        // Login
        // Add product
    });

    test("should display product in cart", async () => {

        logTitle("START TEST: Verify product in cart");

        // Mở cart
        await inventoryPage.shoppingCartLink.click();

        // Kiểm tra số lượng item
        await expect(
            cartPage.cartItems
        ).toHaveCount(1);

        logStep("✅ Product displayed in cart");
    });

    test("should remove product from cart", async () => {

        logTitle("START TEST: Remove product from cart");

        await cartPage.removeProduct(
            "Sauce Labs Backpack"
        );

        await expect(
            cartPage.cartItems
        ).toHaveCount(0);

        logStep("✅ Product removed successfully");
    });

});