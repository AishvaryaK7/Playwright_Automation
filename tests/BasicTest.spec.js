const {test, expect} = require('@playwright/test');

test('browserlaunch',async ({browser})=>
{
    const context = await browser.newContext(); //Fresh Instance of browser(browser window)
    const page = await context.newPage();       //Fresh Page in browser(base page)
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle("Google");
});

test('pagelaunch',async ({page})=>
{
    await page.goto("https://the-internet.herokuapp.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("The Internet");
});

test('locatorsValidation', async({page})=>
{
    await page.goto("https://the-internet.herokuapp.com/");
    await expect(page).toHaveTitle("The Internet");
    console.log(await page.title());

    await page.locator("[href*='checkboxes']").click();
    //await page.getByText('Checkboxes').click();

    await page.getByRole('checkbox').first().check();
    await page.getByRole('checkbox').last().uncheck();

    console.log(await page.getByRole('checkbox').last().isChecked());
    expect(await page.getByRole('checkbox').last().isChecked()).toBeFalsy();

    //await page.pause();

});

test("hiddenElements",async({page})=>
{
    await page.goto("https://the-internet.herokuapp.com/");

    await page.locator("a[href='/disappearing_elements']").click();
    await page.locator("a[href='/about/']").click();
    await page.goBack();
    await page.reload();
    await expect(page.locator("a[href='/gallery/']")).toBeVisible();
    await page.reload();
    await page.locator("a[href='/gallery/']").click();
    await page.goBack();
    await page.reload();
    await expect(page.locator("a[href='/gallery/']")).toBeHidden();

});

test("dialogHandle",async({page})=>
{
    await page.goto("https://the-internet.herokuapp.com/");

    await page.locator("a[href='/entry_ad']").click();
    page.on('dialog',dialog => dialog.accept());

});

test.only("frameHandle",async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
        const framePage = page.frameLocator("#courses-iframe");
        await framePage.locator("li a[href*='lifetime-access']:visible").click();
    });