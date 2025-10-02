'use client'

import { useEffect, useRef, use } from 'react'
import { notFound } from 'next/navigation'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Locale } from '@/lib/i18n'

interface ControlDiagnosticPageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default function ControlDiagnosticPage({ params }: ControlDiagnosticPageProps) {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  const { lang } = use(params)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    console.log('🔍 CONTROL DIAGNOSTIC - Starting comprehensive analysis...')
    
    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      console.error('❌ Mapbox access token not found')
      return
    }

    console.log('✅ Mapbox access token found')

    // Create map
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1017, 18.9847],
      zoom: 14
    })

    map.current = mapInstance

    console.log('🗺️ Map instance created')

    // Test 1: Add controls before map loads
    console.log('🧪 TEST 1: Adding NavigationControl before map load')
    const navControl = new mapboxgl.NavigationControl()
    console.log('NavigationControl created:', navControl)
    mapInstance.addControl(navControl, 'top-right')
    console.log('NavigationControl added to map')

    console.log('🧪 TEST 2: Adding FullscreenControl before map load')
    const fullscreenControl = new mapboxgl.FullscreenControl()
    console.log('FullscreenControl created:', fullscreenControl)
    mapInstance.addControl(fullscreenControl, 'top-left')
    console.log('FullscreenControl added to map')

    // Immediate DOM check
    setTimeout(() => {
      console.log('🔍 IMMEDIATE DOM CHECK (500ms):')
      const allMapboxControls = document.querySelectorAll('.mapboxgl-ctrl')
      console.log(`Found ${allMapboxControls.length} total .mapboxgl-ctrl elements`)
      
      const navControls = document.querySelectorAll('.mapboxgl-ctrl-group .mapboxgl-ctrl-zoom-in')
      console.log(`Found ${navControls.length} navigation controls`)
      
      const fullscreenControls = document.querySelectorAll('.mapboxgl-ctrl-fullscreen')
      console.log(`Found ${fullscreenControls.length} fullscreen controls`)

      allMapboxControls.forEach((ctrl, i) => {
        const styles = window.getComputedStyle(ctrl)
        console.log(`Control ${i}:`, {
          className: ctrl.className,
          display: styles.display,
          visibility: styles.visibility,
          opacity: styles.opacity,
          position: styles.position,
          zIndex: styles.zIndex
        })
      })
    }, 500)

    mapInstance.on('load', () => {
      console.log('🎯 MAP LOADED - Running post-load diagnostics')

      // Test 3: Add more controls after load
      console.log('🧪 TEST 3: Adding ScaleControl after map load')
      const scaleControl = new mapboxgl.ScaleControl()
      mapInstance.addControl(scaleControl, 'bottom-left')
      console.log('ScaleControl added')

      // Post-load DOM check
      setTimeout(() => {
        console.log('🔍 POST-LOAD DOM CHECK (1000ms after load):')
        const allMapboxControls = document.querySelectorAll('.mapboxgl-ctrl')
        console.log(`Found ${allMapboxControls.length} total .mapboxgl-ctrl elements`)

        const navControls = document.querySelectorAll('.mapboxgl-ctrl-group')
        console.log(`Found ${navControls.length} control groups`)

        const fullscreenControls = document.querySelectorAll('.mapboxgl-ctrl-fullscreen')
        console.log(`Found ${fullscreenControls.length} fullscreen controls`)

        const scaleControls = document.querySelectorAll('.mapboxgl-ctrl-scale')
        console.log(`Found ${scaleControls.length} scale controls`)

        // Check CSS rules
        console.log('🔍 CSS ANALYSIS:')
        const testDiv = document.createElement('div')
        testDiv.className = 'mapboxgl-ctrl'
        document.body.appendChild(testDiv)
        const testStyles = window.getComputedStyle(testDiv)
        console.log('Test .mapboxgl-ctrl styles:', {
          display: testStyles.display,
          position: testStyles.position,
          fontSize: testStyles.fontSize
        })
        document.body.removeChild(testDiv)

        // Check all stylesheets
        console.log('🔍 STYLESHEET ANALYSIS:')
        const stylesheets = Array.from(document.styleSheets)
        const mapboxSheets = stylesheets.filter(sheet => {
          try {
            return sheet.href?.includes('mapbox-gl') || sheet.href?.includes('maplibre')
          } catch {
            return false
          }
        })
        console.log(`Found ${mapboxSheets.length} mapbox-related stylesheets:`)
        mapboxSheets.forEach(sheet => console.log(sheet.href))

      }, 1000)
    })

    mapInstance.on('error', (e) => {
      console.error('❌ Map error:', e)
    })

    return () => {
      console.log('🧹 Cleaning up map')
      mapInstance.remove()
      map.current = null
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          {lang === 'es' ? 'Diagnóstico de Controles Mapbox' : 'Mapbox Controls Diagnostic'}
        </h1>
        <p className="text-white/70 mb-8 text-center">
          {lang === 'es' ? 'Análisis completo de por qué los controles no se muestran' : 'Complete analysis of why controls are not showing'}
        </p>
        
        <div className="mb-6 bg-white/5 rounded-lg p-4">
          <h2 className="text-white font-semibold mb-2">
            {lang === 'es' ? 'Verificaciones en Progreso:' : 'Checks in Progress:'}
          </h2>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• Control creation and addition timing</li>
            <li>• DOM element presence and styling</li>
            <li>• CSS stylesheet loading</li>
            <li>• Map load event handling</li>
            <li>• Browser console for detailed logs</li>
          </ul>
        </div>

        <div 
          ref={mapContainer}
          className="w-full bg-gray-800 rounded-lg border-2 border-white/20"
          style={{ minHeight: '600px' }}
        />
        
        <div className="mt-6 bg-white/5 rounded-lg p-4">
          <h2 className="text-white font-semibold mb-2">
            {lang === 'es' ? 'Esperado:' : 'Expected:'}
          </h2>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• Navigation controls (zoom +/-) in top-right</li>
            <li>• Fullscreen button in top-left</li>
            <li>• Scale control in bottom-left</li>
            <li>• Check browser console for detailed diagnostic logs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}