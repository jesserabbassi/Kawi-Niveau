# LearnFlow

LearnFlow is a full-stack SaaS-oriented learning platform built for modern online education workflows. It combines course delivery, enrollment management, lesson progress tracking, and admin analytics in a clean dashboard-driven experience, with marketplace and e-commerce foundations ready for future expansion.

## 🚀 Features

- JWT-based authentication with secure register and login flows
- Role-based authorization for `Admin` and `Student`
- Course creation, update, publishing, and management
- Lesson management per course
- Enrollment workflow for assigning users to courses
- Lesson progress tracking and completed lesson history
- Admin dashboard for managing users, courses, and enrollments
- Analytics dashboard with platform-level metrics
- SaaS-style interface with sidebar navigation, dashboard cards, and management views

## 🧰 Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- JWT Authentication
- Swagger / OpenAPI

### Database

- PostgreSQL

## 🏗️ Architecture Overview

### Frontend

The frontend is a React + Vite single-page application located in `Front-end/client`. It handles authentication state, protected routes, dashboard navigation, and role-aware user experiences for students and admins.

### Backend

The backend is an ASP.NET Core API located in `KawiNiveauApi/KawiNiveauApi`. It exposes REST endpoints for authentication, users, courses, lessons, enrollments, progress tracking, and analytics, with JWT-based security and role-based access control.

### Database

PostgreSQL stores the core domain entities such as users, courses, lessons, enrollments, and progress records. Entity Framework Core migrations are included for schema management and local setup.

## 🖼️ Screenshots

### Login

![Login](<./Pictures/Capture d'écran 2026-04-23 212430.png>)

### Admin Dashboard

![Admin Dashboard](<./Pictures/Capture d'écran 2026-04-23 212454.png>)

### Course Management

![Course Management](<./Pictures/Capture d'écran 2026-04-23 212514.png>)

### Enrollments

![Enrollments](<./Pictures/Capture d'écran 2026-04-23 212530.png>)

### Analytics Dashboard

![Analytics Dashboard](<./Pictures/Capture d'écran 2026-04-23 212542.png>)

### Student Dashboard

![Student Dashboard](<./Pictures/Capture d'écran 2026-04-23 212645.png>)

### Courses Catalog

![Courses Catalog](<./Pictures/Capture d'écran 2026-04-23 213749.png>)

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- .NET 8 SDK
- PostgreSQL

### Frontend Setup

```bash
cd Front-end/client
cp .env.example .env
npm install
npm run dev
```

Frontend environment variable:

```env
VITE_API_BASE_URL=https://localhost:7295/api
```

### Backend Setup

```bash
cd KawiNiveauApi/KawiNiveauApi
cp .env.example .env
dotnet restore
dotnet ef database update
dotnet run
```

Backend environment variables:

```env
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=kawiniveau;Username=postgres;Password=your_password
Jwt__Key=replace_with_a_long_random_secret_key
Jwt__Issuer=KawiNiveauApi
Jwt__Audience=KawiNiveauApiUsers
```

The API runs with Swagger enabled in development, and the frontend is configured to connect to `https://localhost:7295/api`.

## ▶️ Usage

1. Start PostgreSQL and ensure the target database exists.
2. Run the backend API from `KawiNiveauApi/KawiNiveauApi`.
3. Run the frontend from `Front-end/client`.
4. Open `http://localhost:5173`.
5. Register a new account or sign in.
6. Use an `Admin` account to manage users, courses, enrollments, and analytics.
7. Use a `Student` account to browse courses, enroll, and track learning progress.

## 🔌 API Overview

Base URL:

```text
https://localhost:7295/api
```

Example endpoints:

```http
POST   /auth/register
POST   /auth/login
GET    /auth/me

GET    /courses
GET    /courses/{id}
POST   /courses
PUT    /courses/{id}
DELETE /courses/{id}

GET    /lesson
GET    /lesson/{id}
POST   /lesson
PUT    /lesson/{id}
DELETE /lesson/{id}

POST   /enrollments
GET    /enrollments
GET    /enrollments/my
DELETE /enrollments/{id}

POST   /progress/complete
GET    /progress/my

GET    /users
PUT    /users/{id}/role
PUT    /users/{id}/status

GET    /admin/analytics
```

## 🌱 Future Improvements

- Integrated payments and subscription billing
- Marketplace-ready course purchasing flow
- Instructor onboarding and seller dashboards
- Cloud deployment with CI/CD
- Email notifications and onboarding automation
- Search, filtering, and recommendation features
- Rich media lessons and downloadable resources

## 👤 Author

Built by the project owner as a modern full-stack learning platform focused on scalable SaaS patterns, clean dashboard UX, and recruiter-ready architecture.
