import { test, expect } from "@playwright/test";

test.describe("Reset App State Tests", () => {

    test.beforeEach(async ({ page }) => {

        // Login
        // Add product into cart
    });

    test("should clear cart after reset app state", async () => {

        logTitle("START TEST: Reset app state");

        await menuPage.resetAppState();

        await expect(
            inventoryPage.shoppingCartBadge
        ).not.toBeVisible();

        logStep("✅ App state reset successfully");
    });

});