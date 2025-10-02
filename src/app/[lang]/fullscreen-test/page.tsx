'use client'

import { useEffect, useRef, use } from 'react'
import { notFound } from 'next/navigation'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Locale } from '@/lib/i18n'

interface FullscreenTestPageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default function FullscreenTestPage({ params }: FullscreenTestPageProps) {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  const { lang } = use(params)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token not found')
      return
    }

    console.log('Creating simple Mapbox map exactly like documentation...')

    // Create map exactly like the official example
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1017, 18.9847], // Tepoztlán coordinates
      zoom: 14
    })

    map.current = mapInstance

    // Add fullscreen control exactly like the documentation
    mapInstance.addControl(new mapboxgl.FullscreenControl())

    console.log('Fullscreen control added according to official documentation')

    return () => {
      mapInstance.remove()
      map.current = null
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          {lang === 'es' ? 'Prueba Simple - Fullscreen según Documentación' : 'Simple Fullscreen Test - According to Documentation'}
        </h1>
        <p className="text-white/70 mb-8 text-center">
          {lang === 'es' ? 'Implementación exacta según la documentación oficial de Mapbox' : 'Exact implementation according to official Mapbox documentation'}
        </p>
        <div 
          ref={mapContainer}
          className="w-full h-96 bg-gray-800 rounded-lg"
          style={{ minHeight: '500px' }}
        />
        <div className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-white font-semibold mb-2">
            {lang === 'es' ? 'Implementación:' : 'Implementation:'}
          </h2>
          <pre className="text-white/70 text-sm">
            {`map.addControl(new mapboxgl.FullscreenControl())`}
          </pre>
          <p className="text-white/50 text-sm mt-2">
            {lang === 'es' ? 'Botón fullscreen debe aparecer en esquina superior derecha' : 'Fullscreen button should appear in top-right corner'}
          </p>
        </div>
      </div>
    </div>
  )
}