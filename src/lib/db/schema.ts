import { pgTable, text, serial, integer, boolean, timestamp, decimal, json, varchar, pgEnum, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import type { AdapterAccountType } from '@auth/core/adapters'

// Enums
export const categoryEnum = pgEnum('category', ['restaurant', 'hotel', 'cafe', 'bar', 'experience', 'event', 'shop', 'service'])
export const subcategoryEnum = pgEnum('subcategory', ['restaurant', 'hotel', 'eco-lodge', 'vacation-rental', 'hostel', 'retreat', 'camping', 'cafe', 'bakery', 'bar', 'pulqueria', 'street-food', 'hiking', 'wellness', 'cultural', 'adventure', 'spiritual', 'tour', 'festival', 'market', 'craft', 'gallery', 'transport', 'medical', 'financial'])
export const intensityEnum = pgEnum('intensity', ['low', 'medium', 'high', 'extreme'])
export const userRoleEnum = pgEnum('user_role', ['user', 'business_owner', 'admin'])
// Booking status enum removed - not implementing booking system

// Auth.js Users table (Extended with custom fields)
export const users = pgTable('user', {
  // Auth.js required fields
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),

  // Custom fields for our app
  role: userRoleEnum('role').default('user').notNull(),
  phone: varchar('phone', { length: 50 }),
  preferredLanguage: varchar('preferred_language', { length: 2 }).default('es'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Auth.js Accounts table
export const accounts = pgTable('account', {
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').$type<AdapterAccountType>().notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (account) => ({
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] })
}))

// Auth.js Sessions table
export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

// Auth.js Verification Tokens table
export const verificationTokens = pgTable('verificationToken', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (verificationToken) => ({
  compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] })
}))

// Auth.js Authenticators table (for passkeys/WebAuthn)
export const authenticators = pgTable('authenticator', {
  credentialID: text('credentialID').notNull().unique(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  providerAccountId: text('providerAccountId').notNull(),
  credentialPublicKey: text('credentialPublicKey').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credentialDeviceType').notNull(),
  credentialBackedUp: boolean('credentialBackedUp').notNull(),
  transports: text('transports'),
}, (authenticator) => ({
  compositePK: primaryKey({ columns: [authenticator.userId, authenticator.credentialID] })
}))

// Businesses table (main table for all listings)
export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: categoryEnum('category').notNull(),
  subcategory: subcategoryEnum('subcategory').notNull(),

  // Names and descriptions (bilingual)
  nameEs: varchar('name_es', { length: 255 }).notNull(),
  nameEn: varchar('name_en', { length: 255 }).notNull(),
  descriptionEs: text('description_es').notNull(),
  descriptionEn: text('description_en').notNull(),

  // Location
  addressEs: text('address_es').notNull(),
  addressEn: text('address_en').notNull(),
  neighborhood: varchar('neighborhood', { length: 100 }),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),

  // Contact
  phone: varchar('phone', { length: 50 }),
  whatsapp: varchar('whatsapp', { length: 50 }),
  email: varchar('email', { length: 255 }),
  website: text('website'),

  // Images
  images: json('images').$type<string[]>().default([]),

  // Features
  amenitiesEs: json('amenities_es').$type<string[]>().default([]),
  amenitiesEn: json('amenities_en').$type<string[]>().default([]),

  // Pricing
  priceEs: varchar('price_es', { length: 100 }),
  priceEn: varchar('price_en', { length: 100 }),
  priceLevel: integer('price_level').default(2), // 1-4 ($-$$$$)

  // Status
  verified: boolean('verified').default(false),
  featured: boolean('featured').default(false),
  active: boolean('active').default(true),

  // Operating hours (JSON)
  operatingHours: json('operating_hours').$type<{
    monday: { open: string; close: string; closed?: boolean }
    tuesday: { open: string; close: string; closed?: boolean }
    wednesday: { open: string; close: string; closed?: boolean }
    thursday: { open: string; close: string; closed?: boolean }
    friday: { open: string; close: string; closed?: boolean }
    saturday: { open: string; close: string; closed?: boolean }
    sunday: { open: string; close: string; closed?: boolean }
  }>(),

  // Additional features
  hasWifi: boolean('has_wifi').default(false),
  hasParking: boolean('has_parking').default(false),
  acceptsCards: boolean('accepts_cards').default(false),
  isPetFriendly: boolean('is_pet_friendly').default(false),
  isAccessible: boolean('is_accessible').default(false),

  // Ratings
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),

  // Owner
  ownerId: text('owner_id').references(() => users.id),

  // SEO
  metaTitleEs: varchar('meta_title_es', { length: 255 }),
  metaTitleEn: varchar('meta_title_en', { length: 255 }),
  metaDescriptionEs: text('meta_description_es'),
  metaDescriptionEn: text('meta_description_en'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Hotels (extends businesses with hotel-specific fields)
export const hotels = pgTable('hotels', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id).notNull().unique(),

  // Hotel-specific
  rooms: integer('rooms'),
  checkInTime: varchar('check_in_time', { length: 10 }),
  checkOutTime: varchar('check_out_time', { length: 10 }),

  // Amenities
  hasPool: boolean('has_pool').default(false),
  hasSpa: boolean('has_spa').default(false),
  hasRestaurant: boolean('has_restaurant').default(false),
  hasGym: boolean('has_gym').default(false),
  hasBar: boolean('has_bar').default(false),

  // Sustainability
  sustainable: boolean('sustainable').default(false),
  ecoFriendly: boolean('eco_friendly').default(false),
})

