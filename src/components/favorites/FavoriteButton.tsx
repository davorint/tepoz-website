'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toggleFavorite } from '@/lib/actions/favorites'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  businessId: string | number
  initialIsFavorited?: boolean
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showLabel?: boolean
  locale?: 'es' | 'en'
}

export default function FavoriteButton({
  businessId,
  initialIsFavorited = false,
  variant = 'ghost',
  size = 'icon',
  className,
  showLabel = false,
  locale = 'es',
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      // Convert businessId to number for database operations
      const numericId = typeof businessId === 'string' ? parseInt(businessId, 10) : businessId
      const result = await toggleFavorite(numericId)

      if (result.success) {
        setIsFavorited(result.isFavorited ?? false)
        toast.success(
          result.isFavorited
            ? locale === 'es'
              ? 'Agregado a favoritos'
              : 'Added to favorites'
            : locale === 'es'
            ? 'Eliminado de favoritos'
            : 'Removed from favorites'
        )
      } else {
        if (result.error === 'You must be logged in to add favorites') {
          toast.error(
            locale === 'es'
              ? 'Debes iniciar sesión para agregar favoritos'
              : 'You must be logged in to add favorites'
          )
        } else {
          toast.error(
            locale === 'es'
              ? 'Error al actualizar favoritos'
              : 'Error updating favorites'
          )
        }
      }
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        'transition-all duration-300',
        isFavorited && 'text-red-500 hover:text-red-600',
        className
      )}
      aria-label={
        isFavorited
          ? locale === 'es'
            ? 'Quitar de favoritos'
            : 'Remove from favorites'
          : locale === 'es'
          ? 'Agregar a favoritos'
          : 'Add to favorites'
      }
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-all duration-300',
          isFavorited && 'fill-current',
          showLabel && 'mr-2'
        )}
      />
      {showLabel && (
        <span>
          {isFavorited
            ? locale === 'es'
              ? 'Guardado'
              : 'Saved'
            : locale === 'es'
            ? 'Guardar'
            : 'Save'}
        </span>
      )}
    </Button>
  )
}
