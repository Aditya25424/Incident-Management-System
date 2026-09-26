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
- Java 21
- Maven 3.9+
- Node.js 18+ and npm
- MySQL 8+

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
