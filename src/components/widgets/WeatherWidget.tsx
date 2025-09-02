'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Locale } from '@/lib/i18n'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  Gauge
} from 'lucide-react'

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  forecast: Array<{
    day: string
    temp: number
    condition: string
    icon: React.ComponentType
  }>
}

interface WeatherWidgetProps {
  lang: Locale
}

// Mock weather data (in production, this would come from a weather API)
const mockWeatherData: WeatherData = {
  temperature: 24,
  condition: 'Soleado',
  humidity: 65,
  windSpeed: 8,
  visibility: 15,
  pressure: 1013,
  forecast: [
    { day: 'Hoy', temp: 24, condition: 'Soleado', icon: Sun },
    { day: 'Mañana', temp: 22, condition: 'Nublado', icon: Cloud },
    { day: 'Miércoles', temp: 26, condition: 'Soleado', icon: Sun },
    { day: 'Jueves', temp: 20, condition: 'Lluvia', icon: CloudRain },
    { day: 'Viernes', temp: 23, condition: 'Soleado', icon: Sun }
  ]
}

const getWeatherIcon = (condition: string) => {
  if (condition.toLowerCase().includes('lluvia')) return CloudRain
  if (condition.toLowerCase().includes('nublado')) return Cloud
  return Sun
}

const getWeatherGradient = (condition: string) => {
  if (condition.toLowerCase().includes('lluvia')) return 'from-gray-400 to-blue-400'
  if (condition.toLowerCase().includes('nublado')) return 'from-gray-300 to-gray-500'
  return 'from-yellow-400 to-orange-500'
}

export default function WeatherWidget({ lang }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchWeatherData = async () => {
      setLoading(true)
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Translate conditions based on language
      if (lang === 'en') {
        const translatedData = {
          ...mockWeatherData,
          condition: 'Sunny',
          forecast: mockWeatherData.forecast.map((day, index) => ({
            ...day,
            day: ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'][index],
            condition: day.condition === 'Soleado' ? 'Sunny' : 
                      day.condition === 'Nublado' ? 'Cloudy' : 
                      day.condition === 'Lluvia' ? 'Rainy' : day.condition
          }))
        }
        setWeatherData(translatedData)
      } else {
        setWeatherData(mockWeatherData)
      }
      
      setLoading(false)
    }

    fetchWeatherData()
  }, [lang])

  if (loading) {
    return (
      <Card className="w-full bg-white/60 backdrop-blur-md border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-8 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weatherData) return null

  const WeatherIcon = getWeatherIcon(weatherData.condition)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full bg-white/60 backdrop-blur-md border-0 shadow-xl overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${getWeatherGradient(weatherData.condition)}`} />
        
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {lang === 'es' ? 'Clima en Tepoztlán' : 'Weather in Tepoztlán'}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <motion.div
              animate={{ 
                rotate: weatherData.condition.toLowerCase().includes('soleado') || weatherData.condition.toLowerCase().includes('sunny') ? 360 : 0 
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`p-3 rounded-full bg-gradient-to-br ${getWeatherGradient(weatherData.condition)}`}
            >
              <WeatherIcon className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Current Weather */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              {weatherData.temperature}°C
            </motion.div>
            <p className="text-lg text-gray-600">{weatherData.condition}</p>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm font-medium">{weatherData.humidity}%</div>
                <div className="text-xs text-gray-500">
                  {lang === 'es' ? 'Humedad' : 'Humidity'}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <Wind className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium">{weatherData.windSpeed} km/h</div>
                <div className="text-xs text-gray-500">
                  {lang === 'es' ? 'Viento' : 'Wind'}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">{weatherData.visibility} km</div>
                <div className="text-xs text-gray-500">
                  {lang === 'es' ? 'Visibilidad' : 'Visibility'}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <Gauge className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-sm font-medium">{weatherData.pressure} mb</div>
                <div className="text-xs text-gray-500">
                  {lang === 'es' ? 'Presión' : 'Pressure'}
                </div>
              </div>
            </motion.div>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {lang === 'es' ? 'Pronóstico de 5 días' : '5-Day Forecast'}
            </h4>
            <div className="space-y-2">
              {weatherData.forecast.map((day, index) => {
                const DayIcon = day.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <DayIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {day.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{day.condition}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {day.temp}°C
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Best Time to Visit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {lang === 'es' ? '¡Excelente día para visitar!' : 'Perfect day to visit!'}
              </span>
            </div>
            <p className="text-xs text-green-700">
              {lang === 'es' 
                ? 'Las condiciones climáticas son ideales para explorar Tepoztlán'
                : 'Weather conditions are ideal for exploring Tepoztlán'
              }
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}