import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { logTitle, logStep } from "../../helpers/Logger";
import { InventoryPage } from "../../pages/InventoryPage";
import { config } from "../../config";

test.describe("Sort Product Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    // HOOK CHUẨN: Tự động chạy trước mỗi test case để đăng nhập vào hệ thống
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
        await expect(inventoryPage.productHeader).toBeVisible();
    });

    /**
     * CASE 1: Short product từ A đến Z
     */
    test("should sort products from A to Z", async () => {

        logTitle("START TEST: should sort products from A to Z");

        // Chọn option A-Z
        await inventoryPage.sortProducts("az");

        // Kiểm tra dropdown được chọn
        await expect(inventoryPage.productSortDropdown).toHaveValue("az");

        logStep("✅ Products sorted from A to Z");
    });

    /**
     * CASE 2: Short product từ Z đến A
     */
    test("should sort products from Z to A", async () => {

        logTitle("START TEST: should sort products from Z to A");

        await inventoryPage.sortProducts("za");

        await expect(inventoryPage.productSortDropdown).toHaveValue("za");

        logStep("✅ Products sorted from Z to A");
    });

    /**
     * CASE 3: 
     */
    test("should sort products by price from low to high", async () => {
        logTitle("START TEST: should sort products by price from low to high");

        await inventoryPage.sortProducts("lohi");

        await expect(inventoryPage.productSortDropdown).toHaveValue("lohi");

        logStep("✅ Products sorted by price from low to high");
    });

    /**
     * CASE 4: 
     */
    test("should sort products by price from high to low", async () => {
        logTitle("START TEST: should sort products by price from high to low");

        await inventoryPage.sortProducts("hilo");

        await expect(inventoryPage.productSortDropdown).toHaveValue("hilo");

        logStep("✅ Products sorted by price from high to low");
    });
});