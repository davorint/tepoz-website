'use client'

import { Locale } from '@/lib/i18n'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface ScrollRevealCardsProps {
  lang: Locale
}

const directoryItems = [
  {
    id: 1,
    titleEs: 'Restaurantes & Terrazas',
    titleEn: 'Restaurants & Rooftop Dining',
    descEs: 'Sabores auténticos con filtros avanzados por cocina, ambiente y precio',
    descEn: 'Authentic flavors with advanced filters by cuisine, atmosphere and price',
    icon: '🍽️',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&crop=center',
    count: '150+',
    color: 'from-orange-400 to-rose-400',
    glowColor: 'orange',
    badge: 'Featured Directory',
    trending: true,
    features: ['Advanced Search', 'Price Filters', 'Reviews', 'Business CTA']
  },
  {
    id: 2,
    titleEs: 'Hospedajes Premium',
    titleEn: 'Premium Stays',
    descEs: 'Hoteles boutique, eco-lodges y rentas vacacionales con vista completa',
    descEn: 'Boutique hotels, eco-lodges and vacation rentals with complete directory',
    icon: '🏨',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center',
    count: '80+',
    color: 'from-blue-400 to-cyan-400',
    glowColor: 'blue',
    badge: 'Premium',
    trending: false,
    features: ['Luxury Options', 'Eco-Friendly', 'Complete Views', 'Bookings']
  },
  {
    id: 3,
    titleEs: 'Bares & Pulquerías',
    titleEn: 'Bars & Pulquerías',
    descEs: 'Mezcal artesanal, pulque tradicional y cocteles únicos por categoría',
    descEn: 'Artisanal mezcal, traditional pulque and unique cocktails by category',
    icon: '🍹',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&crop=center',
    count: '45+',
    color: 'from-purple-400 to-pink-400',
    glowColor: 'purple',
    badge: 'Nightlife Hub',
    trending: true,
    features: ['Craft Cocktails', 'Traditional Drinks', 'Live Music', 'Night Scene']
  },
  {
    id: 4,
    titleEs: 'Aventura & Senderismo',
    titleEn: 'Adventure & Hiking',
    descEs: 'Rutas guiadas al Tepozteco, senderos naturales y experiencias extremas',
    descEn: 'Guided routes to Tepozteco, nature trails and extreme experiences',
    icon: '🥾',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=center',
    count: '25+',
    color: 'from-emerald-400 to-teal-400',
    glowColor: 'emerald',
    badge: 'Adventure',
    trending: false,
    features: ['Guided Tours', 'Trail Maps', 'Safety Info', 'Equipment']
  },
  {
    id: 5,
    titleEs: 'Experiencias Culturales',
    titleEn: 'Cultural Experiences',
    descEs: 'Tours místicos, talleres artesanales y inmersión en tradiciones locales',
    descEn: 'Mystical tours, artisan workshops and immersion in local traditions',
    icon: '🗺️',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center',
    count: '40+',
    color: 'from-amber-400 to-yellow-400',
    glowColor: 'amber',
    badge: 'Cultural',
    trending: false,
    features: ['Mystical Tours', 'Workshops', 'Local Guides', 'Traditions']
  },
  {
    id: 6,
    titleEs: 'Mercados & Artesanías',
    titleEn: 'Markets & Crafts',
    descEs: 'Mercado dominical, galerías de arte y productos orgánicos locales',
    descEn: 'Sunday market, art galleries and local organic products',
    icon: '🛍️',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
    count: '60+',
    color: 'from-pink-400 to-fuchsia-400',
    glowColor: 'pink',
    badge: 'Local Market',
    trending: false,
    features: ['Sunday Market', 'Local Art', 'Organic Products', 'Handmade']
  }
]

