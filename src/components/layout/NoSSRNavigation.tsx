'use client'

import dynamic from 'next/dynamic'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'

// Dynamic import with ssr: false - this is allowed in client components
const TopNavigation = dynamic(() => import('./TopNavigation'), {
  ssr: false,
  loading: () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg">Tepoztlán</span>
        </div>
      </div>
    </header>
  )
})

interface NoSSRNavigationProps {
  lang: Locale
  translations: Translations
}

export default function NoSSRNavigation({ lang, translations }: NoSSRNavigationProps) {
  return <TopNavigation lang={lang} translations={translations} />
}