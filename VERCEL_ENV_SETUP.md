# Quick Vercel Environment Setup

## 🚀 Copy-Paste Ready for Vercel Dashboard

### Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

---

## Required Environment Variables

### 1. NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

**Variable Name**:
```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
```

**Value** (your current token):
```
pk.eyJ1IjoidG9kb3RlcG96IiwiYSI6ImNtZmR2OHRnNDAwMzQybm9qb2NrZXI4OHkifQ.i4ZoHEk9PiJDmUWgcOqhVg
```

**Environments**: ✅ Production | ✅ Preview | ✅ Development

---

### 2. NEXT_PUBLIC_SITE_URL

**Variable Name**:
```
NEXT_PUBLIC_SITE_URL
```

**Value for Production**:
```
https://your-actual-domain.com
```
(Replace with your real domain when you have it)

**OR if using Vercel subdomain**:
```
https://your-project.vercel.app
```

**Environments**: ✅ Production | ✅ Preview

---

**For Development Environment** (separate entry):

**Variable Name**:
```
NEXT_PUBLIC_SITE_URL
```

**Value**:
```
http://localhost:3000
```

**Environments**: ✅ Development only

---

## Optional: Google Analytics

### 3. NEXT_PUBLIC_GA_MEASUREMENT_ID (Optional)

**Variable Name**:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

**Value** (get from https://analytics.google.com):
```
G-XXXXXXXXXX
```
(Replace with your actual GA4 measurement ID)

**Environments**: ✅ Production only

---

## ⚙️ Configuration Steps

### Via Vercel Dashboard (Recommended)

1. **Login to Vercel**: https://vercel.com/dashboard
2. **Select your project**
3. **Navigate to**: Settings → Environment Variables
4. **For each variable above**:
   - Click "Add New"
   - Paste Variable Name
   - Paste Value
   - Select Environment(s)
   - Click "Save"

### Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Login
vercel login

# Link project (if not already linked)
vercel link

# Add variables interactively
vercel env add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
# When prompted, paste the token value
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_SITE_URL
# When prompted, paste: https://your-domain.com
# Select: Production, Preview

# Add GA (optional)
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
# When prompted, paste: G-XXXXXXXXXX
# Select: Production
```

---

## 🔒 Secure Your Mapbox Token

After adding to Vercel, go to Mapbox dashboard:

1. **Login**: https://account.mapbox.com/
2. **Navigate to**: Account → Tokens
3. **Select your token**: "todotepoz" or create new
4. **Click**: "Edit token"
5. **Add URL restrictions**:
   ```
   https://your-domain.com/*
   https://*.vercel.app/*
   http://localhost:3000/*
   ```
6. **Save**

This ensures your token only works on your domains.

---

## ✅ Verification Checklist

After setting environment variables:

- [ ] All 3 variables added to Vercel (2 required + 1 optional)
- [ ] Production environment selected for all
- [ ] Preview environment selected for MAPBOX and SITE_URL
- [ ] Development environment selected for MAPBOX only
- [ ] SITE_URL points to correct domain
- [ ] Mapbox token URL restrictions configured
- [ ] Redeploy triggered (or will deploy on next push)

---

## 🚀 Deploy After Configuration

```bash
# Via CLI
vercel --prod

# Or via Git
git push origin main  # Vercel auto-deploys
```

---

## 🔍 Verify After Deployment

1. **Check build logs**: Vercel Dashboard → Deployments → Latest → Build Logs
2. **Test site**: Open your production URL
3. **Check maps**: Verify Mapbox maps load correctly
4. **Check console**: No errors about missing env vars
5. **Test social sharing**: Share a link, verify metadata

---

## ⚠️ Common Issues

### Maps not loading?
- Check NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is set
- Verify token starts with `pk.`
- Check Mapbox URL restrictions allow your domain

### Wrong site URL in metadata?
- Verify NEXT_PUBLIC_SITE_URL is correct
- Check it doesn't have trailing slash
- Redeploy after changing

### Analytics not working?
- Check NEXT_PUBLIC_GA_MEASUREMENT_ID format: `G-XXXXXXXXXX`
- Verify it's only set in Production
- Wait 24 hours for data to appear

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs/environment-variables
- **Mapbox Docs**: https://docs.mapbox.com/accounts/guides/tokens/
- **This Project**: See `SECURITY.md` for detailed security guide

---

**Quick Reference Created**: October 2, 2025
