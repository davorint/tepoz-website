import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * Language-specific Not Found Page
 *
 * Displayed when a route within [lang] directory doesn't match.
 * Provides localized 404 experience.
 */
export default function LangNotFound() {
  // Note: We can't access params in not-found.tsx, so we show bilingual content
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-amber-500 dark:text-amber-400 mb-4">
              404
            </div>
            <div className="w-24 h-1 bg-amber-500 dark:bg-amber-400 mx-auto rounded-full"></div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Página no encontrada
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">
            Page not found
          </p>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 mb-2 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          {/* Tepoztlán-specific suggestions */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              ¿Qué te gustaría descubrir? / What would you like to discover?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/es/hospedaje/hoteles" className="group">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-500 dark:hover:border-amber-400 transition-colors">
                  <div className="text-3xl mb-2">🏨</div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Hospedaje
                  </div>
                </div>
              </Link>
              <Link href="/es/comer/restaurantes" className="group">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-500 dark:hover:border-amber-400 transition-colors">
                  <div className="text-3xl mb-2">🍽️</div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Restaurantes
                  </div>
                </div>
              </Link>
              <Link href="/es/experiencias" className="group">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-500 dark:hover:border-amber-400 transition-colors">
                  <div className="text-3xl mb-2">⛰️</div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Experiencias
                  </div>
                </div>
              </Link>
              <Link href="/es/eventos" className="group">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-amber-500 dark:hover:border-amber-400 transition-colors">
                  <div className="text-3xl mb-2">🎉</div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Eventos
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto">
                🏠 Ir al inicio / Go home
              </Button>
            </Link>
            <Link href="/es/buscar">
              <Button variant="outline" className="border-slate-300 dark:border-slate-600 w-full sm:w-auto">
                🔍 Buscar / Search
              </Button>
            </Link>
          </div>

          {/* Language Switch */}
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/es"
              className="text-sm text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
            >
              Español
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link
              href="/en"
              className="text-sm text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
            >
              English
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ¿Crees que esto es un error? Por favor contáctanos.
              <br />
              Think this is an error? Please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
