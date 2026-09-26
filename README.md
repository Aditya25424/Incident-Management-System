# Incident Management System

A full-stack web application for reporting, assigning and tracking
operational incidents — built with **React.js** (frontend) and
**Spring Boot / Java 21** (backend), backed by **MySQL**.

This project follows the architecture and API contract described in
the accompanying project report: layered backend (controller → service
→ repository), JWT-based stateless authentication, role-based
authorization (USER / RESOLVER / ADMIN), and a component-based React
frontend with centralized API communication.

## Project Structure

```
incident-management-system/
├── backend/                     Spring Boot REST API (Java 21, Maven)
│   ├── src/main/java/com/example/incident/
│   │   ├── config/               Security, CORS, admin data seeding
│   │   ├── controller/           REST controllers (Auth, Incident, User)
│   │   ├── dto/                  Request/response payloads
│   │   ├── entity/                JPA entities + enums
│   │   ├── exception/             Centralized error handling
│   │   ├── repository/            Spring Data JPA repositories
│   │   ├── security/              JWT util, filter, user-details service
│   │   └── service/               Business logic
│   ├── src/main/resources/application.properties
│   ├── database-reset.sql
│   └── pom.xml
└── frontend/                    React.js SPA (Vite)
    ├── src/
    │   ├── components/           Reusable UI (Navbar, cards, badges, ...)
    │   ├── context/               AuthContext (JWT/session state)
    │   ├── pages/                 Login, Register, Dashboard, Incidents, ...
    │   ├── services/              Centralized Axios API client + services
    │   └── styles/                Global stylesheet
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Java 21
- Maven 3.9+
- Node.js 18+ and npm
- MySQL 8+

## Backend Setup

1. Create the database (or let Hibernate auto-create it — see
   `application.properties`):
   ```bash
   mysql -u root -p < backend/database-reset.sql
   ```

2. Configure environment variables (or edit the defaults in
   `application.properties` directly for local development):

   | Variable              | Purpose                                   | Default (dev only)                   |
   |-----------------------|--------------------------------------------|---------------------------------------|
   | `DB_HOST`             | MySQL host                                 | `localhost`                            |
   | `DB_PORT`             | MySQL port                                 | `3306`                                 |
   | `DB_NAME`             | Database name                              | `incident_management`                  |
   | `DB_USERNAME`         | MySQL username                             | `root`                                 |
   | `DB_PASSWORD`         | MySQL password                             | `root`                                 |
   | `JWT_SECRET`          | HMAC signing key for JWTs (override in prod)| dev-only placeholder                  |
   | `JWT_EXPIRATION_MS`   | Token lifetime in ms                       | `86400000` (24h)                       |
   | `FRONTEND_URL`        | Allowed CORS origin                        | `http://localhost:5173`                |
   | `SEED_ADMIN_EMAIL`    | Auto-created admin account email           | `admin@incident-system.local`          |
   | `SEED_ADMIN_PASSWORD` | Auto-created admin account password        | `ChangeMe123!`                         |

3. Run the backend:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   The API starts on `http://localhost:8080`.

## Frontend Setup

1. Copy the env template and adjust if needed:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```
   The app runs on `http://localhost:5173`.

## Default Accounts

- On first startup, the backend seeds one **ADMIN** account using the
  `SEED_ADMIN_*` configuration above.
- All other accounts (USER / RESOLVER) are created via the **Register**
  page in the frontend.

## API Contract

| Operation      | Method | Endpoint                          |
|----------------|--------|------------------------------------|
| Register       | POST   | `/auth/register`                   |
| Login          | POST   | `/auth/login`                      |
| List all       | GET    | `/incidents`                       |
| My reported    | GET    | `/incidents/my-reported`           |
| My assigned    | GET    | `/incidents/my-assigned`           |
| Create         | POST   | `/incidents`                       |
| Details        | GET    | `/incidents/{id}`                  |
| Assign         | PUT    | `/incidents/{id}/assign/{userId}`  |
| Update status  | PUT    | `/incidents/{id}/status`           |
| Delete         | DELETE | `/incidents/{id}`                  |
| Current user   | GET    | `/users/me`                        |
| List resolvers | GET    | `/users/resolvers`                 |

All `/incidents/**` and `/users/**` endpoints require an
`Authorization: Bearer <token>` header obtained from `/auth/login` or
`/auth/register`.

## Notes on Production Deployment

Before deploying beyond local development:

- Override `JWT_SECRET`, `SEED_ADMIN_PASSWORD` and all DB credentials
  with strong, environment-specific values — never commit real
  secrets to source control.
- Serve the API over HTTPS and set `FRONTEND_URL` to the real frontend
  origin.
- Consider adding rate limiting, audit logging and automated
  (JUnit/Mockito) test coverage, as noted in the project report's
  Future Scope chapter.
