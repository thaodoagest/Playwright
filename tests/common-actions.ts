import {test, expect, Page, Locator} from '@playwright/test';
//import products from 'data/product.json';
import * as fs from 'fs';


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

   static async getRandomProduct(nameDepartment: string, filePath: string): Promise<any> {
        
        const importdata = await import(`../${filePath}`) // Adjust the path as necessary;
        const r = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(r);
        const items = jsonData[nameDepartment];
        const randomIndex = Math.floor(Math.random() * items.length);
        //return items[randomIndex];
        return jsonData[nameDepartment][randomIndex].name; // Return the name of the random product
    }
    
}
