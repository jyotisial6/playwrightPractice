
const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('Browser Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
    console.log(await page.title());

});
test('Page Playwright test', async ({ page }) => {

    const userName = page.locator("[id='username']");
    const signIn = page.locator("[id='signInBtn']");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get tittle- assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    //css , xpath
    await page.locator("[id='username']").fill('rashettyacademy_');
    await page.locator("[id='password']").fill('Learning@830$3mK2');
    await page.locator("[id='signInBtn']").click();
    //wait untill it show
    await page.locator("[style*='block']");
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('username/password.');

    await userName.fill("");
    await userName.fill('rahulshettyacademy');
    await page.locator("[id='signInBtn']").click();
    await page.locator(".card-body a");
    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").last().textContent());
    await cardTitles.allTextContents;
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);




});

test('lOGIN PAGE UI BASICS', async ({ page }) => {
    const userName = page.locator("[id='username']");
    const signIn = page.locator("[id='signInBtn']");
    const cardTitles = page.locator(".card-body a");
    const password = page.locator("[id='password']");
    const dropdown = page.locator("select.form-control");
    const radiobtn = page.locator(".radiotextsty");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await dropdown.selectOption("consult");
    await radiobtn.last().click();
    await page.locator("#okayBtn").click();
    console.log(await radiobtn.last().isChecked());
    await expect(radiobtn.last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
   
    await signIn.click();

});

test('Child Windows Page', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("[id='username']");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),//listen for new page
        documentLink.click(),//new page is opened
    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);


    await page.locator("#username").fill(domain);
   
    await userName.fill(domain);
     
    console.log(await userName.textContent());
    console.log(await userName.inputValue());
    //page.locator("")

})