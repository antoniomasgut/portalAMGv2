# Roadmap Definitiu: Portal AMG - Producció Professional

Aquest document defineix el camí per assolir la producció robusta. Qualsevol implementació s'haurà de realitzar mitjançant **micro-desplegaments** atòmics, validant la compilació (build) i els tipus (TSC) abans i després de cada pas.

---

## 1. Fase de Blindatge: Tipus i Build
Objectiu: Tenir un projecte TypeScript impecable on `npm run build` passi al 100%.

- [ ] **Configuració de Tipus Express:**
    - Crear `backend/src/types/express.d.ts` per declarar l'interfície `AuthenticatedRequest`.
    - Refactoritzar `auth.middleware.ts` per injectar el tipus `AuthenticatedRequest`.
    - Actualitzar tots els controladors (`auth`, `automation`, `client`, etc.) per fer servir el tipus `AuthenticatedRequest` en lloc de `Request` estàndard.
- [ ] **Neteja de dependències:**
    - Eliminar imports duplicats a `backend/src/index.ts`.
    - Corregir imports de `requireAuth` i `requireRole` a totes les rutes.
- [ ] **Sincronització de Prisma:**
    - Verificar que el `schema.prisma` té tots els models (`BillingProviderConfig`, `FlowTemplate`, etc.).
    - Executar `npx prisma generate` i `npx prisma migrate dev` fins que l'estat sigui verd.

---

## 2. Fase de Facturació i Serveis
Objectiu: Automatització total de la facturació externa (Holded/VeriFactu).

- [ ] **Integració Holded:**
    - Implementar la crida real a l'API de Holded des de `HoldedService` usant credencials encriptades.
    - Validar l'èxit de la factura en el flux d'activació de fases (`FlowService`).
- [ ] **Gestió de Factures Admin:**
    - Assegurar que la vista `/admin/invoices` té un enllaç al PDF generat pel `InvoiceGeneratorService`.

---

## 3. Fase d'Automatització i Onboarding (n8n)
Objectiu: Autonomia completa del sistema.

- [ ] **Webhooks d'Onboarding:**
    - Configurar n8n per disparar automàticament el webhook a `/api/onboarding/webhook` amb el `stepName`.
    - Assegurar que `OnboardingService` avança l'estat correctament en rebre el payload.

---

## 4. Fase d'Operacions i Estabilitat (Ops)
Objectiu: Visibilitat total en producció.

- [ ] **Sentry/Logging Proactiu:**
    - Finalitzar la integració del `AlertService` (Telegram).
    - Configurar una alerta de prova per verificar que l'Error 500 arriba al teu dispositiu mòbil.
- [ ] **Backup/Restore Automàtic:**
    - Finalitzar l'script de `restore-db.sh`.
    - Testejar la restauració en un entorn de proves per verificar la integritat de les dades.

---

## Protocol de Treball (Mandat per a Gemini CLI)

Per evitar build errors, seguir sempre aquest procediment:

1. **Abans de tocar un fitxer:** `npx tsc --noEmit` per assegurar que partim de "Verd".
2. **Micro-canvi:** Aplicar només una petita lògica.
3. **Validació:** Executar `npm run build` o `npx tsc --noEmit` només per a aquest fitxer.
4. **Commit:** Si el build passa, `git commit`. Si no passa, **REVERT immediat**.

*Data: 2026-05-08*
