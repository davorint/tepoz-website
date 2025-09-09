import { Metadata } from 'next'
import TepoztlanCultureClient from '@/components/discover/TepoztlanCultureClient'
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
      title: 'Cultura de Tepoztlán - Tradiciones Ancestrales | Tepoztlán',
      description: 'Descubre la rica herencia cultural de Tepoztlán: danza de los chinelos, ceremonias del temazcal, tradiciones nahuas, festivales vibrantes y artesanías únicas que mantienen viva el alma mágica de este pueblo.',
    },
    en: {
      title: 'Culture of Tepoztlán - Ancestral Traditions | Tepoztlán',
      description: 'Discover the rich cultural heritage of Tepoztlán: chinelos dance, temazcal ceremonies, Nahuatl traditions, vibrant festivals, and unique crafts that keep the magical soul of this town alive.',
    }
  }

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
    keywords: lang === 'es' 
      ? 'Tepoztlán cultura, chinelos, temazcal, náhuatl, tradiciones, artesanías, festivales, carnaval, ceremonias prehispánicas'
      : 'Tepoztlán culture, chinelos, temazcal, nahuatl, traditions, crafts, festivals, carnival, pre-Hispanic ceremonies',
    openGraph: {
      title: metadata[lang].title,
      description: metadata[lang].description,
      type: 'website',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
    },
    alternates: {
      canonical: `/${lang}/discover/tepoztlan/culture`,
      languages: {
        'es': '/es/discover/tepoztlan/culture',
        'en': '/en/discover/tepoztlan/culture'
      }
    }
  }
}

export default async function TepoztlanCulturePage({ params }: PageProps) {
  const { lang } = await params
  return (
    <>
      <StructuredData
        type="tourist-attraction"
        title={lang === 'en' ? 'Culture of Tepoztlán' : 'Cultura de Tepoztlán'}
        description={lang === 'en' 
          ? 'Discover the rich cultural heritage of Tepoztlán with ancient traditions, vibrant festivals, and unique crafts.'
          : 'Descubre la rica herencia cultural de Tepoztlán con tradiciones ancestrales, festivales vibrantes y artesanías únicas.'}
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
          value: 4.9,
          count: 2450
        }}
        pathname={`/${lang}/discover/tepoztlan/culture`}
      />
      <TepoztlanCultureClient lang={lang} />
    </>
  )
}