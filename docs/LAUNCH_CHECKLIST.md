# Launch Checklist

Pre-deployment and post-deployment verification steps for AL Tayef Overseas Ltd. website.

## Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `DB_NAME` | Database name | `altayef_prod` |
| `NEXTAUTH_SECRET` | NextAuth.js secret (min 32 chars) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Site URL for auth callbacks | `https://altayef.com` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used for SEO) | `https://altayef.com` |
| `ADMIN_SETUP_TOKEN` | Token for dev routes (dev only) | Random string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name | `your-cloud-name` |

## Pre-Deploy Checks

- [ ] All environment variables set in Vercel/host
- [ ] MongoDB Atlas IP allowlist includes `0.0.0.0/0` (or Vercel IPs)
- [ ] At least one admin user exists in database
- [ ] `npm run lint` passes
- [ ] `npm run build` passes

## Post-Deploy Verification

### Core Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Admin login page accessible at `/admin`
- [ ] Admin pages blocked without authentication

### SEO Verification
- [ ] `/sitemap.xml` returns 200 status
- [ ] `/sitemap.xml` contains dynamic URLs (services, countries, articles)
- [ ] `/robots.txt` returns 200 status
- [ ] `/robots.txt` disallows `/admin` and `/api`
- [ ] View page source on homepage - verify JSON-LD Organization schema
- [ ] View page source on knowledge center article - verify JSON-LD Article schema

### Security Verification
- [ ] `/api/dev/seed` returns 404 in production
- [ ] `/api/dev/create-admin` returns 404 in production
- [ ] `/api/dev/seed-country` returns 404 in production

### Content Verification
- [ ] Published services visible on `/services`
- [ ] Published countries visible on `/countries`
- [ ] Published articles visible on `/knowledge-center`
- [ ] Contact form submission works

## Google Search Console

After deployment:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for your domain
3. Verify ownership via DNS or HTML file
4. Submit sitemap: `https://your-domain.com/sitemap.xml`
5. Request indexing for main pages

## Recommended DNS Settings

```
Type    Name    Value
A       @       76.76.21.21 (Vercel)
CNAME   www     cname.vercel-dns.com
```

## Monitoring

- Enable Vercel Analytics
- Set up uptime monitoring (e.g., UptimeRobot)
- Check Vercel logs periodically for errors
