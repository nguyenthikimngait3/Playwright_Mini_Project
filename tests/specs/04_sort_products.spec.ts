import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { BasePage } from "../../pages/BasePage";

test.describe("Sort Products Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
    });

    test("should sort products by name from A to Z", async () => {
        logTitle("START TEST: should sort products by name from A to Z");

        await inventoryPage.sortProducts("az");

        const names = await BasePage.getAllTexts(inventoryPage.productNames, "Product Names");
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);

        logTitle("PASS: Products sorted A to Z correctly");
    });

    test("should sort products by name from Z to A", async () => {
        logTitle("START TEST: should sort products by name from Z to A");

        await inventoryPage.sortProducts("za");

        const names = await BasePage.getAllTexts(inventoryPage.productNames, "Product Names");
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);

        logTitle("PASS: Products sorted Z to A correctly");
    });

    test("should sort products by price from low to high", async ({ page }) => {
        logTitle("START TEST: should sort products by price from low to high");

        await inventoryPage.sortProducts("lohi");

        const prices = await page.locator(".inventory_item_price").allTextContents();
        const nums = prices.map(p => parseFloat(p.replace("$", "")));
        const sorted = [...nums].sort((a, b) => a - b);
        expect(nums).toEqual(sorted);

        logTitle("PASS: Products sorted low to high correctly");
    });

    test("should sort products by price from high to low", async ({ page }) => {
        logTitle("START TEST: should sort products by price from high to low");

        await inventoryPage.sortProducts("hilo");

        const prices = await page.locator(".inventory_item_price").allTextContents();
        const nums = prices.map(p => parseFloat(p.replace("$", "")));
        const sorted = [...nums].sort((a, b) => b - a);
        expect(nums).toEqual(sorted);

        logTitle("PASS: Products sorted high to low correctly");
    });
});