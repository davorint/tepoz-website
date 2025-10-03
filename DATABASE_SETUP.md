# Database Setup Guide - Neon + Drizzle ORM

This guide will help you set up the Neon PostgreSQL database for the Tepoztlán tourism website.

## 🎯 What We've Set Up

✅ Installed Neon serverless PostgreSQL driver
✅ Installed Drizzle ORM for type-safe database queries
✅ Created comprehensive database schema with 15+ tables
✅ Set up Drizzle configuration
✅ Added database scripts to package.json

## 📋 Database Schema Overview

The schema includes:

### Core Tables
- **users** - User accounts (visitors, business owners, admins)
- **businesses** - Main table for all business listings (restaurants, hotels, experiences, etc.)
- **hotels** - Hotel-specific fields (extends businesses)
- **restaurants** - Restaurant-specific fields (extends businesses)
- **experiences** - Experience/activity-specific fields (extends businesses)
- **events** - Events and festivals
- **reviews** - User reviews for businesses
- **bookings** - Reservations and bookings
- **favorites** - User wishlist/saved items

### Content & Communication
- **blog_posts** - Blog articles
- **subscribers** - Newsletter subscribers
- **contact_submissions** - Contact form submissions

### Features
- Bilingual support (Spanish/English) built into schema
- Full-text search ready
- Rating and review system
- Booking/reservation system
- User authentication ready
- SEO-optimized fields

---

## 🚀 Step 1: Create a Neon Account

1. Go to https://console.neon.tech/
2. Sign up for a free account (no credit card required)
3. Create a new project:
   - **Project name:** tepoztlan-website
   - **Region:** Choose closest to your users (e.g., US East for Mexico)
   - **PostgreSQL version:** 16 (latest)

---

## 🔑 Step 2: Get Your Connection String

1. In your Neon dashboard, click on your project
2. Go to "Connection Details"
3. Copy the connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

---

## ⚙️ Step 3: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your Neon connection string to `.env`:
   ```env
   DATABASE_URL=postgresql://username:password@ep-xxx-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

3. **Important:** Make sure `.env` is in your `.gitignore` (it already is)

---

## 🗄️ Step 4: Generate and Push Database Schema

### Option A: Push Schema Directly (Recommended for Development)

This is the fastest way to get started:

```bash
npm run db:push
```

This command will:
- Read your schema from `src/lib/db/schema.ts`
- Create all tables in your Neon database
- No migration files generated (great for rapid development)

### Option B: Generate Migrations (Recommended for Production)

For version-controlled migrations:

```bash
# Generate migration files
npm run db:generate

# Apply migrations to database
npm run db:migrate
```

---

## 🎨 Step 5: Explore Your Database (Optional)

Drizzle Studio provides a visual database browser:

```bash
npm run db:studio
```

This opens a local web interface where you can:
- Browse tables
- View/edit data
- Run queries
- Test relationships

---

## 📊 Step 6: Seed the Database (Coming Next)

After the schema is pushed, you'll want to populate it with your existing data:

```bash
npm run db:seed
```

*(We'll create the seed script next to migrate your mock data to the database)*

---

## 🔍 Using the Database in Your Code

### Import the database connection:

```typescript
import { db } from '@/lib/db'
import { businesses, restaurants, users } from '@/lib/db/schema'
```

### Example Queries:

```typescript
// Get all restaurants
const allRestaurants = await db
  .select()
  .from(businesses)
  .where(eq(businesses.category, 'restaurant'))

// Get restaurant with details
const restaurant = await db
  .select()
  .from(businesses)
  .leftJoin(restaurants, eq(businesses.id, restaurants.businessId))
  .where(eq(businesses.slug, 'restaurant-slug'))
  .limit(1)

// Create a new review
await db.insert(reviews).values({
  businessId: 1,
  userId: 1,
  rating: 5,
  contentEs: 'Excelente restaurante!',
  contentEn: 'Excellent restaurant!',
})

// Update business rating
await db
  .update(businesses)
  .set({ rating: '4.5', reviewCount: 10 })
  .where(eq(businesses.id, 1))
```

---

## 🛠️ Available Database Scripts

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate migration files from schema |
| `npm run db:migrate` | Apply migrations to database |
| `npm run db:push` | Push schema directly (no migrations) |
| `npm run db:studio` | Open Drizzle Studio GUI |
| `npm run db:seed` | Seed database with initial data |

---

## 📝 Next Steps

1. ✅ **Create Neon account and get connection string** ← YOU ARE HERE
2. ⏳ Push schema to database (`npm run db:push`)
3. ⏳ Create seed script to migrate mock data
4. ⏳ Update application to use database instead of mock files
5. ⏳ Implement API routes for CRUD operations
6. ⏳ Add authentication (NextAuth.js)
7. ⏳ Build admin panel
8. ⏳ Implement booking system
9. ⏳ Add review system

---

## 🔒 Security Notes

- **Never commit `.env` file** - Contains sensitive database credentials
- **Use environment variables in production** - Set `DATABASE_URL` in Vercel/your hosting platform
- **Enable row-level security** - Configure in Neon dashboard for multi-tenant data
- **Use connection pooling** - Neon provides this automatically

---

## 📚 Resources

- [Neon Documentation](https://neon.tech/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs)
- [Drizzle Kit Documentation](https://orm.drizzle.team/kit-docs/overview)

---

## ⚠️ Troubleshooting

### Connection Error

**Error:** `Connection refused` or `Connection timeout`

**Solution:**
- Check your `DATABASE_URL` is correct
- Ensure your IP is allowed in Neon (it should be by default)
- Check if Neon service is running

### Schema Sync Issues

**Error:** `Schema is out of sync`

**Solution:**
```bash
npm run db:push --force
```

### Migration Conflicts

**Error:** `Migration conflict detected`

**Solution:**
```bash
# Reset migrations (dev only!)
rm -rf drizzle/
npm run db:generate
npm run db:migrate
```

---

**Need help?** Contact the development team or check the Neon/Drizzle documentation.
