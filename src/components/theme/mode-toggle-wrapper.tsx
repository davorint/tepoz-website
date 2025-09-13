'use client'

import dynamic from 'next/dynamic'

const ModeToggle = dynamic(() => import('./mode-toggle').then(mod => ({ default: mod.ModeToggle })), {
  ssr: false,
  loading: () => (
    <div className="h-9 w-9 rounded-md border border-input bg-background animate-pulse" />
  )
})

export { ModeToggle }