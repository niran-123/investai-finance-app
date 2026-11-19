# InvestAI - Personalized Investment Platform

InvestAI is an AI-assisted and rule-grounded financial advisory platform designed for retail investors. It evaluates user risk tolerance and investment profiles, combines transparent rule-based suitability scoring with external market regime signals, and provides contextual rationale for investment products.

---

## Architecture Overview

- **Frontend**: React 19 + Vite SPA with modern responsive UI and client-side routing.
- **Backend**: Express.js REST API with JWT authentication, PostgreSQL relational database, and hybrid suitability modeling.
- **ML Layer**: Python microservice (FastAPI / CLI) with pre-trained market-regime classification models (NIFTY 50 benchmark data). Degrades gracefully if Python is not running.
- **Database**: PostgreSQL with automatic schema verification and seeding on startup.

---

## Project Structure

```
Finance-application-main/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection (db.js) & schema initialization (initDb.js)
│   │   ├── controllers/     # Route request handlers
│   │   ├── middleware/      # JWT auth middleware
│   │   ├── models/          # Data models & business scoring algorithms
│   │   ├── routes/          # Express route definitions
│   │   ├── scripts/         # Database seed scripts
│   │   └── services/        # ML & market integration services
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (Navbar, Sidebar, Modal, ProtectedRoute)
│   │   ├── pages/           # Views (Home, Dashboard, RiskAssessment, Investments, etc.)
│   │   └── services/        # Centralized API service (api.js)
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── ml/
│   ├── src/                 # Prediction pipeline, features, and FastAPI service (serve.py)
│   ├── models/              # Pre-trained joblib models and scalers
│   └── requirements.txt     # Python requirements
├── docker-compose.yml       # 1-command containerized local/cloud deployment
└── README.md
```

---

## Getting Started (Local Development)

### Prerequisites

- **Node.js**: v18+ (tested on Node 20 / Node 24)
- **PostgreSQL**: v13+ running locally or a cloud database instance (e.g. Neon / Supabase)
- **Python**: 3.10+ (optional, only required if running ML FastAPI microservice locally)

### 1. Database Setup

Create a PostgreSQL database named `finance_app`:
```sql
CREATE DATABASE finance_app;
```

### 2. Backend Setup

1. Navigate to the backend directory and copy the environment template:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Update `.env` with your database credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=finance_app
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```
   *(Or set `DATABASE_URL=postgresql://user:password@localhost:5432/finance_app`)*
3. Install dependencies and start the backend:
   ```bash
   npm install
   npm run dev
   ```
   *The backend will automatically create all tables (`users`, `investment_profiles`, `risk_assessments`, `investments`, `brokers`, `broker_products`, `education_content`) and seed verified data on startup.*

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   cp .env.example .env
   ```
2. Install dependencies and start Vite dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Open your browser at `http://localhost:5173`.

---

## Deployment Options

### Option A: Cloud Deployment (Recommended)

#### 1. Database (Neon / Supabase)
- Create a free PostgreSQL database on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).
- Copy your PostgreSQL connection string (`DATABASE_URL`).

#### 2. Backend (Render / Railway / Fly.io)
- Connect your GitHub repository to Render or Railway.
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node src/server.js`
- Set Environment Variables:
  - `DATABASE_URL`: Your cloud PostgreSQL URL (e.g. `postgresql://...`)
  - `JWT_SECRET`: A strong random string
  - `CLIENT_URL`: Your deployed frontend URL (e.g. `https://your-frontend.vercel.app`)
  - `NODE_ENV`: `production`

#### 3. Frontend (Vercel / Netlify / Cloudflare Pages)
- Connect your repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Set Environment Variable:
  - `VITE_API_BASE_URL`: `https://your-backend-app.onrender.com/api`

---

### Option B: Docker Compose Deployment

Run the entire stack (PostgreSQL + Backend + Frontend) with a single command:
```bash
docker compose up --build
```
- Frontend: `http://localhost`
- Backend API: `http://localhost:5000`
- Database: `localhost:5432`
