'use client'

import { useState, useTransition } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { submitReview } from '@/lib/actions/reviews'

interface ReviewFormProps {
  businessId: string | number
  locale?: 'es' | 'en'
  onSuccess?: () => void
}

export default function ReviewForm({ businessId, locale = 'es', onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isPending, startTransition] = useTransition()

  const content = {
    es: {
      title: 'Escribe una reseña',
      description: 'Comparte tu experiencia con otros viajeros',
      ratingLabel: 'Calificación',
      ratingRequired: 'Selecciona una calificación',
      commentLabel: 'Tu reseña',
      commentPlaceholder: '¿Qué te pareció este lugar? Comparte detalles sobre tu experiencia...',
      commentRequired: 'Escribe tu reseña',
      submit: 'Publicar reseña',
      submitting: 'Publicando...',
      success: 'Reseña publicada exitosamente',
      error: 'Error al publicar la reseña',
      loginRequired: 'Debes iniciar sesión para escribir una reseña',
    },
    en: {
      title: 'Write a Review',
      description: 'Share your experience with other travelers',
      ratingLabel: 'Rating',
      ratingRequired: 'Please select a rating',
      commentLabel: 'Your Review',
      commentPlaceholder: 'What did you think of this place? Share details about your experience...',
      commentRequired: 'Please write your review',
      submit: 'Submit Review',
      submitting: 'Submitting...',
      success: 'Review submitted successfully',
      error: 'Error submitting review',
      loginRequired: 'You must be logged in to write a review',
    },
  }

  const t = content[locale]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error(t.ratingRequired)
      return
    }

    if (!comment.trim()) {
      toast.error(t.commentRequired)
      return
    }

    startTransition(async () => {
      const numericId = typeof businessId === 'string' ? parseInt(businessId, 10) : businessId

      const result = await submitReview({
        businessId: numericId,
        rating,
        comment,
        locale,
      })

      if (result.success) {
        toast.success(t.success)
        setRating(0)
        setComment('')
        onSuccess?.()
      } else {
        if (result.error === 'You must be logged in to submit a review') {
          toast.error(t.loginRequired)
        } else if (result.error === 'You have already reviewed this business') {
          toast.error(
            locale === 'es'
              ? 'Ya has escrito una reseña para este negocio'
              : 'You have already reviewed this business'
          )
        } else {
          toast.error(t.error)
        }
      }
    })
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">{t.title}</CardTitle>
        <CardDescription className="text-white/70">{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-white">
              {t.ratingLabel}
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
                  disabled={isPending}
                >
                  <Star
                    className={cn(
                      'h-8 w-8 transition-colors',
                      (hoveredRating >= star || rating >= star)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/30'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-white">
              {t.commentLabel}
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.commentPlaceholder}
              rows={5}
              disabled={isPending}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || rating === 0 || !comment.trim()}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500"
          >
            {isPending ? t.submitting : t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
