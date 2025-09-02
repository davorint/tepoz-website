import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale, getTranslation } from '@/lib/i18n'
import { Toaster } from '@/components/ui/sonner'
import LanguageProvider from '@/components/providers/language-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import TopNavigation from '@/components/layout/TopNavigation'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  
  const metadata: Record<Locale, Metadata> = {
    es: {
      title: 'Tepoztlán - Guía Turística Completa | Pueblo Mágico',
      description: 'Descubre Tepoztlán: hospedaje, restaurantes, atracciones, eventos y experiencias únicas en este Pueblo Mágico de Morelos, México.',
      keywords: 'Tepoztlán, Pueblo Mágico, turismo, hospedaje, restaurantes, pirámide Tepozteco, Morelos, México',
      openGraph: {
        title: 'Tepoztlán - Guía Turística Completa',
        description: 'Tu guía completa para explorar el Pueblo Mágico de Tepoztlán',
        locale: 'es_MX',
        type: 'website',
      },
    },
    en: {
      title: 'Tepoztlán - Complete Tourist Guide | Magical Town',
      description: 'Discover Tepoztlán: accommodation, restaurants, attractions, events and unique experiences in this Magical Town of Morelos, Mexico.',
      keywords: 'Tepoztlán, Magical Town, tourism, accommodation, restaurants, Tepozteco pyramid, Morelos, Mexico',
      openGraph: {
        title: 'Tepoztlán - Complete Tourist Guide',
        description: 'Your complete guide to explore the Magical Town of Tepoztlán',
        locale: 'en_US',
        type: 'website',
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
        <TopNavigation lang={lang} translations={translations} />
        {children}
        <Toaster />
      </ThemeProvider>
    </LanguageProvider>
  )
}