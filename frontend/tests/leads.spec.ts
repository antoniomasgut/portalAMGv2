import { test, expect } from '@playwright/test';

test.describe('Lead Capture Flow', () => {
  test('should submit a lead request from the landing page', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    
    // Debug: Take screenshot
    await page.screenshot({ path: 'test-results/debug-landing.png' });

    // Cliquem al botó de Solicitar Demo
    await page.click('text=SOL·LICITAR DEMO');

    // Esperem un moment
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/debug-modal.png' });

    // Verifiquem que el modal és visible
    await expect(page.getByText('Solicitud de Demo')).toBeVisible();

    // Omplim les dades
    await page.fill('input[placeholder="Antonio Mas"]', 'Lead Test');
    await page.fill('input[placeholder="antonio@empresa.com"]', 'lead@test.com');
    await page.fill('input[placeholder="Enginyeria Digital"]', 'Test Company');

    // Enviem
    await page.click('button:has-text("SOL·LICITAR ACCÉS")');

    // Verifiquem l'èxit
    await expect(page.locator('text=Rebut correctament')).toBeVisible();
  });
});
