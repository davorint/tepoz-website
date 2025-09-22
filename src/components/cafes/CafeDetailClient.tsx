'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { Cafe, CafeService } from '@/lib/cafes'
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
  Coffee,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MapPinned
} from 'lucide-react'

interface CafeDetailClientProps {
  slug: string
  locale: Locale
}

export default function CafeDetailClient({ slug, locale }: CafeDetailClientProps) {
  const [cafe, setCafe] = useState<Cafe | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const foundCafe = CafeService.getCafeBySlug?.(slug) || CafeService.getAllCafes?.().find(c => c.slug === slug)
    setCafe(foundCafe || null)
  }, [slug])

  if (!cafe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            {locale === 'es' ? 'Café no encontrado' : 'Cafe not found'}
          </h2>
          <Link href={`/${locale}/food-drink/cafes-bakeries`}>
            <Button className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-slate-900 dark:text-white">
              {locale === 'es' ? 'Volver a Cafés' : 'Back to Cafes'}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cafe.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + cafe.images.length) % cafe.images.length)
  }

  const amenityIcons = [
    { key: 'wifi', icon: Wifi, label: locale === 'es' ? 'Wi-Fi Gratis' : 'Free Wi-Fi' },
    { key: 'parking', icon: Car, label: locale === 'es' ? 'Estacionamiento' : 'Parking' },
    { key: 'acceptsCards', icon: CreditCard, label: locale === 'es' ? 'Acepta Tarjetas' : 'Cards Accepted' },
    { key: 'delivery', icon: Navigation, label: locale === 'es' ? 'Entrega a Domicilio' : 'Delivery' },
    { key: 'liveMusic', icon: Music, label: locale === 'es' ? 'Música en Vivo' : 'Live Music' },
    { key: 'specialty', icon: Coffee, label: locale === 'es' ? 'Café de Especialidad' : 'Specialty Coffee' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-300/70 via-blue-400/50 to-indigo-400/40 dark:bg-gradient-to-b dark:from-sky-950 dark:via-sky-800 dark:via-blue-800/70 dark:to-indigo-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-white/40 dark:bg-sky-400/15 rounded-full blur-3xl dark:blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-white/30 dark:bg-blue-400/10 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/25 dark:bg-indigo-400/8 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-4s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(224,242,254,0.4),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(147,197,253,0.3),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.1),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(99,102,241,0.1),_transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl dark:backdrop-blur-xl border-b border-white/50 dark:border-white/10 shadow-lg sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}/food-drink/cafes-bakeries`}>
                <Button variant="ghost" className="bg-white/30 dark:bg-transparent backdrop-blur-md dark:backdrop-blur-none text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 border border-white/40 dark:border-transparent">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Volver' : 'Back'}
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-white/80 dark:bg-white/10 backdrop-blur-lg dark:backdrop-blur-md border border-slate-300/60 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/20 shadow-md"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-700 dark:text-white/70'}`} />
                </Button>
                <Button className="bg-white/80 dark:bg-white/10 backdrop-blur-lg dark:backdrop-blur-md border border-slate-300/60 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/20 shadow-md">
                  <Share2 className="w-5 h-5 text-slate-700 dark:text-white/70" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Image Gallery */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={cafe.images[currentImageIndex]}
            alt={CafeService.getCafeName(cafe, locale)}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Gallery Navigation */}
          {cafe.images.length > 1 && (
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
                {cafe.images.map((_, index) => (
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

          {/* Cafe Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between">
                <div>
                  {cafe.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 mb-4 text-sm font-semibold shadow-xl">
                      ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
                    </Badge>
                  )}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                    {CafeService.getCafeName(cafe, locale)}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-2 text-white font-bold text-lg">{cafe.rating}</span>
                      <span className="ml-1 text-white/80">({cafe.reviewCount} {locale === 'es' ? 'reseñas' : 'reviews'})</span>
                    </div>
                    <Badge className="bg-orange-400/90 text-white border-0 px-4 py-2 text-sm">
                      {CafeService.getCafeType(cafe, locale)}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm">
                      {cafe.priceRange} · {cafe.atmosphere}
                    </Badge>
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
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-6 shadow-xl shadow-sky-200/30 dark:shadow-white/15">
                <div className="flex flex-wrap gap-4">
                  {cafe.phone && (
                    <Button className="flex-1 min-w-[200px] bg-white/80 dark:bg-gradient-to-r from-white/40 dark:from-orange-400 to-white/80 dark:to-red-400 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/90 dark:hover:from-orange-500 dark:hover:to-red-500 text-slate-900 dark:text-white border border-slate-300/50 dark:border-transparent shadow-md">
                      <Phone className="w-5 h-5 mr-2" />
                      {locale === 'es' ? 'Llamar' : 'Call'}
                    </Button>
                  )}
                  {cafe.website && (
                    <Button
                      onClick={() => window.open(cafe.website, '_blank')}
                      className="flex-1 min-w-[200px] bg-white/80 dark:bg-white/20 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/90 dark:hover:bg-white/30 text-slate-900 dark:text-white border border-slate-300/50 dark:border-transparent shadow-md"
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      {locale === 'es' ? 'Sitio Web' : 'Website'}
                    </Button>
                  )}
                  <Button className="flex-1 min-w-[200px] bg-white/80 dark:bg-green-500 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/90 dark:hover:bg-green-600 text-slate-900 dark:text-white border border-slate-300/50 dark:border-transparent shadow-md">
                    <Navigation className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Cómo Llegar' : 'Get Directions'}
                  </Button>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-sky-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <Coffee className="w-6 h-6 mr-3 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Acerca de' : 'About'}
                </h2>
                <p className="text-slate-600 dark:text-white/80 text-lg leading-relaxed mb-6">
                  {CafeService.getCafeDescription(cafe, locale)}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    {locale === 'es' ? 'Especialidades' : 'Specialties'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {CafeService.getCafeSpecialties(cafe, locale).map((specialty, idx) => (
                      <Badge
                        key={idx}
                        className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700 px-3 py-1"
                      >
                        <Coffee className="w-3 h-3 mr-1" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dietary Options */}
                {cafe.dietary.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                      {locale === 'es' ? 'Opciones Dietéticas' : 'Dietary Options'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cafe.dietary.map((diet) => {
                        const dietaryMap = {
                          vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
                          vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
                          'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
                          organic: { emoji: '🍃', es: 'Orgánico', en: 'Organic' }
                        }
                        const dietInfo = dietaryMap[diet as keyof typeof dietaryMap]
                        return (
                          <Badge
                            key={diet}
                            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 px-3 py-1"
                          >
                            {dietInfo.emoji} {locale === 'es' ? dietInfo.es : dietInfo.en}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Menu Preview */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-sky-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <Coffee className="w-6 h-6 mr-3 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Menú Destacado' : 'Featured Menu'}
                </h2>

                <Tabs defaultValue="coffee" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full bg-white/50 dark:bg-white/10">
                    <TabsTrigger value="coffee" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-red-400 data-[state=active]:text-white">
                      {locale === 'es' ? 'Café' : 'Coffee'}
                    </TabsTrigger>
                    <TabsTrigger value="bakery" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-red-400 data-[state=active]:text-white">
                      {locale === 'es' ? 'Panadería' : 'Bakery'}
                    </TabsTrigger>
                    <TabsTrigger value="treats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-red-400 data-[state=active]:text-white">
                      {locale === 'es' ? 'Dulces' : 'Treats'}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="coffee" className="mt-6 space-y-4">
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Café de Olla' : 'Traditional Mexican Coffee'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Con canela y piloncillo' : 'With cinnamon and brown sugar'}
                          </p>
                        </div>
                        <span className="text-orange-500 dark:text-orange-400 font-bold">$65</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Cappuccino de Especialidad' : 'Specialty Cappuccino'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Con granos locales de Chiapas' : 'With local Chiapas beans'}
                          </p>
                        </div>
                        <span className="text-orange-500 dark:text-orange-400 font-bold">$85</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bakery" className="mt-6 space-y-4">
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Concha Artesanal' : 'Artisanal Concha'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Pan dulce tradicional recién horneado' : 'Fresh-baked traditional sweet bread'}
                          </p>
                        </div>
                        <span className="text-orange-500 dark:text-orange-400 font-bold">$35</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Croissant de Mantequilla' : 'Butter Croissant'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Hojaldrado francés perfecto' : 'Perfect French pastry'}
                          </p>
                        </div>
                        <span className="text-orange-500 dark:text-orange-400 font-bold">$45</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="treats" className="mt-6 space-y-4">
                    <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {locale === 'es' ? 'Galleta de Chispas de Chocolate' : 'Chocolate Chip Cookie'}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Receta casera con chocolate belga' : 'Homemade with Belgian chocolate'}
                          </p>
                        </div>
                        <span className="text-orange-500 dark:text-orange-400 font-bold">$40</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Reviews Section */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-sky-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Reseñas Recientes' : 'Recent Reviews'}
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-white">Ana P.</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-white/60">
                          {locale === 'es' ? 'Hace 3 días' : '3 days ago'}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-white/80">
                      {locale === 'es'
                        ? 'El mejor café de Tepoztlán. El ambiente es muy acogedor y los pasteles están deliciosos. Perfecto para trabajar o relajarse.'
                        : 'The best coffee in Tepoztlán. The atmosphere is very cozy and the pastries are delicious. Perfect for working or relaxing.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-white">Carlos M.</span>
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
                        ? 'Excelente café y buena selección de panes. Wi-Fi rápido y buen ambiente para estudiar. Los precios son justos.'
                        : 'Excellent coffee and good bread selection. Fast Wi-Fi and good atmosphere for studying. Fair prices.'}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-white/90 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border border-slate-400/50 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/95 dark:hover:bg-white/20 shadow-md">
                  {locale === 'es' ? 'Ver Todas las Reseñas' : 'View All Reviews'}
                </Button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Location & Hours */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-6 shadow-xl shadow-sky-200/30 dark:shadow-white/15 sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <MapPinned className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Ubicación y Horarios' : 'Location & Hours'}
                </h3>

                {/* Address */}
                <div className="mb-6">
                  <div className="flex items-start text-slate-600 dark:text-white/80 mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white mb-1">
                        {locale === 'es' ? 'Dirección' : 'Address'}
                      </p>
                      <p className="text-sm">{CafeService.getCafeAddress(cafe, locale)}</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="mb-6">
                  <div className="flex items-start text-slate-600 dark:text-white/80">
                    <Clock className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="w-full">
                      <p className="font-semibold text-slate-800 dark:text-white mb-2">
                        {locale === 'es' ? 'Horarios' : 'Hours'}
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>{locale === 'es' ? 'Lun-Vie' : 'Mon-Fri'}</span>
                          <span>7:00 AM - 9:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{locale === 'es' ? 'Sábado' : 'Saturday'}</span>
                          <span>8:00 AM - 10:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{locale === 'es' ? 'Domingo' : 'Sunday'}</span>
                          <span>8:00 AM - 8:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                {cafe.phone && (
                  <div className="mb-6">
                    <div className="flex items-start text-slate-600 dark:text-white/80">
                      <Phone className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white mb-1">
                          {locale === 'es' ? 'Teléfono' : 'Phone'}
                        </p>
                        <p className="text-sm">{cafe.phone}</p>
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
                      const hasAmenity = cafe[key as keyof Cafe]
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

                {/* Order Online */}
                <div className="mt-6 pt-6 border-t border-slate-300/20 dark:border-white/10">
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-slate-900 dark:text-white mb-3">
                    <Coffee className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Ordenar en Línea' : 'Order Online'}
                  </Button>
                  <p className="text-xs text-center text-slate-500 dark:text-white/60">
                    {locale === 'es'
                      ? 'Entrega disponible en el centro de Tepoztlán'
                      : 'Delivery available in downtown Tepoztlán'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Cafes */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              {locale === 'es' ? 'Cafés Similares' : 'Similar Cafes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder for similar cafes */}
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