# Vercel Deployment Guide

This guide explains how to deploy the Tepoztlán Tourism Guide to Vercel.

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Mapbox access token

## Environment Variables

Configure these environment variables in your Vercel project settings:

### Required Variables

1. **NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN**
   - Get from: https://account.mapbox.com/
   - Format: `pk.eyJ1...` (starts with `pk.`)
   - Used for: All map functionality

2. **NEXT_PUBLIC_SITE_URL**
   - Production: `https://your-domain.com`
   - Preview: `https://your-project.vercel.app`
   - Used for: SEO metadata, sitemap, robots.txt

### Optional Variables

3. **NEXT_PUBLIC_GA_MEASUREMENT_ID**
   - Get from: https://analytics.google.com/
   - Format: `G-XXXXXXXXXX`
   - Used for: Google Analytics 4 tracking

## Setting Environment Variables in Vercel

### Option 1: Via Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`)
   - **Value**: Your token/value
   - **Environment**: Select Production, Preview, and/or Development

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
```

### Option 3: Via `.env` file (Vercel Git Integration)

If you're using Vercel's Git integration, you can create a `.env` file in your repository root:

```bash
# .env (for Vercel production deployment)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_actual_token_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important**: Add `.env` to `.gitignore` to prevent committing secrets!

## Local Development

For local development, use `.env.local`:

```bash
# .env.local (local development only)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deployment Steps

### Automatic Deployment (Recommended)

1. **Connect GitHub to Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Click "Import"

2. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Add Environment Variables**
   - Add all required variables as described above
   - Apply to Production, Preview, and Development environments

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - Subsequent pushes to `main` branch auto-deploy

### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Build Configuration

The project uses Next.js 15 with:
- App Router (app directory)
- Server-side rendering (SSR)
- Static generation (SSG) for 109 pages
- Dynamic routes with i18n (`/es/`, `/en/`)

### Build Command
```bash
npm run build
```

### Start Command (for Vercel)
```bash
npm run start
```

## Environment-Specific Configurations

### Production
- `NODE_ENV=production` (automatic)
- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
- CSP headers enabled with `upgrade-insecure-requests`
- HSTS enabled

### Preview (Vercel Preview Deployments)
- `NODE_ENV=production` (automatic)
- `NEXT_PUBLIC_SITE_URL=https://your-project-git-branch.vercel.app`
- Same security headers as production

### Development
- `NODE_ENV=development`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Development-only error details shown

## Vercel-Specific Features Used

### Edge Middleware
- **File**: `src/middleware.ts`
- **Runtime**: Edge
- **Purpose**: i18n routing, security headers, CSP

### Dynamic Routes
- Language prefixes: `/[lang]/`
- Category routes: `/[lang]/[category]/[slug]`
- Auto-generated static pages: 109 pages

### API Routes (Future)
- None currently, but can be added to `/app/api/`

## Troubleshooting

### Build Failures

**Error: Environment variable validation failed**
```
❌ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: Invalid input
```
**Solution**: Ensure the Mapbox token starts with `pk.` and is set in Vercel environment variables.

**Error: Module not found**
**Solution**: Clear build cache in Vercel:
- Settings → General → Clear Build Cache
- Redeploy

### Runtime Errors

**Map not loading**
**Solution**: Check browser console for Mapbox token errors. Verify token is correct in Vercel env vars.

**CSP violations**
**Solution**: Check `src/middleware.ts` CSP headers. Ensure Mapbox domains are whitelisted.

## Performance Optimization

### Already Configured
- ✅ Static generation for 109 pages
- ✅ Image optimization via Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Edge middleware for fast routing

### Vercel-Specific Optimizations
- ✅ Automatic CDN distribution
- ✅ Edge caching for static assets
- ✅ Brotli compression
- ✅ HTTP/2 and HTTP/3 support

## Custom Domain Setup

1. **Add Domain in Vercel**
   - Project Settings → Domains
   - Add your domain (e.g., `tepoztlan.com`)

2. **Configure DNS**
   - Add A record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`

3. **Update Environment Variable**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://tepoztlan.com
   ```

4. **Redeploy** to apply changes

## Security Checklist

- ✅ Environment variables set as secrets (not exposed to client)
- ✅ `.env.local` in `.gitignore`
- ✅ CSP headers configured
- ✅ HSTS enabled in production
- ✅ No API keys in client-side code
- ✅ Mapbox token is public (safe for client use)

## Monitoring

### Vercel Analytics (Built-in)
- Real-time analytics available in dashboard
- Core Web Vitals tracking
- Automatic error reporting

### Google Analytics (Optional)
Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable GA4 tracking.

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Project Issues**: https://github.com/davorint/tepoz-website/issues

---

**Last Updated**: October 2025
**Next.js Version**: 15.5.2
**Deployment Platform**: Vercel