// Restaurants (extends businesses with restaurant-specific fields)
export const restaurants = pgTable('restaurants', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id).notNull().unique(),

  // Restaurant-specific
  cuisineEs: json('cuisine_es').$type<string[]>().default([]),
  cuisineEn: json('cuisine_en').$type<string[]>().default([]),
  dietaryOptionsEs: json('dietary_options_es').$type<string[]>().default([]),
  dietaryOptionsEn: json('dietary_options_en').$type<string[]>().default([]),

  // Features
  hasOutdoorSeating: boolean('has_outdoor_seating').default(false),
  hasDelivery: boolean('has_delivery').default(false),
  hasTakeout: boolean('has_takeout').default(false),
  reservationsRequired: boolean('reservations_required').default(false),
})

// Experiences (extends businesses with experience-specific fields)
export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id).notNull().unique(),

  // Experience-specific
  durationEs: varchar('duration_es', { length: 100 }),
  durationEn: varchar('duration_en', { length: 100 }),
  maxParticipants: integer('max_participants'),
  minParticipants: integer('min_participants').default(1),
  intensity: intensityEnum('intensity').default('low'),

  // What's included
  includesEs: json('includes_es').$type<string[]>().default([]),
  includesEn: json('includes_en').$type<string[]>().default([]),
  excludesEs: json('excludes_es').$type<string[]>().default([]),
  excludesEn: json('excludes_en').$type<string[]>().default([]),

  // Requirements
  requirementsEs: json('requirements_es').$type<string[]>().default([]),
  requirementsEn: json('requirements_en').$type<string[]>().default([]),

  // Highlights
  highlightsEs: json('highlights_es').$type<string[]>().default([]),
  highlightsEn: json('highlights_en').$type<string[]>().default([]),

  // Features
  indigenous: boolean('indigenous').default(false),
  sustainable: boolean('sustainable').default(false),
})

