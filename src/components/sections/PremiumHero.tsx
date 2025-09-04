import { Locale } from '@/lib/i18n'

interface PremiumHeroProps {
  lang: Locale
}

export default function PremiumHero({ lang }: PremiumHeroProps) {

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-purple-900">
      {/* Background Image - Tepoztlán */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: 'url("https://mbmarcobeteta.com/wp-content/uploads/2021/04/shutterstock_1426920236-scaled.jpg")',
        }}
      />
      
      {/* Subtle overlay to enhance readability while keeping colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-purple-900/20" />
      
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl animate-pulse animation-delay-4s" />
      </div>
      
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center">
          <h1 className="mb-6 text-7xl md:text-9xl lg:text-[10rem] font-bebas tracking-wider text-white animate-fade-in-up animation-delay-500">
            <span className="inline-block text-blue-400 drop-shadow-2xl animate-float animation-delay-0" style={{ 
              textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
              animationDuration: '6s'
            }}>TO</span>
            <span className="inline-block text-sky-400 drop-shadow-2xl animate-float animation-delay-1s" style={{ 
              textShadow: '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(14, 165, 233, 0.4)',
              animationDuration: '6s'
            }}>DO</span>
            <span className="inline-block text-orange-400 drop-shadow-2xl animate-float animation-delay-2s" style={{ 
              textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
              animationDuration: '6s'
            }}>TEPOZ</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-white mb-8 font-montserrat font-light drop-shadow-lg animate-fade-in-up animation-delay-1s">
            {lang === 'es' 
              ? 'El directorio más completo de negocios en Tepoztlán • Encuentra restaurantes, hospedajes, bares, tours y experiencias'
              : 'The most complete business directory in Tepoztlán • Find restaurants, accommodations, bars, tours and experiences'
            }
          </p>
          
          <button className="px-8 py-4 bg-gradient-to-r from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 backdrop-blur-sm border border-blue-300/30 animate-fade-in-up animation-delay-1500">
            {lang === 'es' ? 'Explorar Negocios' : 'Explore Businesses'}
          </button>
        </div>
      </div>
    </div>
  )
}