'use client'

import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'

interface ClientComponentWrapperProps {
  lang: Locale
  translations: Translations
}

export default function ClientComponentWrapper({ lang }: ClientComponentWrapperProps) {
  return (
    <div className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50" suppressHydrationWarning>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {lang === 'es' ? 'Experiencias Populares' : 'Popular Experiences'}
        </h2>
        <p className="text-gray-600 mb-8">
          {lang === 'es' 
            ? 'Explora los lugares más emblemáticos de Tepoztlán'
            : 'Explore the most iconic places in Tepoztlán'
          }
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="h-48 bg-gray-300 rounded mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">
                {lang === 'es' ? `Atracción ${i}` : `Attraction ${i}`}
              </h3>
              <p className="text-gray-600">
                {lang === 'es' 
                  ? 'Descripción de la atracción'
                  : 'Attraction description'
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}