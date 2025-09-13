import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { Experience, ExperienceService } from '@/lib/experiences'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Star, 
  Phone,
  Clock,
  Heart,
  Users,
  Globe,
  Award,
  Leaf,
  Mountain
} from 'lucide-react'

interface ExperienceCardProps {
  experience: Experience
  locale: Locale
  viewMode?: 'grid' | 'list'
  animationDelay?: number
  onViewOnMap?: (experience: Experience) => void
}

export default function ExperienceCard({ 
  experience, 
  locale, 
  viewMode = 'grid', 
  animationDelay = 0,
  onViewOnMap
}: ExperienceCardProps) {
  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (experience.phone) {
      window.open(`tel:${experience.phone}`, '_self')
    }
  }

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (experience.website) {
      window.open(experience.website, '_blank', 'noopener,noreferrer')
    }
  }

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    // TODO: Implement favorite functionality
    console.log('Heart clicked for experience:', experience.id)
  }

  const handleViewOnMap = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (onViewOnMap) {
      onViewOnMap(experience)
    }
  }

  const handleCardClick = () => {
    // If experience has coordinates and onViewOnMap is available, navigate to map
    if (experience.latitude && experience.longitude && onViewOnMap) {
      onViewOnMap(experience)
    }
  }

  const getCategoryColor = () => {
    const categoryColors = {
      'adventure': 'from-teal-400 to-cyan-400',
      'spiritual': 'from-orange-400 to-amber-400',
      'wellness': 'from-green-400 to-emerald-400',
      'cultural': 'from-blue-400 to-indigo-400',
      'nature': 'from-lime-400 to-green-400',
      'food': 'from-yellow-400 to-orange-400',
      'art': 'from-violet-400 to-fuchsia-400',
      'photography': 'from-pink-400 to-rose-400',
      'healing': 'from-purple-400 to-pink-400'
    }
    return categoryColors[experience.category] || 'from-gray-400 to-slate-400'
  }

  const getIntensityColor = () => {
    const intensityColors = {
      'low': 'bg-green-500/80',
      'medium': 'bg-yellow-500/80',
      'high': 'bg-orange-500/80',
      'extreme': 'bg-red-500/80'
    }
    return intensityColors[experience.intensity] || 'bg-gray-500/80'
  }

  const getIntensityLabel = () => {
    const intensityLabels = {
      'low': locale === 'es' ? 'Suave' : 'Low',
      'medium': locale === 'es' ? 'Medio' : 'Medium', 
      'high': locale === 'es' ? 'Alto' : 'High',
      'extreme': locale === 'es' ? 'Extremo' : 'Extreme'
    }
    return intensityLabels[experience.intensity] || experience.intensity
  }

  return (
    <div 
      className="group relative animate-fade-in-up transition-all duration-300"
      style={{ animationDelay: `${animationDelay}ms` }}
      data-experience-id={experience.id}
    >
      {/* Card glow effect - Teal/Cyan Theme */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor()} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-3xl`} />
      
      {/* Glassmorphism card with improved light mode readability */}
      <Card 
        className={`relative bg-white/95 dark:bg-white/10 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white dark:group-hover:bg-white/15 cursor-pointer ${
          viewMode === 'list' ? 'flex' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Featured Badge */}
        {experience.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 font-semibold shadow-xl">
              ⭐ {locale === 'es' ? 'Destacada' : 'Featured'}
            </Badge>
          </div>
        )}

        {/* Indigenous Badge */}
        {experience.indigenous && (
          <div className="absolute top-4 left-4 z-10" style={{ top: experience.featured ? '3.5rem' : '1rem' }}>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 font-semibold shadow-xl">
              🪶 {locale === 'es' ? 'Indígena' : 'Indigenous'}
            </Badge>
          </div>
        )}

        {/* Sustainable Badge */}
        {experience.sustainable && !experience.featured && !experience.indigenous && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 font-semibold shadow-xl">
              🌱 {locale === 'es' ? 'Sostenible' : 'Sustainable'}
            </Badge>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/90 dark:bg-white/20 backdrop-blur-sm border border-gray-200 dark:border-white/30 rounded-2xl px-3 py-2 text-center shadow-lg">
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {experience.price[locale]}
            </div>
          </div>
        </div>

        {/* Experience Image */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-80 h-48' : 'h-64'
        }`}>
          <Image
            src={experience.images[0]}
            alt={ExperienceService.getExperienceName(experience, locale)}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Premium accent gradient bar - Teal/Cyan Colors */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getCategoryColor()} opacity-80 group-hover:h-2 transition-all duration-500`} />
          
          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {experience.duration[locale]}
            </Badge>
          </div>

          {/* Intensity Level */}
          <div className="absolute bottom-4 right-4">
            <Badge className={`${getIntensityColor()} backdrop-blur-sm text-white border-0 flex items-center gap-1`}>
              <Mountain className="w-3 h-3" />
              {getIntensityLabel()}
            </Badge>
          </div>
        </div>

        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-teal-600 dark:group-hover:from-teal-300 group-hover:to-cyan-600 dark:group-hover:to-cyan-300 transition-all">
              {ExperienceService.getExperienceName(experience, locale)}
            </h3>
            
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <div className="flex items-center bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-300 dark:border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-900 dark:text-white text-sm font-bold">{experience.rating}</span>
                <span className="ml-1 text-gray-600 dark:text-white/70 text-xs">({experience.reviewCount})</span>
              </div>
              
              <Badge className="bg-teal-400/20 text-teal-300 border border-teal-400/30">
                {ExperienceService.getExperienceCategoryLabel(experience.category, locale)}
              </Badge>

              {/* Type Badge */}
              <Badge variant="outline" className="text-xs border-gray-300 dark:border-white/30 text-gray-600 dark:text-white/70 capitalize">
                {experience.type === 'individual' ? (locale === 'es' ? 'Individual' : 'Individual') :
                 experience.type === 'group' ? (locale === 'es' ? 'Grupo' : 'Group') :
                 (locale === 'es' ? 'Privado' : 'Private')}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-white/70 text-sm mb-4 line-clamp-2">
            {ExperienceService.getExperienceShortDescription(experience, locale)}
          </p>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {experience.highlights[locale].slice(0, viewMode === 'list' ? 3 : 2).map((highlight, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-gray-300 dark:border-white/30 text-gray-700 dark:text-white/80">
                  {highlight}
                </Badge>
              ))}
              {experience.highlights[locale].length > (viewMode === 'list' ? 3 : 2) && (
                <Badge variant="outline" className="text-xs border-gray-300 dark:border-white/30 text-gray-500 dark:text-white/60">
                  +{experience.highlights[locale].length - (viewMode === 'list' ? 3 : 2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-gray-600 dark:text-white/70">
              <MapPin className="w-4 h-4 mr-2 text-teal-500 dark:text-teal-400" />
              <span className="line-clamp-1">{experience.location[locale]}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-white/70">
              <Users className="w-4 h-4 mr-2 text-teal-500 dark:text-teal-400" />
              {experience.maxParticipants ? 
                `${locale === 'es' ? 'Máx' : 'Max'} ${experience.maxParticipants} ${locale === 'es' ? 'personas' : 'people'}` :
                locale === 'es' ? 'Grupo flexible' : 'Flexible group'
              }
            </div>
          </div>

          {/* Special Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {experience.verified && (
              <Badge className="bg-blue-400/20 text-blue-300 border border-blue-400/30 text-xs flex items-center gap-1">
                <Award className="w-3 h-3" />
                {locale === 'es' ? 'Verificado' : 'Verified'}
              </Badge>
            )}
            {experience.sustainable && (
              <Badge className="bg-green-400/20 text-green-300 border border-green-400/30 text-xs flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                {locale === 'es' ? 'Sostenible' : 'Sustainable'}
              </Badge>
            )}
            {experience.indigenous && (
              <Badge className="bg-orange-400/20 text-orange-300 border border-orange-400/30 text-xs">
                🪶 {locale === 'es' ? 'Tradicional' : 'Traditional'}
              </Badge>
            )}
          </div>

          {/* Provider Info - Grid View Only */}
          {viewMode === 'grid' && (
            <div className="mb-4 text-sm">
              <div className="flex items-center text-gray-500 dark:text-white/60">
                <span>{locale === 'es' ? 'Por:' : 'By:'} </span>
                <span className="font-medium text-gray-700 dark:text-white/80 ml-1">{experience.provider.name}</span>
                {experience.provider.certification && (
                  <Badge variant="outline" className="ml-2 text-xs border-gray-300 dark:border-white/30 text-gray-500 dark:text-white/60">
                    {experience.provider.certification}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={`flex gap-3 ${viewMode === 'list' ? 'mt-auto' : ''}`}>
            <Link 
              href={`/${locale}/experience/${ExperienceService.generateSlug(experience, locale)}`}
              className="flex-1"
              onClick={(e) => e.stopPropagation()} // Prevent card click
            >
              <Button className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white border-0 shadow-xl font-semibold">
                {locale === 'es' ? 'Ver Detalles' : 'View Details'}
              </Button>
            </Link>
            {experience.phone && (
              <Button 
                size="sm" 
                className="bg-gray-200/80 dark:bg-white/20 backdrop-blur-sm text-gray-700 dark:text-white hover:bg-gray-300/80 dark:hover:bg-white/30 border-0 aspect-square p-0"
                onClick={handlePhoneClick}
              >
                <Phone className="w-4 h-4" />
              </Button>
            )}
            {experience.website && (
              <Button 
                size="sm" 
                className="bg-gray-200/80 dark:bg-white/20 backdrop-blur-sm text-gray-700 dark:text-white hover:bg-gray-300/80 dark:hover:bg-white/30 border-0 aspect-square p-0"
                onClick={handleWebsiteClick}
              >
                <Globe className="w-4 h-4" />
              </Button>
            )}
            {experience.latitude && experience.longitude && onViewOnMap && (
              <Button 
                size="sm" 
                className="bg-gray-200/80 dark:bg-white/20 backdrop-blur-sm text-gray-700 dark:text-white hover:bg-gray-300/80 dark:hover:bg-white/30 border-0 aspect-square p-0"
                onClick={handleViewOnMap}
                title={locale === 'es' ? 'Ver en mapa' : 'View on map'}
              >
                <MapPin className="w-4 h-4" />
              </Button>
            )}
            <Button 
              size="sm" 
              className="bg-gray-200/80 dark:bg-white/20 backdrop-blur-sm text-gray-700 dark:text-white hover:bg-gray-300/80 dark:hover:bg-white/30 border-0 aspect-square p-0"
              onClick={handleHeartClick}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}