import {test, expect, Page, Locator} from '@playwright/test';

export class CommonActions {

    static async checkPageTitle(page: Page, expectedTitle: string | RegExp) {
        await expect(page).toHaveTitle(expectedTitle);
    }

    static  async checkGridDisplay(page: Page, element : Locator) {  
        await expect(element).toBeVisible();
        const gridCount = await element.count();
        expect(gridCount).toBeGreaterThan(0);

    }

    static  async checkListDisplay(page: Page, element : Locator) {   
        await expect(element).toBeVisible();
        const listCount = await element.count();
        expect(listCount).toBeGreaterThan(0);

    }

    static async switchView (page: Page, viewType: 'grid' | 'list', homePage: any) {
        if (viewType === 'grid') {
            await page.waitForLoadState('networkidle');
            await expect(homePage.locators.switchGrid).toBeVisible({ timeout: 10000 }); // Ensure switchGrid is visible before clicking
            await homePage.locators.switchGrid.click();
            await expect(homePage.locators.grid).toBeVisible({ timeout: 10000 }); // Wait for grid view
        } else if (viewType === 'list') {
            await page.waitForLoadState('networkidle');
            await expect(homePage.locators.switchList).toBeVisible({ timeout: 15000 }); // Ensure switchList is visible before clicking
            await homePage.locators.switchList.hover();
            await homePage.locators.switchList.click();
            await expect(homePage.locators.list).toBeVisible({ timeout: 10000 }); // Wait for list view
        } else {
            throw new Error('Invalid view type specified. Use "grid" or "list".');
        }
    }

    static async clickRandomItems(page: Page , element: Locator) { 
        const addCartCount = await element.count();
        if (addCartCount > 0) {
            const randomIndex = Math.floor(Math.random() * addCartCount);
            const randomItem = element.nth(randomIndex);
            await randomItem.click();
        } else {
            console.log("No items available to add to cart.");
        }
    }
    
}
