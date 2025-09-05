'use client'

import { Locale } from '@/lib/i18n'
import dynamic from 'next/dynamic'

const InteractiveMapSection = dynamic(
  () => import('@/components/sections/InteractiveMapSection'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-lg">Cargando mapa mágico...</p>
        </div>
      </div>
    )
  }
)

interface MapasPageClientProps {
  lang: Locale
}

export default function MapasPageClient({ lang }: MapasPageClientProps) {
  return <InteractiveMapSection lang={lang} />
}