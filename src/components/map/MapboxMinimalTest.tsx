'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

export default function MapboxMinimalTest() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) {
      console.log('❌ Missing container or access token')
      console.log('Access token:', mapboxgl.accessToken ? 'Present' : 'Missing')
      return
    }

    console.log('🗺️ Creating minimal Mapbox test map...')
    console.log('Access token:', mapboxgl.accessToken)

    // Tepoztlán center coordinates
    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]

    // Create map
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: TEPOZTLAN_CENTER,
      zoom: 14
    })

    // Store map reference
    map.current = mapInstance

    // Wait for map to load
    mapInstance.on('load', () => {
      console.log('✅ Map loaded successfully')
      
      // Test data - just a few places
      const testPlaces = [
        {
          name: 'Tepozteco Pyramid',
          coordinates: [-99.0983, 18.9875] as [number, number],
          color: '#10b981'
        },
        {
          name: 'Ex-Convent',
          coordinates: [-99.0997, 18.9847] as [number, number], 
          color: '#3b82f6'
        },
        {
          name: 'Market',
          coordinates: [-99.1017, 18.9847] as [number, number],
          color: '#f97316'
        }
      ]

      // Add simple markers
      testPlaces.forEach((place, index) => {
        console.log(`📍 Adding marker ${index + 1}:`, place.name, place.coordinates)

        // Method 1: Default marker
        if (index === 0) {
          const marker1 = new mapboxgl.Marker({ color: place.color })
            .setLngLat(place.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3><p>Default marker</p>`))
            .addTo(mapInstance)
          
          console.log('✅ Default marker added:', marker1)
        }

        // Method 2: Custom HTML element
        if (index === 1) {
          const el = document.createElement('div')
          el.style.cssText = `
            width: 30px;
            height: 30px;
            background: ${place.color};
            border: 2px solid white;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          `
          el.innerHTML = '2'

          const marker2 = new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3><p>Custom HTML marker</p>`))
            .addTo(mapInstance)

          console.log('✅ Custom HTML marker added:', marker2)
        }

        // Method 3: Complex custom marker
        if (index === 2) {
          const el = document.createElement('div')
          el.className = 'test-marker'
          el.innerHTML = `
            <div style="
              width: 40px;
              height: 40px;
              background: ${place.color};
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
              position: relative;
            ">
              🏪
            </div>
          `

          const marker3 = new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3><p>Complex custom marker</p>`))
            .addTo(mapInstance)

          console.log('✅ Complex custom marker added:', marker3)
        }
      })

      console.log('✅ All test markers should be visible')
    })

    // Handle errors
    mapInstance.on('error', (e) => {
      console.error('❌ Map error:', e.error?.message || 'Unknown error')
    })

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up map')
      mapInstance.remove()
      map.current = null
    }
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Mapbox Minimal Test</h1>
        <p>Testing basic marker functionality - check console for logs</p>
        <div className="mt-2 text-sm">
          <div>Access Token: {mapboxgl.accessToken ? '✅ Configured' : '❌ Missing'}</div>
        </div>
      </div>
      <div 
        ref={mapContainer} 
        className="flex-1"
        style={{ minHeight: '500px' }}
      />
    </div>
  )
}