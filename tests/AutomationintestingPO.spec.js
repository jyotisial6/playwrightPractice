const { test, expect } = require('@playwright/test');
const { title } = require('node:process');
const { LandingPage } = require('../pageobjects/LandingPage');
const { RoomBooks } = require('../pageobjects/RoomBooks');
const { ReservationDetails } = require('../pageobjects/ReservationDetails');

test("Automate Shady Meadows B&B page", async ({ page }) => {
    const roomType = 'Double';
    const date = "15";
    const landingPage = new LandingPage(page);
    const roomBooks = new RoomBooks(page);
    const reservationDetails = new ReservationDetails(page);
    //Landing Page*********
    landingPage.firstPage();
    //Fromate and ToDate
    //Help taken from ChatGPT AI
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
    //Room Double booking*********
    landingPage.roomBooking();
    //Reservation*********
    roomBooks.bookRoom();
    //reserve Now******
    reservationDetails.reservationOfRoom();
   //Booking Confirmed
    await page.waitForLoadState('networkidle');
    await page.locator("h2").first().waitFor();
    const bool2 = await page.locator(".card-body h2:has-text('Booking Confirmed')").isVisible();
    expect(bool2).toBeTruthy();


})