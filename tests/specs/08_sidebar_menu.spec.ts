import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { MenuPage } from "../../pages/MenuPage";

test.describe("Sidebar Menu Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        menuPage = new MenuPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
    });

    test("should display sidebar menu when menu button is clicked", async () => {
        logTitle("START TEST: should display sidebar menu when menu button is clicked");

        await menuPage.openMenu();

        await expect(menuPage.sidebarMenu).toBeVisible();

        logTitle("PASS: Sidebar menu displayed successfully");
    });

    test("should hide sidebar menu when close button is clicked", async () => {
        logTitle("START TEST: should hide sidebar menu when close button is clicked");

        await menuPage.openMenu();
        await menuPage.closeMenu();

        await expect(menuPage.sidebarMenu).not.toBeVisible();

        logTitle("PASS: Sidebar menu hidden successfully");
    });

    test("should navigate to inventory page when All Items link is clicked", async ({ page }) => {
        logTitle("START TEST: should navigate to inventory page when All Items link is clicked");

        await menuPage.openMenu();
        await menuPage.goToAllItems();

        await expect(page).toHaveURL(/inventory/);

        logTitle("PASS: Navigated to inventory page successfully");
    });

    test("should navigate to About page when About link is clicked", async ({ page }) => {
        logTitle("START TEST: should navigate to About page when About link is clicked");

        await menuPage.openMenu();
        await menuPage.goToAbout();

        await expect(page).toHaveURL(/saucelabs\.com/);

        logTitle("PASS: Navigated to About page successfully");
    });
});