import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'
import StructuredData from '@/components/seo/StructuredData'
import EventsPageClient from '@/components/events/EventsPageClient'

interface EventsPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  
  const title = lang === 'en' ? 'Events in Tepoztlán' : 'Eventos en Tepoztlán'
  const description = lang === 'en' 
    ? 'Discover upcoming events, festivals, markets and cultural celebrations in Tepoztlán. Traditional festivals, spiritual ceremonies, and local markets.'
    : 'Descubre próximos eventos, festivales, mercados y celebraciones culturales en Tepoztlán. Festivales tradicionales, ceremonias espirituales y mercados locales.'

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

export default async function EventsPage({ params }: EventsPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <>
      <StructuredData
        type="local-business"
        title={lang === 'en' ? 'Events in Tepoztlán' : 'Eventos en Tepoztlán'}
        description={lang === 'en' 
          ? 'Discover upcoming events, festivals, markets and cultural celebrations in Tepoztlán.'
          : 'Descubre próximos eventos, festivales, mercados y celebraciones culturales en Tepoztlán.'}
        address={{
          city: 'Tepoztlán',
          state: 'Morelos',
          country: 'Mexico'
        }}
        geo={{
          latitude: '18.9847',
          longitude: '-99.0940'
        }}
        pathname={`/${lang}/events`}
      />
      <EventsPageClient locale={lang} />
    </>
  )
}