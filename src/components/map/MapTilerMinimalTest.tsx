'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapTilerMinimalTest() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || ''
    
    console.log('🔥 MINIMAL TEST - Creating map with API key:', API_KEY.substring(0, 8) + '...')

    // Create map exactly as per MapTiler documentation
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [-99.1017, 18.9847], // Tepoztlan center
      zoom: 14
    })

    // Add marker exactly as per documentation - after map load
    map.current.on('load', () => {
      console.log('🎉 MINIMAL TEST - Map loaded, adding markers...')
      
      if (!map.current) return

      // Add a simple red marker as per documentation
      new maplibregl.Marker({ color: 'red' })
        .setLngLat([-99.1017, 18.9847])
        .addTo(map.current)
      
      console.log('✅ MINIMAL TEST - Red marker added')

      // Add a few more markers to test
      new maplibregl.Marker({ color: 'blue' })
        .setLngLat([-99.0983, 18.9875])
        .addTo(map.current)
      
      new maplibregl.Marker({ color: 'green' })
        .setLngLat([-99.0997, 18.9847])
        .addTo(map.current)
        
      console.log('✅ MINIMAL TEST - All 3 markers added successfully')
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div className="w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-black text-white p-2 rounded">
        MINIMAL TEST - Check console for logs
      </div>
    </div>
  )
}