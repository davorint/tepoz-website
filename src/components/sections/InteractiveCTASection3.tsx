'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Store,
  Navigation,
  Heart,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Users,
  Sparkles,
  ArrowUpRight,
  Building2,
  Utensils,
  Hotel,
  ShoppingBag,
  Coffee,
  Mountain
} from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface InteractiveCTASection3Props {
  lang: Locale
}

const categories = [
  { 
    id: 'restaurants',
    icon: Utensils,
    name: 'Restaurantes',
    nameEn: 'Restaurants',
    count: 125,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'hotels',
    icon: Hotel,
    name: 'Hospedaje',
    nameEn: 'Accommodation',
    count: 78,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    name: 'Compras',
    nameEn: 'Shopping',
    count: 96,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'cafes',
    icon: Coffee,
    name: 'Cafeterías',
    nameEn: 'Cafes',
    count: 42,
    color: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'activities',
    icon: Mountain,
    name: 'Actividades',
    nameEn: 'Activities',
    count: 64,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'services',
    icon: Building2,
    name: 'Servicios',
    nameEn: 'Services',
    count: 95,
    color: 'from-slate-500 to-gray-600'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Verificados',
    titleEn: 'Verified',
    desc: 'Negocios verificados y confiables',
    descEn: 'Verified and trustworthy businesses'
  },
  {
    icon: Zap,
    title: 'Actualizado',
    titleEn: 'Updated',
    desc: 'Información en tiempo real',
    descEn: 'Real-time information'
  },
  {
    icon: Heart,
    title: 'Favoritos',
    titleEn: 'Favorites',
    desc: 'Guarda tus lugares preferidos',
    descEn: 'Save your favorite places'
  }
]

const stats = [
  { value: '500+', label: 'Negocios', labelEn: 'Businesses' },
  { value: '2.5K', label: 'Reseñas', labelEn: 'Reviews' },
  { value: '50K+', label: 'Usuarios', labelEn: 'Users' },
  { value: '4.9★', label: 'Rating', labelEn: 'Rating' }
]

export default function InteractiveCTASection3({ lang }: InteractiveCTASection3Props) {
  const [activeTab, setActiveTab] = useState<'explore' | 'register'>('explore')

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-indigo-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating gradient orbs */}
      <motion.div 
        className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-green-400/20 rounded-full blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 px-6 py-3 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              {lang === 'es' ? 'DIRECTORIO PREMIUM 2024' : 'PREMIUM DIRECTORY 2024'}
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">
              {lang === 'es' ? 'Descubre ' : 'Discover '}
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Tepoztlán
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {lang === 'es' 
              ? 'El directorio más completo y actualizado de negocios locales'
              : 'The most complete and updated directory of local businesses'
            }
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-2xl inline-flex">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'explore'
                  ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Search className="inline-block w-5 h-5 mr-2" />
              {lang === 'es' ? 'Explorar' : 'Explore'}
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Store className="inline-block w-5 h-5 mr-2" />
              {lang === 'es' ? 'Registrar' : 'Register'}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'explore' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search Bar */}
            <div className="mb-12">
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder={lang === 'es' ? 'Buscar restaurantes, hoteles, actividades...' : 'Search restaurants, hotels, activities...'}
                  className="w-full pl-16 pr-6 py-5 text-lg bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all shadow-lg"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  {lang === 'es' ? 'Buscar' : 'Search'}
                </button>
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onMouseEnter={() => setHoveredCategory(category.id)}
                    // onMouseLeave={() => setHoveredCategory(null)}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-all duration-300`} />
                    <div className="relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-400 transition-all">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {lang === 'es' ? category.name : category.nameEn}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {category.count} {lang === 'es' ? 'negocios' : 'businesses'}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-white/5 dark:to-white/10 rounded-2xl p-6 border border-gray-200 dark:border-white/10"
                  >
                    <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {lang === 'es' ? feature.title : feature.titleEn}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lang === 'es' ? feature.desc : feature.descEn}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* Register Business CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-6">
                    <Store className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {lang === 'es' ? 'Registra tu Negocio' : 'Register Your Business'}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {lang === 'es' 
                      ? 'Únete al directorio líder de Tepoztlán y conecta con miles de visitantes'
                      : 'Join Tepoztlán\'s leading directory and connect with thousands of visitors'
                    }
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {[
                    { icon: Users, text: 'Mayor visibilidad', textEn: 'Greater visibility' },
                    { icon: TrendingUp, text: 'Incrementa ventas', textEn: 'Increase sales' },
                    { icon: Star, text: 'Reseñas verificadas', textEn: 'Verified reviews' },
                    { icon: Navigation, text: 'Ubicación en mapa', textEn: 'Map location' }
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {lang === 'es' ? item.text : item.textEn}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    {lang === 'es' ? 'Registrar Ahora' : 'Register Now'}
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition-all">
                    {lang === 'es' ? 'Más Información' : 'Learn More'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {lang === 'es' ? stat.label : stat.labelEn}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}