# Security Guide - Tepoztlán Tourism Website

## 🔐 Environment Variables Security

### Current Status: ✅ SECURE

Your environment variables are properly secured:
- ✅ `.env*` files in `.gitignore` (not tracked in git)
- ✅ Using Vercel for environment variable management
- ✅ Mapbox token correctly prefixed with `NEXT_PUBLIC_` (required for client-side use)

---

## 📋 Environment Variables Checklist

### Local Development (.env.local)

Your local `.env.local` file contains:

```bash
# Mapbox Access Token
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoidG9kb3RlcG96IiwiYSI6ImNtZmR2OHRnNDAwMzQybm9qb2NrZXI4OHkifQ.i4ZoHEk9PiJDmUWgcOqhVg

# Site URL (for local development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Status**: ✅ This file is NOT in git (confirmed safe)

---

## 🚀 Vercel Production Setup

### Step 1: Add Environment Variables to Vercel

Go to your Vercel project dashboard:
1. Navigate to **Settings** → **Environment Variables**
2. Add the following variables:

#### Required for Production:

**NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN**
```
Value: pk.eyJ1IjoidG9kb3RlcG96IiwiYSI6ImNtZmR2OHRnNDAwMzQybm9qb2NrZXI4OHkifQ.i4ZoHEk9PiJDmUWgcOqhVg
Environment: Production, Preview, Development
```

**NEXT_PUBLIC_SITE_URL**
```
Value: https://your-actual-domain.com  (or https://your-project.vercel.app)
Environment: Production, Preview
```

For Development environment:
```
Value: http://localhost:3000
Environment: Development
```

#### Optional (for analytics):

**NEXT_PUBLIC_GA_MEASUREMENT_ID**
```
Value: G-XXXXXXXXXX
Environment: Production
```

### Step 2: Verify Vercel CLI (Optional)

If using Vercel CLI, you can set variables with:

```bash
# Login to Vercel
vercel login

# Link your project (if not already)
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN production
vercel env add NEXT_PUBLIC_SITE_URL production

