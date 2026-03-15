const { test, expect } = require('@playwright/test');

class LandingPage {

    constructor(page) {
        this.page = page;
        this.roomType = 'Double';
        this.landingPageTitle = page.locator(".display-4");
        this.availableRooms = page.locator(".container div[class$='col-md-6 col-lg-4']")
    }
    async firstPage(page) {
        await this.page.goto("https://automationintesting.online/");
        await this.page.waitForLoadState('networkidle');
        console.log(await this.page.title());
        await expect(this.page).toHaveTitle("Restful-booker-platform demo");
        await expect(this.landingPageTitle).toHaveText("Welcome to Shady Meadows B&B");
        const welcomepage = await this.landingPageTitle.textContent();
        console.log(welcomepage);
    }
    //Room Double booking
    async roomBooking(page) {
        await this.availableRooms.filter({ hasText: "Double" });
        await this.availableRooms.first().waitFor();
        console.log(await this.availableRooms.nth(0).textContent());
        const allRooms = await this.availableRooms.allTextContents();
        console.log(allRooms);
        //Assertions
        const listOfRooms = this.page.locator(".room-card");
        const count = await listOfRooms.count();
        for (let i = 0; i < count; ++i) {
            if (await listOfRooms.nth(i).locator("h5").textContent() === this.roomType) {
                await listOfRooms.nth(i).locator("[href*='/reservation']").click();
                break;
            }
        }
        //BookNow
        await this.page.locator("h1").first().waitFor();
        const bool = await this.page.locator(".card-body h2:has-text('Book This Room')").isVisible();
        expect(bool).toBeTruthy();
    }




}
module.exports = { LandingPage };