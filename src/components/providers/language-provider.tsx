'use client'

import { useEffect } from 'react'
import { type Locale } from '@/lib/i18n'

interface LanguageProviderProps {
  lang: Locale
  children: React.ReactNode
}

export default function LanguageProvider({ lang, children }: LanguageProviderProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  return <>{children}</>
}