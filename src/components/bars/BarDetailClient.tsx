'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { Bar, BarService } from '@/lib/bars'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MapPin,
  Star,
  Phone,
  Clock,
  Globe,
  Heart,
  Share2,
  Navigation,
  Car,
  Wifi,
  CreditCard,
  Music,
  Wine,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  GlassWater,
  Users,
  MapPinned
} from 'lucide-react'

interface BarDetailClientProps {
  slug: string
  locale: Locale
}

export default function BarDetailClient({ slug, locale }: BarDetailClientProps) {
  const [bar, setBar] = useState<Bar | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const foundBar = BarService.getBarBySlug?.(slug) || BarService.getAllBars().find(b => b.slug === slug)
    setBar(foundBar || null)
  }, [slug])

  if (!bar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            {locale === 'es' ? 'Bar no encontrado' : 'Bar not found'}
          </h2>
          <Link href={`/${locale}/food-drink/bars-pulquerias`}>
            <Button className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white">
              {locale === 'es' ? 'Volver a Bares' : 'Back to Bars'}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bar.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bar.images.length) % bar.images.length)
  }

  const amenityIcons = [
    { key: 'wifi', icon: Wifi, label: locale === 'es' ? 'Wi-Fi Gratis' : 'Free Wi-Fi' },
    { key: 'parking', icon: Car, label: locale === 'es' ? 'Estacionamiento' : 'Parking' },
    { key: 'acceptsCards', icon: CreditCard, label: locale === 'es' ? 'Acepta Tarjetas' : 'Cards Accepted' },
    { key: 'liveMusic', icon: Music, label: locale === 'es' ? 'Música en Vivo' : 'Live Music' },
    { key: 'danceFloor', icon: Users, label: locale === 'es' ? 'Pista de Baile' : 'Dance Floor' },
    { key: 'outdoorSeating', icon: GlassWater, label: locale === 'es' ? 'Terraza' : 'Outdoor Seating' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 via-purple-300/70 via-indigo-400/50 to-violet-400/40 dark:bg-gradient-to-b dark:from-purple-950 dark:via-purple-800 dark:via-indigo-800/70 dark:to-violet-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-white/40 dark:bg-purple-400/15 rounded-full blur-3xl dark:blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-white/30 dark:bg-indigo-400/10 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/25 dark:bg-violet-400/8 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-4s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,181,253,0.4),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(147,197,253,0.3),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.1),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(99,102,241,0.1),_transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl dark:backdrop-blur-xl border-b border-white/50 dark:border-white/10 shadow-lg sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}/food-drink/bars-pulquerias`}>
                <Button variant="ghost" className="bg-white/30 dark:bg-transparent backdrop-blur-md dark:backdrop-blur-none text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 border border-white/40 dark:border-transparent">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Volver' : 'Back'}
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-white/50 dark:bg-white/10 backdrop-blur-lg dark:backdrop-blur-md border border-white/60 dark:border-white/20 hover:bg-white/70 dark:hover:bg-white/20 shadow-sm"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-white/70'}`} />
                </Button>
                <Button className="bg-white/50 dark:bg-white/10 backdrop-blur-lg dark:backdrop-blur-md border border-white/60 dark:border-white/20 hover:bg-white/70 dark:hover:bg-white/20 shadow-sm">
                  <Share2 className="w-5 h-5 text-slate-600 dark:text-white/70" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Image Gallery */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={bar.images[currentImageIndex]}
            alt={BarService.getBarName(bar, locale)}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Gallery Navigation */}
          {bar.images.length > 1 && (
            <>
              <Button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bar.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Bar Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between">
                <div>
                  {bar.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 mb-4 text-sm font-semibold shadow-xl">
                      ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
                    </Badge>
                  )}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                    {BarService.getBarName(bar, locale)}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-2 text-white font-bold text-lg">{bar.rating}</span>
                      <span className="ml-1 text-white/80">({bar.reviewCount} {locale === 'es' ? 'reseñas' : 'reviews'})</span>
                    </div>
                    <Badge className="bg-purple-500/90 text-white border-0 px-4 py-2 text-sm">
                      {BarService.getBarType(bar, locale)}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm">
                      {bar.priceRange} · {bar.atmosphere}
                    </Badge>
                    {bar.ageRestriction && (
                      <Badge className="bg-red-500/90 text-white border-0 px-4 py-2 text-sm">
                        +18
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-6 shadow-xl shadow-purple-200/30 dark:shadow-white/15">
                <div className="flex flex-wrap gap-4">
                  {bar.phone && (
                    <Button className="flex-1 min-w-[200px] bg-white/40 dark:bg-gradient-to-r from-white/40 dark:from-purple-400 to-white/30 dark:to-violet-400 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/60 dark:hover:from-purple-500 dark:hover:to-violet-500 text-slate-800 dark:text-white border border-white/50 dark:border-transparent shadow-sm">
                      <Phone className="w-5 h-5 mr-2" />
                      {locale === 'es' ? 'Llamar' : 'Call'}
                    </Button>
                  )}
                  {bar.website && (
                    <Button
                      onClick={() => window.open(bar.website, '_blank')}
                      className="flex-1 min-w-[200px] bg-white/40 dark:bg-white/20 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/60 dark:hover:bg-white/30 text-slate-800 dark:text-white border border-white/50 dark:border-transparent shadow-sm"
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      {locale === 'es' ? 'Sitio Web' : 'Website'}
                    </Button>
                  )}
                  <Button className="flex-1 min-w-[200px] bg-white/40 dark:bg-green-500 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/60 dark:hover:bg-green-600 text-slate-800 dark:text-white border border-white/50 dark:border-transparent shadow-sm">
                    <Navigation className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Cómo Llegar' : 'Get Directions'}
                  </Button>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-purple-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <Wine className="w-6 h-6 mr-3 text-purple-500 dark:text-purple-400" />
                  {locale === 'es' ? 'Acerca de' : 'About'}
                </h2>
                <p className="text-slate-600 dark:text-white/80 text-lg leading-relaxed mb-6">
                  {BarService.getBarDescription(bar, locale)}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    {locale === 'es' ? 'Especialidades' : 'Specialties'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {BarService.getBarSpecialties(bar, locale).map((specialty, idx) => (
                      <Badge
                        key={idx}
                        className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 px-3 py-1"
                      >
                        <Wine className="w-3 h-3 mr-1" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Drink Types */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    {locale === 'es' ? 'Tipos de Bebidas' : 'Drink Types'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {bar.drinks.map((drink) => {
                      const drinkMap = {
                        beer: { emoji: '🍺', es: 'Cerveza', en: 'Beer' },
                        wine: { emoji: '🍷', es: 'Vino', en: 'Wine' },
                        cocktails: { emoji: '🍸', es: 'Cócteles', en: 'Cocktails' },
                        pulque: { emoji: '🥛', es: 'Pulque', en: 'Pulque' },
                        mezcal: { emoji: '🥃', es: 'Mezcal', en: 'Mezcal' },
                        tequila: { emoji: '🥃', es: 'Tequila', en: 'Tequila' },
                        'craft-beer': { emoji: '🍻', es: 'Cerveza Artesanal', en: 'Craft Beer' }
                      }
                      const drinkInfo = drinkMap[drink as keyof typeof drinkMap]
                      return (
                        <Badge
                          key={drink}
                          className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 px-3 py-1"
                        >
                          {drinkInfo?.emoji} {locale === 'es' ? drinkInfo?.es : drinkInfo?.en}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                {/* Happy Hour */}
                {bar.happyHour && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                      {locale === 'es' ? 'Hora Feliz' : 'Happy Hour'}
                    </h3>
                    <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 px-4 py-2">
                      🍻 {locale === 'es' ? bar.happyHour.es : bar.happyHour.en}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Menu Preview */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-purple-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <Wine className="w-6 h-6 mr-3 text-purple-500 dark:text-purple-400" />
                  {locale === 'es' ? 'Carta Destacada' : 'Featured Drinks'}
                </h2>

                <Tabs defaultValue="cocktails" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full bg-white/50 dark:bg-white/10">
                    <TabsTrigger value="cocktails" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-violet-400 data-[state=active]:text-white">
                      {locale === 'es' ? 'Cócteles' : 'Cocktails'}
                    </TabsTrigger>
                    <TabsTrigger value="spirits" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-violet-400 data-[state=active]:text-white">
                      {locale === 'es' ? 'Destilados' : 'Spirits'}
                    </TabsTrigger>
                    <TabsTrigger value="beers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-violet-400 data-[state=active]:text-white">
                      {locale === 'es' ? 'Cervezas' : 'Beers'}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cocktails" className="mt-6 space-y-4">
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Margarita de Mezcal' : 'Mezcal Margarita'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Con sal de gusano y limón fresco' : 'With worm salt and fresh lime'}
                          </p>
                        </div>
                        <span className="text-purple-500 dark:text-purple-400 font-bold">$150</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Mojito de Hierba Santa' : 'Hierba Santa Mojito'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Con ron blanco y hierba aromática local' : 'With white rum and local aromatic herbs'}
                          </p>
                        </div>
                        <span className="text-purple-500 dark:text-purple-400 font-bold">$130</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="spirits" className="mt-6 space-y-4">
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Mezcal Tobalá' : 'Tobala Mezcal'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Mezcal artesanal de Oaxaca, edición limitada' : 'Artisanal Oaxacan mezcal, limited edition'}
                          </p>
                        </div>
                        <span className="text-purple-500 dark:text-purple-400 font-bold">$280</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Tequila Reposado' : 'Reposado Tequila'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Añejado 8 meses en barrica de roble' : '8 months aged in oak barrels'}
                          </p>
                        </div>
                        <span className="text-purple-500 dark:text-purple-400 font-bold">$180</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="beers" className="mt-6 space-y-4">
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Cerveza Artesanal Local' : 'Local Craft Beer'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'IPA con lúpulo de la región' : 'IPA with regional hops'}
                          </p>
                        </div>
                        <span className="text-purple-500 dark:text-purple-400 font-bold">$85</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Reviews Section */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-purple-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-500 dark:text-purple-400" />
                  {locale === 'es' ? 'Reseñas Recientes' : 'Recent Reviews'}
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-white">Diego R.</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-white/60">
                          {locale === 'es' ? 'Hace 2 días' : '2 days ago'}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-white/80">
                      {locale === 'es'
                        ? 'Excelente ambiente y los mejores mezcales de Tepoztlán. El bartender sabe mucho sobre destilados artesanales. Muy recomendado.'
                        : 'Excellent atmosphere and the best mezcals in Tepoztlán. The bartender knows a lot about artisanal spirits. Highly recommended.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-white">Sofia L.</span>
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-white/60">
                          {locale === 'es' ? 'Hace 1 semana' : '1 week ago'}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-white/80">
                      {locale === 'es'
                        ? 'Muy buen ambiente nocturno, música en vivo los fines de semana. Los cócteles están bien preparados pero un poco caros.'
                        : 'Great nightlife atmosphere, live music on weekends. Cocktails are well prepared but a bit expensive.'}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border border-slate-300/30 dark:border-white/20 text-slate-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20">
                  {locale === 'es' ? 'Ver Todas las Reseñas' : 'View All Reviews'}
                </Button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Location & Hours */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-6 shadow-xl shadow-purple-200/30 dark:shadow-white/15 sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <MapPinned className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
                  {locale === 'es' ? 'Ubicación y Horarios' : 'Location & Hours'}
                </h3>

                {/* Address */}
                <div className="mb-6">
                  <div className="flex items-start text-slate-600 dark:text-white/80 mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white mb-1">
                        {locale === 'es' ? 'Dirección' : 'Address'}
                      </p>
                      <p className="text-sm">{BarService.getBarAddress(bar, locale)}</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="mb-6">
                  <div className="flex items-start text-slate-600 dark:text-white/80">
                    <Clock className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="w-full">
                      <p className="font-semibold text-slate-800 dark:text-white mb-2">
                        {locale === 'es' ? 'Horarios' : 'Hours'}
                      </p>
                      <p className="text-sm">{BarService.getBarHours(bar, locale)}</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                {bar.phone && (
                  <div className="mb-6">
                    <div className="flex items-start text-slate-600 dark:text-white/80">
                      <Phone className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white mb-1">
                          {locale === 'es' ? 'Teléfono' : 'Phone'}
                        </p>
                        <p className="text-sm">{bar.phone}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white mb-3">
                    {locale === 'es' ? 'Servicios' : 'Amenities'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {amenityIcons.map(({ key, icon: Icon, label }) => {
                      const hasAmenity = bar[key as keyof Bar]
                      return (
                        <div
                          key={key}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            hasAmenity
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-slate-100 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 opacity-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs">{label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* More Information / Call */}
                <div className="mt-6 pt-6 border-t border-slate-300/20 dark:border-white/10">
                  {bar.phone && (
                    <a href={`tel:${bar.phone}`}>
                      <Button className="w-full bg-gradient-to-r from-purple-400 to-violet-400 hover:from-purple-500 hover:to-violet-500 text-white mb-3">
                        <Phone className="w-5 h-5 mr-2" />
                        {locale === 'es' ? 'Más Información' : 'More Information'}
                      </Button>
                    </a>
                  )}
                  <p className="text-xs text-center text-slate-500 dark:text-white/60">
                    {locale === 'es'
                      ? 'Llámanos para más detalles sobre horarios y disponibilidad'
                      : 'Call us for details about hours and availability'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Bars */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              {locale === 'es' ? 'Bares Similares' : 'Similar Bars'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder for similar bars */}
              <Card className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl border border-slate-300/20 dark:border-white/10 p-4 hover:shadow-xl transition-shadow">
                <p className="text-slate-600 dark:text-white/70 text-center py-8">
                  {locale === 'es' ? 'Próximamente...' : 'Coming soon...'}
                </p>
              </Card>
              <Card className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl border border-slate-300/20 dark:border-white/10 p-4 hover:shadow-xl transition-shadow">
                <p className="text-slate-600 dark:text-white/70 text-center py-8">
                  {locale === 'es' ? 'Próximamente...' : 'Coming soon...'}
                </p>
              </Card>
              <Card className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl border border-slate-300/20 dark:border-white/10 p-4 hover:shadow-xl transition-shadow">
                <p className="text-slate-600 dark:text-white/70 text-center py-8">
                  {locale === 'es' ? 'Próximamente...' : 'Coming soon...'}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}