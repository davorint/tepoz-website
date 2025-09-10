'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface MapTiler3DProps {
  className?: string
}

export default function MapTiler3D({ className = '' }: MapTiler3DProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    // MapTiler API key - replace with your actual key
    const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'your-api-key-here'
    
    // Tepoztlán coordinates
    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: TEPOZTLAN_CENTER,
        zoom: 14,
        pitch: 60,
        maxPitch: 85,
        bearing: 0,
        attributionControl: false
      })

      map.current.on('load', () => {
        if (!map.current) return

        // Add 3D terrain source
        map.current.addSource('terrain', {
          type: 'raster-dem',
          url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${API_KEY}`
        })

        // Set 3D terrain
        map.current.setTerrain({
          source: 'terrain',
          exaggeration: 1.5
        })

        // Add 3D buildings layer using the cloned style
        map.current.addSource('openmaptiles', {
          type: 'vector',
          url: `https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=${API_KEY}`
        })

        // Add 3D building extrusion layer
        map.current.addLayer({
          id: 'building-3d',
          type: 'fill-extrusion',
          source: 'openmaptiles',
          'source-layer': 'building',
          filter: ['all', ['!has', 'hide_3d']],
          paint: {
            'fill-extrusion-color': [
              'case',
              ['has', 'colour'],
              ['get', 'colour'],
              'hsl(39, 41%, 86%)'
            ],
            'fill-extrusion-height': {
              property: 'render_height',
              type: 'identity'
            },
            'fill-extrusion-base': {
              property: 'render_min_height',
              type: 'identity'
            },
            'fill-extrusion-opacity': 0.8
          }
        })

        // Add markers for important locations
        const tepoztlanMarkers = [
          {
            coordinates: [-99.1017, 18.9847] as [number, number],
            title: 'Centro de Tepoztlán',
            color: '#10b981'
          },
          {
            coordinates: [-99.0983, 18.9875] as [number, number],
            title: 'Pirámide del Tepozteco',
            color: '#3b82f6'
          }
        ]

        tepoztlanMarkers.forEach(marker => {
          const el = document.createElement('div')
          el.className = 'custom-marker'
          el.style.cssText = `
            background-color: ${marker.color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          `

          new maplibregl.Marker(el)
            .setLngLat(marker.coordinates)
            .setPopup(
              new maplibregl.Popup({ offset: 25 })
                .setHTML(`<h3 style="margin:0; color: #1f2937;">${marker.title}</h3>`)
            )
            .addTo(map.current!)
        })

        // Add navigation controls
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
        
        // Add terrain control
        map.current.addControl(
          new maplibregl.TerrainControl({
            source: 'terrain',
            exaggeration: 1.5
          }),
          'top-right'
        )
      })

      map.current.on('error', (e) => {
        console.warn('MapTiler 3D error:', e.error)
      })

    } catch (error) {
      console.error('Failed to initialize MapTiler 3D:', error)
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '700px' }}
    />
  )
}