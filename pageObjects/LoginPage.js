class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    }

    async landingPage()
    {
        
        await this.page.goto("https://rahulshettyacademy.com/client/");
        
    }

    async validLogin(username, passwd)
    {
        await this.userName.fill(username);
        await this.password.fill(passwd);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = {LoginPage};