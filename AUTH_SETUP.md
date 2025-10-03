# NextAuth.js v5 (Auth.js) Setup - Complete

## ✅ Implementation Complete

The Tepoztlán website now has a complete authentication system using **NextAuth.js v5** (Auth.js) with **Neon PostgreSQL** and **Drizzle ORM**.

---

## 🎯 What's Implemented

### 1. Database Schema (Auth.js Tables)

Added 5 Auth.js tables to `src/lib/db/schema.ts`:

- **`user`** - Extended Auth.js user table with custom fields (role, phone, preferredLanguage)
- **`account`** - OAuth provider accounts (Google, etc.)
- **`session`** - Active user sessions
- **`verificationToken`** - Email verification tokens
- **`authenticator`** - WebAuthn/Passkeys support

**Key Changes:**
- User ID changed from `serial` to `text` (UUID) to match Auth.js requirements
- Updated all foreign key references (businesses, reviews, favorites, blogPosts) to use `text` user IDs
- Added custom fields: `role`, `phone`, `preferredLanguage`

### 2. Auth Configuration (`auth.ts`)

Created root-level configuration with:
- **Drizzle adapter** for database integration
- **Google OAuth provider** configured
- **Database session strategy** (sessions stored in DB)
- **Custom session callback** to add user ID and role to session

### 3. Auth Route Handler

Created API route: `src/app/api/auth/[...nextauth]/route.ts`
- Handles OAuth callbacks
- Manages sign-in/sign-out

### 4. Authentication UI

**Sign-In Page:** `src/app/[lang]/auth/signin/page.tsx`
- Clean, centered design
- Google OAuth button with branding
- Server action for sign-in

**User Menu Component:** `src/components/auth/user-menu.tsx`
- Shows "Sign In" button when logged out
- Shows user avatar, name, and "Sign Out" button when logged in
- Server component using session data

### 5. TypeScript Types

Created `src/types/next-auth.d.ts`:
- Extended NextAuth session type with custom fields
- Added `id` and `role` to session user

---

## 📦 Dependencies Installed

```json
{
  "dependencies": {
    "next-auth": "^5.0.0-beta.29",
    "@auth/drizzle-adapter": "^1.10.0",
    "@neondatabase/serverless": "^1.0.2",
    "drizzle-orm": "^0.44.6"
  },
  "devDependencies": {
    "drizzle-kit": "latest"
  }
}
```

---

## 🔐 Environment Variables

### Required Variables (Auto-generated)

The `AUTH_SECRET` was automatically generated using:
```bash
npx auth secret
```

This created a random secret in `.env.local`.

### Google OAuth Setup (Manual)

To enable Google sign-in, you need to:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/apis/credentials
2. **Create OAuth 2.0 credentials**:
   - Application type: Web application
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://your-domain.com/api/auth/callback/google`
3. **Copy credentials to `.env.local`**:

```env
# .env.local
AUTH_SECRET=your_auto_generated_secret_here
AUTH_URL=http://localhost:3000

AUTH_GOOGLE_ID=your_google_client_id_here
AUTH_GOOGLE_SECRET=your_google_client_secret_here
```

---

## 🚀 How to Use

### In Server Components

```typescript
import { auth } from '@/auth'

export default async function MyPage() {
  const session = await auth()

  if (!session) {
    return <div>Not logged in</div>
  }

  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <p>Role: {session.user.role}</p>
    </div>
  )
}
```

### In Server Actions

```typescript
'use server'

import { auth } from '@/auth'

export async function createReview(data: ReviewData) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Not authenticated')
  }

  // Create review with session.user.id
  await db.insert(reviews).values({
    userId: session.user.id,
    ...data,
  })
}
```

### Sign-In/Sign-Out

```typescript
import { signIn, signOut } from '@/auth'

// Sign in with Google
await signIn('google', { redirectTo: '/' })

// Sign out
await signOut({ redirectTo: '/' })
```

### Using the User Menu

Add to your navigation component:

```typescript
import { UserMenu } from '@/components/auth/user-menu'

export function Navigation() {
  return (
    <nav>
      {/* Other nav items */}
      <UserMenu />
    </nav>
  )
}
```

---

## 📊 Database Migration

### Option 1: Push Schema (Recommended for Development)

```bash
npm run db:push
```

This creates/updates all tables including the new Auth.js tables.

### Option 2: Generate Migration (Recommended for Production)

```bash
npm run db:generate
npm run db:migrate
```

---

## 🔒 Session Management

**Session Strategy:** Database sessions
- Sessions are stored in the `session` table
- More secure than JWT sessions
- Sessions expire after 30 days (default)
- Automatically refreshed on activity

**Session Data Available:**
```typescript
{
  user: {
    id: string
    name: string
    email: string
    image: string
    role: 'user' | 'business_owner' | 'admin'
  }
}
```

---

## 🎨 Customization

### Add More Providers

Edit `auth.ts`:

```typescript
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({ ... }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  // ...
})
```

### Customize Sign-In Page

The sign-in page is at `src/app/[lang]/auth/signin/page.tsx`. You can:
- Add more provider buttons
- Add email/password authentication
- Customize the design
- Add language support

### Protect Routes

Create middleware (`middleware.ts` in root):

```typescript
export { auth as middleware } from '@/auth'

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
```

---

## 🧪 Testing Authentication

### 1. Start the dev server:
```bash
npm run dev
```

### 2. Visit the sign-in page:
```
http://localhost:3000/auth/signin
```

### 3. Click "Continue with Google"
- You'll be redirected to Google
- Authorize the app
- You'll be redirected back to the homepage
- Your session is now active

### 4. Check session data:
Create a test page to inspect the session:

```typescript
// src/app/[lang]/test-auth/page.tsx
import { auth } from '@/auth'

export default async function TestAuthPage() {
  const session = await auth()
  return <pre>{JSON.stringify(session, null, 2)}</pre>
}
```

---

## 📝 Next Steps

### Phase 1: User Features
- [ ] Add user profile page (`/profile`)
- [ ] Allow users to update their profile (name, phone, language)
- [ ] Show user's favorites on profile page
- [ ] Show user's reviews on profile page

### Phase 2: Business Features
- [ ] Allow business owners to claim listings
- [ ] Business owner dashboard
- [ ] Respond to reviews as business owner

### Phase 3: Admin Features
- [ ] Admin dashboard
- [ ] Approve/reject business listings
- [ ] Moderate reviews
- [ ] Manage users

---

## 🆘 Troubleshooting

### "AUTH_SECRET is not set"
**Fix:** Run `npx auth secret` to generate one automatically

### "OAuth error: redirect_uri_mismatch"
**Fix:** Check that the redirect URI in Google Console matches exactly:
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://your-domain.com/api/auth/callback/google`

### "Table 'user' does not exist"
**Fix:** Run `npm run db:push` to create all tables

### Session not persisting
**Fix:** Check that `DATABASE_URL` is correct and database is accessible

---

## 🔗 Resources

- **Auth.js Docs:** https://authjs.dev
- **NextAuth v5 Migration:** https://authjs.dev/getting-started/migrating-to-v5
- **Drizzle Adapter:** https://authjs.dev/getting-started/adapters/drizzle
- **Google OAuth Setup:** https://console.cloud.google.com/apis/credentials

---

**Status: ✅ READY TO USE**

Once you add Google OAuth credentials to `.env.local` and run `npm run db:push`, authentication is fully functional!
