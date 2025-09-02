'use client'

import StaticNavigation from '@/components/layout/StaticNavigation'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'

interface ClientNavigationWrapperProps {
  lang: Locale
  translations: Translations
}

export default function ClientNavigationWrapper({ lang, translations }: ClientNavigationWrapperProps) {
  return <StaticNavigation lang={lang} translations={translations} />
}