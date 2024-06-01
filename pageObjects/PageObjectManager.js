const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');

class PageObjectManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPageObject()
    {
        return this.loginPage;
    }

    getDashboardPageObject()
    {
        return this.dashboardPage;
    }

    getCartPageObject()
    {
        return this.cartPage;
    }

}
module.exports = {PageObjectManager};