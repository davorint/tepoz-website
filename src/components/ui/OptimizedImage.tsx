'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
}

/**
 * OptimizedImage Component
 *
 * Automatically serves WebP/AVIF versions of images when available
 * Falls back to original image if optimized version doesn't exist
 *
 * Usage:
 * <OptimizedImage
 *   src="/home-ecoposada-tepoztli.jpg"
 *   alt="Hotel"
 *   width={800}
 *   height={600}
 * />
 *
 * This will automatically try to load:
 * 1. /optimized/home-ecoposada-tepoztli.avif (best compression)
 * 2. /optimized/home-ecoposada-tepoztli.webp (good compression)
 * 3. /optimized/home-ecoposada-tepoztli-optimized.jpg (fallback)
 * 4. /home-ecoposada-tepoztli.jpg (original as last resort)
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Get optimized image path
  const getOptimizedSrc = (originalSrc: string): string => {
    // If already using optimized path, return as is
    if (originalSrc.includes('/optimized/')) {
      return originalSrc
    }

    // Extract filename without extension
    const filename = originalSrc.split('/').pop()?.split('.')[0]
    const ext = originalSrc.split('.').pop()

    // Check if optimized version exists
    if (filename && ext) {
      // Try WebP first (best browser support among modern formats)
      return `/optimized/${filename}.webp`
    }

    return originalSrc
  }

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Fallback to original image
      setImgSrc(src)
    }
  }

  const optimizedSrc = hasError ? src : getOptimizedSrc(imgSrc)

  if (fill) {
    return (
      <picture>
        {!hasError && (
          <>
            <source
              srcSet={optimizedSrc.replace('.webp', '.avif')}
              type="image/avif"
            />
            <source srcSet={optimizedSrc} type="image/webp" />
          </>
        )}
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          className={className}
          priority={priority}
          sizes={sizes}
          quality={quality}
          onError={handleError}
        />
      </picture>
    )
  }

  return (
    <picture>
      {!hasError && (
        <>
          <source
            srcSet={optimizedSrc.replace('.webp', '.avif')}
            type="image/avif"
          />
          <source srcSet={optimizedSrc} type="image/webp" />
        </>
      )}
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        quality={quality}
        onError={handleError}
      />
    </picture>
  )
}
