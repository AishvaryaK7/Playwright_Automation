const {test, expect} = require('@playwright/test');
//const { LoginPage } = require('../pageObjects/LoginPage');
//const {DashboardPage} = require('../pageObjects/DashboardPage');
const {PageObjectManager} = require('../pageObjects/PageObjectManager');
//Json file to JSON string - JSON Object
const dataSet = JSON.parse(JSON.stringify(require('../utils/TestData.json')));

for(const data of dataSet)
{
test(`LoginPageObject ${data.productname}`, async({page}) =>
{
    // const username = "anshika@gmail.com";
    // const passwd = "Iamking@000";
    // const productname = "ADIDAS ORIGINAL"

    //const login = new LoginPage(page);
    //const dashboard = new DashboardPage(page);

    const pomanager = new PageObjectManager(page);
    const loginPage = pomanager.getLoginPageObject();
    const dashboardPage = pomanager.getDashboardPageObject();

    await loginPage.landingPage();
    await loginPage.validLogin(data.username,data.passwd);

    await dashboardPage.searchProduct(data.productname);
    await dashboardPage.navigateToCart();
   
})
}