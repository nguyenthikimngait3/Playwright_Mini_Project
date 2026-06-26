// pages/MenuPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class MenuPage extends BasePage {
    private menuButton = this.page.locator("#react-burger-menu-btn");
    private closeMenuButton = this.page.locator("#react-burger-cross-btn");
    private logoutLink = this.page.locator("#logout_sidebar_link");
    private resetAppStateLink = this.page.locator("#reset_sidebar_link");
    private allItemsLink = this.page.locator("#inventory_sidebar_link");
    private aboutLink = this.page.locator("#about_sidebar_link");
    readonly sidebarMenu = this.page.locator(".bm-menu-wrap");

    constructor(page: Page) {
        super(page);
    }

    async openMenu() {
        logStep("Opening menu");
        await this.clickElement(this.menuButton, "Menu Button");
    }

    async closeMenu() {
        logStep("Closing menu");
        await this.clickElement(this.closeMenuButton, "Close Menu Button");
    }

    async logout() {
        logStep("Logout");
        await this.clickElement(this.logoutLink, "Logout Link");
    }

    async resetAppState() {
        logStep("Resetting app state");
        await this.clickElement(this.resetAppStateLink, "Reset App State Link");
    }

    async goToAllItems() {
        logStep("Navigating to All Items");
        await this.clickElement(this.allItemsLink, "All Items Link");
    }

    async goToAbout() {
        logStep("Navigating to About page");
        await this.clickElement(this.aboutLink, "About Link");
    }
}