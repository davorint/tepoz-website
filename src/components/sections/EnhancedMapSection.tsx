'use client'

import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search,
  Filter,
  Star,
  Sparkles,
  TrendingUp,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  Calendar,
  Bookmark
} from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface EnhancedMapSectionProps {
  lang: Locale
}

export default function EnhancedMapSection({ lang }: EnhancedMapSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden font-sans">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(16,185,129,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(6,182,212,0.2))]" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-emerald-400 to-cyan-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🗺️ {lang === 'es' ? 'Mapa Interactivo' : 'Interactive Map'} 🗺️
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {lang === 'es' ? 'Explora ' : 'Explore '}
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
              TEPOZTLÁN
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed mb-8">
            {lang === 'es' 
              ? 'Descubre lugares mágicos, restaurantes excepcionales y experiencias únicas en nuestro pueblo mágico'
              : 'Discover magical places, exceptional restaurants and unique experiences in our magical town'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-emerald-400 mb-2">7</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Lugares' : 'Places'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-cyan-400 mb-2">4.7</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Rating Promedio' : 'Average Rating'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">5K+</div>
              <div className="text-white/70 text-sm">{lang === 'es' ? 'Reseñas' : 'Reviews'}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-center text-3xl">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-white/70 text-sm">Trending</div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Search and Filters - Original Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            {/* *** ENHANCED SEARCH BAR WITH NEW FEATURES *** */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={lang === 'es' ? 'Buscar lugares, restaurantes, hoteles...' : 'Search places, restaurants, hotels...'}
                  value=""
                  readOnly
                  className="pl-12 pr-20 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 pointer-events-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <kbd className="px-2 py-1 text-xs text-white/40 bg-white/10 rounded border border-white/20">⌘K</kbd>
                </div>
              </div>
              <Button
                className="h-12 px-6 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white border-0 shadow-xl pointer-events-none"
              >
                <Filter className="w-4 h-4 mr-2" />
                {lang === 'es' ? 'Filtros' : 'Filters'}
              </Button>
              <Button
                className="h-12 px-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 pointer-events-none"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-sm mr-2" />
                {lang === 'es' ? 'Mapa' : 'Map'}
              </Button>
            </div>

            {/* Enhanced Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Select value="featured" disabled>
                  <SelectTrigger className="w-48 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="featured" className="text-white">{lang === 'es' ? 'Destacados' : 'Featured'}</SelectItem>
                    <SelectItem value="rating" className="text-white">{lang === 'es' ? 'Mejor Calificados' : 'Highest Rated'}</SelectItem>
                    <SelectItem value="distance" className="text-white">{lang === 'es' ? 'Más Cercanos' : 'Nearest'}</SelectItem>
                    <SelectItem value="name" className="text-white">{lang === 'es' ? 'Nombre' : 'Name'}</SelectItem>
                    <SelectItem value="price" className="text-white">{lang === 'es' ? 'Precio' : 'Price'}</SelectItem>
                    <SelectItem value="newest" className="text-white">{lang === 'es' ? 'Más Nuevos' : 'Newest'}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/70 text-sm">
                    2 {lang === 'es' ? 'resultados' : 'results'}
                  </span>
                  <div className="w-px h-4 bg-white/20 mx-2" />
                  <Clock className="w-3 h-3 text-white/50" />
                  <span className="text-white/50 text-xs">0.2s</span>
                </div>

                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white pointer-events-none">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {lang === 'es' ? 'Tendencias' : 'Trending'}
                </Button>

                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white pointer-events-none">
                  <MapPin className="w-4 h-4 mr-1" />
                  {lang === 'es' ? 'Cerca de mí' : 'Near me'}
                </Button>

                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white pointer-events-none">
                  <Users className="w-4 h-4 mr-1" />
                  {lang === 'es' ? 'Popular' : 'Popular'}
                </Button>
              </div>

              {/* Enhanced Category Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge 
                  className="cursor-pointer px-4 py-2 transition-all pointer-events-none bg-gradient-to-r from-emerald-400 to-cyan-400 text-white"
                >
                  {lang === 'es' ? 'Todos' : 'All'}
                  <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">2</span>
                </Badge>
                <Badge className="cursor-pointer px-4 py-2 transition-all pointer-events-none bg-white/10 text-white/70 hover:bg-white/20">
                  🏔️ {lang === 'es' ? 'Atracciones' : 'Attractions'}
                  <span className="ml-2 text-xs text-white/50">1</span>
                </Badge>
                <Badge className="cursor-pointer px-4 py-2 transition-all pointer-events-none bg-white/10 text-white/70 hover:bg-white/20">
                  🍽️ {lang === 'es' ? 'Restaurantes' : 'Restaurants'}
                  <span className="ml-2 text-xs text-white/50">1</span>
                </Badge>
                <Badge className="cursor-pointer px-4 py-2 transition-all pointer-events-none bg-white/10 text-white/70 hover:bg-white/20">
                  🏨 {lang === 'es' ? 'Hoteles' : 'Hotels'}
                  <span className="ml-2 text-xs text-white/50">0</span>
                </Badge>
                <Badge className="cursor-pointer px-4 py-2 transition-all pointer-events-none bg-white/10 text-white/70 hover:bg-white/20">
                  ☕ {lang === 'es' ? 'Cafeterías' : 'Cafes'}
                  <span className="ml-2 text-xs text-white/50">0</span>
                </Badge>
                <Badge className="cursor-pointer px-4 py-2 transition-all pointer-events-none bg-white/10 text-white/70 hover:bg-white/20">
                  🛍️ {lang === 'es' ? 'Compras' : 'Shopping'}
                  <span className="ml-2 text-xs text-white/50">0</span>
                </Badge>
                <Badge className="cursor-pointer px-4 py-2 transition-all pointer-events-none bg-white/10 text-white/70 hover:bg-white/20">
                  🎨 {lang === 'es' ? 'Cultura' : 'Culture'}
                  <span className="ml-2 text-xs text-white/50">0</span>
                </Badge>
              </div>
            </div>

            {/* Additional Quick Actions */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white pointer-events-none">
                    <Heart className="w-4 h-4 mr-2" />
                    {lang === 'es' ? 'Favoritos' : 'Favorites'}
                    <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full">3</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white pointer-events-none">
                    <Bookmark className="w-4 h-4 mr-2" />
                    {lang === 'es' ? 'Guardados' : 'Saved'}
                    <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full">1</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white pointer-events-none">
                    <Calendar className="w-4 h-4 mr-2" />
                    {lang === 'es' ? 'Planificador' : 'Planner'}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white pointer-events-none">
                    <Share2 className="w-4 h-4 mr-1" />
                    {lang === 'es' ? 'Compartir' : 'Share'}
                  </Button>
                  
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <span>•</span>
                    <span>{lang === 'es' ? 'Actualizado hace 2 min' : 'Updated 2 min ago'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* *** MAIN CONTENT - ONLY MAP PLACEHOLDER + SIDEBAR *** */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* *** BIG MAP PLACEHOLDER - LEFT SIDE *** */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                <div className="w-full h-[700px] bg-gradient-to-br from-red-600/80 to-red-800/80 relative rounded-2xl overflow-hidden flex items-center justify-center border-4 border-red-400/50">
                  <div className="text-center text-white">
                    <div className="text-9xl mb-6">🗺️</div>
                    <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                      {lang === 'es' ? 'MAPA INTERACTIVO' : 'INTERACTIVE MAP'}
                    </h3>
                    <p className="text-3xl font-semibold text-red-200">
                      {lang === 'es' ? 'PRÓXIMAMENTE DISPONIBLE' : 'COMING SOON'}
                    </p>
                    <div className="mt-8 px-8 py-4 bg-red-500/30 backdrop-blur-xl rounded-full border-2 border-red-300/60">
                      <p className="text-xl text-red-100 font-bold">
                        {lang === 'es' ? '🚧 AQUÍ APARECERÁ EL MAPA 🚧' : '🚧 MAP WILL APPEAR HERE 🚧'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* *** SIMPLE SIDEBAR - RIGHT SIDE *** */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {lang === 'es' ? 'Lugares Destacados' : 'Featured Places'}
            </h3>
            
            <div className="space-y-4">
              <Card className="border-0 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
                      <span className="text-lg">🏔️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">
                        {lang === 'es' ? 'Pirámide del Tepozteco' : 'Tepozteco Pyramid'}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white/70">4.9</span>
                        <span className="text-xs text-white/50">•</span>
                        <span className="text-xs text-white/70">$$</span>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 border-yellow-400/30">
                      <Sparkles className="w-3 h-3" />
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                      <span className="text-lg">🍽️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">
                        Los Colorines
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white/70">4.7</span>
                        <span className="text-xs text-white/50">•</span>
                        <span className="text-xs text-white/70">$$$</span>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 border-yellow-400/30">
                      <Sparkles className="w-3 h-3" />
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}