import { Metadata } from 'next'
import TepoztlanNeighborhoodsClient from '@/components/discover/TepoztlanNeighborhoodsClient'
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
      title: 'Barrios de Tepoztlán - Ocho Barrios Tradicionales | Tepoztlán',
      description: 'Explora los ocho barrios tradicionales de Tepoztlán: Santo Domingo, San Miguel, La Santísima, Santa Cruz, San Sebastián, San Pedro, Los Reyes y San José. Cada uno con su propia capilla, historia y tradiciones únicas.',
    },
    en: {
      title: 'Neighborhoods of Tepoztlán - Eight Traditional Barrios | Tepoztlán',
      description: 'Explore the eight traditional neighborhoods of Tepoztlán: Santo Domingo, San Miguel, La Santísima, Santa Cruz, San Sebastián, San Pedro, Los Reyes and San José. Each with its own chapel, history and unique traditions.',
    }
  }

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: lang === 'es' 
      ? 'Tepoztlán barrios, Santo Domingo, San Miguel, La Santísima, Santa Cruz, San Sebastián, San Pedro, Los Reyes, San José, capillas, fiestas patronales'
      : 'Tepoztlán neighborhoods, Santo Domingo, San Miguel, La Santísima, Santa Cruz, San Sebastián, San Pedro, Los Reyes, San José, chapels, patron festivals',
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
    },
    alternates: {
      canonical: `/${lang}/discover/tepoztlan/neighborhoods`,
      languages: {
        'es': '/es/discover/tepoztlan/neighborhoods',
        'en': '/en/discover/tepoztlan/neighborhoods'
      }
    }
  }
}

export default async function TepoztlanNeighborhoodsPage({ params }: PageProps) {
  const { lang } = await params
  return (
    <>
      <StructuredData
        type="tourist-attraction"
        title={lang === 'en' ? 'Neighborhoods of Tepoztlán' : 'Barrios de Tepoztlán'}
        description={lang === 'en' 
          ? 'Discover the eight traditional neighborhoods of Tepoztlán, each with unique traditions and patron saint festivals.'
          : 'Descubre los ocho barrios tradicionales de Tepoztlán, cada uno con tradiciones únicas y fiestas patronales.'}
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
          value: 4.7,
          count: 1850
        }}
        pathname={`/${lang}/discover/tepoztlan/neighborhoods`}
      />
      <TepoztlanNeighborhoodsClient lang={lang} />
    </>
  )
}