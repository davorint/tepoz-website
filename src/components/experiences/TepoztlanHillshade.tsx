'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Experience } from '@/lib/experiences'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Navigation } from 'lucide-react'

interface TepoztlanHillshadeProps {
  className?: string
  height?: string
  onLocationSearch?: (query: string) => void
  locale?: 'es' | 'en'
  experiences?: Experience[]
  onExperienceSelect?: (experience: Experience) => void
  onUserLocationSet?: (location: [number, number]) => void
  onMapReady?: (flyToExperience: (experience: Experience) => void) => void
  showGeocoding?: boolean
  showSidebar?: boolean
}

export default function TepoztlanHillshade({ 
  className = '', 
  height = '600px',
  onLocationSearch,
  locale = 'es',
  experiences = [],
  onExperienceSelect,
  onUserLocationSet,
  onMapReady,
  showGeocoding = true,
  showSidebar = false
}: TepoztlanHillshadeProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  // Suppress unused variable warning
  void userLocation

  // Convert experiences to GeoJSON format
  const convertToGeoJSON = (experiences: Experience[]) => {
    return {
      type: 'FeatureCollection' as const,
      features: experiences
        .filter(exp => exp.latitude && exp.longitude)
        .map((experience, index) => ({
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: [experience.longitude!, experience.latitude!]
          },
          properties: {
            id: experience.id || index.toString(),
            name: experience.name[locale],
            shortDescription: experience.shortDescription[locale],
            location: experience.location[locale],
            address: experience.address[locale],
            price: experience.price[locale],
            category: experience.category,
            duration: experience.duration[locale],
            rating: experience.rating,
            phone: experience.phone || '',
            phoneFormatted: experience.phone || '',
            featured: experience.featured,
            priceAmount: experience.priceAmount,
            currency: experience.currency,
            provider: experience.provider.name,
            type: experience.type,
            distance: 0 // Will be calculated when user location is available
          }
        }))
    }
  }

  // Distance calculation using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Sort experiences by distance from user location
  const sortExperiencesByDistance = (userLat: number, userLng: number) => {
    const sorted = [...experiences].sort((a, b) => {
      const distA = a.latitude && a.longitude ? calculateDistance(userLat, userLng, a.latitude, a.longitude) : Infinity
      const distB = b.latitude && b.longitude ? calculateDistance(userLat, userLng, b.latitude, b.longitude) : Infinity
      return distA - distB
    })
    // setSortedExperiences(sorted)
    return sorted
  }

  // Build location list for sidebar (following Mapbox tutorial pattern)
  const buildLocationList = (experiences: Experience[]) => {
    const listings = document.getElementById('listings')
    if (!listings) return

    // Clear existing listings
    listings.innerHTML = ''

    const geoJSONData = convertToGeoJSON(experiences)

    for (const feature of geoJSONData.features) {
      const experience = experiences.find(exp => exp.id === feature.properties.id)
      if (!experience) continue

      // Add a new listing section to the sidebar
      const listing = listings.appendChild(document.createElement('div'))
      listing.id = `listing-${feature.properties.id}`
      listing.className = 'item'

      // Add the link to the individual listing
      const link = listing.appendChild(document.createElement('a'))
      link.href = '#'
      link.className = 'title'
      link.id = `link-${feature.properties.id}`
      link.innerHTML = feature.properties.name

      // Add details to the individual listing
      const details = listing.appendChild(document.createElement('div'))
      details.className = 'details'
      details.innerHTML = `
        <div class="location">${feature.properties.location}</div>
        <div class="category-price">
          <span class="category">${feature.properties.category}</span>
          ${feature.properties.phone ? ` &middot; ${feature.properties.phoneFormatted}` : ''}
        </div>
        <div class="price-duration">
          <strong>${feature.properties.price}</strong> &middot; ${feature.properties.duration}
        </div>
      `

      if (feature.properties.distance && feature.properties.distance > 0) {
        const roundedDistance = Math.round(feature.properties.distance * 100) / 100
        details.innerHTML += `<div class="distance"><strong>${roundedDistance} km away</strong></div>`
      }

      // Add click event listener for sidebar items
      link.addEventListener('click', function(e) {
        e.preventDefault()
        
        // Fly to the experience
        if (experience && flyToStore) {
          flyToStore(experience)
        }
        
        // Create popup
        createExperiencePopup(experience)
        
        // Update active states
        const activeItems = document.getElementsByClassName('active')
        if (activeItems[0]) {
          activeItems[0].classList.remove('active')
        }
        listing.classList.add('active')
        // setActiveExperienceId(feature.properties.id)
        
        // Notify parent component
        if (onExperienceSelect) {
          onExperienceSelect(experience)
        }
      })
    }
  }

  // Geocoding function
  const geocodeAddress = async (query: string): Promise<mapboxgl.LngLat | null> => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${mapboxgl.accessToken}&` +
        `country=mx&` +
        `proximity=-99.0940,18.9847&` +
        `bbox=-99.5,-18.5,-98.5,19.5`
      )
      const data = await response.json()
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        return new mapboxgl.LngLat(lng, lat)
      }
      return null
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  }

  // Handle search and geocoding
  const handleLocationSearch = async () => {
    if (!searchQuery.trim() || !map.current) return
    
    const result = await geocodeAddress(searchQuery)
    if (result) {
      const location: [number, number] = [result.lng, result.lat]
      setUserLocation(location)
      
      // Fly to the geocoded location
      map.current.flyTo({
        center: [result.lng, result.lat],
        zoom: 14,
        duration: 2000
      })
      
      // Sort experiences by distance
      sortExperiencesByDistance(result.lat, result.lng)
      
      // Add user location marker
      const userMarker = document.createElement('div')
      userMarker.className = 'user-location-marker'
      userMarker.style.width = '20px'
      userMarker.style.height = '20px'
      userMarker.style.backgroundColor = '#3b82f6'
      userMarker.style.borderRadius = '50%'
      userMarker.style.border = '3px solid white'
      userMarker.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)'
      
      new mapboxgl.Marker(userMarker)
        .setLngLat([result.lng, result.lat])
        .addTo(map.current)
      
      // Notify parent component about user location
      if (onUserLocationSet) {
        onUserLocationSet(location)
      }
      
      // Trigger callback if provided
      if (onLocationSearch) {
        onLocationSearch(searchQuery)
      }
    }
  }

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const location: [number, number] = [longitude, latitude]
          setUserLocation(location)
          
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              duration: 2000
            })
          }
          
          // Sort experiences by distance
          sortExperiencesByDistance(latitude, longitude)
          
          // Notify parent component about user location
          if (onUserLocationSet) {
            onUserLocationSet(location)
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }

  // Add experience markers to map
  const addExperienceMarkers = () => {
    if (!map.current) return
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []
    
    experiences.forEach((experience, index) => {
      if (!experience.latitude || !experience.longitude) return
      
      // Create the main marker element (this is what Mapbox positions)
      const el = document.createElement('div')
      el.className = 'experience-marker'
      el.id = `marker-${experience.id || index}`
      
      // Category-based colors and icons
      const categoryConfig = {
        adventure: { color: '#f97316', icon: '🏔️' },
        spiritual: { color: '#8b5cf6', icon: '✨' },
        wellness: { color: '#10b981', icon: '🧘' },
        cultural: { color: '#3b82f6', icon: '🏛️' },
        nature: { color: '#22c55e', icon: '🌿' },
        food: { color: '#ef4444', icon: '🍽️' },
        art: { color: '#ec4899', icon: '🎨' },
        photography: { color: '#6366f1', icon: '📸' },
        healing: { color: '#14b8a6', icon: '💚' }
      }
      
      const config = categoryConfig[experience.category] || { color: '#6b7280', icon: '📍' }
      
      // Simple marker with just background color and emoji - 50% smaller
      el.innerHTML = `
        <div class="marker-inner" style="
          width: 16px;
          height: 16px;
          background-color: ${config.color};
          border: 1px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        ">${config.icon}</div>
      `
      
      // Simple hover effects
      const innerMarker = el.querySelector('.marker-inner') as HTMLElement
      if (innerMarker) {
        el.addEventListener('mouseenter', () => {
          innerMarker.style.transform = 'scale(1.3)'
          innerMarker.style.boxShadow = `0 2px 6px ${config.color}60`
        })
        
        el.addEventListener('mouseleave', () => {
          innerMarker.style.transform = 'scale(1)'
          innerMarker.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)'
        })
      }
      
      // Click handler
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        
        // Fly to experience location
        flyToStore(experience)
        
        // Create popup
        createExperiencePopup(experience)
        
        // Simple active marker highlighting
        document.querySelectorAll('.experience-marker').forEach(marker => {
          const inner = marker.querySelector('.marker-inner') as HTMLElement
          if (inner) {
            inner.style.borderWidth = '1px'
          }
        })
        
        if (innerMarker) {
          innerMarker.style.borderWidth = '2px'
        }

        // Highlight listing in sidebar (and remove highlight from others)
        const activeItems = document.getElementsByClassName('active')
        if (activeItems[0]) {
          activeItems[0].classList.remove('active')
        }
        const listing = document.getElementById(`listing-${experience.id}`)
        if (listing) {
          listing.classList.add('active')
        }
        // Set active experience
        // setActiveExperienceId(experience.id)
        
        // Notify parent component
        if (onExperienceSelect) {
          onExperienceSelect(experience)
        }
      })
      
      // Create and add the Mapbox marker with smaller offset
      const mapMarker = new mapboxgl.Marker(el, { offset: [0, -8] })
        .setLngLat([experience.longitude, experience.latitude])
        .addTo(map.current!)
      
      markersRef.current.push(mapMarker)
    })
  }

  // Fly to store function (following Mapbox tutorial pattern)
  const flyToStore = (experience: Experience) => {
    if (!map.current || !experience.latitude || !experience.longitude) return
    
    map.current.flyTo({
      center: [experience.longitude, experience.latitude],
      zoom: 16.5,
      pitch: 45,
      bearing: 0,
      duration: 1500,
      essential: true
    })
  }

  // Create enhanced popup for experiences
  const createExperiencePopup = (experience: Experience) => {
    // Remove existing popups
    const existingPopups = document.getElementsByClassName('mapboxgl-popup')
    if (existingPopups[0]) {
      existingPopups[0].remove()
    }
    
    const categoryConfig = {
      adventure: { color: '#f97316', icon: '🏔️' },
      spiritual: { color: '#8b5cf6', icon: '✨' },
      wellness: { color: '#10b981', icon: '🧘' },
      cultural: { color: '#3b82f6', icon: '🏛️' },
      nature: { color: '#22c55e', icon: '🌿' },
      food: { color: '#ef4444', icon: '🍽️' },
      art: { color: '#ec4899', icon: '🎨' },
      photography: { color: '#6366f1', icon: '📸' },
      healing: { color: '#14b8a6', icon: '💚' }
    }
    
    const config = categoryConfig[experience.category] || { color: '#6b7280', icon: '📍' }
    
    new mapboxgl.Popup({ 
      closeOnClick: false,
      offset: 15,
      className: 'experience-popup'
    })
    .setLngLat([experience.longitude!, experience.latitude!])
    .setHTML(`
      <div style="font-family: system-ui; width: 200px; font-size: 12px;">
        <div style="background: ${config.color}; color: white; margin: -10px -10px 8px -10px; padding: 8px; border-radius: 4px 4px 0 0;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 14px;">${config.icon}</span>
            <h3 style="margin: 0; font-size: 13px; font-weight: 600; line-height: 1.2;">
              ${experience.name[locale]}
            </h3>
          </div>
        </div>
        
        <div style="padding: 0 10px 8px 10px;">
          <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 11px; line-height: 1.3;">
            ${experience.shortDescription[locale].length > 60 ? experience.shortDescription[locale].substring(0, 60) + '...' : experience.shortDescription[locale]}
          </p>
          
          <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 4px;">
            <span style="font-size: 10px;">📍</span>
            <span style="color: #6b7280; font-size: 10px;">${experience.location[locale]}</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 3px; margin-bottom: 6px;">
            <span style="font-size: 10px;">💰</span>
            <span style="color: #059669; font-size: 10px; font-weight: 500;">${experience.price[locale]}</span>
          </div>
          
          <button onclick="window.open('${`/${locale}/experience/${experience.slug || experience.id}`}', '_blank')" 
                  style="width: 100%; background: ${config.color}; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; cursor: pointer; font-weight: 500;">
            ${locale === 'es' ? 'Ver Más' : 'View More'}
          </button>
        </div>
      </div>
    `)
    .addTo(map.current!)
  }


  useEffect(() => {
    if (!mapContainer.current) return

    // Set the Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    // Initialize the map centered on the Tepozteco mountain range
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // Use satellite for better terrain visibility
      center: [-99.0998, 18.9889], // Centered on Tepozteco Pyramid
      zoom: 13.5,
      pitch: 60, // Higher pitch for better 3D mountain effect
      bearing: 45, // Angle to best view the mountain range
      antialias: true
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add scale control
    map.current.addControl(new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    }), 'bottom-left')

    // When the map loads, add the hillshade layer
    map.current.on('load', () => {
      if (!map.current) return

      // Add the DEM source for terrain data
      map.current.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1'
      })

      // Add the main hillshade layer for the entire terrain
      map.current.addLayer({
        id: 'hillshading',
        source: 'dem',
        type: 'hillshade',
        slot: 'bottom',
        paint: {
          // Enhance the hillshade effect for better mountain visibility
          'hillshade-exaggeration': .2,
          'hillshade-shadow-color': '#5a3a1a',
          'hillshade-highlight-color': '#ffd4a3',
          'hillshade-accent-color': '#8b6230',
          'hillshade-illumination-direction': 335,
          'hillshade-illumination-anchor': 'viewport'
        }
      })

      // Add 3D terrain with higher exaggeration for dramatic mountain effect
      map.current.setTerrain({
        source: 'dem',
        exaggeration: 1 //  1 si the maximum permitted
      })

      // Add fog for atmospheric effect
      map.current.setFog({
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      })



      // Add labels for key locations
      map.current.addSource('labels', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-99.0998, 18.9889]
              },
              properties: {
                title: 'Pirámide del Tepozteco',
                description: '1,310m de altura'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-99.0827, 19.0020]
              },
              properties: {
                title: 'Cerro del Tepozteco',
                description: '2,310m de altura'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-99.1200, 18.9700]
              },
              properties: {
                title: 'Valle de Atongo',
                description: 'Valle sagrado'
              }
            }
          ]
        }
      })

      // Add a custom layer for place labels
      map.current.addLayer({
        id: 'place-labels',
        type: 'symbol',
        source: 'labels',
        layout: {
          'text-field': ['get', 'title'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 14,
          'text-anchor': 'top',
          'text-offset': [0, 1],
          'text-allow-overlap': false
        },
        paint: {
          'text-color': '#1e293b',
          'text-halo-color': '#ffffff',
          'text-halo-width': 2
        }
      })

      // Hide POI (Points of Interest) layers to clean up the map
      const poiLayers = [
        'poi-label',
        'poi',
        'poi-scalerank1',
        'poi-scalerank2',
        'poi-scalerank3',
        'poi-scalerank4',
        'poi-parks-scalerank1',
        'poi-parks-scalerank2',
        'poi-parks-scalerank3',
        'poi-parks'
      ]
      
      poiLayers.forEach(layerId => {
        if (map.current?.getLayer(layerId)) {
          map.current.setLayoutProperty(layerId, 'visibility', 'none')
        }
      })

      // Add experience markers after map loads
      if (experiences.length > 0) {
        addExperienceMarkers()
      }

      // Build location list for sidebar
      if (showSidebar && experiences.length > 0) {
        buildLocationList(experiences)
      }

      // Pass flyToStore function to parent component
      if (onMapReady) {
        onMapReady(flyToStore)
      }
    })

    // Animate camera on load and add pulsing animation
    map.current.on('load', () => {
      if (!map.current) return
      
      // Fly around the mountain range to showcase the terrain
      setTimeout(() => {
        map.current?.flyTo({
          center: [-99.0998, 18.9889], // Focus on pyramid location
          zoom: 14,
          pitch: 70, // High pitch to emphasize mountain elevation
          bearing: -45, // Optimal angle to view the mountain range
          duration: 4000,
          essential: true
        })
      }, 1500)

    })

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove()
      }
      markersRef.current.forEach(marker => marker.remove())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update markers when experiences change
  useEffect(() => {
    if (map.current && experiences.length > 0) {
      addExperienceMarkers()
      if (showSidebar) {
        buildLocationList(experiences)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences, showSidebar])

  return (
    <>
      <style jsx>{`
        .sidebar {
          position: absolute;
          width: 33.3333%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          border-right: 1px solid rgba(0, 0, 0, 0.25);
          background: white;
          z-index: 1;
        }
        
        .map-container {
          position: absolute;
          left: ${showSidebar ? '33.3333%' : '0'};
          width: ${showSidebar ? '66.6666%' : '100%'};
          top: 0;
          bottom: 0;
        }
        
        .heading {
          background: #fff;
          border-bottom: 1px solid #eee;
          height: 60px;
          line-height: 60px;
          padding: 0 15px;
        }
        
        .heading h1 {
          font-size: 18px;
          margin: 0;
          font-weight: 600;
          color: #374151;
        }
        
        .listings {
          height: calc(100% - 60px);
          overflow: auto;
          padding-bottom: 60px;
        }
        
        .listings .item {
          border-bottom: 1px solid #eee;
          padding: 15px;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .listings .item:last-child {
          border-bottom: none;
        }
        
        .listings .item .title {
          display: block;
          color: #059669;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 4px;
          text-decoration: none;
        }
        
        .listings .item .details {
          font-size: 12px;
          color: #6b7280;
        }
        
        .listings .item .location {
          margin-bottom: 2px;
          font-weight: 500;
        }
        
        .listings .item .category {
          text-transform: capitalize;
          color: #f97316;
          font-weight: 500;
        }
        
        .listings .item .price-duration {
          margin-top: 4px;
          color: #374151;
        }
        
        .listings .item .distance {
          margin-top: 4px;
          color: #059669;
          font-size: 11px;
        }
        
        .listings .item.active .title,
        .listings .item .title:hover {
          color: #065f46;
        }
        
        .listings .item.active {
          background-color: #ecfdf5;
          border-left: 3px solid #059669;
        }
        
        .listings .item:hover {
          background-color: #f9fafb;
        }
        
        ::-webkit-scrollbar {
          width: 3px;
          height: 3px;
          border-left: 0;
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-track {
          background: none;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #059669;
          border-radius: 0;
        }
        
        .experience-popup .mapboxgl-popup-content {
          padding: 10px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
          border: none !important;
          max-width: 220px !important;
        }
        
        .experience-popup .mapboxgl-popup-close-button {
          font-size: 16px !important;
          padding: 4px !important;
          color: #6b7280 !important;
          right: 6px !important;
          top: 6px !important;
        }
        
        .mapboxgl-popup {
          padding-bottom: 20px !important;
        }
        
        .custom-popup .mapboxgl-popup-content {
          padding: 12px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        
        .custom-popup .mapboxgl-popup-close-button {
          display: none !important;
        }
      `}</style>
      <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${className}`} style={{ height }}>
        {/* Sidebar */}
        {showSidebar && (
          <div className="sidebar">
            <div className="heading">
              <h1>{locale === 'es' ? 'Nuestras Experiencias' : 'Our Experiences'}</h1>
            </div>
            <div id="listings" className="listings"></div>
          </div>
        )}
        
        {/* Map Container */}
        <div className="map-container">
          <div 
            ref={mapContainer} 
            className="w-full h-full"
          />
          

      {/* Geocoding Search Interface */}
      {showGeocoding && (
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex flex-col gap-2 w-64">
            <div className="flex gap-2">
              <Input
                placeholder={locale === 'es' ? 'Buscar ubicación...' : 'Search location...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                className="text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
              />
              <Button
                size="sm"
                onClick={handleLocationSearch}
                disabled={!searchQuery.trim()}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={getCurrentLocation}
              className="text-sm"
            >
              <Navigation className="h-4 w-4 mr-2" />
              {locale === 'es' ? 'Mi Ubicación' : 'My Location'}
            </Button>
          </div>
        </div>
      )}

      {/* Experience Count Badge */}
      {experiences.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-teal-500/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <p className="text-white text-sm font-medium">
            <MapPin className="h-4 w-4 inline mr-1" />
            {experiences.length} {locale === 'es' ? 'experiencias' : 'experiences'}
          </p>
        </div>
      )}

      {/* Category Legend */}
      {experiences.length > 0 && (
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {locale === 'es' ? 'Categorías' : 'Categories'}
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(experiences.map(exp => exp.category))).map((category) => {
              const categoryColors = {
                adventure: '#f97316',
                spiritual: '#8b5cf6',
                wellness: '#10b981',
                cultural: '#3b82f6',
                nature: '#22c55e',
                food: '#ef4444',
                art: '#ec4899',
                photography: '#6366f1',
                healing: '#14b8a6'
              }
              
              const categoryLabels = {
                adventure: { es: 'Aventura', en: 'Adventure' },
                spiritual: { es: 'Espiritual', en: 'Spiritual' },
                wellness: { es: 'Bienestar', en: 'Wellness' },
                cultural: { es: 'Cultural', en: 'Cultural' },
                nature: { es: 'Naturaleza', en: 'Nature' },
                food: { es: 'Gastronomía', en: 'Food' },
                art: { es: 'Arte', en: 'Art' },
                photography: { es: 'Fotografía', en: 'Photography' },
                healing: { es: 'Sanación', en: 'Healing' }
              }

              return (
                <div key={category} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full border border-white" 
                    style={{ backgroundColor: categoryColors[category as keyof typeof categoryColors] || '#6b7280' }}
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {categoryLabels[category as keyof typeof categoryLabels]?.[locale] || category}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
        </div> {/* Close map-container */}
      </div> {/* Close main container */}
    </>
  )
}