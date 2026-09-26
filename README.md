<<<<<<< HEAD
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

=======
# 🚨 Incident Management System

A full-stack web application for reporting, assigning, and tracking operational incidents in an organization — built as an academic/portfolio project demonstrating modern full-stack development practices.

## 📌 What It Does

The Incident Management System provides a centralized workflow for handling operational incidents from creation to resolution:

- **Users** can report incidents (bugs, outages, issues) with a title, description, and severity level.
- **Resolvers** can view incidents assigned to them and update their status as they work through them.
- **Admins** get full visibility across all incidents and can assign resolvers.
- Every incident moves through a clear lifecycle: `OPEN → IN_PROGRESS → RESOLVED → CLOSED`.
- All actions are protected by JWT-based authentication and role-based authorization, so only the right people can perform the right actions (e.g., only the assigned resolver or an admin can close out an incident).

It replaces manual/disconnected tracking (spreadsheets, chat threads) with a structured, auditable system.

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, React Router, Axios
**Backend:** Java 21, Spring Boot, Spring Security, Spring Data JPA / Hibernate
**Database:** MySQL
**Auth:** JWT (JJWT), BCrypt password hashing

## 🏗️ Architecture

- **Controller layer** – handles HTTP requests/responses
- **Service layer** – business rules (ownership checks, resolver validation, status transition rules)
- **Repository layer** – Spring Data JPA access to MySQL
- **Security layer** – JWT filter validates the `Authorization: Bearer <token>` header on every protected request

## 🚀 Getting Started

### Prerequisites
>>>>>>> 8a6bcc72e18999de88b5f15f024064915188f8a0
- Java 21
- Maven 3.9+
- Node.js 18+ and npm
- MySQL 8+

<<<<<<< HEAD
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
=======
### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/incident-management-system.git
cd incident-management-system
```

### 2. Set up the database
```bash
mysql -u root -p < backend/database-reset.sql
```

### 3. Run the backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
API runs at `http://localhost:8080`. Config (DB credentials, JWT secret, admin seed account) is controlled via environment variables — see `application.properties` for defaults.

### 4. Run the frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## 👤 How to Use It

1. **Register** an account as a `USER` (reports incidents) or `RESOLVER` (resolves them). An `ADMIN` account is auto-seeded on first backend startup (see README for default credentials).
2. **Log in** — you'll land on your role-aware dashboard.
3. **Report an incident** (Users): fill in title, description, severity → submitted with `OPEN` status.
4. **Assign a resolver**: pick from the list of available resolvers → status auto-updates to `IN_PROGRESS`.
5. **Update status** (Resolvers/Admins): move the incident through `IN_PROGRESS → RESOLVED → CLOSED`.
6. **Track everything**: the Incidents page lists every incident; each has a details view with full history and metadata.

## 🔐 API Overview

| Action | Method | Endpoint |
|---|---|---|
| Register | POST | `/auth/register` |
| Login | POST | `/auth/login` |
| List all incidents | GET | `/incidents` |
| My reported incidents | GET | `/incidents/my-reported` |
| My assigned incidents | GET | `/incidents/my-assigned` |
| Create incident | POST | `/incidents` |
| Get incident by ID | GET | `/incidents/{id}` |
| Assign resolver | PUT | `/incidents/{id}/assign/{userId}` |
| Update status | PUT | `/incidents/{id}/status` |
| Delete incident | DELETE | `/incidents/{id}` |

All endpoints except `/auth/**` require a valid JWT.

## 🔮 Future Enhancements

- Real-time/email notifications
- SLA & escalation rules
- Audit trail of assignments and status changes
- Analytics dashboard (volume, severity, resolution time)
- Search/filtering, file attachments, automated test coverage

## 📄 License

MIT (or update to whatever you prefer).
>>>>>>> 8a6bcc72e18999de88b5f15f024064915188f8a0
