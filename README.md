# PortfolioMaker - AI Portfolio Generator

A full-stack web app similar to cv2portfolio.in — dark SaaS UI with AI portfolio generation.

## Folder Structure

```
portfolio/
├── frontend/          # React + Vite + Tailwind CSS
│   └── src/
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Card.jsx
│       │   ├── Header.jsx
│       │   ├── UploadModal.jsx
│       │   └── ParticleBackground.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── MyPortfolios.jsx
│       │   ├── Credits.jsx
│       │   ├── ProfileSettings.jsx
│       │   └── ReferEarn.jsx
│       └── App.jsx
└── backend/           # Node.js + Express + Supabase (PostgreSQL)
    ├── lib/
    │   └── supabase.js
    ├── services/
    │   ├── serialize.js
    │   ├── users.js
    │   └── portfolios.js
    ├── routes/
    │   ├── auth.js
    │   ├── upload.js
    │   ├── portfolios.js
    │   └── ai.js
    ├── middleware/
    │   └── auth.js
    └── server.js
supabase/
└── migrations/        # SQL schema for Supabase Postgres
```

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project (PostgreSQL)

## Setup & Run

### 0. Database (Supabase)

1. Create a Supabase project.
2. In **SQL Editor**, run the migration file **`supabase/migrations/20250514120000_portfolio_maker.sql`** (or use the Supabase CLI: `supabase db push` from the repo root if you use linked projects).
3. In **Project Settings → API**, copy **Project URL** and the **service_role** key (server only — never expose in the frontend).

### 1. Backend

```bash
cd backend
npm install
# Copy backend/.env.example → backend/.env and set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SECRET
npm run dev
# Runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser (Vite is configured for port **5173**; the dev server proxies `/api` to the backend on **http://localhost:5000**).

## Production deployment

Recommended split: **frontend on Vercel** (or Netlify / Cloudflare Pages) and **API on Render, Railway, or Fly.io** with **Supabase** for the database. The API uses disk `uploads/` for optional resume files via `/api/upload`; use a long-running Node host (not Vercel serverless) unless you later move uploads to object storage.

### 1. Supabase

1. Run the SQL migration in **`supabase/migrations/20250514120000_portfolio_maker.sql`** on your project (SQL Editor or CLI).
2. Store **`SUPABASE_URL`** and **`SUPABASE_SERVICE_ROLE_KEY`** as secrets on your API host only.

### 2. Backend (e.g. Render)

1. New **Web Service** → connect this repo, **root directory** `backend`, build `npm install`, start `npm start`.
2. Set environment variables (see `backend/.env.example`):

| Variable | Required (prod) | Purpose |
|----------|-------------------|---------|
| `NODE_ENV` | Yes | Must be `production` for secure CORS. |
| `SUPABASE_URL` | Yes | Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (server only; bypasses RLS for this API). |
| `JWT_SECRET` | Yes | JWT signing; server exits at boot if missing when `NODE_ENV=production`. |
| `FRONTEND_URL` | Yes | Your live site origin, **no trailing slash** (e.g. `https://your-app.vercel.app`). |
| `FRONTEND_URLS` | Optional | Comma-separated extra origins (Vercel preview URLs, `www`, staging). |
| `ALLOWED_ORIGINS` | Optional | Comma-separated list; merged with the above. |
| `OPENAI_API_KEY` | For AI | Resume parsing, text generation. |
| `REPLICATE_API_TOKEN` | For AI | Image generation. |
| `ELEVENLABS_API_KEY` | For AI | Audio generation. |

3. Optional: use the repo **`render.yaml`** blueprint; add secrets in the Render dashboard.
4. After deploy, open **`https://<your-api-host>/api/health`** — expect `{ "ok": true, "database": "connected", "supabase": true, ... }`.

### 3. Frontend (e.g. Vercel)

1. New project → **root directory** `frontend`, framework Vite, build `npm run build`, output `dist`.
2. Set **`VITE_API_URL`** to your **public API origin** with **no path and no trailing slash** (e.g. `https://portfolio-maker-api.onrender.com`). Set it for **Production** and **Preview** so preview deployments still call the API.
3. Redeploy after changing `VITE_*` variables (they are baked in at build time).

### 4. CORS checklist

- Browser `Origin` must **exactly** match an entry you configured (including `https://` and no trailing `/`).
- Add every Vercel preview domain you use to **`FRONTEND_URLS`**, or use a stable preview URL pattern via **`ALLOWED_ORIGINS`**.

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/health | No | Health check (Render / monitoring) |
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login & get token |
| GET | /api/auth/profile | Yes | Get user profile |
| POST | /api/upload | Yes | Upload resume (PDF/DOCX) |
| GET | /api/portfolios | Yes | List my portfolios |
| POST | /api/portfolios | Yes | Create portfolio |
| GET | /api/portfolios/:id | Yes | Get one portfolio |
| PUT | /api/portfolios/:id | Yes | Update portfolio |
| DELETE | /api/portfolios/:id | Yes | Delete portfolio |

## Features

- Dark navy + neon cyan theme
- Animated particle star background
- Glassmorphism cards with hover glow
- JWT authentication
- PostgreSQL via Supabase (users + portfolios)
- Resume upload (PDF/DOCX, max 5MB)
- Credits system + referral program
- Fully responsive layout