// Events
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id),

  // Event details
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  titleEs: varchar('title_es', { length: 255 }).notNull(),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  descriptionEs: text('description_es').notNull(),
  descriptionEn: text('description_en').notNull(),

  // Dates
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  isRecurring: boolean('is_recurring').default(false),
  recurrencePattern: text('recurrence_pattern'), // e.g., "weekly", "monthly"

  // Location
  locationEs: text('location_es').notNull(),
  locationEn: text('location_en').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),

  // Pricing
  isFree: boolean('is_free').default(false),
  priceEs: varchar('price_es', { length: 100 }),
  priceEn: varchar('price_en', { length: 100 }),

  // Media
  images: json('images').$type<string[]>().default([]),

  // Status
  featured: boolean('featured').default(false),
  active: boolean('active').default(true),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),

  // Review content
  rating: integer('rating').notNull(), // 1-5
  titleEs: varchar('title_es', { length: 255 }),
  titleEn: varchar('title_en', { length: 255 }),
  contentEs: text('content_es').notNull(),
  contentEn: text('content_en'),

  // Photos
  photos: json('photos').$type<string[]>().default([]),

  // Status
  verified: boolean('verified').default(false),
  helpful: integer('helpful').default(0),

  // Response from business
  responseEs: text('response_es'),
  responseEn: text('response_en'),
  respondedAt: timestamp('responded_at'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// BOOKINGS TABLE REMOVED - Site is informational only, not handling reservations

// Favorites/Wishlist
export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  businessId: integer('business_id').references(() => businesses.id).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Blog posts
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  // Content
  titleEs: varchar('title_es', { length: 255 }).notNull(),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  excerptEs: text('excerpt_es'),
  excerptEn: text('excerpt_en'),
  contentEs: text('content_es').notNull(),
  contentEn: text('content_en').notNull(),

  // Media
  coverImage: text('cover_image'),
  images: json('images').$type<string[]>().default([]),

  // Author
  authorId: text('author_id').references(() => users.id).notNull(),

  // Categories & Tags
  category: varchar('category', { length: 100 }),
  tagsEs: json('tags_es').$type<string[]>().default([]),
  tagsEn: json('tags_en').$type<string[]>().default([]),

  // SEO
  metaTitleEs: varchar('meta_title_es', { length: 255 }),
  metaTitleEn: varchar('meta_title_en', { length: 255 }),
  metaDescriptionEs: text('meta_description_es'),
  metaDescriptionEn: text('meta_description_en'),

  // Status
  published: boolean('published').default(false),
  featured: boolean('featured').default(false),
  publishedAt: timestamp('published_at'),

  // Stats
  views: integer('views').default(0),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Newsletter subscribers
export const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  language: varchar('language', { length: 2 }).default('es'),

  // Status
  active: boolean('active').default(true),
  verified: boolean('verified').default(false),
  verificationToken: varchar('verification_token', { length: 255 }),

  // Preferences
  interests: json('interests').$type<string[]>().default([]),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  unsubscribedAt: timestamp('unsubscribed_at'),
})

// Contact form submissions
export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).default('general'), // general, business, partnership

  // Status
  read: boolean('read').default(false),
  replied: boolean('replied').default(false),

  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  // Auth.js relations
  accounts: many(accounts),
  sessions: many(sessions),
  authenticators: many(authenticators),

  // Custom relations
  businesses: many(businesses),
  reviews: many(reviews),
  favorites: many(favorites),
  blogPosts: many(blogPosts),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  user: one(users, { fields: [authenticators.userId], references: [users.id] }),
}))

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  owner: one(users, {
    fields: [businesses.ownerId],
    references: [users.id],
  }),
  hotel: one(hotels),
  restaurant: one(restaurants),
  experience: one(experiences),
  reviews: many(reviews),
  favorites: many(favorites),
}))

export const hotelsRelations = relations(hotels, ({ one }) => ({
  business: one(businesses, {
    fields: [hotels.businessId],
    references: [businesses.id],
  }),
}))

export const restaurantsRelations = relations(restaurants, ({ one }) => ({
  business: one(businesses, {
    fields: [restaurants.businessId],
    references: [businesses.id],
  }),
}))

export const experiencesRelations = relations(experiences, ({ one }) => ({
  business: one(businesses, {
    fields: [experiences.businessId],
    references: [businesses.id],
  }),
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
  business: one(businesses, {
    fields: [reviews.businessId],
    references: [businesses.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}))

// Bookings relations removed - no booking system

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [favorites.businessId],
    references: [businesses.id],
  }),
}))

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}))
