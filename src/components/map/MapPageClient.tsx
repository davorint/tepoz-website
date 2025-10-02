'use client'

import { Locale } from '@/lib/i18n'
import dynamic from 'next/dynamic'

const InteractiveMapSection = dynamic(
  () => import('@/components/sections/InteractiveMapSection'),
  {
    ssr: false
  }
)

interface MapPageClientProps {
  lang: Locale
}

export default function MapPageClient({ lang }: MapPageClientProps) {
  return <InteractiveMapSection lang={lang} />
}