import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  interval: number // Time window in ms
  maxRequests: number // Max requests per window
}

interface RateLimitStore {
  count: number
  resetTime: number
}

// In-memory store for rate limiting
// For production, use Redis or similar
const rateLimitStore = new Map<string, RateLimitStore>()

export function rateLimit(config: RateLimitConfig) {
  return async function rateLimitMiddleware(
    request: NextRequest,
    handler: () => Promise<NextResponse>
  ): Promise<NextResponse> {
    // Get client identifier (IP address)
    const identifier = getClientIdentifier(request)

    // Get or create rate limit entry
    const now = Date.now()
    let store = rateLimitStore.get(identifier)

    // Reset if window has expired
    if (!store || now > store.resetTime) {
      store = {
        count: 0,
        resetTime: now + config.interval,
      }
      rateLimitStore.set(identifier, store)
    }

    // Increment request count
    store.count++

    // Check if limit exceeded
    if (store.count > config.maxRequests) {
      const retryAfter = Math.ceil((store.resetTime - now) / 1000)

      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(store.resetTime).toISOString(),
          },
        }
      )
    }

    // Calculate remaining requests
    const remaining = config.maxRequests - store.count

    // Execute handler
    const response = await handler()

    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', new Date(store.resetTime).toISOString())

    return response
  }
}

function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')

  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0] || 'unknown'

  return ip
}

// Cleanup old entries periodically
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, store] of rateLimitStore.entries()) {
      if (now > store.resetTime + 3600000) { // Clean entries older than 1 hour
        rateLimitStore.delete(key)
      }
    }
  }, 60000) // Run every minute
}

// Preset configurations
export const rateLimitConfigs = {
  // Contact form: 5 requests per 15 minutes
  contactForm: {
    interval: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
  },
  // Review submission: 3 requests per hour
  reviews: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
  },
  // Newsletter: 2 requests per hour
  newsletter: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 2,
  },
  // General API: 100 requests per minute
  api: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 100,
  },
  // Search: 30 requests per minute
  search: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 30,
  },
}
