import { Metadata } from 'next'
import TepoztlanOverviewClient from '@/components/discover/TepoztlanOverviewClient'
import StructuredData from '@/components/seo/StructuredData'

interface PageProps {
  params: Promise<{
    lang: 'es' | 'en'
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  const metadata = {
    es: {
      title: 'Información General de Tepoztlán - Pueblo Mágico | Tepoztlán',
      description: 'Descubre todo sobre Tepoztlán: ubicación privilegiada, clima perfecto, historia milenaria, naturaleza extraordinaria y el encanto que lo convierte en uno de los Pueblos Mágicos más visitados de México.',
    },
    en: {
      title: 'Tepoztlán Overview - Magic Town | Tepoztlán',
      description: 'Discover everything about Tepoztlán: privileged location, perfect climate, millenary history, extraordinary nature and the charm that makes it one of the most visited Magic Towns in Mexico.',
    }
  }

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: lang === 'es' 
      ? 'Tepoztlán información, Pueblo Mágico, Morelos, ubicación, clima, población, altitud, naturaleza, parque nacional'
      : 'Tepoztlán overview, Magic Town, Morelos, location, climate, population, altitude, nature, national park',
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
    },
    alternates: {
      canonical: `/${lang}/discover/tepoztlan/overview`,
      languages: {
        'es': '/es/discover/tepoztlan/overview',
        'en': '/en/discover/tepoztlan/overview'
      }
    }
  }
}

export default async function TepoztlanOverviewPage({ params }: PageProps) {
  const { lang } = await params
  return (
    <>
      <StructuredData
        type="tourist-attraction"
        title={lang === 'en' ? 'Tepoztlán Overview' : 'Información General de Tepoztlán'}
        description={lang === 'en' 
          ? 'Complete overview of Tepoztlán, the magical town nestled in the mountains of Morelos, Mexico.'
          : 'Información completa sobre Tepoztlán, el pueblo mágico enclavado en las montañas de Morelos, México.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        rating={{
          value: 4.8,
          count: 3850
        }}
        pathname={`/${lang}/discover/tepoztlan/overview`}
      />
      <TepoztlanOverviewClient lang={lang} />
    </>
  )
}