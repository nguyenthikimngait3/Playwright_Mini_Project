import { test, expect } from "@playwright/test";

test.describe("Menu Tests", () => {

    test("should open side menu", async () => {

        logTitle("START TEST: Open side menu");

        await menuPage.openMenu();

        await expect(
            menuPage.logoutLink
        ).toBeVisible();

        logStep("✅ Menu opened successfully");
    });

    test("should close side menu", async () => {

        logTitle("START TEST: Close side menu");

        await menuPage.openMenu();

        await menuPage.closeMenu();

        await expect(
            menuPage.closeMenuButton
        ).not.toBeVisible();

        logStep("✅ Menu closed successfully");
    });

});