'use client'

import { useEffect, useRef, useState } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'

const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || 'get_your_own_key'

interface SimpleMapTilerComponentProps {
  center?: [number, number]
  zoom?: number
  className?: string
}

export default function SimpleMapTilerComponent({
  center = [-99.0965, 18.9843],
  zoom = 15,
  className = 'w-full h-full'
}: SimpleMapTilerComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    maptilersdk.config.apiKey = MAPTILER_API_KEY

    try {
      const mapInstance = new maptilersdk.Map({
        container: mapContainer.current,
        style: 'streets-v2', // Use a simple built-in style
        center: center,
        zoom: zoom
      })

      map.current = mapInstance

      mapInstance.on('load', () => {
        setError(null)
      })

      mapInstance.on('error', (e) => {
        console.error('MapTiler error:', e)
        setError('Failed to load map. Please check your API key.')
      })

    } catch (err) {
      console.error('Error initializing MapTiler:', err)
      setError('Failed to initialize map')
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [center, zoom]) // Include dependencies

  return (
    <div className={className}>
      <div 
        ref={mapContainer} 
        className="w-full h-full relative"
        style={{ minHeight: '400px' }}
      >
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10">
            <div className="text-center p-8">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-white text-xl font-bold mb-2">Map Error</h3>
              <p className="text-white/70 text-sm max-w-md">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}