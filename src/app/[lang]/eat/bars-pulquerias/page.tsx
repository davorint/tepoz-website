import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import BarsPageClient from '@/components/bars/BarsPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'Bars & Pulquerías in Tepoztlán' : 'Bares y Pulquerías en Tepoztlán'
  const description = lang === 'en' 
    ? 'Discover the best bars and traditional pulquerías in Tepoztlán. From craft cocktails to authentic pulque, experience the vibrant nightlife of this magical town.'
    : 'Descubre los mejores bares y pulquerías tradicionales en Tepoztlán. Desde cócteles artesanales hasta pulque auténtico, experimenta la vibrante vida nocturna de este pueblo mágico.'

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

export default async function BarsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'Bars & Pulquerías in Tepoztlán' : 'Bares y Pulquerías en Tepoztlán'}
        description={lang === 'en' 
          ? 'Discover the best bars and traditional pulquerías in Tepoztlán. Experience the vibrant nightlife.'
          : 'Descubre los mejores bares y pulquerías tradicionales en Tepoztlán. Experimenta la vibrante vida nocturna.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
      />
      <BarsPageClient locale={lang} />
    </>
  )
}