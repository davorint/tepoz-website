import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale, getTranslation } from '@/lib/i18n'
import { Toaster } from '@/components/ui/sonner'
import LanguageProvider from '@/components/providers/language-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import StaticNavigation from '@/components/layout/StaticNavigation'
import PremiumFooter from '@/components/layout/PremiumFooter'
import SocialProofNotifications from '@/components/widgets/SocialProofNotifications'

// Static generation optimization
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

// Enable ISR with dynamic revalidation
export const revalidate = 3600 // Default 1 hour revalidation

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  
  const baseUrl = 'https://tepoztlan.com'
  const currentPath = '' // This will be set by each page
  
  const metadata: Record<Locale, Metadata> = {
    es: {
      title: 'Tepoztlán - Guía Turística Completa | Pueblo Mágico',
      description: 'Descubre Tepoztlán: hospedaje, restaurantes, atracciones, eventos y experiencias únicas en este Pueblo Mágico de Morelos, México.',
      keywords: 'Tepoztlán, Pueblo Mágico, turismo, hospedaje, restaurantes, pirámide Tepozteco, Morelos, México',
      alternates: {
        canonical: `${baseUrl}/es${currentPath}`,
        languages: {
          'es': `${baseUrl}/es${currentPath}`,
          'en': `${baseUrl}/en${currentPath}`,
          'x-default': `${baseUrl}/es${currentPath}`,
        },
      },
      openGraph: {
        title: 'Tepoztlán - Guía Turística Completa',
        description: 'Tu guía completa para explorar el Pueblo Mágico de Tepoztlán',
        locale: 'es_MX',
        type: 'website',
        url: `${baseUrl}/es${currentPath}`,
        siteName: 'Tepoztlán Directorio',
        images: [
          {
            url: `${baseUrl}/images/og-tepoztlan-es.jpg`,
            width: 1200,
            height: 630,
            alt: 'Tepoztlán - Pueblo Mágico',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Tepoztlán - Guía Turística Completa',
        description: 'Tu guía completa para explorar el Pueblo Mágico de Tepoztlán',
        images: [`${baseUrl}/images/twitter-tepoztlan-es.jpg`],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    },
    en: {
      title: 'Tepoztlán - Complete Tourist Guide | Magical Town',
      description: 'Discover Tepoztlán: accommodation, restaurants, attractions, events and unique experiences in this Magical Town of Morelos, Mexico.',
      keywords: 'Tepoztlán, Magical Town, tourism, accommodation, restaurants, Tepozteco pyramid, Morelos, Mexico',
      alternates: {
        canonical: `${baseUrl}/en${currentPath}`,
        languages: {
          'es': `${baseUrl}/es${currentPath}`,
          'en': `${baseUrl}/en${currentPath}`,
          'x-default': `${baseUrl}/es${currentPath}`,
        },
      },
      openGraph: {
        title: 'Tepoztlán - Complete Tourist Guide',
        description: 'Your complete guide to explore the Magical Town of Tepoztlán',
        locale: 'en_US',
        type: 'website',
        url: `${baseUrl}/en${currentPath}`,
        siteName: 'Tepoztlán Directory',
        images: [
          {
            url: `${baseUrl}/images/og-tepoztlan-en.jpg`,
            width: 1200,
            height: 630,
            alt: 'Tepoztlán - Magical Town',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Tepoztlán - Complete Tourist Guide',
        description: 'Your complete guide to explore the Magical Town of Tepoztlán',
        images: [`${baseUrl}/images/twitter-tepoztlan-en.jpg`],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    },
  }

  return metadata[lang] || metadata.es
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  
  // Validate language
  if (!locales.includes(langParam as Locale)) {
    notFound()
  }

  const lang = langParam as Locale
  const translations = getTranslation(lang)

  return (
    <LanguageProvider lang={lang}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <StaticNavigation lang={lang} translations={translations} />
        {children}
        <PremiumFooter lang={lang} />
        <SocialProofNotifications lang={lang} />
        <Toaster />
      </ThemeProvider>
    </LanguageProvider>
  )
}