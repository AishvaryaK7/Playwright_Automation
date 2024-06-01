const {Before, After, AfterStep, Status, BeforeStep} = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const {PageObjectManager} = require('../../pageObjects/PageObjectManager');
const {chromium} = require('playwright');

Before({timeout: 100*1000},async function()
{
    const browser = await chromium.launch({ headless : false});
    //const browser = await playwright.chromium.launch({ headless : false});
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.pomanager = new PageObjectManager(this.page);

});

BeforeStep(function(){
    console.log("Before Step");
})

AfterStep(async function({result})
{
    console.log("After Step");
    if (result.status === Status.FAILED){
        await this.page.screenshot({path: 'screenshot.png'});
    }

})

After(function()
{
    console.log("Execution done");

});