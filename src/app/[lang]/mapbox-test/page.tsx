'use client'

import { useEffect, useRef, use } from 'react'
import mapboxgl from 'mapbox-gl'
import { Locale } from '@/lib/i18n'

interface MapboxTestPageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default function MapboxTestPage({ params }: MapboxTestPageProps) {
  const { lang } = use(params)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Set access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token not found')
      return
    }

    console.log('Creating minimal Mapbox map for fullscreen testing...')

    // Create minimal map
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1017, 18.9847],
      zoom: 14
    })

    map.current = mapInstance

    mapInstance.on('load', () => {
      console.log('Minimal map loaded')
      
      // Test fullscreen API availability
      console.log('Document fullscreen API:', {
        fullscreenEnabled: document.fullscreenEnabled,
        webkitFullscreenEnabled: !!(document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled,
        fullscreenSupported: !!(document.fullscreenEnabled || (document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled)
      })

      // Test adding fullscreen control
      console.log('Testing FullscreenControl...')
      try {
        const control = new mapboxgl.FullscreenControl()
        console.log('FullscreenControl created:', control)
        
        mapInstance.addControl(control, 'top-right')
        console.log('FullscreenControl added to map')
        
        // Check DOM after adding
        setTimeout(() => {
          const fullscreenBtns = document.querySelectorAll('.mapboxgl-ctrl-fullscreen')
          console.log('Found fullscreen buttons in DOM:', fullscreenBtns.length)
          
          fullscreenBtns.forEach((btn, i) => {
            const styles = window.getComputedStyle(btn)
            console.log(`Button ${i}:`, {
              display: styles.display,
              visibility: styles.visibility,
              opacity: styles.opacity,
              width: styles.width,
              height: styles.height,
              position: styles.position,
              element: btn
            })
          })

          const allControls = document.querySelectorAll('.mapboxgl-ctrl')
          console.log('All mapbox controls found:', allControls.length)
          allControls.forEach((ctrl, i) => {
            console.log(`Control ${i}:`, ctrl.className)
          })
        }, 500)

      } catch (error) {
        console.error('Error with FullscreenControl:', error)
      }
    })

    return () => {
      mapInstance.remove()
      map.current = null
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          {lang === 'es' ? 'Prueba de Debug - Control Fullscreen Mapbox' : 'Mapbox Fullscreen Control Debug Test'}
        </h1>
        <p className="text-white/70 mb-8 text-center">
          {lang === 'es' ? 'Revisa la consola del navegador para información de debug' : 'Check browser console for debugging information'}
        </p>
        <div 
          ref={mapContainer}
          className="w-full h-96 bg-gray-800 rounded-lg"
        />
        <div className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-white font-semibold mb-2">
            {lang === 'es' ? 'Resultados Esperados:' : 'Expected Results:'}
          </h2>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• {lang === 'es' ? 'Botón fullscreen debería aparecer en esquina superior derecha' : 'Fullscreen button should appear in top-right corner'}</li>
            <li>• {lang === 'es' ? 'Consola debe mostrar disponibilidad de API fullscreen' : 'Console should show fullscreen API availability'}</li>
            <li>• {lang === 'es' ? 'Query DOM debe encontrar elementos .mapboxgl-ctrl-fullscreen' : 'DOM query should find .mapboxgl-ctrl-fullscreen elements'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}