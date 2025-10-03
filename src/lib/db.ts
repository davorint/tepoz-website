import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

// During build time, DATABASE_URL might not be available
// This is okay since we're not actually connecting during builds
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://placeholder@localhost/placeholder'

// Create Neon HTTP connection
const sql = neon(DATABASE_URL)

// Create Drizzle database instance
export const db = drizzle(sql)

// Export sql for raw queries if needed
export { sql }
