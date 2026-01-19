/**
 * Site URL Resolver
 * Returns the canonical base URL for the site.
 * Used by sitemap.ts, robots.ts, and metadata.
 */

export function getSiteUrl(): string {
    // Priority order:
    // 1. NEXT_PUBLIC_SITE_URL - explicitly set production URL (includes protocol)
    // 2. VERCEL_PROJECT_PRODUCTION_URL - Vercel's production domain
    // 3. VERCEL_URL - Vercel's deployment URL (hostname only)
    // 4. Fallback to localhost for development

    let url: string

    if (process.env.NEXT_PUBLIC_SITE_URL) {
        url = process.env.NEXT_PUBLIC_SITE_URL
    } else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    } else if (process.env.VERCEL_URL) {
        url = `https://${process.env.VERCEL_URL}`
    } else {
        url = 'http://localhost:3000'
    }

    // Normalize: ensure protocol, remove trailing slash
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`
    }

    return url.replace(/\/+$/, '')
}
