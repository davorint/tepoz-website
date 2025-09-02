'use client'

import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { Translations } from '@/types/translations'

interface TopNavigationWrapperProps {
  lang: Locale
  translations: Translations
}

export default function TopNavigationWrapper({ lang, translations }: TopNavigationWrapperProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg">Tepoztlán</span>
        </Link>

        {/* Simple Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link href={`/${lang}/descubre`} className="text-sm font-medium hover:text-blue-600">
            {translations?.nav?.discover || 'Discover'}
          </Link>
          <Link href={`/${lang}/hospedaje`} className="text-sm font-medium hover:text-blue-600">
            {translations?.nav?.stay || 'Stay'}
          </Link>
          <Link href={`/${lang}/comer`} className="text-sm font-medium hover:text-blue-600">
            {translations?.nav?.eat || 'Eat'}
          </Link>
          <Link href={`/${lang}/experiencias`} className="text-sm font-medium hover:text-blue-600">
            {translations?.nav?.experience || 'Experience'}
          </Link>
        </nav>

        {/* Language Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-xs border px-2 py-1 rounded">
            {lang?.toUpperCase() || 'ES'}
          </span>
        </div>
      </div>
    </header>
  )
}