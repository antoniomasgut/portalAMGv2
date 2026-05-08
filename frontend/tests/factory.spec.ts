import { test, expect } from '@playwright/test';

test.describe('Content Factory Hub', () => {
  test.beforeEach(async ({ page }) => {
    // Fem login primer
    await page.goto('http://localhost:3001/login');
    await page.fill('input[type="email"]', 'antonio@amg.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("INICIAR SESSIÓ SEGURA")');
    await expect(page).toHaveURL(/.*dashboard\/flows/);
  });

  test('should render the factory hub catalog', async ({ page }) => {
    // Naveguem a la Content Factory
    await page.click('text=Content Factory');
    await expect(page).toHaveURL(/.*dashboard\/factory/);

    // Esperem que desaparegui el loading
    await expect(page.locator('text=Sincronitzant Content Factory...')).not.toBeVisible();

    // Verifiquem el títol
    await expect(page.locator('h1')).toContainText('Catàleg de Productes Digitalitzats');

    // Verifiquem que hi ha almenys un onboarding template (del seed)
    await expect(page.locator('h3')).toContainText('Sistema de Captació + Agenda');

    // Verifiquem que les tabs funcionen
    await page.click('text=Fases · llibreria');
    // Verifiquem que apareix una fase (Intake)
    await expect(page.locator('text=Intake')).toBeVisible();
  });
});
