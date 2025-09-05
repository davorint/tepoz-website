import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import CafesPageClient from '@/components/cafes/CafesPageClient'
import StructuredData from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  
  const title = lang === 'en' ? 'Cafés & Bakeries in Tepoztlán' : 'Cafeterías y Panaderías en Tepoztlán'
  const description = lang === 'en' 
    ? 'Find the best cafés and bakeries in Tepoztlán. Enjoy artisanal coffee, fresh pastries, and cozy atmospheres in this magical town.'
    : 'Encuentra las mejores cafeterías y panaderías en Tepoztlán. Disfruta café artesanal, repostería fresca y ambientes acogedores en este pueblo mágico.'

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

export default async function CafesPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'Cafés & Bakeries in Tepoztlán' : 'Cafeterías y Panaderías en Tepoztlán'}
        description={lang === 'en' 
          ? 'Find the best cafés and bakeries in Tepoztlán. Enjoy artisanal coffee and fresh pastries.'
          : 'Encuentra las mejores cafeterías y panaderías en Tepoztlán. Disfruta café artesanal y repostería fresca.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/eat/cafes-bakeries`}
      />
      <CafesPageClient locale={lang} />
    </>
  )
}