import { Locale } from '@/lib/i18n'
import { ExperienceService } from '@/lib/experiences'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import ExperienceActions from '@/components/experiences/ExperienceActions'
import { generateExperienceStructuredData } from '@/lib/seo-utils'
import { Metadata } from 'next'
import { 
  MapPin, 
  Star, 
  Clock,
  Users,
  Award,
  Leaf,
  Mountain,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface ExperiencePageProps {
  params: Promise<{ 
    lang: Locale
    'experience-slug': string
  }>
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { lang, 'experience-slug': experienceSlug } = await params
  const experience = ExperienceService.getExperienceBySlug(experienceSlug, lang)

  if (!experience) {
    return {
      title: lang === 'es' ? 'Experiencia no encontrada' : 'Experience not found'
    }
  }

  const experienceName = ExperienceService.getExperienceName(experience, lang)
  const experienceDescription = ExperienceService.getExperienceDescription(experience, lang)
  const baseUrl = 'https://tepoztlan.com'
  
  return {
    title: `${experienceName} - ${lang === 'es' ? 'Experiencias en Tepoztlán' : 'Experiences in Tepoztlán'}`,
    description: experienceDescription.substring(0, 160),
    keywords: [
      experienceName,
      experience.category,
      lang === 'es' ? 'experiencias Tepoztlán' : 'Tepoztlán experiences',
      lang === 'es' ? 'actividades' : 'activities',
      ...experience.tags[lang]
    ],
    openGraph: {
      title: experienceName,
      description: experienceDescription,
      type: 'website',
      url: `${baseUrl}/${lang}/experience/${experienceSlug}`,
      images: [
        {
          url: `${baseUrl}${experience.images[0]}`,
          width: 1200,
          height: 630,
          alt: experienceName,
        }
      ],
      locale: lang === 'es' ? 'es_MX' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: experienceName,
      description: experienceDescription.substring(0, 140),
      images: [`${baseUrl}${experience.images[0]}`],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/experience/${experienceSlug}`,
      languages: {
        'es': `${baseUrl}/es/experiencias/${experienceSlug}`,
        'en': `${baseUrl}/en/experience/${experienceSlug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { lang, 'experience-slug': experienceSlug } = await params
  
  const experience = ExperienceService.getExperienceBySlug(experienceSlug, lang)
  
  if (!experience) {
    notFound()
  }

  const structuredData = generateExperienceStructuredData(experience, lang, experienceSlug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-3xl overflow-hidden">
          <div className="relative h-96 md:h-[500px]">
            <Image
              src={experience.images[0]}
              alt={ExperienceService.getExperienceName(experience, lang)}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {ExperienceService.getExperienceName(experience, lang)}
              </h1>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                  <span className="text-white font-bold">{experience.rating}</span>
                  <span className="text-white/70 ml-1">({experience.reviewCount})</span>
                </div>
                <Badge className="bg-teal-400/20 text-teal-300 border border-teal-400/30">
                  {ExperienceService.getExperienceCategoryLabel(experience.category, lang)}
                </Badge>
                <div className="text-white font-bold text-xl">
                  {experience.price[lang]}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <p className="text-white/80 leading-relaxed">
                  {ExperienceService.getExperienceDescription(experience, lang)}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Lo más destacado' : 'Highlights'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {experience.highlights[lang].map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Qué incluye' : "What's Included"}
                </h2>
                <div className="space-y-2">
                  {experience.includes[lang].map((item, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What's Not Included */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Qué no incluye' : "What's Not Included"}
                </h2>
                <div className="space-y-2">
                  {experience.excludes[lang].map((item, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      <XCircle className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    {experience.price[lang]}
                  </div>
                  <div className="text-white/60">
                    {lang === 'es' ? 'por persona' : 'per person'}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-white/80">
                    <Clock className="w-5 h-5 text-teal-400 mr-3" />
                    <span>{experience.duration[lang]}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-5 h-5 text-teal-400 mr-3" />
                    <span>{experience.location[lang]}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Users className="w-5 h-5 text-teal-400 mr-3" />
                    <span>
                      {experience.maxParticipants ? 
                        `${lang === 'es' ? 'Máx' : 'Max'} ${experience.maxParticipants} ${lang === 'es' ? 'personas' : 'people'}` :
                        lang === 'es' ? 'Grupo flexible' : 'Flexible group'
                      }
                    </span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Mountain className="w-5 h-5 text-teal-400 mr-3" />
                    <span>
                      {lang === 'es' ? 'Intensidad:' : 'Intensity:'} {
                        experience.intensity === 'low' ? (lang === 'es' ? 'Suave' : 'Low') :
                        experience.intensity === 'medium' ? (lang === 'es' ? 'Medio' : 'Medium') :
                        experience.intensity === 'high' ? (lang === 'es' ? 'Alto' : 'High') :
                        (lang === 'es' ? 'Extremo' : 'Extreme')
                      }
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href={`mailto:${experience.email || 'info@tepoztlan.com'}?subject=${encodeURIComponent(lang === 'es' ? `Consulta sobre ${experience.name[lang]}` : `Inquiry about ${experience.name[lang]}`)}`}>
                    <Button className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3">
                      {lang === 'es' ? 'Más Información' : 'More Information'}
                    </Button>
                  </a>
                  <ExperienceActions
                    phone={experience.phone}
                    website={experience.website}
                    locale={lang}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Requisitos' : 'Requirements'}
                </h3>
                <div className="space-y-2">
                  {experience.requirements[lang].map((req, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Features */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {lang === 'es' ? 'Características' : 'Features'}
                </h3>
                <div className="space-y-3">
                  {experience.verified && (
                    <Badge className="bg-blue-400/20 text-blue-300 border border-blue-400/30 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      {lang === 'es' ? 'Verificado' : 'Verified'}
                    </Badge>
                  )}
                  {experience.sustainable && (
                    <Badge className="bg-green-400/20 text-green-300 border border-green-400/30 flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      {lang === 'es' ? 'Sostenible' : 'Sustainable'}
                    </Badge>
                  )}
                  {experience.indigenous && (
                    <Badge className="bg-orange-400/20 text-orange-300 border border-orange-400/30">
                      🪶 {lang === 'es' ? 'Tradicional' : 'Traditional'}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}