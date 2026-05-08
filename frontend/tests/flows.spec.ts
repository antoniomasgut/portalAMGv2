import { test, expect } from '@playwright/test';

test.describe('Flows Dashboard', () => {
  test('should render the flows page correctly', async ({ page }) => {
    // Naveguem a la pàgina de fluxos
    await page.goto('http://localhost:3001/dashboard/flows');

    // Verifiquem el títol principal
    const title = page.locator('h1');
    await expect(title).toContainText('Gestió de Fluxos');

    // Verifiquem que hi ha almenys un flux card
    const flowCard = page.locator('h2');
    await expect(flowCard).toContainText('Sistema de Captació + Agenda');

    // Verifiquem que la Fase 1 està ACTIVE
    const activeBadge = page.locator('text=ACTIVE').first();
    await expect(activeBadge).toBeVisible();

    // Verifiquem que la Fase 2 està PENDING
    const pendingBadge = page.locator('text=PENDING').first();
    await expect(pendingBadge).toBeVisible();
    
    // Verifiquem l'estètica (background color aproximat)
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(13, 13, 26)'); // #0d0d1a
  });
});
