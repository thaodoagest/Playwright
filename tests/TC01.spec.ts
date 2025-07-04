import {test, expect, Page} from '@playwright/test';
import {CONFIG, variables} from 'tests/config';
import {CommonActions} from 'tests/common-actions';
import {LoginPage} from 'page-objects/login.page';
import {HomePage} from 'page-objects/home.page';
import { CartPage } from 'page-objects/cart.page';
// Importing product data from JSON file
import product from 'data/product.json';


test("TC01 - User can buy items", async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    
    await page.goto(CONFIG.BASE_URL);
    await loginPage.logIn(page, CONFIG.CREDENTIALS.USERNAME, CONFIG.CREDENTIALS.PASSWORD);
    await CommonActions.checkPageTitle(page, variables.myaccHeader);

    await homePage.selectDepartment("Electronic Components & Supplies");
    
    await homePage.switchView(page, 'list', homePage);
    await CommonActions.checkListDisplay(page, homePage.locators.list);
    
    //await CommonActions.clickRandomItems(page, homePage.locators.addtoCart);
   
    const randomProduct = await CommonActions.getRandomProduct("ElectronicComponentsAndSupplies", 'data/product.json');
    await homePage.addtoCart(page, randomProduct);
    await homePage.gotoCart();
    await cartPage.locators.checkoutButton.click();
    await CommonActions.checkPageTitle(page, /Checkout/);
   
    await cartPage.fillBillingDetails(
        CONFIG.CREDENTIALS.FIRST_NAME,
        CONFIG.CREDENTIALS.LAST_NAME,
        CONFIG.CREDENTIALS.ADDRESS,
        CONFIG.CREDENTIALS.CITY,
        CONFIG.CREDENTIALS.STATE,
        CONFIG.CREDENTIALS.ZIP_CODE,
        CONFIG.CREDENTIALS.PHONE_NUMBER
    )
    await cartPage.locators.placeorderButton.click({force: true});
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.woocommerce-order')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.woocommerce-order').first()).toContainText('Thank you. Your order has been received.');
    
});

 