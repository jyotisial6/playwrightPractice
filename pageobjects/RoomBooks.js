const { test, expect } = require('@playwright/test');

class RoomBooks {

    constructor(page) {
        this.page = page;
        this.reservation = page.locator("[id='doReservation']");
        this.roomDescriptin = page.locator(".mb-4 h2:has-text('Room Description')");

    }

    async bookRoom(page) {
        await this.reservation.click();
        await page.waitForLoadState('networkidle');
        await page.locator("h2").first().waitFor();
        const bool1 = await this.roomDescriptin.isVisible();
        expect(bool1).toBeTruthy();
    }


}

module.exports = { RoomBooks };