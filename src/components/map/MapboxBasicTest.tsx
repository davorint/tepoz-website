'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Based on official Mapbox GL JS v3.14.0 examples
export default function MapboxBasicTest() {
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    console.log('🗺️ Starting Mapbox Basic Test...')
    
    // Set access token - directly from env
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    console.log('Access token available:', !!accessToken)
    
    if (!accessToken) {
      console.error('❌ No access token found')
      return
    }

    mapboxgl.accessToken = accessToken

    // Tepoztlán coordinates
    const TEPOZTLAN_CENTER = [-99.1017, 18.9847] as [number, number]

    // Create map with official example pattern
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // Using streets instead of standard
      center: TEPOZTLAN_CENTER,
      zoom: 14
    })

    console.log('📍 Map created, adding load event...')

    map.on('load', () => {
      console.log('✅ Map loaded! Adding markers...')

      // Test places in Tepoztlán
      const testPlaces = [
        {
          name: 'Town Center',
          coordinates: [-99.1017, 18.9847],
          color: 'red'
        },
        {
          name: 'Tepozteco Pyramid',
          coordinates: [-99.0983, 18.9875], 
          color: 'blue'
        },
        {
          name: 'Market',
          coordinates: [-99.0997, 18.9847],
          color: 'green'
        }
      ]

      // Add markers using exact official pattern
      testPlaces.forEach((place, index) => {
        console.log(`📍 Adding marker ${index + 1}: ${place.name}`)

        try {
          // Method 1: Default marker (like official example)
          if (index === 0) {
            const marker = new mapboxgl.Marker()
              .setLngLat(place.coordinates as [number, number])
              .addTo(map)
            
            console.log('✅ Default marker added:', marker)
          }

          // Method 2: Colored marker (like official example)
          if (index === 1) {
            const marker = new mapboxgl.Marker({ color: place.color })
              .setLngLat(place.coordinates as [number, number])
              .addTo(map)
            
            console.log('✅ Colored marker added:', marker)
          }

          // Method 3: Custom element marker
          if (index === 2) {
            const el = document.createElement('div')
            el.className = 'marker'
            el.style.cssText = `
              width: 30px;
              height: 30px;
              background-color: ${place.color};
              border: 2px solid white;
              border-radius: 50%;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
              color: white;
            `
            el.innerHTML = '🏪'

            const marker = new mapboxgl.Marker(el)
              .setLngLat(place.coordinates as [number, number])
              .addTo(map)
            
            console.log('✅ Custom marker added:', marker)
          }
        } catch (error) {
          console.error(`❌ Error adding marker ${index + 1}:`, error)
        }
      })

      console.log('✅ All markers should now be visible on the map!')
    })

    map.on('error', (e) => {
      console.error('❌ Map error:', e)
    })

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up map')
      map.remove()
    }
  }, [])

  return (
    <div className="w-full h-screen">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Mapbox Basic Test</h1>
        <p>Testing basic marker functionality with official patterns</p>
        <p className="text-sm">Check browser console for detailed logs</p>
      </div>
      <div 
        ref={mapContainer}
        className="w-full"
        style={{ height: 'calc(100vh - 120px)' }}
      />
    </div>
  )
}