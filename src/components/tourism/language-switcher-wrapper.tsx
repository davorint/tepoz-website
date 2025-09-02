'use client'

import dynamic from 'next/dynamic'

const LanguageSwitcher = dynamic(
  () => import('./language-switcher').then(mod => ({ default: mod.LanguageSwitcher })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-[100px] h-9 bg-muted animate-pulse rounded-md" />
    )
  }
)

export default function LanguageSwitcherWrapper() {
  return <LanguageSwitcher />
}