export default function ScrollRevealCards({ lang }: ScrollRevealCardsProps) {
  return (
    <section className="py-32 px-4 bg-white/95 dark:bg-gradient-to-br dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 relative overflow-hidden">
      {/* Ultra Premium animated background effects with glassmorphism */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs - subtle for light mode, blue for dark mode */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-slate-200/30 dark:bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-300/20 dark:bg-sky-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-slate-100/40 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(148,163,184,0.1)),radial-gradient(at_bottom_right,_transparent,_rgba(203,213,225,0.1))] dark:bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(14,165,233,0.2))]" />
        
        {/* Noise texture for glassmorphism depth */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-slate-400 dark:to-blue-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-600 dark:from-blue-400 dark:to-sky-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-slate-600 to-slate-700 dark:from-blue-500 dark:to-sky-500 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                ✨ {lang === 'es' ? 'DIRECTORIO DE NEGOCIOS' : 'BUSINESS DIRECTORY'} ✨
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-slate-400 dark:to-sky-400" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-slate-800 dark:text-white drop-shadow-lg dark:drop-shadow-2xl">
              {lang === 'es' ? 'Conecta con los' : 'Connect with the'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 dark:from-blue-300 dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent drop-shadow-lg dark:drop-shadow-2xl">
              {lang === 'es' ? 'Mejores Negocios' : 'Best Businesses'}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {lang === 'es' 
              ? 'Descubre experiencias auténticas en el corazón de este Pueblo Mágico'
              : 'Discover authentic experiences in the heart of this Magical Town'
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
              {/* Card glow effect - Restaurant style */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-15 dark:group-hover:opacity-20 blur-lg dark:blur-xl transition-all duration-500 dark:duration-700 rounded-3xl`} />
              
              {/* Premium Glassmorphism card - Enhanced for new background */}
              <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-white/20 shadow-xl shadow-slate-200/30 dark:shadow-blue-500/20 hover:shadow-2xl dark:hover:shadow-blue-400/30 hover:shadow-slate-300/40 dark:hover:shadow-blue-400/25 overflow-hidden cursor-pointer transform-gpu transition-all duration-300 dark:duration-500 group-hover:scale-[1.02] dark:group-hover:scale-[1.02] hover:bg-white/90 dark:group-hover:bg-white/15">
                
                {/* Premium accent gradient bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-80 group-hover:h-2 transition-all duration-500`} />
                
                {/* Trending badge with premium glow - Restaurant style */}
                {item.trending && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 blur-md animate-pulse" />
                      <Badge className="relative bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 font-semibold shadow-xl">
                        🔥 {lang === 'es' ? 'Tendencia' : 'Trending'}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Category Image with Fallback Design */}
                <div className="relative h-48 overflow-hidden">
                  {/* Fallback Design - Always present */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Ultra Premium Icon with animated glow */}
                    <div className="relative mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse`} />
                      <div className="relative w-16 h-16">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-20 rotate-6 group-hover:rotate-12 transition-all duration-500`} />
                        <div className="relative bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center h-full border border-slate-300/20 dark:border-white/20 group-hover:border-slate-400/30 dark:group-hover:border-white/30">
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-500">
                            {item.icon}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Count in fallback */}
                    <div className="bg-gradient-to-r from-white/80 to-white/90 dark:from-white/10 dark:to-white/15 backdrop-blur-xl dark:backdrop-blur-2xl rounded-xl px-3 py-1 border border-slate-200/60 dark:border-blue-400/20">
                      <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.count}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-blue-200/60 ml-1">
                        {lang === 'es' ? 'lugares' : 'places'}
                      </span>
                    </div>
                  </div>

                  {/* Image overlay - shows when image loads */}
                  <Image
                    src={item.image}
                    alt={lang === 'es' ? item.titleEs : item.titleEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 hover:opacity-95"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Image overlay for better text contrast - only when image loads */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Count badge overlay - only visible when image loads */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-black/70 dark:bg-black/50 backdrop-blur-sm dark:backdrop-blur-md text-white border-0 shadow-md dark:shadow-lg">
                      {item.count} {lang === 'es' ? 'lugares' : 'places'}
                    </Badge>
                  </div>

                  {/* Icon overlay - only visible when image loads */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 dark:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-6">
                  
                  {/* Premium Title with gradient hover effect */}
                  <h3 className="text-2xl font-bold mb-4 text-center font-sans">
                    <span className="text-slate-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-slate-600 group-hover:to-slate-800 dark:group-hover:from-blue-300 dark:group-hover:to-sky-300 transition-all duration-300 dark:duration-500">
                      {lang === 'es' ? item.titleEs : item.titleEn}
                    </span>
                  </h3>
                  
                  {/* Premium Category Badge */}
                  <div className="flex justify-center mb-4">
                    <Badge className="bg-slate-100/80 dark:bg-blue-100/10 backdrop-blur-sm text-slate-700 dark:text-blue-200/90 border-slate-200/30 dark:border-blue-200/20 px-3 py-1 hover:bg-slate-200/80 dark:hover:bg-blue-100/15 transition-all duration-200 dark:duration-300">
                      {item.badge}
                    </Badge>
                  </div>
                  
                  {/* Description with better contrast */}
                  <p className="text-slate-600 dark:text-white/70 mb-4 font-light text-center text-sm leading-relaxed">
                    {lang === 'es' ? item.descEs : item.descEn}
                  </p>
                  
                  {/* Feature highlights */}
                  {item.features && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {item.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} className="bg-slate-200/60 dark:bg-blue-400/20 text-slate-600 dark:text-blue-200 border border-slate-300/40 dark:border-blue-400/30 hover:bg-slate-300/60 dark:hover:bg-blue-400/30 transition-all duration-200 dark:duration-300 text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  
                  {/* Premium Hover indicator - Restaurant style */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full blur-lg animate-pulse`} />
                      <div className={`relative w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-45 transition-transform duration-500`}>
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

        {/* Premium CTA with glassmorphism */}
        <div className="text-center mt-20">
          <button className="group relative px-12 py-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 dark:from-blue-500 dark:to-sky-500 dark:hover:from-blue-600 dark:hover:to-sky-600 text-white font-semibold text-lg rounded-full transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 dark:hover:scale-110">
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-2xl">🗂️</span>
              <span className="font-bold tracking-wide">
                {lang === 'es' ? 'Ver Todo el Directorio' : 'View Full Directory'}
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-blue-500 dark:to-sky-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          </button>
        </div>
      </div>
    </section>
  )
}