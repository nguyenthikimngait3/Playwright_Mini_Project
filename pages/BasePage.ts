// pages/BasePage.ts
import { Page, Locator } from "@playwright/test";
import { logStep } from "../helpers/Logger";
import UIHelpers from "../helpers/UIHelpers";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // goto
    async goto(url: string) {
        console.log(`Navigating to ${url}`);
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // getTitle
    async getTitle() {
        console.log(`Getting title`);
        return this.page.title();
    }

    // click element
    async clickElement(locator: Locator, elementName: string) {
        logStep(`Clicking element: ${elementName}`);
        await UIHelpers.waitForVisible(locator, elementName);
        await locator.click();
    }

    // input text
    async inputText(locator: Locator, text: string, elementName: string) {
        logStep(`Inputting ${text} into element: ${elementName}`);
        await UIHelpers.waitForVisible(locator, elementName);
        await locator.fill(text);
    }

    // Select dropdown option
    static async selectDropdown(locator: Locator, value: string, elementName: string) {
        logStep(`Selecting ${value} from ${elementName}`);
        await locator.selectOption(value);
    }

    // Get all texts
    static async getAllTexts(locator: Locator, elementName: string) {
        logStep(`Getting all texts from ${elementName}`);
        return await locator.allTextContents();
    }

    // Get total element count
    static async getCount(locator: Locator, elementName: string) {
        logStep(`Getting element count of ${elementName}`);
        return await locator.count();
    }
}