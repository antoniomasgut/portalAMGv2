import { test, expect } from '@playwright/test';

test.describe('Connection: Landing to Admin', () => {
  test('should navigate from landing to login', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    
    // Verifiquem el text del Hero per assegurar que estem a la landing
    await expect(page.locator('h1')).toContainText('ORDRE TOTAL EN LA TEVA');

    // Cliquem al link de "Portal"
    await page.click('text=Portal');

    // Verifiquem que som a la pàgina de login
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('text=Accés de Seguretat')).toBeVisible();
  });

  test('should perform login and redirect to dashboard', async ({ page }) => {
    await page.goto('http://localhost:3001/login');

    // Omplim el formulari amb credencials reals del seed
    await page.fill('input[type="email"]', 'antonio@amg.com');
    await page.fill('input[type="password"]', 'admin123');

    // Cliquem a iniciar sessió
    await page.click('button:has-text("INICIAR SESSIÓ SEGURA")');

    // Verifiquem que ens redirigeix al dashboard de fluxos
    await expect(page).toHaveURL(/.*dashboard\/flows/);
    await expect(page.locator('h1')).toContainText('Gestió de Fluxos');
    
    // Verifiquem que apareix el flux clonat
    await expect(page.locator('h2')).toContainText('Sistema de Captació + Agenda');
  });
});
