import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * Global Not Found Page
 *
 * Displayed when no route matches the requested URL.
 * This is a server component by default.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800">
      <div className="max-w-2xl w-full mx-4">
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

          {/* Helpful Links */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Páginas populares / Popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/es/hospedaje/hoteles">
                <Button variant="outline" size="sm" className="text-xs">
                  🏨 Hoteles / Hotels
                </Button>
              </Link>
              <Link href="/es/comer/restaurantes">
                <Button variant="outline" size="sm" className="text-xs">
                  🍽️ Restaurantes / Restaurants
                </Button>
              </Link>
              <Link href="/es/experiencias">
                <Button variant="outline" size="sm" className="text-xs">
                  ⛰️ Experiencias / Experiences
                </Button>
              </Link>
              <Link href="/es/eventos">
                <Button variant="outline" size="sm" className="text-xs">
                  🎉 Eventos / Events
                </Button>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/es">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto">
                Ir al inicio / Go home
              </Button>
            </Link>
            <Link href="/es/buscar">
              <Button variant="outline" className="border-slate-300 dark:border-slate-600 w-full sm:w-auto">
                Buscar / Search
              </Button>
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
