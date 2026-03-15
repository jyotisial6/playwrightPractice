
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const loginPayload = { userEmail: "jyoti.sial6@gmail.com", userPassword: "Momcat@123" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let response;

test.beforeAll(async () => {
    //logIn
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);


});



test('Client App Login', async ({ page }) => 
    {
   // const apiUtils = new ApiUtils(apiContext, loginPayload);
    //const orderId = createOrder(orderPayLoad);

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, response.token);


    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {

        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
}

);

//https://rahulshettyacademy.com/angularpractice/ 