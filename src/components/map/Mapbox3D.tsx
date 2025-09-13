'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getPriceSymbol, type Place } from '@/data/tepoztlan-places'

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

interface Mapbox3DProps {
  className?: string
  onPlaceSelect?: (placeId: string) => void
  filteredPlaces: Place[]
  selectedPlaceId?: string | null
}

export default function Mapbox3D({ 
  className = '', 
  onPlaceSelect,
  filteredPlaces,
  selectedPlaceId
}: Mapbox3DProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map with 3D capabilities and no POIs
  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return

    const TEPOZTLAN_CENTER: [number, number] = [-99.1017, 18.9847]
    
    console.log('🗺️ Initializing Mapbox 3D map without POIs...')

    // Create map instance with custom style to remove POIs
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Using light style as base
      center: TEPOZTLAN_CENTER,
      zoom: 14,
      pitch: 60,
      bearing: -20,
      antialias: true
    })

    // Store map reference
    map.current = mapInstance

    // Configure map after loading
    mapInstance.on('style.load', () => {
      console.log('✅ Map style loaded, configuring 3D features and removing POIs...')
      
      // Remove all POI layers (labels, symbols, etc.)
      const styleLayers = mapInstance.getStyle().layers
      const labelLayerIds = styleLayers
        .filter(layer => 
          layer.type === 'symbol' && 
          (layer['source-layer'] === 'poi_label' || 
           layer['source-layer'] === 'place_label' ||
           layer.id.includes('poi') ||
           layer.id.includes('label'))
        )
        .map(layer => layer.id)

      // Remove POI layers
      labelLayerIds.forEach(layerId => {
        try {
          mapInstance.removeLayer(layerId)
        } catch {
          console.log(`Layer ${layerId} already removed or doesn't exist`)
        }
      })

      // Add terrain source for 3D elevation
      mapInstance.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      })

      // Set the terrain with exaggeration
      mapInstance.setTerrain({ 
        source: 'mapbox-dem', 
        exaggeration: 1.5 
      })

      // Add sky layer for atmosphere
      mapInstance.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      })

      // Add 3D buildings layer
      const buildingLayers = mapInstance.getStyle().layers
      const labelLayerId = buildingLayers.find(
        layer => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
      )?.id

      mapInstance.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'height'],
              0, '#dcdcdc',
              10, '#c0c0c0',
              20, '#a9a9a9',
              40, '#909090',
              60, '#808080',
              100, '#696969',
              200, '#505050'
            ],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15, 0,
              15.05, ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15, 0,
              15.05, ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.8
          }
        },
        labelLayerId
      )

      // Add navigation controls
      mapInstance.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true
      }), 'top-right')

      // Add scale control
      mapInstance.addControl(new mapboxgl.ScaleControl({
        maxWidth: 200,
        unit: 'metric'
      }), 'bottom-left')

      // Set fog for depth perception
      mapInstance.setFog({
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      })

      setMapLoaded(true)
      console.log('✅ Mapbox 3D features configured, POIs removed!')
    })

    // Handle errors
    mapInstance.on('error', (e) => {
      console.warn('Map error occurred:', e.error?.message || 'Unknown error')
    })

    // Cleanup
    return () => {
      mapInstance.remove()
      map.current = null
      setMapLoaded(false)
    }
  }, [])

  // Update markers when places change
  useEffect(() => {
    if (!map.current || !mapLoaded) {
      console.log('⏳ Waiting for map to load...')
      return
    }

    console.log(`📍 Updating ${filteredPlaces.length} custom markers`)

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Category styling
    const categoryColors: Record<string, string> = {
      restaurant: '#f97316',
      hotel: '#8b5cf6',
      attraction: '#10b981',
      cafe: '#a78bfa',
      shopping: '#ec4899',
      culture: '#3b82f6',
      bar: '#ef4444'
    }

    const categoryIcons: Record<string, string> = {
      restaurant: '🍽️',
      hotel: '🏨',
      attraction: '🏔️',
      cafe: '☕',
      shopping: '🛍️',
      culture: '🎨',
      bar: '🍺'
    }

    // Add custom markers for our places only
    filteredPlaces.forEach(place => {
      // Create custom marker element
      const el = document.createElement('div')
      el.className = 'custom-marker'
      
      // Style the marker
      el.innerHTML = `
        <div style="
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
        ">
          <div style="
            width: 44px;
            height: 44px;
            background: ${categoryColors[place.category] || '#6b7280'};
            border: 3px solid ${place.id === selectedPlaceId ? '#3b82f6' : 'white'};
            border-width: ${place.id === selectedPlaceId ? '4px' : '3px'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            box-shadow: 
              0 2px 4px rgba(0,0,0,0.1),
              0 8px 16px rgba(0,0,0,0.2),
              0 0 0 1px rgba(0,0,0,0.1) inset;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 2;
          ">
            ${categoryIcons[place.category] || '📍'}
          </div>
          <div style="
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 6px;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%);
            filter: blur(2px);
            z-index: 1;
          "></div>
        </div>
      `

      // Add hover effects
      const markerDiv = el.querySelector('div > div') as HTMLElement
      el.addEventListener('mouseenter', () => {
        if (markerDiv) {
          markerDiv.style.transform = 'scale(1.15) translateY(-2px)'
          markerDiv.style.boxShadow = `
            0 4px 8px rgba(0,0,0,0.15),
            0 12px 24px rgba(0,0,0,0.25),
            0 0 0 1px rgba(0,0,0,0.1) inset,
            0 0 20px ${categoryColors[place.category]}40
          `
        }
      })

      el.addEventListener('mouseleave', () => {
        if (markerDiv) {
          markerDiv.style.transform = 'scale(1) translateY(0)'
          markerDiv.style.boxShadow = `
            0 2px 4px rgba(0,0,0,0.1),
            0 8px 16px rgba(0,0,0,0.2),
            0 0 0 1px rgba(0,0,0,0.1) inset
          `
        }
      })

      // Click handler
      el.addEventListener('click', () => {
        if (onPlaceSelect) {
          onPlaceSelect(place.id)
        }
      })

      // Create popup
      const popup = new mapboxgl.Popup({ 
        offset: [0, -25],
        closeButton: false,
        className: 'mapbox-popup-custom'
      }).setHTML(`
        <div style="
          padding: 14px;
          min-width: 240px;
          max-width: 300px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          <h3 style="
            margin: 0 0 8px 0;
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            line-height: 1.2;
          ">
            ${place.name}
          </h3>
          <div style="
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
          ">
            <span style="
              color: #f59e0b;
              font-weight: 500;
            ">★ ${place.rating}</span>
            <span style="color: #9ca3af;">•</span>
            <span style="color: #6b7280;">${getPriceSymbol(place.priceLevel)}</span>
            <span style="color: #9ca3af;">•</span>
            <span style="
              color: #6b7280;
              font-size: 13px;
              text-transform: capitalize;
            ">${place.category}</span>
          </div>
          <p style="
            margin: 0 0 10px 0;
            color: #4b5563;
            font-size: 13px;
            line-height: 1.5;
          ">
            ${place.description.substring(0, 120)}${place.description.length > 120 ? '...' : ''}
          </p>
          ${place.address ? `
            <div style="
              padding-top: 10px;
              border-top: 1px solid #e5e7eb;
              display: flex;
              align-items: start;
              gap: 6px;
              color: #6b7280;
              font-size: 12px;
            ">
              <span>📍</span>
              <span>${place.address}</span>
            </div>
          ` : ''}
          ${place.hours ? `
            <div style="
              display: flex;
              align-items: center;
              gap: 6px;
              color: #6b7280;
              font-size: 12px;
              margin-top: 6px;
            ">
              <span>🕐</span>
              <span>${place.hours}</span>
            </div>
          ` : ''}
        </div>
      `)

      // Create and add marker
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(place.coordinates)
        .setPopup(popup)
        .addTo(map.current!)

      markers.current.push(marker)
    })

    console.log(`✅ Added ${markers.current.length} custom markers`)
  }, [filteredPlaces, selectedPlaceId, mapLoaded, onPlaceSelect])

  // Fly to location when place is selected
  const flyToPlace = useCallback((coords: [number, number]) => {
    if (map.current) {
      map.current.flyTo({
        center: coords,
        zoom: 16,
        pitch: 65,
        bearing: 0,
        duration: 2000,
        essential: true
      })
    }
  }, [])

  // Handle selected place changes
  useEffect(() => {
    if (selectedPlaceId && map.current && mapLoaded) {
      const place = filteredPlaces.find(p => p.id === selectedPlaceId)
      if (place) {
        flyToPlace(place.coordinates)
      }
    }
  }, [selectedPlaceId, filteredPlaces, mapLoaded, flyToPlace])

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-full ${className}`}
      style={{ 
        minHeight: '700px',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
    />
  )
}