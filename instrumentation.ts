/**
 * Instrumentation File
 *
 * This file runs once when your Next.js server starts up.
 * Use it for global setup: observability, monitoring, error tracking, etc.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

/**
 * Register function - Called once on server startup
 */
export async function register() {
  // Only run on server (not edge runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side initialization
    console.log('=€ Tepoztlán Tourism Guide - Server Starting')
    console.log(`   Environment: ${process.env.NODE_ENV}`)
    console.log(`   Node Version: ${process.version}`)

    // Example: Initialize Sentry (uncomment when ready)
    // if (process.env.SENTRY_DSN) {
    //   const Sentry = await import('@sentry/nextjs')
    //   Sentry.init({
    //     dsn: process.env.SENTRY_DSN,
    //     environment: process.env.NODE_ENV,
    //     tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    //   })
    //   console.log('    Sentry initialized')
    // }

    // Example: Initialize performance monitoring
    // if (process.env.NODE_ENV === 'production') {
    //   // Your APM tool initialization
    //   console.log('    Performance monitoring enabled')
    // }

    // Validate environment variables at startup
    try {
      await import('./src/lib/env')
      console.log('    Environment variables validated')
    } catch (error) {
      console.error('    Environment validation failed:', error)
      if (process.env.NODE_ENV === 'production') {
        process.exit(1) // Fail fast in production
      }
    }

    console.log('')
  }

  // Edge runtime initialization (if using edge functions)
  if (process.env.NEXT_RUNTIME === 'edge') {
    console.log('< Edge Runtime - Initialization')

    // Edge-compatible monitoring (e.g., Sentry Edge)
    // const Sentry = await import('@sentry/nextjs')
    // Sentry.init({ ... })
  }
}

/**
 * onRequestError - Global error handler (Next.js 15+)
 *
 * Catches unhandled errors in:
 * - Server components
 * - API routes
 * - Middleware
 * - Server actions
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/instrumentation
 */
export async function onRequestError(
  err: Error & { digest?: string },
  request: {
    path: string
    method: string
    headers: Record<string, string | string[]>
  },
  context: {
    routerKind: 'Pages Router' | 'App Router'
    routePath: string
    routeType: 'render' | 'route' | 'action' | 'middleware'
  }
) {
  // Log error details
  console.error('L Request Error:', {
    message: err.message,
    digest: err.digest,
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
  })

  // Send to error tracking service
  // Example: Sentry
  // if (typeof Sentry !== 'undefined') {
  //   Sentry.captureException(err, {
  //     tags: {
  //       routerKind: context.routerKind,
  //       routeType: context.routeType,
  //     },
  //     extra: {
  //       path: request.path,
  //       method: request.method,
  //       digest: err.digest,
  //     },
  //   })
  // }

  // Example: Custom logging service
  // await fetch('https://your-logging-service.com/api/errors', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     error: err.message,
  //     stack: err.stack,
  //     path: request.path,
  //     timestamp: new Date().toISOString(),
  //   }),
  // })
}
