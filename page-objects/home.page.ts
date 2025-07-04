import { Page,Locator,expect } from "@playwright/test";


export class HomePage {
    readonly locators: { [key: string]: Locator };
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            homeLink: page.getByRole('link', { name: 'Home' }),
            myAccountLink: page.getByRole('link', { name: 'My Account' }),
            cartLink: page.locator('a[href$="/cart/"]').first(), // fallback for cart linkss
            searchInput: page.locator('input[name="s"]'),
            searchButton: page.getByRole('button', { name: 'Search' }),

            allDepartmentsLink: page.locator('.secondary-title'),
            grid : page.locator('[class*="products-grid"]'),
            list : page.locator('[class*="products-list"]'),
            switchList : page.locator('.switch-list'),
            switchGrid : page.locator('.switch-grid'),
            
            addtoCart : page.getByText('Add to cart') 
            
        };
    }

    async navigateToHome(page: Page) {
        await this.locators.homeLink.click();
        await expect(page).toHaveURL(/.*\/home/);
    }

    async selectDepartment(departmentName: string) {
        await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
        await expect(this.locators.allDepartmentsLink).toBeVisible({ timeout: 10000 }); // Ensure the allDepartmentsLink is visible
        await this.locators.allDepartmentsLink.hover();
        await this.locators.allDepartmentsLink.hover();
        const department = this.page.getByRole('link', { name: new RegExp(departmentName, 'i') }).first();
        await expect(department).toBeVisible({ timeout: 10000 }); // Ensure the department link is visible
        await department.click();
    }

    async gotoCart() {
        await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
        await this.locators.cartLink.click();
        
    }

    async switchView (page: Page, viewType: 'grid' | 'list', homePage: any) {
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

    async addtoCart(page: Page, itemName: string) {
        const item = this.page.getByRole('link', { name: new RegExp(itemName, 'i') }).first();
        await expect(item).toBeVisible({ timeout: 10000 });
        await item.getByText('Add to cart').first().click();
        //await expect(this.locators.addtoCart).toBeVisible({ timeout: 10000 });
        //await this.locators.addtoCart.click();
    }

    

}

