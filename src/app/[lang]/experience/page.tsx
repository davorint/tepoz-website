import { Suspense } from 'react'
import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import StructuredData from '@/components/seo/StructuredData'
import ExperiencesPageClient from '@/components/experiences/ExperiencesPageClient'
import { BusinessCardSkeletonGrid } from '@/components/loading/BusinessCardSkeleton'

interface ExperiencesPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: ExperiencesPageProps): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  
  const title = lang === 'en' ? 'Experiences in Tepoztlán' : 'Experiencias en Tepoztlán'
  const description = lang === 'en' 
    ? 'Discover unique adventures, spiritual journeys, wellness retreats, and authentic cultural experiences in magical Tepoztlán. From hiking the Tepozteco pyramid to temazcal ceremonies.'
    : 'Descubre aventuras únicas, viajes espirituales, retiros de bienestar y experiencias culturales auténticas en el mágico Tepoztlán. Desde escalar la pirámide del Tepozteco hasta ceremonias de temazcal.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'es_MX',
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function ExperiencesPage({ params }: ExperiencesPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'Experiences in Tepoztlán' : 'Experiencias en Tepoztlán'}
        description={lang === 'en'
          ? 'Discover unique adventures, spiritual journeys, wellness retreats, and authentic cultural experiences in magical Tepoztlán.'
          : 'Descubre aventuras únicas, viajes espirituales, retiros de bienestar y experiencias culturales auténticas en el mágico Tepoztlán.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/experiences`}
      />
      <Suspense fallback={<BusinessCardSkeletonGrid count={8} />}>
        <ExperiencesPageClient locale={lang} />
      </Suspense>
    </>
  )
}