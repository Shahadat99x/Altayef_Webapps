# Altayef Webapps

Altayef Webapps is the public website and admin CMS for **AL Tayef Overseas Ltd.**  
It is built for a visa processing agency workflow: publish services and country guides, manage knowledge-center content, and handle inbound enquiries from the public website.

## What this project includes

### Public website
- Home page with featured services, countries, testimonials, and insights
- Services listing and detail pages
- Countries listing and detail pages
- Knowledge Center (category + article pages)
- Contact page with enquiry submission API
- Verify License page
- Legal pages (privacy policy, terms)

### Admin panel (`/admin`)
- Secure login (NextAuth credentials)
- Manage services, countries, articles, team members, and testimonials
- Review and update enquiries
- Site settings management
- Cloudinary-backed image uploads for content

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript
- **Auth:** NextAuth v5 + bcrypt
- **Database:** MongoDB
- **Styling:** Tailwind CSS v4
- **Content tools:** React Markdown + remark-gfm
- **Animation:** Framer Motion
- **Validation:** Zod

## Local setup

### 1) Prerequisites
- Node.js 20+
- npm
- MongoDB connection string

### 2) Install
```bash
npm install
```

### 3) Environment
Create `.env.local` in the project root and set the required values:

```bash
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
DB_NAME=altayef_prod

# NextAuth
NEXTAUTH_SECRET=<strong-random-secret>
NEXTAUTH_URL=http://localhost:3000

# Site URL used in SEO metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Dev-only admin setup route token
ADMIN_SETUP_TOKEN=<dev-token>

# Dev-only seed route token
SEED_TOKEN=<dev-seed-token>

# Cloudinary (required for admin uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

> Note: NextAuth also supports `AUTH_SECRET`. Keep one auth secret configured consistently.

### 4) Run locally
```bash
npm run dev
```
Open: `http://localhost:3000`

## Bootstrap data and first admin user

### Seed core data
- Endpoint: `POST /api/dev/seed`
- In development, it is allowed without token.
- In non-development environments, pass `?token=<SEED_TOKEN>`.

### Create first admin
- Endpoint: `POST /api/dev/create-admin?token=<ADMIN_SETUP_TOKEN>`
- JSON body:

```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

In development, if `ADMIN_SETUP_TOKEN` is not set, creation is allowed without token.

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint codebase
- `npm run typecheck` — TypeScript checks
- `npm run format` — format with Prettier

## Health checks

- `GET /api/health` — app heartbeat
- `GET /api/health/db` — MongoDB connectivity check

## Security notes

- Admin routes are protected by NextAuth middleware.
- Public enquiry API has rate limiting and schema validation.
- Dev utility routes are token-gated outside development.
- `robots.txt` disallows `/admin` and `/api` for crawlers.

## Deployment

Primary target is **Vercel**.

Before launch, use:
- `docs/LAUNCH_CHECKLIST.md`

It includes pre-deploy checks (env, lint/build, admin readiness), post-deploy verification, SEO checks, and operations monitoring steps.
