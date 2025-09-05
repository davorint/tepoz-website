import { Metadata } from 'next'
import TepoztlanPageClient from '@/components/discover/TepoztlanPageClient'

interface PageProps {
  params: Promise<{
    lang: 'es' | 'en'
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  
  const metadata = {
    es: {
      title: 'Descubre Tepoztlán - Pueblo Mágico | Tepoztlán Turismo',
      description: 'Explora los tesoros mágicos de Tepoztlán. Desde pirámides prehispánicas hasta mercados coloridos, descubre la rica cultura, historia ancestral y belleza natural de este Pueblo Mágico.',
    },
    en: {
      title: 'Discover Tepoztlán - Magic Town | Tepoztlán Tourism',
      description: 'Explore the magical treasures of Tepoztlán. From pre-Hispanic pyramids to colorful markets, discover the rich culture, ancestral history, and natural beauty of this Magic Town.',
    }
  }

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: lang === 'es' 
      ? 'Tepoztlán, Pueblo Mágico, turismo, pirámide, mercado, cultura, historia, Morelos, México'
      : 'Tepoztlán, Magic Town, tourism, pyramid, market, culture, history, Morelos, Mexico',
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
    },
    alternates: {
      canonical: `/${lang}/discover/tepoztlan`,
      languages: {
        'es': '/es/discover/tepoztlan',
        'en': '/en/discover/tepoztlan'
      }
    }
  }
}

export default async function TepoztlanPage({ params }: PageProps) {
  const { lang } = await params
  return <TepoztlanPageClient lang={lang} />
}