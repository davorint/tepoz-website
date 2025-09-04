import { Locale } from '@/lib/i18n'
import { Badge } from '@/components/ui/badge'

interface ScrollRevealCardsProps {
  lang: Locale
}

const directoryItems = [
  {
    id: 1,
    titleEs: 'Restaurantes',
    titleEn: 'Restaurants',
    descEs: 'Cocina tradicional mexicana y fusión internacional',
    descEn: 'Traditional Mexican cuisine and international fusion',
    icon: '🍽️',
    count: '150+',
    color: 'from-orange-400 to-rose-400',
    glowColor: 'orange',
    badge: 'Popular',
    trending: true
  },
  {
    id: 2,
    titleEs: 'Hospedajes',
    titleEn: 'Stays',
    descEs: 'Hoteles boutique, cabañas y eco-lodges',
    descEn: 'Boutique hotels, cabins and eco-lodges',
    icon: '🏨',
    count: '80+',
    color: 'from-blue-400 to-cyan-400',
    glowColor: 'blue',
    badge: 'Premium',
    trending: false
  },
  {
    id: 3,
    titleEs: 'Bares & Cantinas',
    titleEn: 'Bars & Cantinas',
    descEs: 'Mezcal, pulque y cocteles artesanales',
    descEn: 'Mezcal, pulque and craft cocktails',
    icon: '🍹',
    count: '45+',
    color: 'from-purple-400 to-pink-400',
    glowColor: 'purple',
    badge: 'Nightlife',
    trending: true
  },
  {
    id: 4,
    titleEs: 'Senderismo',
    titleEn: 'Hiking',
    descEs: 'Rutas al Tepozteco y senderos naturales',
    descEn: 'Routes to Tepozteco and nature trails',
    icon: '🥾',
    count: '12',
    color: 'from-emerald-400 to-teal-400',
    glowColor: 'emerald',
    badge: 'Adventure',
    trending: false
  },
  {
    id: 5,
    titleEs: 'Tours',
    titleEn: 'Tours',
    descEs: 'Experiencias guiadas y actividades culturales',
    descEn: 'Guided experiences and cultural activities',
    icon: '🗺️',
    count: '30+',
    color: 'from-amber-400 to-yellow-400',
    glowColor: 'amber',
    badge: 'Guided',
    trending: false
  },
  {
    id: 6,
    titleEs: 'Mercados',
    titleEn: 'Markets',
    descEs: 'Artesanías locales y productos orgánicos',
    descEn: 'Local crafts and organic products',
    icon: '🛍️',
    count: '5',
    color: 'from-pink-400 to-fuchsia-400',
    glowColor: 'pink',
    badge: 'Local',
    trending: false
  }
]

export default function ScrollRevealCards({ lang }: ScrollRevealCardsProps) {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Ultra Premium animated background effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(14,165,233,0.2))]" />
        
        {/* Noise texture for depth */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Ultra Premium Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/50" />
            <Badge className="bg-white/10 backdrop-blur-xl text-white border-white/20 px-6 py-2 text-sm tracking-wider">
              {lang === 'es' ? '✨ DIRECTORIO DE NEGOCIOS' : '✨ BUSINESS DIRECTORY'}
            </Badge>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/50" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {lang === 'es' ? 'Categorías de' : 'Business'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent drop-shadow-2xl">
              {lang === 'es' ? 'Negocios' : 'Categories'}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            {lang === 'es' 
              ? 'Conecta con los mejores negocios locales de Tepoztlán'
              : 'Connect with the best local businesses in Tepoztlán'
            }
          </p>
        </div>

        {/* Ultra Premium Directory cards with glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directoryItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 rounded-3xl`} />
              
              {/* Glassmorphism card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl overflow-hidden cursor-pointer transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15">
                
                {/* Premium accent gradient bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-80 group-hover:h-2 transition-all duration-500`} />
                
                {/* Trending badge with glow */}
                {item.trending && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-md animate-pulse" />
                      <Badge className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-3 py-1 shadow-xl">
                        🔥 {lang === 'es' ? 'Tendencia' : 'Trending'}
                      </Badge>
                    </div>
                  </div>
                )}
                
                <div className="relative p-10">
                  {/* Ultra Premium Icon with animated glow */}
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse`} />
                    <div className="relative w-24 h-24 mx-auto">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-20 rotate-6 group-hover:rotate-12 transition-all duration-500`} />
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center h-full border border-white/20 group-hover:border-white/30">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                          {item.icon}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Title */}
                  <h3 className="text-2xl font-bold mb-4 text-center font-sans">
                    <span className="text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-blue-200 transition-all duration-500">
                      {lang === 'es' ? item.titleEs : item.titleEn}
                    </span>
                  </h3>
                  
                  {/* Premium Category Badge */}
                  <div className="flex justify-center mb-4">
                    <Badge className="bg-white/10 backdrop-blur-sm text-white/90 border-white/20 px-3 py-1">
                      {item.badge}
                    </Badge>
                  </div>
                  
                  {/* Description with better contrast */}
                  <p className="text-white/70 mb-6 font-light text-center text-sm leading-relaxed">
                    {lang === 'es' ? item.descEs : item.descEn}
                  </p>
                  
                  {/* Ultra Premium counter */}
                  <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center justify-center space-x-2">
                      <span className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {parseInt(item.count).toString()}
                      </span>
                      {item.count.includes('+') && (
                        <span className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>+</span>
                      )}
                      <span className="text-sm text-white/60 font-light uppercase tracking-wider">
                        {lang === 'es' ? 'lugares' : 'places'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Premium Hover indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full blur-lg animate-pulse`} />
                      <div className={`relative w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-90 transition-transform duration-500`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA */}
        <div className="text-center mt-20">
          <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white font-semibold text-lg rounded-full transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105">
            <span className="relative z-10">
              {lang === 'es' ? 'Ver Todo el Directorio' : 'View Full Directory'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          </button>
        </div>
      </div>
    </section>
  )
}