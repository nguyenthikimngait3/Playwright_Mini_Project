import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logStep } from "../helpers/Logger";

export class MenuPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    getMenuButton(): Locator {
        return this.page.locator("#react-burger-menu-btn");
    }

    getCloseMenuButton(): Locator {
        return this.page.locator("#react-burger-cross-btn");
    }

    getLogoutLink(): Locator {
        return this.page.locator("#logout_sidebar_link");
    }

    getResetAppStateLink(): Locator {
        return this.page.locator("#reset_sidebar_link");
    }

    async openMenu() {
        logStep("📂 Opening menu");

        await this.clickElement(
            this.getMenuButton(),
            "Menu Button"
        );
    }

    async closeMenu() {
        logStep("❌ Closing menu");

        await this.clickElement(
            this.getCloseMenuButton(),
            "Close Menu Button"
        );
    }

    async logout() {
        logStep("🚪 Logout");

        await this.openMenu();

        await this.clickElement(
            this.getLogoutLink(),
            "Logout Link"
        );
    }

    async resetAppState() {
        logStep("🔄 Reset App State");

        await this.openMenu();

        await this.clickElement(
            this.getResetAppStateLink(),
            "Reset App State Link"
        );
    }
}