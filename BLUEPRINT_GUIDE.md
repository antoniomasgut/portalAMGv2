# Blueprint: Portal Multi-Client AMG (v1.0)

Aquest directori conté l'ADN del projecte. Amb aquests fitxers pots reconstruir tota l'aplicació des de zero mantenint la integritat arquitectònica i sense errors.

## 📂 Contingut de la Carpeta

1.  **`GEMINI.md`**: El "Codi d'Honor". Defineix el workflow **Flow-First** i les convencions de codi.
2.  **`schema.prisma`**: El cor de les dades. Ja inclou:
    *   Jerarquia completa de Fluxos i Fases.
    *   Sistema de Soft-Delete (`deletedAt`) a totes les taules de configuració.
    *   Terminologia unificada (`provider`).
3.  **`docker-compose.yml`**: La infraestructura (DB, n8n, Qdrant).
4.  **`ROADMAP_DEFINITIU.md`**: L'estat actual i els pròxims passos de negoci.
5.  **`design/`**: Prototips visuals i primitives de components (la identitat "dark tech" d'AMG).
6.  **`core/`**: Peces de codi crítiques per no repetir errors del passat:
    *   `express.d.ts`: Tipat d'`AuthenticatedRequest`.
    *   `auth.ts`: Middleware d'autorització segur.
    *   `usage-aggregator.service.ts`: Lògica unificada de mètriques i facturació.

## 🚀 Passos per a la Reconstrucció Neta

### 1. Fonaments (Minut 0-30)
*   Copia `docker-compose.yml` a l'arrel i executa `docker compose up -d`.
*   Crea el projecte Backend (`npm init`) i instal·la Prisma.
*   Copia `schema.prisma` a `backend/prisma/` i executa `npx prisma migrate dev`.

### 2. Tipat i Seguretat (Minut 30-60)
*   Implementa el fitxer `express.d.ts` a la teva carpeta de tipus.
*   Configura el middleware `auth.ts`. **Mai tornis a utilitzar `req.user` sense el tipat d'AuthenticatedRequest.**

### 3. Lògica de Negoci (Flow-First)
*   Crea el `FlowService`. La seva primera funció ha de ser `cloneFlowForTenant`.
*   Tota acció que generi un lead o una mètrica ha de passar obligatòriament pel `UsageAggregatorService`.

### 4. Frontend Shell
*   Utilitza Next.js amb App Router.
*   Copia la filosofia de disseny de `GEMINI.md` per als components base.

---

**Nota de Gemini**: Aquest blueprint representa la versió més neta i optimitzada del Portal AMG fins a la data (8 de maig de 2026).
