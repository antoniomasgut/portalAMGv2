# GEMINI.md

Aquest fitxer proporciona les directives i convencions per a Gemini CLI quan treballa en aquest repositori.

## El Projecte: Portal Multi-Client (AMG Enginyeria Digital)

SaaS multi-tenant basat en fluxos de negoci (**Flows**). El sistema no ven mòduls solts, sinó solucions completes que s'activen per fases (**Phases**) i s'executen mitjançant automatitzacions (**Automations**).

## Arquitectura de Negoci (Hierarchy)

1.  **Flow**: Producte comercial principal (ex: "Sistema de Captació + Agenda").
2.  **Phase**: Etapes del flux (ex: "Intake", "Routing", "Booking", "Retention").
3.  **Automation**: Workflows executables vinculats a cada fase.
4.  **Upgrade**: Millores modulars (ADJUSTMENT, FEATURE, REFACTOR) dins d'una fase existent.
5.  **Tenant Metrics**: Recollida de dades en temps real.
6.  **Tenant Health**: Càlcul de `churn_score`.

## Model de Facturació per Fases (Modular Billing)

- **Phased Activation**: Un flux es clona desactivat (PENDING) excepte la Fase 1.
- **Setup Price**: Cada fase té un cost d'implementació (Hores base x COMPANY_HOURLY_RATE).
- **Monthly Increase**: L'activació d'una fase o upgrade suma un import al preu mensual de la subscripció.
- **Workflows d'Activació**:
    - `acceptPhase`: Client accepta → Genera factura Setup.
    - `activatePhase`: Admin confirma pagament → Activa fase + Puja mensualitat.
    - `acceptUpgrade`: Igual que les fases, però per a modificacions puntuals.

## Mandats de Gemini CLI

1.  **Recerca i Estratègia**: Abans de modificar res, analitza l'arquitectura existent.
2.  **Surgical Updates**: Canvis mínims però complets, respectant el sistema de tipus.
3.  **Validació**: Després de cada canvi, verifica la integritat (build/lint).
4.  **Flow-First**: Tota nova funcionalitat ha d'encaixar en la jerarquia Flow/Phase/Automation.

## Convencions Crítiques

### Backend (Node.js/Express)
- **Resposta API**: Sempre `{ success: boolean, message: string, data: any }`.
- **Estructura**: `routes` → `controllers` → `services` → `db`.
- **PROHIBIT**: No facis crides directes a `prisma` des dels controllers.
- **SOFT DELETE**: Obligatori incloure `where: { deletedAt: null }`.
- **Validació**: Zod obligatori a tots els inputs (`src/schemas/`).
- **Mètriques**: Cada execució crítica d'automatització ha de registrar dades a `TenantMetric`.

### Frontend (Next.js/Tailwind)
- **Styling**: TailwindCSS pur.
- **I18n**: Tots els textos via `useTranslation()`.
- **Onboarding**: Seguir estrictament el flux de 7 passos definit al pla de refactorització.


## Comandes Principals

```bash
# Verificar entorn
npm run check-env (a l'arrel)

# Infraestructura
docker-compose up -d

# Backend
cd backend && npm run dev
```

## Workflow de Transició
S'ha realitzat una auditoria completa per assegurar que el projecte pot funcionar de forma **100% gratuïta** (usant Groq/Ollama i Resend/Mailtrap). S'han corregit múltiples desviacions arquitectòniques on es cridava Prisma directament des dels controllers.
