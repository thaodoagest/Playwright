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
        await this.locators.allDepartmentsLink.click();
        await this.locators.allDepartmentsLink.hover();
        const box = await this.locators.allDepartmentsLink
                                        .boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 50);
        } else {
            throw new Error('Bounding box for allDepartmentsLink not found.');
        }
        const department = this.page.getByRole('link', { name: new RegExp(departmentName, 'i') }).first();
        // Wait up to 10s for the element to appear, but don't throw if not found
        const exists = await department.isVisible({ timeout: 10000 }).catch(() => false);

        if (exists) {
            await department.click();
        } else {
            // Handle the case when the department link does not exist
            await this.locators.allDepartmentsLink.click();
            await department.click();
        }
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

    

}

