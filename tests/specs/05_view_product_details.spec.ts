import { test, expect } from "@playwright/test";
import { logTitle } from "../../helpers/Logger";
import { config } from "../../config";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { ProductDetailPage } from "../../pages/ProductDetailPage";
import { CartPage } from "../../pages/CartPage";

const PRODUCT = "Sauce Labs Backpack";

test.describe("View Product Details Tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let productDetailPage: ProductDetailPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        productDetailPage = new ProductDetailPage(page);
        cartPage = new CartPage(page);
        await loginPage.goto("");
        await loginPage.loginToApplication(config.valid_username, config.valid_password);
    });

    test("should display product details when product title is clicked", async () => {
        logTitle("START TEST: should display product details when product title is clicked");

        await inventoryPage.clickProductTitle(PRODUCT);

        await expect(productDetailPage.productName).toBeVisible();
        await expect(productDetailPage.productName).toHaveText(PRODUCT);
        await expect(productDetailPage.productPrice).toBeVisible();

        logTitle("PASS: Product details displayed correctly");
    });

    test("should navigate back to inventory page when Back To Products button is clicked", async ({ page }) => {
        logTitle("START TEST: should navigate back to inventory page when Back To Products button is clicked");

        await inventoryPage.clickProductTitle(PRODUCT);
        await productDetailPage.backToProducts();

        await expect(page).toHaveURL(/inventory/);

        logTitle("PASS: Navigated back to inventory page successfully");
    });

    test("should add product to cart from product details page", async () => {
        logTitle("START TEST: should add product to cart from product details page");

        await inventoryPage.clickProductTitle(PRODUCT);
        await productDetailPage.addProductToCart();
        await inventoryPage.goToCart();

        await expect(cartPage.cartItems).toHaveCount(1);

        logTitle("PASS: Product added to cart from product details page");
    });
});