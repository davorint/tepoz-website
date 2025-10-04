'use client'

import { useState } from 'react'
import { Share2, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

interface SocialShareProps {
  title: string
  url?: string
  locale?: 'es' | 'en'
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function SocialShare({
  title,
  url,
  locale = 'es',
  variant = 'outline',
  size = 'default',
  className
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  // Use current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  const content = {
    es: {
      share: 'Compartir',
      facebook: 'Compartir en Facebook',
      twitter: 'Compartir en Twitter',
      copy: 'Copiar enlace',
      copied: '¡Enlace copiado!',
      copySuccess: 'Enlace copiado al portapapeles',
    },
    en: {
      share: 'Share',
      facebook: 'Share on Facebook',
      twitter: 'Share on Twitter',
      copy: 'Copy link',
      copied: 'Link copied!',
      copySuccess: 'Link copied to clipboard',
    },
  }

  const t = content[locale]

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success(t.copySuccess)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      toast.error(locale === 'es' ? 'Error al copiar el enlace' : 'Failed to copy link')
    }
  }

  // If Web Share API is available, use native share
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        })
      } catch (error) {
        // User cancelled or error occurred
        console.error('Share failed:', error)
      }
    }
  }

  // Check if native share is available
  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share

  if (hasNativeShare) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleNativeShare}
        className={className}
      >
        <Share2 className="w-4 h-4 mr-2" />
        {t.share}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="w-4 h-4 mr-2" />
          {t.share}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleFacebookShare} className="cursor-pointer">
          <Facebook className="w-4 h-4 mr-2" />
          {t.facebook}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTwitterShare} className="cursor-pointer">
          <Twitter className="w-4 h-4 mr-2" />
          {t.twitter}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-green-500">{t.copied}</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4 mr-2" />
              {t.copy}
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
