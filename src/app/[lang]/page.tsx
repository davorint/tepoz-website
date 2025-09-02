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
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="max-w-5xl text-center">
            <h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl font-bold">
              <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tepoztlán
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-gray-100 mb-8">
              {lang === 'es' 
                ? 'Un portal hacia experiencias místicas y transformadoras'
                : 'A gateway to mystical and transformative experiences'
              }
            </p>
          </div>
        </div>
      </div>
      <div className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
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
                <h3 className="text-xl font-semibold mb-2">
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