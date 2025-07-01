import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly locators: { [key: string]: Locator };
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            cartTable: page.getByRole('table').first(), // Assuming the cart table is the first table on the page
            totalPrice: page.locator('.total-price'),
            checkoutButton: page.getByRole('link', { name: 'PROCEED TO CHECKOUT' }),
            continueShoppingButton: page.getByRole('button', { name: 'Continue Shopping' }),

            firsName : page.getByRole('textbox', { name: 'First Name *' }),
            lastName : page.getByRole('textbox', { name: 'Last Name *' }),
            address : page.getByRole('textbox', { name: 'Street address *' }),
            city : page.getByRole('textbox', { name: 'Town / City *' }),
            zipCode : page.getByRole('textbox', { name: 'ZIP Code *' }),
            phoneNumber : page.getByRole('textbox', { name: 'Phone *' }),
            
            placeorderButton : page.getByRole('button', { name: 'PLACE ORDER' }),

        };
    }

    async verifyCartItems() {
        await expect(this.locators.cartTable).toBeVisible();
        const itemCount = await this.locators.cartTable.count();
        expect(itemCount).toBeGreaterThan(0);
    }




    async verifyTotalPrice(expectedPrice: string) {
        await expect(this.locators.totalPrice).toHaveText(expectedPrice);
    }

    async proceedToCheckout() {
        await this.locators.checkoutButton.click();
    }

    async continueShopping() {
        await this.locators.continueShoppingButton.click();
    }

    async fillBillingDetails( 
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        state: string,
        zipCode: string,
        phoneNumber: string
    ) {
        await this.locators.firsName.fill(firstName);
        await this.locators.lastName.fill(lastName);
        await this.locators.address.fill(address);
        await this.locators.city.fill(city);
        // Assuming state is a dropdown, you might need to select it differently
        // await this.locators.state.selectOption(state);
        await this.locators.zipCode.fill(zipCode);
        await this.locators.phoneNumber.fill(phoneNumber);

    }

}