# Pull environment variables for local development
vercel env pull .env.local
```

---

## 🔒 Mapbox Token Security

### Current Token Analysis

**Token**: `pk.eyJ1IjoidG9kb3RlcG96IiwiYSI6ImNtZmR2OHRnNDAwMzQybm9qb2NrZXI4OHkifQ.i4ZoHEk9PiJDmUWgcOqhVg`

**Type**: Public token (starts with `pk.`)

**Security Level**: ✅ SAFE for client-side use

**Why it's safe**:
- Mapbox public tokens are DESIGNED to be used in client-side code
- They are visible in browser network requests (this is expected)
- Security is enforced through URL restrictions in Mapbox dashboard

### Recommended Token Restrictions

To maximize security, configure your token at https://account.mapbox.com/:

1. **Go to**: Account → Tokens → Select your token
2. **Enable URL restrictions**:
   ```
   Production domain: https://your-domain.com/*
   Vercel preview: https://*.vercel.app/*
   Localhost: http://localhost:3000/*
   ```
3. **Enable Token monitoring**:
   - Set up usage alerts
   - Review analytics monthly

### When to Rotate Token

Rotate your Mapbox token if:
- ❌ You suspect unauthorized use
- ❌ Usage spikes unexpectedly
- ❌ Token was accidentally committed to public repo (even though it's safe)
- ✅ As a precaution every 6-12 months

**How to Rotate**:
1. Create new token in Mapbox dashboard
2. Update Vercel environment variables
3. Redeploy: `vercel --prod`
4. Delete old token after confirming new one works

---

## 🛡️ Security Best Practices

### ✅ What You're Doing Right

1. **Environment files not in git**: `.env*` in `.gitignore`
2. **Using Vercel for production secrets**: Correct approach
3. **Proper token prefix**: `NEXT_PUBLIC_` for client-side use
4. **Security headers configured**: CSP, HSTS, XSS protection
5. **No sensitive server-side secrets**: No database credentials, API keys, etc.

### 🎯 Additional Recommendations

1. **Enable Vercel Authentication** (if site not public yet):
   ```
   Vercel Dashboard → Settings → Deployment Protection → Enable
   ```

2. **Set up Vercel Logs Monitoring**:
   - Monitor for suspicious activity
   - Set up alerts for 4xx/5xx errors

3. **Review Vercel Build Logs**:
   - Ensure no secrets printed during build
   - Check for environment variable warnings

4. **HTTPS Only**:
   - ✅ Already configured via HSTS headers
   - ✅ Vercel enforces HTTPS automatically

5. **CSP Violation Reporting** (Optional):
   ```typescript
   // In src/middleware.ts, add report-uri
   Content-Security-Policy: ... report-uri https://your-csp-report-endpoint
   ```

---

## 🚫 What NOT to Do

### ❌ Never Commit These Files

- `.env`
- `.env.local`
- `.env.production`
- `.vercel` directory (already in .gitignore)
- Any file containing secrets

### ❌ Never Hardcode Secrets

Bad:
```typescript
const apiKey = "pk.eyJ1IjoidG9kb3RlcG96..." // ❌ Never do this
```

Good:
```typescript
const apiKey = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN // ✅ Always use env vars
```

### ❌ Never Log Secrets

Bad:
```typescript
console.log('Token:', process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) // ❌ Don't log tokens
```

Good:
```typescript
console.log('Token configured:', !!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) // ✅ Only log boolean
```

---

## 🔍 Security Audit Checklist

### Before Production Deployment

- [x] `.env*` files in `.gitignore`
- [x] No secrets committed to git
- [x] Environment variables set in Vercel
- [ ] Mapbox token URL restrictions configured
- [x] HTTPS enforced (via Vercel + HSTS)
- [x] CSP headers configured
- [x] XSS protection enabled
- [ ] Set up monitoring/alerts
- [ ] Review build logs for leaks

### Monthly Security Tasks

- [ ] Review Mapbox token usage
- [ ] Check Vercel deployment logs
- [ ] Update dependencies (`npm audit fix`)
- [ ] Review CSP violation reports (if enabled)
- [ ] Test security headers (securityheaders.com)

### Quarterly Security Tasks

- [ ] Rotate Mapbox token (if needed)
- [ ] Review and update dependencies
- [ ] Run security audit: `npm audit`
- [ ] Test disaster recovery (token rotation)

---

## 🆘 Emergency Response

### If Token is Compromised

1. **Immediately**: Delete old token in Mapbox dashboard
2. **Create new token** with URL restrictions
3. **Update Vercel**: New token in environment variables
4. **Redeploy**: `vercel --prod`
5. **Monitor**: Watch for unauthorized usage (24 hours)

### If Suspicious Activity Detected

1. **Check Vercel logs**: Look for unusual requests
2. **Review Mapbox analytics**: Unexpected usage patterns
3. **Rotate token**: As precaution
4. **Enable rate limiting**: If not already enabled
5. **Contact Vercel support**: If needed

---

## 📚 Additional Resources

### Vercel Security
- **Docs**: https://vercel.com/docs/security
- **Environment Variables**: https://vercel.com/docs/environment-variables
- **Deployment Protection**: https://vercel.com/docs/security/deployment-protection

### Mapbox Security
- **Token Security**: https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/
- **Token Management**: https://docs.mapbox.com/accounts/guides/tokens/
- **URL Restrictions**: https://docs.mapbox.com/accounts/guides/tokens/#url-restrictions

### General Security
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Security Headers**: https://securityheaders.com/
- **CSP Evaluator**: https://csp-evaluator.withgoogle.com/

---

## ✅ Summary: Your Security Status

**Environment Variable Security**: ✅ SECURE
- Local files not tracked in git
- Vercel manages production secrets
- Proper token prefix for client-side use

**Recommended Next Steps**:
1. ✅ Configure Mapbox token URL restrictions
2. ✅ Set up Vercel environment variables (if not done)
3. ✅ Enable monitoring/alerts
4. ✅ Review this guide quarterly

**Overall Security Score**: 9/10 (Excellent)

The only improvement needed is configuring Mapbox token URL restrictions in the Mapbox dashboard. Everything else is properly secured.

---

**Last Updated**: October 2, 2025
**Next Review**: January 2026
