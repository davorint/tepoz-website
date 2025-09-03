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
  
  // Debug log
  console.log('HomePage received lang parameter:', lang)

  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="relative h-screen w-full overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/tepoztlan-hero.jpg)' }}
        >
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-950/40 to-black/70" />
        </div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 z-[1]">
          {/* Main ambient orbs */}
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
            <h1 className="mb-6 text-7xl md:text-9xl lg:text-[10rem] font-bebas tracking-wider motion-safe:animate-fade-in-up motion-safe:animation-delay-500ms text-shadow-lg hover:scale-105 md:hover:scale-110 transition-transform duration-500 cursor-pointer touch-manipulation select-none">
              <span className="text-blue-600">TO</span>
              <span className="text-sky-500">DO</span>
              <span className="text-tepoztlan-sunset">TEPOZ</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-white mb-8 motion-safe:animate-fade-in-up motion-safe:animation-delay-700ms text-shadow-md hover:text-yellow-100 transition-colors duration-300 cursor-pointer touch-manipulation font-montserrat font-light">
              {lang === 'es' 
                ? 'Tu directorio completo: Restaurantes • Hospedajes • Bares • Tours • Experiencias'
                : 'Your complete directory: Restaurants • Stays • Bars • Tours • Experiences'
              }
            </p>
            <div className="motion-safe:animate-fade-in-up motion-safe:animation-delay-1500ms">
              <div className="inline-flex items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer touch-manipulation active:scale-95">
                <div className="w-3 h-3 bg-orange-400 rounded-full motion-safe:animate-pulse-glow" />
                <span className="text-gray-200 font-medium text-shadow-sm font-montserrat">
                  {lang === 'es' ? 'Descubre la magia que te espera' : 'Discover the magic that awaits'}
                </span>
                <div className="w-3 h-3 bg-purple-500 rounded-full motion-safe:animate-pulse-glow animation-delay-500ms" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 motion-safe:animate-scroll-indicator motion-safe:animation-delay-2s">
          <div className="flex flex-col items-center text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
            <span className="text-sm mb-2 text-shadow-sm font-medium font-montserrat">
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
          <h2 className="text-4xl font-bold mb-4 text-gray-900 font-playfair">
            {lang === 'es' ? 'Experiencias Populares' : 'Popular Experiences'}
          </h2>
          <p className="text-gray-700 mb-8 font-montserrat font-light">
            {lang === 'es' 
              ? 'Explora los lugares más emblemáticos de Tepoztlán'
              : 'Explore the most iconic places in Tepoztlán'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: lang === 'es' ? 'Pirámide del Tepozteco' : 'Tepozteco Pyramid',
                description: lang === 'es' 
                  ? 'Sube a la cima de la montaña sagrada y conecta con la energía ancestral'
                  : 'Climb to the top of the sacred mountain and connect with ancestral energy'
              },
              {
                id: 2,
                title: lang === 'es' ? 'Mercado Tradicional' : 'Traditional Market',
                description: lang === 'es'
                  ? 'Descubre sabores auténticos y artesanías únicas de la región'
                  : 'Discover authentic flavors and unique regional crafts'
              },
              {
                id: 3,
                title: lang === 'es' ? 'Ex-Convento de la Natividad' : 'Ex-Convent of Nativity',
                description: lang === 'es'
                  ? 'Patrimonio Mundial de la UNESCO con historia del siglo XVI'
                  : 'UNESCO World Heritage site with 16th century history'
              }
            ].map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="relative h-48 bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${
                      attraction.id === 1 ? "/tepozteco-pyramid.jpg" : 
                      attraction.id === 2 ? "/traditional-market.jpg" :
                      "/tepoztlan-hero.jpg"
                    })` 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 font-playfair">
                    {attraction.title}
                  </h3>
                  <p className="text-gray-700 font-montserrat">
                    {attraction.description}
                  </p>
                </div>
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