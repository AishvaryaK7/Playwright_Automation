const {Given, When, Then} = require('@cucumber/cucumber');
const {test, expect} = require('@playwright/test');
const {PageObjectManager} = require('../../pageObjects/PageObjectManager');
const playwright = require('@playwright/test');
const {chromium} = require('playwright');

Given('Login to Ecommerce application with {string} and {string}',{timeout: 100*1000}, async function (username, password) 
{
    //const browser = await chromium.launch({ headless : false});
    //const browser = await firefox.launch();
    //const context = await browser.newContext();
    //const page = await context.newPage();

    //this.pomanager = new PageObjectManager(page);
    const loginPage = this.pomanager.getLoginPageObject();
    await loginPage.landingPage();
    await loginPage.validLogin(username,password);
});

When('Add {string} to cart', async function (product) 
{
    const dashboardPage = this.pomanager.getDashboardPageObject();
    await dashboardPage.searchProduct(product);
    await dashboardPage.navigateToCart();

});

Then('Verify {string} is displayed in the cart', async function (chk_Product) 
{
    const cartPage = this.pomanager.getCartPageObject();
    await cartPage.VerifyProduct(chk_Product);
    await cartPage.Checkout();

});

Given('Login to Rahul Shetty Academy with {string} and {string}', {timeout: 100*1000}, async function (username, password) 
{
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);

});

When('Sign In button is Clicked', async function () 
{
await this.page.locator('#signInBtn').click();
});

Then('Verify Error message is displayed', async function () 
{
console.log(await this.page.locator("[style*='block']").textContent());
await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});