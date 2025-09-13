'use client'

import { Locale } from '@/lib/i18n'
import Image from 'next/image'

interface PremiumCTAProps {
  lang: Locale
}

const quickLinks = [
  {
    id: 'top-restaurants',
    titleEs: 'Restaurantes Destacados',
    titleEn: 'Featured Restaurants',
    emoji: '🍽️',
    color: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: 'weekend-stays',
    titleEs: 'Mejores Hospedajes',
    titleEn: 'Best Accommodations',
    emoji: '🏨',
    color: 'from-blue-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: 'night-life',
    titleEs: 'Bares y Cantinas',
    titleEn: 'Bars & Cantinas',
    emoji: '🍹',
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: 'adventure',
    titleEs: 'Tours y Experiencias',
    titleEn: 'Tours & Experiences',
    emoji: '🗺️',
    color: 'from-green-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop&crop=center'
  }
]

export default function PremiumCTA({ lang }: PremiumCTAProps) {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-white via-gray-50/10 to-white dark:from-gray-900 dark:via-purple-900/50 dark:to-gray-800 text-gray-900 dark:text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-gradient-to-r from-gray-800 to-gray-900 dark:from-white dark:to-gray-300 bg-clip-text text-transparent pb-2">
            {lang === 'es' ? 'Encuentra Negocios por Categoría' : 'Find Businesses by Category'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {lang === 'es' 
              ? 'Acceso rápido a los mejores negocios y servicios de Tepoztlán'
              : 'Quick access to the best businesses and services in Tepoztlán'
            }
          </p>
        </div>

        {/* Quick links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              className={`relative h-32 bg-gradient-to-r ${link.color} rounded-2xl text-white font-semibold text-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="flex h-full">
                {/* Image section - 1/3 left */}
                <div className="relative w-1/3 h-full overflow-hidden">
                  {/* Fallback design - always present */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="text-4xl">{link.emoji}</span>
                  </div>
                  
                  {/* Image overlay */}
                  <Image
                    src={link.image}
                    alt={lang === 'es' ? link.titleEs : link.titleEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Image overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
                
                {/* Content section - 2/3 right */}
                <div className="relative flex-1 flex items-center justify-center px-6">
                  <div className="relative z-10 text-center">
                    <span className="text-xl font-semibold">
                      {lang === 'es' ? link.titleEs : link.titleEn}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
              
              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">
                →
              </div>
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { number: '500+', label: lang === 'es' ? 'Negocios Registrados' : 'Registered Businesses' },
            { number: '10K+', label: lang === 'es' ? 'Visitantes Mensuales' : 'Monthly Visitors' },
            { number: '4.8', label: lang === 'es' ? 'Calificación Promedio' : 'Average Rating' }
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}