'use client'

import { Star, ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'
import { cn } from '@/lib/utils'

interface Review {
  id: number
  userId: string
  businessId: number
  rating: number
  comment: string
  helpful: number
  createdAt: Date
  user?: {
    name: string | null
    image: string | null
  }
}

interface ReviewListProps {
  reviews: Review[]
  locale?: 'es' | 'en'
}

export default function ReviewList({ reviews, locale = 'es' }: ReviewListProps) {
  const content = {
    es: {
      noReviews: 'Aún no hay reseñas',
      noReviewsDesc: 'Sé el primero en compartir tu experiencia',
      helpful: 'Útil',
      verified: 'Verificado',
    },
    en: {
      noReviews: 'No reviews yet',
      noReviewsDesc: 'Be the first to share your experience',
      helpful: 'Helpful',
      verified: 'Verified',
    },
  }

  const t = content[locale]

  if (reviews.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <div className="text-8xl opacity-50">⭐</div>
          </EmptyMedia>
          <EmptyTitle className="text-3xl font-bold text-white font-sans">
            {t.noReviews}
          </EmptyTitle>
          <EmptyDescription className="text-white/70 text-lg">
            {t.noReviewsDesc}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const userInitials = review.user?.name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'U'

        const reviewDate = new Date(review.createdAt).toLocaleDateString(
          locale === 'es' ? 'es-MX' : 'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        )

        return (
          <Card
            key={review.id}
            className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={review.user?.image || ''} alt={review.user?.name || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-white font-semibold">
                        {review.user?.name || 'Anonymous'}
                      </h4>
                      <p className="text-white/50 text-sm">{reviewDate}</p>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'h-4 w-4',
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-white/20'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-white/90 mb-4 whitespace-pre-wrap">{review.comment}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/10 h-8 px-3"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {t.helpful} {review.helpful > 0 && `(${review.helpful})`}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
