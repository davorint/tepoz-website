'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

export default function ClientOnly({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <>{children}</> : (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full opacity-20 blur-xl" />
      </div>
    </div>
  )
}