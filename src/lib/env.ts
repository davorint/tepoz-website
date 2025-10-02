/**
 * Environment Variables Validation
 *
 * Validates all environment variables at build time using Zod.
 * Provides type-safe access to env vars throughout the application.
 *
 * @see https://env.t3.gg/docs/introduction
 */

import { z } from 'zod'

/**
 * Environment variable schema
 * Add all required and optional environment variables here
 */
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // MapTiler API Key (Required for maps)
  NEXT_PUBLIC_MAPTILER_API_KEY: z
    .string()
    .min(1, 'MapTiler API key is required')
    .describe('Get from https://cloud.maptiler.com/'),

  // Mapbox Access Token (Required for maps)
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z
    .string()
    .startsWith('pk.', 'Mapbox token must start with pk.')
    .min(1, 'Mapbox access token is required')
    .describe('Get from https://account.mapbox.com/'),

  // Google Analytics 4 (Optional)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/, 'GA4 ID must start with G- followed by alphanumeric characters')
    .optional()
    .describe('Get from https://analytics.google.com/'),

  // Site URL (for metadata)
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL must be a valid URL')
    .default('https://tepoztlan.com'),
})

/**
 * Type-safe environment variables
 */
export type Env = z.infer<typeof envSchema>

/**
 * Validate and parse environment variables
 */
function validateEnv(): Env {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_MAPTILER_API_KEY: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
      NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment variable validation failed:')
      console.error('')

      error.errors.forEach((err) => {
        const path = err.path.join('.')
        console.error(`  • ${path}: ${err.message}`)
      })

      console.error('')
      console.error('Please check your .env.local file and ensure all required variables are set.')
      console.error('See .env.example for reference.')
      console.error('')

      // In production, fail fast
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Environment validation failed')
      }

      // In development, warn but allow to continue
      console.warn('⚠️  Continuing in development mode with invalid environment...')
      console.warn('')
    }

    throw error
  }
}

/**
 * Validated environment variables
 * Use this throughout the application instead of process.env
 *
 * @example
 * import { env } from '@/lib/env'
 *
 * const apiKey = env.NEXT_PUBLIC_MAPTILER_API_KEY
 */
export const env = validateEnv()

/**
 * Helper function to check if running in production
 */
export const isProduction = env.NODE_ENV === 'production'

/**
 * Helper function to check if running in development
 */
export const isDevelopment = env.NODE_ENV === 'development'

/**
 * Helper function to check if running in test mode
 */
export const isTest = env.NODE_ENV === 'test'

/**
 * Helper to get the site URL with correct protocol
 */
export function getSiteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL
}

/**
 * Helper to check if Google Analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  return !!env.NEXT_PUBLIC_GA_MEASUREMENT_ID
}
