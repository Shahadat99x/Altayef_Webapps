# Altayef Webapps - Visa Processing Agency

Production-ready skeleton for the Government-approved visa processing agency web application.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

```bash
npm run dev
# Open http://localhost:3000
```

### Environment Variables

Copy `.env.example` to `.env.local` for local development.

```bash
cp .env.example .env.local
```

Currently, valid variables are placeholders only.

## 🛠 Project Structure

- `/app`: App Router pages and layouts
- `/app/api`: API routes (Health check)
- `/components`: Reusable UI components
- `/lib`: Utility functions
- `/public`: Static assets

## ✅ Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run typecheck`: Run TypeScript check

## 🚢 Deployment

Deployed on Vercel.

- **Health Check**: `/api/health` returns `{ ok: true, timestamp }`

## 📦 Phase 1 Status

- [x] Repo structure & Tooling (Tailwind, ESLint, Prettier)
- [x] Basic Skeleton UI
- [x] Environment Setup
- [x] Health Route
