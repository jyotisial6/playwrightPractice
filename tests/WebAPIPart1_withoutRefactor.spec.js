
const { test, expect, request } = require('@playwright/test');
//const { APIUtils } = require('./utils/APIUtils');
const loginPayload = { userEmail: "jyoti.sial6@gmail.com", userPassword: "Momcat@123" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let token;
let orderId;
test.beforeAll(async () => {
    //logIn
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    console.log(token);
   

    //Order//
     
       // response.token = await this.getToken();
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
        const orderResponseJSON = await orderResponse.json()
        console.log(orderResponseJSON);
        const orderId = orderResponseJSON.orders[0];
        console.log(orderId);
   
        // response.orderId = orderId;
        // return response;


});


test('Client App Login', async ({ page }) => {
    // const apiUtils = new ApiUtils(apiContext, loginPayload);
    //const orderId = createOrder(orderPayLoad);

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
}

);

//https://rahulshettyacademy.com/angularpractice/ 