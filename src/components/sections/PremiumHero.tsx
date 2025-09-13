import { Locale } from '@/lib/i18n'

interface PremiumHeroProps {
  lang: Locale
}

export default function PremiumHero({ lang }: PremiumHeroProps) {

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-25 via-sky-25 to-purple-25 dark:bg-gradient-to-b dark:from-blue-900 dark:via-blue-800 dark:to-purple-900">
      {/* Background Image - Tepoztlán */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-50"
        style={{
          backgroundImage: 'url("https://mbmarcobeteta.com/wp-content/uploads/2021/04/shutterstock_1426920236-scaled.jpg")',
        }}
      />
      
      {/* Subtle overlay to enhance readability while keeping colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/10 via-transparent to-purple-100/10 dark:bg-gradient-to-b dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
      
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/1 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-500/2 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-sky-500/1 dark:bg-sky-500/10 rounded-full blur-2xl animate-pulse animation-delay-4s" />
      </div>
      
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center">
          <h1 className="mb-6 text-7xl md:text-9xl lg:text-[10rem] font-bebas tracking-wider text-slate-800 dark:text-white animate-fade-in-up animation-delay-500">
            <span className="inline-block text-blue-600 dark:text-blue-400 drop-shadow-2xl animate-float animation-delay-0" style={{ 
              textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
              animationDuration: '6s'
            }}>TO</span>
            <span className="inline-block text-sky-600 dark:text-sky-400 drop-shadow-2xl animate-float animation-delay-1s" style={{ 
              textShadow: '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(14, 165, 233, 0.4)',
              animationDuration: '6s'
            }}>DO</span>
            <span className="inline-block text-orange-600 dark:text-orange-400 drop-shadow-2xl animate-float animation-delay-2s" style={{ 
              textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
              animationDuration: '6s'
            }}>TEPOZ</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-slate-950 dark:text-white mb-8 font-montserrat font-semibold drop-shadow-xl animate-fade-in-up animation-delay-1s" style={{
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.9), -1px -1px 2px rgba(255, 255, 255, 0.5)'
          }}>
            {lang === 'es' 
              ? 'Comida & Bebida | Hoteles & Spas | Historia & Cultura | Magia & Naturaleza | Todas las Tiendas'
              : 'Food & Drink | Hotels & Spas | History & Culture | Magic & Nature | All Stores'
            }
          </p>
          
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 dark:bg-gradient-to-r dark:from-emerald-400 dark:to-blue-400 dark:hover:from-emerald-500 dark:hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 backdrop-blur-sm border border-emerald-400/30 dark:border-emerald-300/30 animate-fade-in-up animation-delay-1500">
            {lang === 'es' ? 'Descubrir la Magia' : 'Discover the Magic'}
          </button>
        </div>
      </div>
    </div>
  )
}