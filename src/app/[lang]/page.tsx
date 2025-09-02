import { Locale } from '@/lib/i18n'
import FloatingStatsSection from '@/components/sections/FloatingStatsSection'
import InteractiveCTASection from '@/components/sections/InteractiveCTASection'
import SimpleTestimonialsSection from '@/components/sections/SimpleTestimonialsSection'

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params

  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black">
        {/* Premium Background Elements */}
        <div className="absolute inset-0" suppressHydrationWarning>
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-purple-500/20 rounded-full blur-3xl motion-safe:animate-float-slow motion-safe:animate-aurora-1" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl motion-safe:animate-float-reverse motion-safe:animate-aurora-2" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-orange-400/10 rounded-full blur-2xl motion-safe:animate-pulse-gentle motion-safe:animate-morph" />
          
          {/* Additional ambient elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl motion-safe:animate-float animation-delay-1500ms" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-bl from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl motion-safe:animate-float-reverse animation-delay-4s" />
          <div className="absolute top-1/3 left-10 w-24 h-24 bg-gradient-to-tr from-rose-400/10 to-pink-500/10 rounded-full blur-lg motion-safe:animate-pulse-slow animation-delay-2s" />
          <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-gradient-to-tl from-indigo-400/10 to-purple-500/10 rounded-full blur-xl motion-safe:animate-pulse-slow animation-delay-6s" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="max-w-5xl text-center">
            <h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl font-bold motion-safe:animate-fade-in-up motion-safe:animation-delay-500ms text-shadow-lg hover:scale-105 md:hover:scale-110 transition-transform duration-500 cursor-pointer touch-manipulation select-none" suppressHydrationWarning>
              <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-pink-500 bg-clip-text text-transparent motion-safe:animate-gradient-x bg-300%">
                Tepoztlán
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 motion-safe:animate-fade-in-up motion-safe:animation-delay-700ms text-shadow-md hover:text-gray-50 transition-colors duration-300 cursor-pointer touch-manipulation" suppressHydrationWarning>
              {lang === 'es' 
                ? 'Un portal hacia experiencias místicas y transformadoras'
                : 'A gateway to mystical and transformative experiences'
              }
            </p>
            <div className="motion-safe:animate-fade-in-up motion-safe:animation-delay-1500ms" suppressHydrationWarning>
              <div className="inline-flex items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer touch-manipulation active:scale-95">
                <div className="w-3 h-3 bg-orange-400 rounded-full motion-safe:animate-pulse-glow" />
                <span className="text-gray-200 font-medium text-shadow-sm">
                  {lang === 'es' ? 'Descubre la magia que te espera' : 'Discover the magic that awaits'}
                </span>
                <div className="w-3 h-3 bg-purple-500 rounded-full motion-safe:animate-pulse-glow animation-delay-500ms" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 motion-safe:animate-scroll-indicator motion-safe:animation-delay-2s" suppressHydrationWarning>
          <div className="flex flex-col items-center text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
            <span className="text-sm mb-2 text-shadow-sm font-medium">
              {lang === 'es' ? 'Explorar' : 'Explore'}
            </span>
            <div className="w-6 h-10 border-2 border-gray-300/70 rounded-full flex justify-center hover:border-white transition-colors duration-300">
              <div className="w-1 h-3 bg-gradient-to-b from-orange-400 to-purple-500 rounded-full mt-2 motion-safe:animate-bounce-slow"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {lang === 'es' ? 'Experiencias Populares' : 'Popular Experiences'}
          </h2>
          <p className="text-gray-700 mb-8">
            {lang === 'es' 
              ? 'Explora los lugares más emblemáticos de Tepoztlán'
              : 'Explore the most iconic places in Tepoztlán'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {lang === 'es' ? `Atracción ${i}` : `Attraction ${i}`}
                </h3>
                <p className="text-gray-700">
                  {lang === 'es' 
                    ? 'Descripción de la atracción'
                    : 'Attraction description'
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatingStatsSection lang={lang} />
      <InteractiveCTASection lang={lang} />
      <SimpleTestimonialsSection lang={lang} />
    </main>
  )
}