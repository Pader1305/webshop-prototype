import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/de/login');
    await expect(page.getByRole('link', { name: 'basekorb' })).toBeVisible();
    await expect(page.locator('a').filter({ hasText: 'Ausgewählte SpracheDeutsch' })).toBeVisible();
    await expect(page.getByText('Registrieren|Anmelden')).toBeVisible();
    await page.locator('#email').click();
    await page.locator('#email').fill('p.kuipers@basecom.de');
    await page.locator('#password').click();
    await page.locator('#password').fill('qwertz123');
    await page.getByRole('button', { name: 'Einloggen' }).click();
});

/**
 * GIVEN der Nutzer ist eingeloggt und befindet sich auf der Startseite (Shop),
 * WHEN der Nutzer ein Produkt auswählt,
 *       die Menge auf 2 erhöht,
 *       es in den Warenkorb legt,
 *       den Warenkorb öffnet und auf „Kaufen“ klickt
 * THEN wird eine Erfolgsmeldung „Erfolgreich! Kauf abgeschlossen“ angezeigt
 */
test('successfully buy product', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Shop' })).toBeVisible();
    await expect(page.getByText('Abmelden')).toBeVisible();
    await expect(page.getByRole('link', { name: /^Dein Warenkorb/ })).toBeVisible();
    await page.getByText('Studentenfutter').click();
    await page.getByTestId('increaseAmount').click();
    await page.getByTestId('addToCartDesktop').click();
    await page.getByRole('link', { name: /^Dein Warenkorb/ }).click();
    await expect(page.getByRole('button', { name: 'Kaufen' })).toBeVisible();
    await page.getByRole('button', { name: 'Kaufen' }).click();
    await expect(page.getByText('Erfolgreich!Kauf abgeschlossen')).toBeVisible();
});

/**
 * GIVEN der Nutzer hat mindestens einen Artikel im Warenkorb
 * WHEN er ein Produkt auswählt, den Warenkorb öffnet und auf „Warenkorb leeren“ klickt
 * THEN wird der Warenkorb geleert und die Meldung „Keine Waren im Warenkorb“ angezeigt
 */
test('clear shopping cart', async ({ page }) => {
    await page.getByText('Studentenfutter').click();
    await page.getByTestId('addToCartDesktop').click();
    await page.getByRole('link', { name: /^Dein Warenkorb/ }).click();
    await expect(page.getByText('Warenkorb leeren')).toBeVisible();
    await page.getByText('Warenkorb leeren').click();
    await expect(page.getByText('Keine Waren im Warenkorb')).toBeVisible();
});

/**
 * GIVEN der Nutzer ist eingeloggt und hat genau ein Produkt im Warenkorb
 * WHEN er auf das Warenkorb-Icon klickt, den Warenkorb öffnet und auf das „Produkt entfernen“-Symbol klickt
 * THEN wird eine Erfolgsmeldung „Erfolgreich! Produkt aus dem Warenkorb entfernt“ angezeigt und der Warenkorb ist danach leer
 */
test('remove product from shopping cart', async ({ page }) => {
    await page.getByText('Studentenfutter').click();
    await page.getByTestId('addToCartDesktop').click();
    await page.getByRole('link', { name: /^Dein Warenkorb/ }).click();
    await expect(page.getByText('Warenkorb leeren')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^1$/ })).toBeVisible();
    await expect(page.getByTitle('Produkt entfernen').locator('path')).toBeVisible();
    await page.getByTitle('Produkt entfernen').locator('path').click();
    await expect(page.locator('div').filter({ hasText: 'Erfolgreich!Produkt aus' }).nth(3)).toBeVisible();
});
