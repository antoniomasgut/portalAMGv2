# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/leads.spec.ts >> Lead Capture Flow >> should submit a lead request from the landing page
- Location: tests/leads.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Solicitud de Demo')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Solicitud de Demo')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e7]: A
          - generic [ref=e8]: AMG
        - navigation [ref=e9]:
          - link "Sistema" [ref=e10] [cursor=pointer]:
            - /url: "#sistema"
          - link "Resultats" [ref=e11] [cursor=pointer]:
            - /url: "#resultats"
          - link "Formació" [ref=e12] [cursor=pointer]:
            - /url: "#formacio"
        - generic [ref=e13]:
          - link "Portal" [ref=e14] [cursor=pointer]:
            - /url: /login
          - button "SOL·LICITAR DEMO" [active] [ref=e15]:
            - img [ref=e16]
            - text: SOL·LICITAR DEMO
    - generic [ref=e19]:
      - generic [ref=e20]:
        - img [ref=e21]
        - generic [ref=e24]: Sistema de Gestió Professional v2.0
      - heading "ORDRE TOTAL EN LA TEVA GESTIÓ DIGITAL." [level=1] [ref=e25]:
        - text: ORDRE TOTAL EN LA TEVA
        - text: GESTIÓ DIGITAL.
      - paragraph [ref=e26]: Converteix el caos de les teves comunicacions en un motor de negoci organitzat. Sense tecnicismes, sense complicacions.
      - generic [ref=e27]:
        - button "AGENDAR DEMO DE FUNCIONAMENT" [ref=e28]:
          - img [ref=e29]
          - text: AGENDAR DEMO DE FUNCIONAMENT
        - generic [ref=e31]: REUNIÓ DE 15 MINUTS · SENSE COMPROMÍS
    - generic [ref=e34]:
      - heading "EL TEU NEGOCI ET CONTROLA A TU?" [level=2] [ref=e35]
      - generic [ref=e36]:
        - generic [ref=e37]:
          - img [ref=e39]
          - paragraph [ref=e41]: Clients que t'escriuen i esperen hores (o dies) per una resposta.
        - generic [ref=e42]:
          - img [ref=e44]
          - paragraph [ref=e46]: Consultes que no són urgents i t'interrompen la feina constantment.
        - generic [ref=e47]:
          - img [ref=e49]
          - paragraph [ref=e51]: El caos de gestionar l'agenda a base de trucades i missatges perduts.
        - generic [ref=e52]:
          - img [ref=e54]
          - paragraph [ref=e56]: Oportunitats de negoci que es refreden per falta de seguiment.
    - generic [ref=e58]:
      - generic [ref=e59]:
        - heading "EL TEU NOU SISTEMA DE GESTIÓ" [level=2] [ref=e60]
        - paragraph [ref=e61]: Resultats tangibles des del primer dia
      - generic [ref=e62]:
        - generic [ref=e63]:
          - heading "Resposta immediata" [level=3] [ref=e64]
          - paragraph [ref=e65]: Els teus clients senten que els atens a l'instant, generant confiança absoluta.
        - generic [ref=e66]:
          - heading "Classificació intel·ligent" [level=3] [ref=e67]
          - paragraph [ref=e68]: Separem el soroll de les urgències. Sabem què és una venda i què és una consulta.
        - generic [ref=e69]:
          - heading "Agenda automatitzada" [level=3] [ref=e70]
          - paragraph [ref=e71]: El client tria el seu espai segons la teva disponibilitat real. Sense trucades.
        - generic [ref=e72]:
          - heading "Seguiment infallible" [level=3] [ref=e73]
          - paragraph [ref=e74]: El sistema recorda cada compromís. Res es perd, res s'oblida. Mai més.
    - generic [ref=e77]:
      - heading "ESTÀS A UN PAS DE L'ORDRE TOTAL" [level=2] [ref=e78]:
        - text: ESTÀS A UN PAS DE
        - text: L'ORDRE TOTAL
      - button "ACTIVAR EL MEU SISTEMA" [ref=e79]:
        - img [ref=e80]
        - text: ACTIVAR EL MEU SISTEMA
      - generic [ref=e82]: Implementació en 48 hores · Suport personalitzat
    - contentinfo [ref=e83]: AMG Enginyeria Digital · 2026 · EL SISTEMA QUE ORGANITZA EL TEU NEGOCI
  - button "Open Next.js Dev Tools" [ref=e93] [cursor=pointer]:
    - img [ref=e94]
  - alert [ref=e97]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Lead Capture Flow', () => {
  4  |   test('should submit a lead request from the landing page', async ({ page }) => {
  5  |     await page.goto('http://localhost:3001/');
  6  |     
  7  |     // Debug: Take screenshot
  8  |     await page.screenshot({ path: 'test-results/debug-landing.png' });
  9  | 
  10 |     // Cliquem al botó de Solicitar Demo
  11 |     await page.click('text=SOL·LICITAR DEMO');
  12 | 
  13 |     // Esperem un moment
  14 |     await page.waitForTimeout(500);
  15 |     await page.screenshot({ path: 'test-results/debug-modal.png' });
  16 | 
  17 |     // Verifiquem que el modal és visible
> 18 |     await expect(page.getByText('Solicitud de Demo')).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  19 | 
  20 |     // Omplim les dades
  21 |     await page.fill('input[placeholder="Antonio Mas"]', 'Lead Test');
  22 |     await page.fill('input[placeholder="antonio@empresa.com"]', 'lead@test.com');
  23 |     await page.fill('input[placeholder="Enginyeria Digital"]', 'Test Company');
  24 | 
  25 |     // Enviem
  26 |     await page.click('button:has-text("SOL·LICITAR ACCÉS")');
  27 | 
  28 |     // Verifiquem l'èxit
  29 |     await expect(page.locator('text=Rebut correctament')).toBeVisible();
  30 |   });
  31 | });
  32 | 
```