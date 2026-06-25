import { test, expect } from "@playwright/test";

test.describe("Checkout Tests", () => {

    test.beforeEach(async ({ page }) => {

        // Login
        // Add product
        // Open cart
    });

    test("should complete checkout successfully", async () => {

        logTitle("START TEST: Complete checkout");

        await cartPage.checkout();

        await checkoutPage.fillCheckoutInformation(
            "John",
            "Doe",
            "700000"
        );

        await checkoutPage.continueCheckout();

        await checkoutPage.finishCheckout();

        await expect(
            checkoutPage.completeHeader
        ).toContainText("Thank you");

        logStep("✅ Checkout completed successfully");
    });

});