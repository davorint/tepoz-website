'use client'

import { Locale } from '@/lib/i18n'

interface CentroNeighborhoodClientProps {
  locale: Locale
}

export default function CentroNeighborhoodClient({ locale }: CentroNeighborhoodClientProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Centro Neighborhood</h1>
      <p>Language: {locale}</p>
      {/* TODO: Implement centro neighborhood content */}
    </div>
  )
}