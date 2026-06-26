// tests/specs/01_login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { logTitle, logStep } from "../../helpers/Logger";
import { config } from "../../config"; // <--- Kết nối trực tiếp từ đây
import loginData from "../data/loginData.json";

test.describe("Login Page Tests", () => {
    let loginPage: LoginPage;

    // HOOK CHUẨN: Mở trang trống "" để Playwright tự nạp baseURL lấy từ config
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto(""); 
    });

    /**
     * CASE 1: Đăng nhập thành công (Valid Credentials)
     */
    test("should login successfully with valid credentials", async ({ page }) => {
        logTitle("START TEST: should login successfully with valid credentials");
        
        const inventoryPage = new InventoryPage(page);

        // Lấy sạch từ config (.env)
        await loginPage.loginToApplication(config.valid_username, config.valid_password);

        await expect(inventoryPage.productHeader).toBeVisible();
        await expect(inventoryPage.productHeader).toHaveText("Products");

        logStep("Pass: Login successful with secure credentials!");
    });

    /**
     * CASE 2: Đăng nhập với tài khoản bị KHÓA (Locked Out User)
     */
    test("should show error message for locked out user", async ({ page }) => {
        logTitle("START TEST: should show error message for locked out user");

        // Lấy tài khoản bị khóa từ config (.env)
        await loginPage.loginToApplication(config.locked_username, config.locked_password);

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(loginData.ERROR_LOCKED);

        logStep("Pass: Locked out behavior verified securely.");
    });

    /**
     * CASE 3: Đăng nhập với tài khoản nhập SAI (Wrong Credentials)
     */
    test("should show error message when username or password is incorrect", async ({ page }) => {
        logTitle("START TEST: should show error message when username or password is incorrect");

        // Lấy tài khoản nhập sai từ config (.env)
        await loginPage.loginToApplication(config.wrong_username, config.wrong_password);

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.ERROR_WRONG);

        logStep("Pass: Wrong credentials behavior verified securely.");
    });
});