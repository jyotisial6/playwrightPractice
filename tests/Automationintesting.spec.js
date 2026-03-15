const { test, expect } = require('@playwright/test');


test("Automate Shady Meadows B&B page", async ({ page }) => {


    const roomType = 'Double';
    const date = "15";


    //Laning Page
    await page.goto("https://automationintesting.online/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Restful-booker-platform demo");
    await expect(page.locator(".display-4")).toHaveText("Welcome to Shady Meadows B&B");
    const welcomepage = await page.locator(".display-4").textContent();
    console.log(welcomepage);
    //Fromate and ToDate
    await page.getByRole('textbox').first().click();
    await page.locator(".booking-card > div input").first().click
    await page.getByRole('gridcell', { name: date }).click();
    await page.getByRole('textbox').nth(1).click();
    await page.locator(".booking-card > div input").first().click
    await page.getByRole('gridcell', { name: date }).click();
    //Check room Available   
    await page.locator(".mt-4 [ type*='button']").click();
    //Assertions
    await page.getByRole('heading', { name: 'Our Rooms' });
    const rooms = await page.locator(".container h2").nth(0).textContent();
    console.log(rooms);
    await page.getByRole('heading', { name: 'Our Location' });
    const locations = await page.locator(".container h2").nth(1).textContent();
    console.log(locations);
    //Room Double booking
    await page.locator(".container div[class$='col-md-6 col-lg-4']").filter({ hasText: "Double" })
    await page.locator(".container div[class$='col-md-6 col-lg-4']").first().waitFor();
    console.log(await page.locator(".container div[class$='col-md-6 col-lg-4']").nth(0).textContent());
    const allRooms = await page.locator(".container div[class$='col-md-6 col-lg-4']").allTextContents();
    console.log(allRooms);
    //Assertions
    const listOfRooms = page.locator(".room-card");
    const count = await listOfRooms.count();
    for (let i = 0; i < count; ++i) {
        if (await listOfRooms.nth(i).locator("h5").textContent() === roomType) {
            await listOfRooms.nth(i).locator("[href*='/reservation']").click();
            break;
        }
    }
    //BookNow
    await page.waitForLoadState('networkidle');
    await page.locator("h1").first().waitFor();
    const bool = await page.locator(".card-body h2:has-text('Book This Room')").isVisible();
    expect(bool).toBeTruthy();
    //Reservation
    await page.locator("[id='doReservation']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("h2").first().waitFor();
    const bool1 = await page.locator(".mb-4 h2:has-text('Room Description')").isVisible();
    expect(bool1).toBeTruthy();


    await page.getByPlaceholder("Firstname").fill("Jyoti");
    await page.getByLabel("Lastname").fill("Sial");
    await page.locator("[name='email']").fill("jyoti.sial6@gmail.com");

    //One validation or negative scenario
    await page.getByPlaceholder("Phone").fill("7594423492");
    await page.locator(".btn-primary").click();
    await expect(page.locator(".alert li")).toContainText('size must be between 11 and 21');
    await page.getByPlaceholder("Phone").fill("");
    await page.getByPlaceholder("Phone").fill("07594423492");
    await page.waitForLoadState('networkidle');
    await page.pause();
    await page.locator(".btn-primary").click();
    
    //Booking Confirmed
    await page.waitForLoadState('networkidle');
    await page.locator("h2").first().waitFor();
    const bool2 = await page.locator(".card-body h2:has-text('Booking Confirmed')").isVisible();
    expect(bool2).toBeTruthy();


})