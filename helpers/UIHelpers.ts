// helpers/UIHelpers.ts
import { expect, Locator } from "@playwright/test";
import { logStep } from "./Logger";

export default class UIHelpers {
    
     //Wait until element is visible.
    static async waitForVisible(locator: Locator, elementName: string, timeout = 5000) {
        logStep(`👀 Waiting for ${elementName} to be visible...`);
        await expect(locator).toBeVisible({ timeout });
        logStep(`✅  ${elementName} is visible.`);
    }
    
    //Is Element Disabled
    static async isElementDisabled(locator: Locator, elementName: string): Promise<boolean> {
        logStep(`Checking if ${elementName} is disabled...`);
        const isDisabled = await locator.isDisabled();
        logStep(`${elementName} is ${isDisabled ? 'disabled' : 'enabled'}.`);
        return isDisabled;
    }
   
    //waiting for element has an attribute
    static async waitForAttribute(locator: Locator, attribute: string, value: string, elementName: string, timeout = 5000) {
        logStep(`👀 Waiting for ${elementName} to have attribute "${attribute}" with value "${value}"...`);
        await expect(locator).toHaveAttribute(attribute, value, { timeout });
        logStep(`✅  ${elementName} has attribute "${attribute}" with value "${value}".`);
    }

    //Viet them
    // Wait until element is hidden
    static async waitForHidden(locator: Locator, elementName: string, timeout = 5000) {
        logStep(`👀 Waiting for ${elementName} to be hidden...`);
        await expect(locator).toBeHidden({ timeout });
        logStep(`✅ ${elementName} is hidden.`);
    }  
}