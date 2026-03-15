const { test, expect } = require('@playwright/test');

class ReservationDetails {

    constructor(page) {
        this.page = page;
        this.reservation = page.locator("[id='doReservation']");
        this.roomDescriptin = page.locator(".mb-4 h2:has-text('Room Description')");
        this.firstName = page.getByPlaceholder("Firstname");
        this.lastName = page.getByPlaceholder("Lastname");
        this.email = page.locator("[name='email']");
        this.phone = page.getByPlaceholder("Phone");
        this.reserveNow = page.locator(".btn-primary");
    }

    async reservationOfRoom(page) {

        await this.firstName.fill("Jyoti");
        await this.lastName.fill("Sial");
        await this.email.fill("jyoti.sial6@gmail.com");
        // validation or negative scenario
        await this.phone.fill("7594423492");
        await this.reserveNow.click();
        await expect(page.locator(".alert li")).toContainText('size must be between 11 and 21');
        await this.phone.fill("");
        await this.phone.fill("07594423492");
        await page.waitForLoadState('networkidle');
        await page.pause();
        await this.reserveNow.click();

    }


}
module.exports = { ReservationDetails };