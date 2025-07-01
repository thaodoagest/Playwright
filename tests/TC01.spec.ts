import {test, expect} from '@playwright/test';
import {CONFIG, variables} from 'tests/config';
import {CommonActions} from 'tests/common-actions';
import {LoginPage} from 'page-objects/login.page';
import {HomePage} from 'page-objects/home.page';
import { CartPage } from 'page-objects/cart.page';


test("TC01 - User can buy items", async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    
    await page.goto(CONFIG.BASE_URL);
    //await CommonActions.checkPageTitle(page, variables.loginPageTitle);
    await loginPage.logIn(page, CONFIG.CREDENTIALS.USERNAME, CONFIG.CREDENTIALS.PASSWORD);
    await CommonActions.checkPageTitle(page, variables.myaccHeader);

    await homePage.selectDepartment("Electronic Components & Supplies");
    //await CommonActions.checkPageTitle(page, variables.electronicComponentsHeader);
    //await CommonActions.switchView(page, 'grid', homePage);
    //await CommonActions.checkGridDisplay(page, homePage.locators.grid);

    await CommonActions.switchView(page, 'list', homePage);
    //await CommonActions.checkListDisplay(page, homePage.locators.list);
    
    await CommonActions.clickRandomItems(page, homePage.locators.addtoCart);

    await homePage.gotoCart();

    //await cartPage.verifyCartItems();
    
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
    await page.waitForLoadState('networkidle'); // Ensure the page is fully loaded after placing the order
    //await CommonActions.checkPageTitle(page, /Order Confirmation/);
    await expect(page.locator('.woocommerce-order')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.woocommerce-order').first()).toContainText('Thank you. Your order has been received.');
    
});

 