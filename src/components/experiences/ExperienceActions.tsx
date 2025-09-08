'use client'

import { Button } from '@/components/ui/button'
import { Phone, Globe } from 'lucide-react'

interface ExperienceActionsProps {
  phone?: string
  website?: string
  locale: 'es' | 'en'
}

export default function ExperienceActions({ phone, website, locale }: ExperienceActionsProps) {
  const handlePhoneClick = () => {
    if (phone) {
      window.open(`tel:${phone}`, '_self')
    }
  }

  const handleWebsiteClick = () => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex gap-2">
      {phone && (
        <Button 
          className="flex-1 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          onClick={handlePhoneClick}
        >
          <Phone className="w-4 h-4 mr-2" />
          {locale === 'es' ? 'Llamar' : 'Call'}
        </Button>
      )}
      {website && (
        <Button 
          className="flex-1 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          onClick={handleWebsiteClick}
        >
          <Globe className="w-4 h-4 mr-2" />
          {locale === 'es' ? 'Sitio Web' : 'Website'}
        </Button>
      )}
    </div>
  )
}