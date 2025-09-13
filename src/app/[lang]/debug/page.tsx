'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { tepoztlanPlaces } from '@/data/tepoztlan-places'

const MapboxSuperDebug = dynamic(() => import('@/components/map/MapboxSuperDebug'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-yellow-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🐛</div>
        <p className="text-lg">Loading Super Debug Mode...</p>
      </div>
    </div>
  )
})

export default function DebugPage() {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  
  const handlePlaceSelect = (placeId: string) => {
    console.log('🎯 DEBUG PAGE: Place selected:', placeId)
    setSelectedPlace(placeId)
  }

  // Use first 5 places
  const testPlaces = tepoztlanPlaces.slice(0, 5)

  return (
    <div className="w-full h-screen flex flex-col bg-red-50">
      <div className="bg-red-600 text-white p-4 flex-shrink-0">
        <h1 className="text-xl font-bold">🐛 MAPBOX SUPER DEBUG MODE</h1>
        <div className="text-sm mt-2 space-y-1">
          <div>• Testing with {testPlaces.length} places from Tepoztlán data</div>
          <div>• Multiple marker creation methods</div>
          <div>• Extensive console logging</div>
          <div>• Selected Place: <span className="font-mono">{selectedPlace || 'None'}</span></div>
        </div>
        <div className="mt-2 text-xs bg-red-700 p-2 rounded">
          <div>📍 Test Places:</div>
          {testPlaces.map((place, i) => (
            <div key={place.id}>
              {i + 1}. {place.name} [{place.coordinates[0]}, {place.coordinates[1]}]
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 relative">
        <MapboxSuperDebug
          filteredPlaces={testPlaces}
          selectedPlaceId={selectedPlace}
          onPlaceSelect={handlePlaceSelect}
        />
      </div>
    </div>
  )
}