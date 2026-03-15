import { test } from '@playwright/test';

test('Login and store authentication', async ({ page }) => {

    await page.goto('https://example.com/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    // Wait for successful login
    await page.waitForURL('https://example.com/dashboard');
    // Save authentication state
    await page.context().storageState({ path: 'auth.json' });

});

test.use({ storageState: 'auth.json' });
test('Access dashboard without login', async ({ page }) => {
    await page.goto('https://example.com/dashboard');
    await page.click('text=Profile');

});


async function globalSetup() {

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.context().storageState({ path: 'auth.json' });
    await browser.close();
}
export default globalSetup;



// export default defineConfig({
//   globalSetup: './global-setup.js',

//   use: {
//     storageState: 'auth.json'
//   }
// });