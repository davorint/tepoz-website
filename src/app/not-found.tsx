import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, MapPin, Compass } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-[150px] md:text-[200px] font-bold leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              404
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-6 border border-white/20">
              <Compass className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Página No Encontrada
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white/80 mb-6">
          Page Not Found
        </h2>

        <p className="text-xl text-white/70 mb-8 max-w-2xl">
          Lo sentimos, la página que buscas no existe o ha sido movida.
          <br />
          <span className="text-white/60 text-lg">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/es">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Button>
          </Link>

          <Link href="/en">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-3xl w-full">
          <h3 className="text-xl font-bold text-white mb-6">
            Páginas Populares / Popular Pages
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/es/food-drink/restaurants" className="group">
              <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-lg p-2">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Restaurantes</div>
                    <div className="text-white/60 text-sm">Restaurants</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/es/stay/hotels" className="group">
              <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg p-2">
                    <span className="text-2xl">🏨</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Hoteles</div>
                    <div className="text-white/60 text-sm">Hotels</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/es/experience" className="group">
              <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg p-2">
                    <span className="text-2xl">⛰️</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Experiencias</div>
                    <div className="text-white/60 text-sm">Experiences</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/es/search" className="group">
              <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-2">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Buscar</div>
                    <div className="text-white/60 text-sm">Search</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/es/discover/tepoztlan" className="group">
              <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-2">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Descubre Tepoztlán</div>
                    <div className="text-white/60 text-sm">Discover Tepoztlán</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/es/events" className="group">
              <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-lg p-2">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Eventos</div>
                    <div className="text-white/60 text-sm">Events</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-white/50 text-sm mt-8">
          Si crees que esto es un error, por favor <Link href="/es/info/contact" className="underline hover:text-white">contáctanos</Link>.
          <br />
          If you think this is an error, please <Link href="/en/info/contact" className="underline hover:text-white">contact us</Link>.
        </p>
      </div>
    </div>
  )
}
