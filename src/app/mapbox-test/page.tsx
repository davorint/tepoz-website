'use client'

import { useEffect, useRef } from 'react'
import { notFound } from 'next/navigation'
import mapboxgl from 'mapbox-gl'

export default function MapboxTestPage() {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center">
          Mapbox Fullscreen Control Debug Test
        </h1>
        <p className="text-slate-700 dark:text-white/70 mb-8 text-center">
          Check browser console for debugging information
        </p>
        <div 
          ref={mapContainer}
          className="w-full h-96 bg-gray-800 rounded-lg"
        />
        <div className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-slate-900 dark:text-white font-semibold mb-2">Expected Results:</h2>
          <ul className="text-slate-700 dark:text-white/70 text-sm space-y-1">
            <li>• Fullscreen button should appear in top-right corner</li>
            <li>• Console should show fullscreen API availability</li>
            <li>• DOM query should find .mapboxgl-ctrl-fullscreen elements</li>
          </ul>
        </div>
      </div>
    </div>
  )
}