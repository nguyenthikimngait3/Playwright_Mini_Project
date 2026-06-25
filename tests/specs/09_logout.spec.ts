import { test, expect } from "@playwright/test";

test.describe("Logout Tests", () => {

    test("should logout successfully", async ({ page }) => {

        logTitle("START TEST: Logout");

        await menuPage.logout();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/"
        );

        logStep("✅ Logout successful");
    });

});