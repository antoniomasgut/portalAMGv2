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
### 4. Integració de Qwen 3.6 (IA Local)
- **Ollama**: S'ha afegit un contenidor d'Ollama a la xarxa del portal per gestionar models de llenguatge locals.
- **Qwen3.6-35B-A3B**: S'ha establert com el model local per defecte en el servei d'IA.
- **Persistència**: S'ha creat el volum `ollama_data` per conservar els models descarregats.
- **Compatibilitat**: S'ha configurat per defecte en CPU per evitar fallades d'arrencada, amb possibilitat d'activar GPU NVIDIA (requereix toolkit al host).

---
### 5. Configuració de Claus API i Seguretat
- **Variables d'Entorn**: S'ha creat el fitxer `.env` a l'arrel amb les claus de Groq i OpenRouter.
- **Orquestració IA**: S'ha configurat la relació entre `portal_ai` (orquestrador) i `portal_ollama` (motor local).
- **Seguretat**: S'ha verificat que les claus estan excloses de Git via `.gitignore`.
- **Re-deploy**: S'han reiniciat els contenidors per carregar la nova configuració.

---
### 6. Descàrrega de Model Qwen 3.6 35B A3B
- **Acció**: S'ha iniciat el `pull` del model `qwen3.6:35b-a3b` (aprox. 12GB) en segon pla.
- **Estat**: En procés de descàrrega dins del contenidor `portal_ollama`.
- **Validació prèvia**: S'ha confirmat el funcionament del motor Ollama amb un model de test (Qwen 0.5B).

---
### 7. Prova de Concepte amb Qwen 2 (0.5B)
- **Resultat**: El model respon correctament a consultes sobre SaaS multi-tenant.
- **Observació**: Funcionament fluid però amb limitacions de llenguatge i raonament a causa de la mida del model.
- **Conclusió**: La infraestructura d'Ollama és apta per a la IA local; el sistema està a l'espera del model superior (35B) per a tasques de producció.

---
### 8. Generació de Contingut Comercial amb IA
- **Tasca**: Redacció d'un correu per a captació de pintors autònoms.
- **Model usat**: Qwen 2 (0.5B).
- **Resultat**: Estructura correcta però redacció deficient en català (al·lucinacions lingüístiques).
- **Acció**: S'ha realitzat una correcció manual per part de l'agent per lliurar el valor a l'usuari.
- **Lliçó apresa**: Els models < 1B paràmetres no són aptes per a redacció final en català, reforçant la necessitat del model 35B.

---
### 9. Anàlisi de Costos i Estratègia "Local First"
- **IA Local (Ollama)**: Cost 0€. S'utilitza el hardware propi.
- **Groq**: Ús del Free Tier (sense cost dins dels límits de ràtio).
- **OpenRouter**: Configurat com a backup de pagament per ús (micro-costos).
- **Estratègia**: El Portal AMG v2 prioritza l'execució local per maximitzar la rendibilitat i la privadesa del tenant.

---
*Nota: Aquest document s'anirà actualitzant amb cada intervenció significativa.*
