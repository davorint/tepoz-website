'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Algo salió mal
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
            Something went wrong
          </p>

          {/* Error Message */}
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            We&apos;re sorry, an unexpected error occurred. Please try again.
          </p>

          {/* Error Details (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-md text-left">
              <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Intentar nuevamente / Try again
            </Button>
            <Button
              onClick={() => window.location.href = '/es'}
              variant="outline"
              className="border-slate-300 dark:border-slate-600"
            >
              Ir al inicio / Go home
            </Button>
          </div>

          {/* Support Link */}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
            Si el problema persiste, por favor contáctanos.
            <br />
            If the problem persists, please contact us.
          </p>
        </div>
      </div>
    </div>
  )
}
