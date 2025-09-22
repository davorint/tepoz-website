'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { StreetFood, StreetFoodService } from '@/lib/street-food'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  MapPin,
  Star,
  Phone,
  Clock,
  Heart,
  Share2,
  Navigation,
  Banknote,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Utensils,
  Flame,
  MapPinned,
  Award,
  DollarSign,
  Truck
} from 'lucide-react'

interface StreetFoodDetailClientProps {
  slug: string
  locale: Locale
}

export default function StreetFoodDetailClient({ slug, locale }: StreetFoodDetailClientProps) {
  const [streetFood, setStreetFood] = useState<StreetFood | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const foundStreetFood = StreetFoodService.getStreetFoodBySlug?.(slug) || StreetFoodService.getAllStreetFoods().find(sf => sf.slug === slug)
    setStreetFood(foundStreetFood || null)
  }, [slug])

  if (!streetFood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            {locale === 'es' ? 'Comida callejera no encontrada' : 'Street food not found'}
          </h2>
          <Link href={`/${locale}/food-drink/street-food`}>
            <Button className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white">
              {locale === 'es' ? 'Volver a Comida Callejera' : 'Back to Street Food'}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % streetFood.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + streetFood.images.length) % streetFood.images.length)
  }

  const venueTypeLabels = {
    'street-cart': { es: 'Carrito Callejero', en: 'Street Cart' },
    'market-stall': { es: 'Puesto de Mercado', en: 'Market Stall' },
    'food-truck': { es: 'Food Truck', en: 'Food Truck' },
    'tianguis': { es: 'Tianguis', en: 'Street Market' },
    'plaza': { es: 'Plaza', en: 'Plaza' }
  }

  const spicyLabels = {
    1: { es: 'Suave', en: 'Mild' },
    2: { es: 'Poco Picante', en: 'Slightly Spicy' },
    3: { es: 'Picante', en: 'Spicy' },
    4: { es: 'Muy Picante', en: 'Very Spicy' },
    5: { es: 'Extremo', en: 'Extreme' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-yellow-300/70 via-red-400/50 to-orange-400/40 dark:bg-gradient-to-b dark:from-orange-950 dark:via-orange-800 dark:via-red-800/70 dark:to-yellow-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-white/40 dark:bg-orange-400/15 rounded-full blur-3xl dark:blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-white/30 dark:bg-yellow-400/10 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/25 dark:bg-red-400/8 rounded-full blur-3xl dark:blur-3xl animate-pulse animation-delay-4s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(254,215,170,0.4),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(251,191,36,0.3),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(251,146,60,0.1),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(239,68,68,0.1),_transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl dark:backdrop-blur-xl border-b border-white/50 dark:border-white/10 shadow-lg sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}/food-drink/street-food`}>
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
            src={streetFood.images[currentImageIndex]}
            alt={StreetFoodService.getStreetFoodName(streetFood, locale)}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Gallery Navigation */}
          {streetFood.images.length > 1 && (
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
                {streetFood.images.map((_, index) => (
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

          {/* Street Food Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex gap-2 mb-4">
                    {streetFood.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 text-sm font-semibold shadow-xl">
                        ⭐ {locale === 'es' ? 'Destacado' : 'Featured'}
                      </Badge>
                    )}
                    {streetFood.localFavorite && (
                      <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-black px-4 py-2 text-sm font-semibold shadow-xl">
                        ❤️ {locale === 'es' ? 'Favorito Local' : 'Local Favorite'}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                    {StreetFoodService.getStreetFoodName(streetFood, locale)}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-2 text-white font-bold text-lg">{streetFood.rating}</span>
                      <span className="ml-1 text-white/80">({streetFood.reviewCount} {locale === 'es' ? 'reseñas' : 'reviews'})</span>
                    </div>
                    <Badge className="bg-orange-500/90 text-white border-0 px-4 py-2 text-sm">
                      {StreetFoodService.getStreetFoodType(streetFood, locale)}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm">
                      {streetFood.priceRange} · {venueTypeLabels[streetFood.venueType][locale]}
                    </Badge>
                    {streetFood.spicyLevel > 1 && (
                      <Badge className="bg-red-500/90 text-white border-0 px-4 py-2 text-sm flex items-center">
                        <Flame className="w-3 h-3 mr-1" />
                        {spicyLabels[streetFood.spicyLevel][locale]}
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
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-6 shadow-xl shadow-orange-200/30 dark:shadow-white/15">
                <div className="flex flex-wrap gap-4">
                  {streetFood.phone && (
                    <Button className="flex-1 min-w-[200px] bg-white/40 dark:bg-gradient-to-r from-white/40 dark:from-orange-400 to-white/30 dark:to-red-400 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/60 dark:hover:from-orange-500 dark:hover:to-red-500 text-slate-800 dark:text-white border border-white/50 dark:border-transparent shadow-sm">
                      <Phone className="w-5 h-5 mr-2" />
                      {locale === 'es' ? 'Llamar' : 'Call'}
                    </Button>
                  )}
                  <Button className="flex-1 min-w-[200px] bg-white/40 dark:bg-green-500 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/60 dark:hover:bg-green-600 text-slate-800 dark:text-white border border-white/50 dark:border-transparent shadow-sm">
                    <Navigation className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Cómo Llegar' : 'Get Directions'}
                  </Button>
                  {streetFood.cashOnly && (
                    <Button className="flex-1 min-w-[200px] bg-white/40 dark:bg-yellow-600 backdrop-blur-lg dark:backdrop-blur-none hover:bg-white/60 dark:hover:bg-yellow-700 text-slate-800 dark:text-white border border-white/50 dark:border-transparent shadow-sm">
                      <Banknote className="w-5 h-5 mr-2" />
                      {locale === 'es' ? 'Solo Efectivo' : 'Cash Only'}
                    </Button>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-orange-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <Utensils className="w-6 h-6 mr-3 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Acerca de' : 'About'}
                </h2>
                <p className="text-slate-600 dark:text-white/80 text-lg leading-relaxed mb-6">
                  {StreetFoodService.getStreetFoodDescription(streetFood, locale)}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    {locale === 'es' ? 'Especialidades' : 'Specialties'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {StreetFoodService.getStreetFoodSpecialties(streetFood, locale).map((specialty, idx) => (
                      <Badge
                        key={idx}
                        className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700 px-3 py-1"
                      >
                        <Utensils className="w-3 h-3 mr-1" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dietary Options */}
                {streetFood.dietary.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                      {locale === 'es' ? 'Opciones Dietéticas' : 'Dietary Options'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {streetFood.dietary.map((diet) => {
                        const dietaryMap = {
                          vegetarian: { emoji: '🌱', es: 'Vegetariano', en: 'Vegetarian' },
                          vegan: { emoji: '🌿', es: 'Vegano', en: 'Vegan' },
                          'gluten-free': { emoji: '🌾', es: 'Sin Gluten', en: 'Gluten Free' },
                          spicy: { emoji: '🌶️', es: 'Picante', en: 'Spicy' }
                        }
                        const dietInfo = dietaryMap[diet as keyof typeof dietaryMap]
                        return (
                          <Badge
                            key={diet}
                            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 px-3 py-1"
                          >
                            {dietInfo?.emoji} {locale === 'es' ? dietInfo?.es : dietInfo?.en}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Menu Preview */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-orange-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-3 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Menú Destacado' : 'Featured Menu'}
                </h2>

                <div className="space-y-4">
                  {/* Sample menu items based on street food type */}
                  <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">
                          {StreetFoodService.getStreetFoodSpecialties(streetFood, locale)[0]}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-white/70">
                          {locale === 'es' ? 'Especialidad de la casa' : 'House specialty'}
                        </p>
                      </div>
                      <span className="text-orange-500 dark:text-orange-400 font-bold">
                        {streetFood.priceRange === '$' ? '$25-40' :
                         streetFood.priceRange === '$$' ? '$50-80' :
                         streetFood.priceRange === '$$$' ? '$100-150' : '$200+'}
                      </span>
                    </div>
                  </div>

                  {StreetFoodService.getStreetFoodSpecialties(streetFood, locale).slice(1).map((specialty, idx) => (
                    <div key={idx} className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {specialty}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-white/70">
                            {locale === 'es' ? 'Preparado fresco diariamente' : 'Freshly prepared daily'}
                          </p>
                        </div>
                        <span className="text-orange-500 dark:text-orange-400 font-bold">
                          {streetFood.priceRange === '$' ? '$20-35' :
                           streetFood.priceRange === '$$' ? '$40-70' :
                           streetFood.priceRange === '$$$' ? '$80-120' : '$150+'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-8 shadow-xl shadow-orange-200/30 dark:shadow-white/15">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Reseñas Recientes' : 'Recent Reviews'}
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-white">Roberto L.</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-white/60">
                          {locale === 'es' ? 'Hace 1 día' : '1 day ago'}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-white/80">
                      {locale === 'es'
                        ? 'La mejor comida callejera de Tepoztlán! Los precios son muy justos y la comida está siempre fresca. Definitivamente un favorito local.'
                        : 'The best street food in Tepoztlán! Prices are very fair and the food is always fresh. Definitely a local favorite.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white/20 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-none rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-white">Maria C.</span>
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
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
                        ? 'Comida auténtica y sabrosa. El ambiente es muy tradicional y los vendedores son muy amables. Solo aceptan efectivo.'
                        : 'Authentic and flavorful food. The atmosphere is very traditional and the vendors are very friendly. Cash only.'}
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
              <div className="bg-white/30 dark:bg-white/5 backdrop-blur-2xl dark:backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 p-6 shadow-xl shadow-orange-200/30 dark:shadow-white/15 sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <MapPinned className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400" />
                  {locale === 'es' ? 'Ubicación y Horarios' : 'Location & Hours'}
                </h3>

                {/* Location */}
                <div className="mb-6">
                  <div className="flex items-start text-slate-600 dark:text-white/80 mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white mb-1">
                        {locale === 'es' ? 'Ubicación' : 'Location'}
                      </p>
                      <p className="text-sm">{StreetFoodService.getStreetFoodLocation(streetFood, locale)}</p>
                    </div>
                  </div>
                </div>

                {/* Venue Type */}
                <div className="mb-6">
                  <div className="flex items-start text-slate-600 dark:text-white/80">
                    <Truck className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white mb-1">
                        {locale === 'es' ? 'Tipo de Puesto' : 'Venue Type'}
                      </p>
                      <p className="text-sm">{venueTypeLabels[streetFood.venueType][locale]}</p>
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
                      <p className="text-sm">{StreetFoodService.getStreetFoodHours(streetFood, locale)}</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                {streetFood.phone && (
                  <div className="mb-6">
                    <div className="flex items-start text-slate-600 dark:text-white/80">
                      <Phone className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white mb-1">
                          {locale === 'es' ? 'Teléfono' : 'Phone'}
                        </p>
                        <p className="text-sm">{streetFood.phone}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <div className="flex items-start text-slate-600 dark:text-white/80">
                    <DollarSign className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white mb-1">
                        {locale === 'es' ? 'Rango de Precios' : 'Price Range'}
                      </p>
                      <p className="text-sm">
                        {streetFood.priceRange} · {
                          streetFood.priceRange === '$' ? (locale === 'es' ? 'Económico' : 'Budget') :
                          streetFood.priceRange === '$$' ? (locale === 'es' ? 'Moderado' : 'Moderate') :
                          streetFood.priceRange === '$$$' ? (locale === 'es' ? 'Alto' : 'High') :
                          (locale === 'es' ? 'Premium' : 'Premium')
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Special Features */}
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white mb-3">
                    {locale === 'es' ? 'Características' : 'Features'}
                  </p>
                  <div className="space-y-2">
                    {streetFood.cashOnly && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                        <Banknote className="w-4 h-4" />
                        <span className="text-xs">{locale === 'es' ? 'Solo Efectivo' : 'Cash Only'}</span>
                      </div>
                    )}
                    {streetFood.verified && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        <Award className="w-4 h-4" />
                        <span className="text-xs">{locale === 'es' ? 'Verificado' : 'Verified'}</span>
                      </div>
                    )}
                    {streetFood.localFavorite && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{locale === 'es' ? 'Favorito Local' : 'Local Favorite'}</span>
                      </div>
                    )}
                    {streetFood.spicyLevel > 2 && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs">{spicyLabels[streetFood.spicyLevel][locale]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Street Foods */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              {locale === 'es' ? 'Comida Callejera Similar' : 'Similar Street Food'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder for similar street foods */}
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