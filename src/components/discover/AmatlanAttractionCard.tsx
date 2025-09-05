'use client'

import { AmatlanAttraction, AmatlanService } from '@/lib/amatlan'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin,
  Clock,
  DollarSign,
  Mountain,
  Sparkles,
  Heart,
  Share2,
  ChevronRight,
  Users
} from 'lucide-react'
import Image from 'next/image'

interface AmatlanAttractionCardProps {
  attraction: AmatlanAttraction
  locale: Locale
  viewMode?: 'grid' | 'list'
}

const categoryIcons: Record<string, React.ReactNode> = {
  'sacred-site': <Sparkles className="w-4 h-4" />,
  'natural': <Mountain className="w-4 h-4" />,
  'cultural': <Users className="w-4 h-4" />,
  'spiritual': <Sparkles className="w-4 h-4" />,
  'adventure': <Mountain className="w-4 h-4" />,
  'historical': <Clock className="w-4 h-4" />
}

const categoryGradients: Record<string, string> = {
  'sacred-site': 'from-indigo-400 to-purple-400',
  'natural': 'from-cyan-400 to-blue-400',
  'cultural': 'from-orange-400 to-red-400',
  'spiritual': 'from-purple-400 to-violet-400',
  'adventure': 'from-green-400 to-emerald-400',
  'historical': 'from-amber-400 to-yellow-400'
}

const difficultyColors: Record<string, string> = {
  'easy': 'bg-green-400/20 text-green-400 border-green-400/30',
  'moderate': 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
  'hard': 'bg-orange-400/20 text-orange-400 border-orange-400/30',
  'extreme': 'bg-red-400/20 text-red-400 border-red-400/30'
}

export default function AmatlanAttractionCard({ attraction, locale, viewMode = 'grid' }: AmatlanAttractionCardProps) {
  const name = AmatlanService.getAttractionName(attraction, locale)
  const description = AmatlanService.getAttractionDescription(attraction, locale)

  if (viewMode === 'list') {
    return (
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Image */}
            <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <Image
                src={attraction.images[0]}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {attraction.mustSee && (
                <Badge className="absolute top-2 left-2 z-20 bg-gradient-to-r from-red-400 to-pink-400 text-white border-0">
                  ⭐ {locale === 'es' ? 'Imperdible' : 'Must See'}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {name}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2">
                    {description}
                  </p>
                </div>
                <Badge className={`bg-gradient-to-r ${categoryGradients[attraction.category]} text-white border-0`}>
                  {categoryIcons[attraction.category]}
                  <span className="ml-1">{AmatlanService.getCategoryName(attraction.category, locale)}</span>
                </Badge>
              </div>

              {/* Details */}
              <div className="flex items-center gap-4 mb-3">
                {attraction.duration && (
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{AmatlanService.getAttractionDuration(attraction, locale)}</span>
                  </div>
                )}
                {attraction.difficulty && (
                  <Badge className={difficultyColors[attraction.difficulty]}>
                    {locale === 'es' ? 
                      attraction.difficulty === 'easy' ? 'Fácil' :
                      attraction.difficulty === 'moderate' ? 'Moderado' :
                      attraction.difficulty === 'hard' ? 'Difícil' : 'Extremo'
                      : attraction.difficulty
                    }
                  </Badge>
                )}
                {attraction.price && (
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <DollarSign className="w-3 h-3" />
                    <span>{AmatlanService.getAttractionPrice(attraction, locale)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <MapPin className="w-3 h-3" />
                  <span>{AmatlanService.getAttractionDistance(attraction, locale) || (locale === 'es' ? 'Centro' : 'Center')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {AmatlanService.getAttractionHighlights(attraction, locale).slice(0, 3).map((highlight, idx) => (
                    <Badge key={idx} className="bg-emerald-400/10 text-emerald-400/70 border-0 text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white">
                    {locale === 'es' ? 'Ver Detalles' : 'View Details'}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid View
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <Image
          src={attraction.images[0]}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {attraction.mustSee && (
          <Badge className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-400 to-pink-400 text-white border-0 shadow-xl">
            ⭐ {locale === 'es' ? 'Imperdible' : 'Must See'}
          </Badge>
        )}
        <Badge className={`absolute top-3 right-3 z-20 bg-gradient-to-r ${categoryGradients[attraction.category]} text-white border-0 shadow-xl`}>
          {categoryIcons[attraction.category]}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-emerald-400 transition-colors">
            {name}
          </h3>
          <p className="text-white/60 text-sm line-clamp-2">
            {description}
          </p>
        </div>

        {/* Info */}
        <div className="space-y-2">
          {attraction.duration && (
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Clock className="w-4 h-4" />
              <span>{AmatlanService.getAttractionDuration(attraction, locale)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{AmatlanService.getAttractionDistance(attraction, locale) || (locale === 'es' ? 'Centro' : 'Center')}</span>
          </div>
          {attraction.price && (
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>{AmatlanService.getAttractionPrice(attraction, locale)}</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {attraction.difficulty && (
            <Badge className={difficultyColors[attraction.difficulty]}>
              {locale === 'es' ? 
                attraction.difficulty === 'easy' ? 'Fácil' :
                attraction.difficulty === 'moderate' ? 'Moderado' :
                attraction.difficulty === 'hard' ? 'Difícil' : 'Extremo'
                : attraction.difficulty
              }
            </Badge>
          )}
          {attraction.featured && (
            <Badge className="bg-emerald-400/20 text-emerald-400 border-emerald-400/30">
              {locale === 'es' ? 'Destacado' : 'Featured'}
            </Badge>
          )}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 min-h-[2rem]">
          {AmatlanService.getAttractionHighlights(attraction, locale).slice(0, 2).map((highlight, idx) => (
            <span key={idx} className="text-xs text-white/50">
              • {highlight}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white">
            {locale === 'es' ? 'Explorar' : 'Explore'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}