# Journal d'Activitat - Portal AMG v2

Aquest document registra les tasques, decisions i canvis realitzats en el projecte de forma cronològica.

## 2026-05-08

### 1. Reinici i Optimització de la Infraestructura Docker
- **Neteja profunda**: S'han aturat i eliminat tots els contenidors, xarxes i volums previs per garantir un entorn net.
- **Configuració de Docker Compose**:
    - S'ha actualitzat `docker-compose.yml` per utilitzar `npm install` automàticament en els contenidors de `backend` i `frontend` abans d'arrencar el mode dev.
    - S'han implementat **healthchecks** basats en connexions TCP (`sh -c ': > /dev/tcp/127.0.0.1/PORT'`) per evitar dependències de `wget` o `curl` en imatges minimalistes.
    - S'han creat els directoris necessaris que faltaven: `ai/` i `n8n/workflows/`.
    - S'ha generat un `docker/Caddyfile` bàsic per al servei de reverse proxy.
- **Estat final**: Els 7 serveis (Caddy, Frontend, Backend, DB, AI, n8n, Qdrant) estan operatius i en estat "Healthy".

### 2. Configuració de Git i Sincronització amb GitHub
- **Inicialització del repositori**: S'ha inicialitzat Git a l'arrel del projecte i s'ha configurat la branca `main`.
- **Protecció de dades**: S'ha creat un fitxer `.gitignore` global per evitar la pujada de `node_modules`, fitxers `.env`, credencials JSON i fitxers temporals de sistema.
- **Consolidació de codi**: S'ha eliminat el repositori Git intern del `frontend` per gestionar-lo com un directori normal dins del monorepo, evitant la complexitat de submdòduls.
- **GitHub**: S'ha connectat amb el repositori remot `https://github.com/antoniomasgut/portalAMGv2.git` i s'ha realitzat la primera pujada de tot el codi actualitzat.

---
### 3. Definició de l'Arquitectura de Contenidors
S'ha documentat la funció de cadascun dels 7 contenidors del sistema:
- **portal_caddy**: Reverse Proxy i gestió de SSL/HTTPS.
- **portal_frontend**: Interfície d'usuari (Next.js).
- **portal_backend**: Lògica de negoci i API (Express).
- **portal_db**: Base de dades relacional (PostgreSQL).
- **portal_ai**: Motor de processament de dades amb IA (FastAPI).
- **portal_qdrant**: Base de dades vectorial per a RAG (Intel·ligència Artificial).
- **portal_n8n**: Motor d'automatitzacions i workflows.

---
*Nota: Aquest document s'anirà actualitzant amb cada intervenció significativa.*
