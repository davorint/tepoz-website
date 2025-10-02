'use client'

import { useEffect } from 'react'

/**
 * Global Error Boundary
 *
 * Catches errors that occur in the root layout.
 * Must include <html> and <body> tags since it replaces the root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errortsx
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error - Tepoztlán Tourism Guide</title>
      </head>
      <body className="antialiased">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-lg shadow-xl p-8 text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Error crítico / Critical Error
              </h1>

              {/* Error Message */}
              <p className="text-slate-600 mb-6">
                Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                A critical error occurred. Please reload the page.
              </p>

              {/* Error Details (development only) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-6 p-4 bg-slate-100 rounded-md text-left">
                  <p className="text-xs font-mono text-red-600 break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs font-mono text-slate-500 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                  {error.stack && (
                    <pre className="text-xs font-mono text-slate-500 mt-2 overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors"
                >
                  Intentar nuevamente / Try again
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-md border border-slate-300 transition-colors"
                >
                  Recargar página / Reload page
                </button>
              </div>

              {/* Support Link */}
              <p className="text-xs text-slate-500 mt-6">
                Error ID: {error.digest || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
