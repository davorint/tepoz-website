'use client'

import { Locale } from '@/lib/i18n'
import dynamic from 'next/dynamic'

const EnhancedMapSectionProduction = dynamic(
  () => import('@/components/sections/EnhancedMapSectionProduction'),
  { 
    ssr: false
  }
)

interface MapWrapperProps {
  lang: Locale
}

export default function MapWrapper({ lang }: MapWrapperProps) {
  return <EnhancedMapSectionProduction lang={lang} />
}