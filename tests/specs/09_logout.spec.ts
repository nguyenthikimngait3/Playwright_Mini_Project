import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { MenuPage } from "../../pages/MenuPage";

test.describe("Logout Tests", () => {
    let loginPage: LoginPage;
    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        menuPage = new MenuPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
    });

    test("should redirect user to login page after logout", async ({ page }) => {
        logTitle("START TEST: should redirect user to login page after logout");

        await menuPage.openMenu();
        await menuPage.logout();

        await expect(page).toHaveURL(/$/);

        logTitle("PASS: User redirected to login page after logout");
    });
});