'use client'

import { Locale } from '@/lib/i18n'
import dynamic from 'next/dynamic'

const EnhancedMapSection = dynamic(
  () => import('@/components/sections/EnhancedMapSection'),
  { 
    ssr: false
  }
)

interface MapPageClientProps {
  lang: Locale
}

export default function MapPageClient({ lang }: MapPageClientProps) {
  return <EnhancedMapSection lang={lang} />
}