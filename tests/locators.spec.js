const {test, expect} = require("@playwright/test");

test("inputField", async({page})=> 
{
    const cardTitles = page.locator(".card-body a");
    
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("rahulshettyacademy");

    await page.locator('#password').fill("student");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();

    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.last().textContent());
    //console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.waitFor().allTextContents();
    console.log(allTitles);
});

test("optionfields", async({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("[value='user']").click();
    await page.locator("#okayBtn").click();
    await page.locator(".radiotextsty").first().click(); //Radio buttons can be selected in this way too

    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("teach");
  
    await page.pause();
});

test('checkboxField', async({page})=>
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

test("blinkingText",async({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const doc_link = page.locator("a[href*='documents-request']");
    await expect(doc_link).toHaveAttribute("class","blinkingText");

});

test("childWindow", async({browser}) =>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const doc_link = page.locator("a[href*='documents-request']");

    //[childPage] - sometimes more than one page opens so we need to give array
    const [childPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listen for new page is opened - pending, rejected, fulfilled
            await doc_link.click(), // new page is opened   
        ]
    )
   
    const text = await childPage.locator('.red').textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(text);
    console.log(arrayText);
    console.log(domain);

    //To go back to Parent Window
    await page.locator('#username').fill(domain);
    await page.pause();

});

test("dropdownField", async({page}) =>
{
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator("#dropdown").selectOption("Option 1");
});

test.only("specialLocators", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();

    await page.getByPlaceholder("Password").fill("abc123");

    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByRole("link", {name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
});