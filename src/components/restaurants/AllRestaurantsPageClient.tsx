"use client"

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { 
  ColDef, 
  GridReadyEvent, 
  SelectionChangedEvent, 
  GridApi, 
  ModuleRegistry, 
  AllCommunityModule,
  themeQuartz,
  ICellRendererParams,
  IFilterParams
} from 'ag-grid-community'

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule])
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, Columns, Store, MapPin, Activity, Star, Utensils, Phone, Globe, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { Restaurant, RestaurantService } from '@/lib/restaurants'
import RestaurantMap from './RestaurantMap'

// TypeScript interfaces for AG-Grid components
interface RestaurantData extends Restaurant {
  // Additional computed fields for the grid
  formattedPriceRange: string
  formattedRating: string
  formattedReviews: string
  shortDescription: string
  primaryCuisine: string
}

interface CuisineStyles {
  [key: string]: string
}

type CuisineRendererProps = ICellRendererParams<RestaurantData>
type RatingRendererProps = ICellRendererParams<RestaurantData>
type PriceRendererProps = ICellRendererParams<RestaurantData>
type AtmosphereRendererProps = ICellRendererParams<RestaurantData>
type AmenitiesRendererProps = ICellRendererParams<RestaurantData>
type ActionsRendererProps = ICellRendererParams<RestaurantData>
type StatusFilterProps = IFilterParams<RestaurantData>

interface StatusFilterRef {
  doesFilterPass: (params: { data: RestaurantData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}

interface AllRestaurantsPageClientProps {
  locale: Locale
}

// Transform restaurant data for grid
const transformRestaurantData = (restaurants: Restaurant[], locale: Locale): RestaurantData[] => {
  return restaurants.map((restaurant) => ({
    ...restaurant,
    formattedPriceRange: restaurant.priceRange,
    formattedRating: `${restaurant.rating} (${restaurant.reviewCount})`,
    formattedReviews: restaurant.reviewCount.toLocaleString(locale === 'es' ? 'es-MX' : 'en-US'),
    shortDescription: RestaurantService.getRestaurantDescription(restaurant, locale).substring(0, 100) + '...',
    primaryCuisine: RestaurantService.getRestaurantCuisine(restaurant, locale)
  }))
}

// Custom Cell Renderers
const CuisineRenderer = (props: CuisineRendererProps) => {
  const getCuisineIcon = (cuisine: string) => {
    if (cuisine.includes('Mexican') || cuisine.includes('Mexicana')) return '🌮'
    if (cuisine.includes('Italian') || cuisine.includes('Italiana')) return '🍝'
    if (cuisine.includes('International') || cuisine.includes('Internacional')) return '🌍'
    if (cuisine.includes('Contemporary') || cuisine.includes('Contemporánea')) return '🍽️'
    if (cuisine.includes('Traditional') || cuisine.includes('Tradicional')) return '🏛️'
    return '🍴'
  }

  const cuisineStyles: CuisineStyles = {
    'Mexicana': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'Mexican': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'Contemporary': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Contemporánea': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Traditional': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Tradicional': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'International': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Internacional': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg drop-shadow-md">{getCuisineIcon(props.value)}</span>
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${cuisineStyles[props.value] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'}`}>
        {props.value}
      </span>
    </div>
  )
}

const RatingRenderer = (props: RatingRendererProps) => {
  const rating = props.data?.rating || 0
  const stars = []
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i} className="text-yellow-500 drop-shadow-glow text-lg">★</span>)
    } else if (i < rating) {
      stars.push(<span key={i} className="text-yellow-400 drop-shadow-glow text-lg">☆</span>)
    } else {
      stars.push(<span key={i} className="text-gray-300 dark:text-gray-600 text-lg">☆</span>)
    }
  }
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">{stars}</div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        ({props.data?.reviewCount})
      </span>
    </div>
  )
}

const PriceRenderer = (props: PriceRendererProps) => {
  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'text-green-600 dark:text-green-400'
      case '$$': return 'text-yellow-600 dark:text-yellow-400'
      case '$$$': return 'text-orange-600 dark:text-orange-400'
      case '$$$$': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold text-lg ${getPriceColor(props.value)}`}>
        {props.value}
      </span>
    </div>
  )
}

const AtmosphereRenderer = (props: AtmosphereRendererProps) => {
  const getAtmosphereIcon = (atmosphere: string) => {
    switch (atmosphere) {
      case 'fine-dining': return '🍾'
      case 'family': return '👨‍👩‍👧‍👦'
      case 'casual': return '😊'
      case 'romantic': return '💕'
      case 'traditional': return '🏛️'
      case 'modern': return '🏢'
      default: return '🍽️'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{getAtmosphereIcon(props.value)}</span>
      <span className="capitalize text-sm">
        {props.value.replace('-', ' ')}
      </span>
    </div>
  )
}

const AmenitiesRenderer = (props: AmenitiesRendererProps) => {
  const restaurant = props.data
  if (!restaurant) return null

  const amenities = []
  if (restaurant.wifi) amenities.push('📶')
  if (restaurant.parking) amenities.push('🚗')
  if (restaurant.delivery) amenities.push('🚚')
  if (restaurant.outdoorSeating) amenities.push('🌞')
  if (restaurant.liveMusic) amenities.push('🎵')
  if (restaurant.alcoholic) amenities.push('🍷')

  return (
    <div className="flex gap-1 flex-wrap">
      {amenities.map((amenity, idx) => (
        <span key={idx} className="text-lg">{amenity}</span>
      ))}
    </div>
  )
}

const ActionsRenderer = (props: ActionsRendererProps) => {
  const restaurant = props.data
  if (!restaurant) return null

  return (
    <div className="flex gap-1">
      {restaurant.phone && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Phone className="h-4 w-4" />
        </Button>
      )}
      {restaurant.website && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Globe className="h-4 w-4" />
        </Button>
      )}
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <MapPin className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Custom Filter
const AtmosphereFilter = React.forwardRef<StatusFilterRef, StatusFilterProps>((props, ref) => {
  const [filterValue, setFilterValue] = useState('')
  
  React.useImperativeHandle(ref, () => ({
    doesFilterPass: (params: { data: RestaurantData }) => {
      if (!filterValue) return true
      return params.data.atmosphere === filterValue
    },
    isFilterActive: () => filterValue !== '',
    getModel: () => filterValue,
    setModel: (model: string | null) => setFilterValue(model || '')
  }))
  
  return (
    <Select value={filterValue} onValueChange={setFilterValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccionar ambiente..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Todos</SelectItem>
        <SelectItem value="fine-dining">Fine Dining</SelectItem>
        <SelectItem value="family">Familiar</SelectItem>
        <SelectItem value="casual">Casual</SelectItem>
        <SelectItem value="romantic">Romántico</SelectItem>
        <SelectItem value="traditional">Tradicional</SelectItem>
        <SelectItem value="modern">Moderno</SelectItem>
      </SelectContent>
    </Select>
  )
})
AtmosphereFilter.displayName = 'AtmosphereFilter'

export default function AllRestaurantsPageClient({ locale }: AllRestaurantsPageClientProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [restaurantData, setRestaurantData] = useState<RestaurantData[]>([])
  const [selectedRows, setSelectedRows] = useState<RestaurantData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load restaurant data
  useEffect(() => {
    const restaurants = RestaurantService.getAllRestaurants()
    const transformedData = transformRestaurantData(restaurants, locale)
    setRestaurantData(transformedData)
  }, [locale])
  
  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])
  
  // Create premium theme matching restaurant colors (orange/red)
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#fb7185', // Orange accent
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(251, 146, 60, 0.1)',
      wrapperBorderRadius: 12,
      headerHeight: 40,
      rowHeight: 60,
      fontSize: 12,
      headerFontSize: 13
    }) : themeQuartz.withParams({
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      borderColor: '#e5e7eb',
      chromeBackgroundColor: '#f9fafb',
      oddRowBackgroundColor: '#f9fafb',
      headerBackgroundColor: '#f3f4f6',
      headerTextColor: '#ea580c', // Orange accent
      rowHoverColor: '#f3f4f6',
      selectedRowBackgroundColor: 'rgba(251, 146, 60, 0.08)',
      wrapperBorderRadius: 12,
      headerHeight: 40,
      rowHeight: 60,
      fontSize: 12,
      headerFontSize: 13
    })
  }, [isDarkMode])
  
  // Column Definitions
  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      pinned: 'left',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'name.es',
      headerName: locale === 'es' ? 'Nombre' : 'Name',
      width: 220,
      pinned: 'left',
      filter: 'agTextColumnFilter',
      cellClass: 'font-semibold text-orange-600 dark:text-orange-400',
      valueGetter: (params) => locale === 'es' ? params.data?.name?.es : params.data?.name?.en
    },
    {
      field: 'primaryCuisine',
      headerName: locale === 'es' ? 'Cocina' : 'Cuisine',
      width: 180,
      cellRenderer: CuisineRenderer,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'rating',
      headerName: locale === 'es' ? 'Calificación' : 'Rating',
      width: 160,
      cellRenderer: RatingRenderer,
      filter: 'agNumberColumnFilter',
      sort: 'desc'
    },
    {
      field: 'priceRange',
      headerName: locale === 'es' ? 'Precio' : 'Price',
      width: 100,
      cellRenderer: PriceRenderer,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'atmosphere',
      headerName: locale === 'es' ? 'Ambiente' : 'Atmosphere',
      width: 140,
      cellRenderer: AtmosphereRenderer,
      filter: AtmosphereFilter
    },
    {
      field: 'address.es',
      headerName: locale === 'es' ? 'Dirección' : 'Address',
      width: 200,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => locale === 'es' ? params.data?.address?.es : params.data?.address?.en
    },
    {
      field: 'hours.es',
      headerName: locale === 'es' ? 'Horarios' : 'Hours',
      width: 150,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => locale === 'es' ? params.data?.hours?.es : params.data?.hours?.en,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{params.value}</span>
        </div>
      )
    },
    {
      headerName: locale === 'es' ? 'Servicios' : 'Amenities',
      width: 120,
      cellRenderer: AmenitiesRenderer,
      sortable: false,
      filter: false
    },
    {
      field: 'phone',
      headerName: locale === 'es' ? 'Teléfono' : 'Phone',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'website',
      headerName: 'Website',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: locale === 'es' ? 'Acciones' : 'Actions',
      width: 100,
      cellRenderer: ActionsRenderer,
      sortable: false,
      filter: false,
      pinned: 'right'
    }
  ])
  
  // Default column properties
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    minWidth: 100,
    flex: 0
  }), [])
  
  // Grid Events
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api)
    params.api.sizeColumnsToFit()
  }, [])
  
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const selectedNodes = event.api.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    setSelectedRows(selectedData)
  }, [])
  
  const onRestaurantSelect = useCallback((restaurant: Restaurant) => {
    if (gridApi) {
      // Clear current selection
      gridApi.deselectAll()
      
      // Find and select the restaurant in the grid
      gridApi.forEachNode((node) => {
        if (node.data?.id === restaurant.id) {
          node.setSelected(true, false)
          
          // Scroll to the selected row
          gridApi.ensureNodeVisible(node, 'middle')
        }
      })
    }
  }, [gridApi])
  
  
  // Clear filters
  const clearFilters = useCallback(() => {
    gridApi?.setFilterModel(null)
    setQuickFilter('')
  }, [gridApi])
  
  // Autosize columns
  const autosizeColumns = useCallback(() => {
    const allColumnIds: string[] = []
    gridApi?.getColumns()?.forEach((column) => {
      allColumnIds.push(column.getId())
    })
    gridApi?.autoSizeColumns(allColumnIds)
  }, [gridApi])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/40 from-20% via-red-50/30 via-50% to-yellow-50/20 to-80% dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background - Matching main restaurants page */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs - independent light/dark controls */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-orange-400/15 dark:bg-orange-500/20 rounded-full blur-2xl dark:blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-red-400/12 dark:bg-red-500/20 rounded-full blur-2xl dark:blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-yellow-400/8 dark:bg-yellow-500/10 rounded-full blur-2xl dark:blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient - independent controls */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(251,146,60,0.1)),radial-gradient(at_bottom_right,_transparent,_rgba(239,68,68,0.1))] dark:bg-[radial-gradient(at_top_left,_transparent,_rgba(251,146,60,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(239,68,68,0.2))]" />
        
        {/* Grid pattern overlay - independent opacity */}
        <div className="absolute inset-0 opacity-3 dark:opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-orange-400 to-red-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                📊 {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'} 📊
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-slate-800 dark:text-white drop-shadow-lg dark:drop-shadow-2xl">
              {locale === 'es' ? 'Base de Datos' : 'Database'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 dark:from-orange-300 dark:via-red-300 dark:to-yellow-300 bg-clip-text text-transparent drop-shadow-lg dark:drop-shadow-2xl">
              {locale === 'es' ? 'Gastronómica' : 'Gastronomic'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Explora y filtra todos los restaurantes con herramientas avanzadas de búsqueda y análisis'
              : 'Explore and filter all restaurants with advanced search and analysis tools'
            }
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-6 bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-xl border-slate-300/20 dark:border-white/10 shadow-xl shadow-slate-300/20 dark:shadow-white/15 rounded-3xl hover:bg-white/80 dark:hover:bg-white/8 transition-all duration-300 dark:duration-500">
            <CardHeader className="border-b border-slate-300/20 dark:border-white/10 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 blur-xl opacity-50" />
                    <div className="relative bg-gradient-to-r from-orange-400 to-red-400 p-3 rounded-2xl shadow-2xl">
                      <Store className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white">
                      {locale === 'es' ? 'Análisis de Datos' : 'Data Analysis'}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-white/70 mt-1">
                      {locale === 'es' 
                        ? 'Herramientas profesionales de búsqueda y filtrado'
                        : 'Professional search and filtering tools'
                      }
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-orange-400/30 to-red-400/30 dark:from-orange-400/10 dark:to-red-400/10 text-slate-800 dark:text-white border-orange-400/50 dark:border-orange-400/30 backdrop-blur-sm">
                    <Activity className="h-4 w-4 mr-2 text-orange-400" />
                    <span className="font-bold text-orange-600 dark:text-orange-400">{restaurantData.length}</span> {locale === 'es' ? 'Registros' : 'Records'}
                  </Badge>
                  {selectedRows.length > 0 && (
                    <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-xl hover:from-orange-500 hover:to-red-500 transition-all duration-200">
                      <span className="font-bold">{selectedRows.length}</span> {locale === 'es' ? 'Seleccionados' : 'Selected'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-orange-400/20 to-red-400/20 dark:from-orange-400/10 dark:to-red-400/10 backdrop-blur-md dark:backdrop-blur-xl border-orange-400/40 dark:border-orange-400/20 hover:border-orange-400/60 dark:hover:border-orange-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 dark:text-orange-300 font-medium">{locale === 'es' ? 'Destacados' : 'Featured'}</p>
                          <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                            {restaurantData.filter(r => r.featured).length}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-400 blur-xl opacity-30 dark:opacity-50 group-hover:opacity-50 dark:group-hover:opacity-70 transition-opacity" />
                          <Star className="h-10 w-10 text-orange-500 dark:text-orange-400 relative" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-400/20 dark:from-yellow-400/10 dark:to-orange-400/10 backdrop-blur-md dark:backdrop-blur-xl border-yellow-400/40 dark:border-yellow-400/20 hover:border-yellow-400/60 dark:hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-600 dark:text-yellow-300 font-medium">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-3xl font-bold text-slate-800 dark:text-white">
                              {(restaurantData.reduce((sum, r) => sum + r.rating, 0) / restaurantData.length || 0).toFixed(1)}
                            </p>
                            <span className="text-yellow-500 dark:text-yellow-400 text-xl">★</span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30 dark:opacity-50 group-hover:opacity-50 dark:group-hover:opacity-70 transition-opacity" />
                          <Utensils className="h-10 w-10 text-yellow-500 dark:text-yellow-400 relative" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-red-400/20 to-orange-400/20 dark:from-red-400/10 dark:to-orange-400/10 backdrop-blur-md dark:backdrop-blur-xl border-red-400/40 dark:border-red-400/20 hover:border-red-400/60 dark:hover:border-red-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-600 dark:text-red-300 font-medium">{locale === 'es' ? 'Total Reseñas' : 'Total Reviews'}</p>
                          <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                            {restaurantData.reduce((sum, r) => sum + r.reviewCount, 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-400 blur-xl opacity-30 dark:opacity-50 group-hover:opacity-50 dark:group-hover:opacity-70 transition-opacity" />
                          <Activity className="h-10 w-10 text-red-500 dark:text-red-400 relative" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-amber-400/20 to-yellow-400/20 dark:from-amber-400/10 dark:to-yellow-400/10 backdrop-blur-md dark:backdrop-blur-xl border-amber-400/40 dark:border-amber-400/20 hover:border-amber-400/60 dark:hover:border-amber-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-2">
                          <p className="text-sm text-amber-600 dark:text-amber-300 font-medium">
                            {selectedRows.length > 0 ? (locale === 'es' ? 'Restaurante Seleccionado' : 'Selected Restaurant') : (locale === 'es' ? 'Tipos de Cocina' : 'Cuisine Types')}
                          </p>
                          {selectedRows.length > 0 ? (
                            <p className="text-lg font-bold text-slate-800 dark:text-white leading-tight mt-1">
                              {RestaurantService.getRestaurantName(selectedRows[0], locale)}
                            </p>
                          ) : (
                            <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                              {new Set(restaurantData.map(r => r.primaryCuisine)).size}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-amber-400 blur-xl opacity-30 dark:opacity-50 group-hover:opacity-50 dark:group-hover:opacity-70 transition-opacity" />
                          {selectedRows.length > 0 ? (
                            <Store className="h-10 w-10 text-amber-500 dark:text-amber-400 relative flex-shrink-0" />
                          ) : (
                            <MapPin className="h-10 w-10 text-amber-500 dark:text-amber-400 relative flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              {/* Controls Bar */}
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md dark:backdrop-blur-sm rounded-2xl border border-slate-300/20 dark:border-white/10 p-6 mb-6 shadow-lg shadow-slate-300/15 dark:shadow-white/12 hover:bg-white/80 dark:hover:bg-white/8 transition-all duration-300 dark:duration-500">
                <div className="flex flex-wrap gap-4">
                  {/* Quick Filter */}
                  <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                      <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-white/50 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder={locale === 'es' ? 'Búsqueda rápida en todos los campos...' : 'Quick search across all fields...'}
                        value={quickFilter}
                        onChange={(e) => setQuickFilter(e.target.value)}
                        className="w-full pl-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/50 hover:bg-white/90 dark:hover:bg-white/15 focus:bg-white/95 dark:focus:bg-white/15 focus:border-orange-500/50 dark:focus:border-orange-400/50 transition-all duration-200 dark:duration-300"
                      />
                    </div>
                  </div>
                
                  {/* Page Size */}
                  <Select value={paginationPageSize.toString()} onValueChange={(v) => setPaginationPageSize(Number(v))}>
                    <SelectTrigger className="w-[140px] h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm dark:backdrop-blur-md border-slate-300/30 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-200 dark:duration-300">
                      <SelectValue placeholder="Filas" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                      <SelectItem value="10" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">10 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                      <SelectItem value="20" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">20 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                      <SelectItem value="50" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">50 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                      <SelectItem value="100" className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700">100 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                    </SelectContent>
                  </Select>
                
                  {/* Action Buttons */}
                  <Button 
                    onClick={clearFilters} 
                    className="h-12 gap-2 bg-gradient-to-r from-red-400/30 to-orange-400/30 dark:from-red-500/20 dark:to-orange-500/20 hover:from-red-500/40 dark:hover:from-red-500/30 hover:to-orange-500/40 dark:hover:to-orange-500/30 text-slate-800 dark:text-white border border-red-400/50 dark:border-red-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 dark:hover:shadow-red-500/20"
                  >
                    <Filter className="h-4 w-4" />
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                  
                  <Button 
                    onClick={autosizeColumns} 
                    className="h-12 gap-2 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 dark:from-yellow-500/20 dark:to-orange-500/20 hover:from-yellow-500/40 dark:hover:from-yellow-500/30 hover:to-orange-500/40 dark:hover:to-orange-500/30 text-slate-800 dark:text-white border border-yellow-400/50 dark:border-yellow-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 dark:hover:shadow-yellow-500/20"
                  >
                    <Columns className="h-4 w-4" />
                    {locale === 'es' ? 'Ajustar Columnas' : 'Autosize Columns'}
                  </Button>
                </div>
              </div>
              
              {/* AG-Grid */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-25 animate-pulse" />
                <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
                <AgGridReact
                  theme={premiumTheme}
                  ref={gridRef}
                  rowData={restaurantData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  rowSelection="multiple"
                  onGridReady={onGridReady}
                  onSelectionChanged={onSelectionChanged}
                  quickFilterText={quickFilter}
                  pagination={true}
                  paginationPageSize={paginationPageSize}
                  paginationPageSizeSelector={[10, 20, 50, 100]}
                  domLayout="normal"
                  enableCellTextSelection={true}
                  ensureDomOrder={true}
                  suppressRowClickSelection={false}
                  localeText={{
                    // Spanish/English translations
                    page: locale === 'es' ? 'Página' : 'Page',
                    more: locale === 'es' ? 'Más' : 'More',
                    to: locale === 'es' ? 'a' : 'to',
                    of: locale === 'es' ? 'de' : 'of',
                    next: locale === 'es' ? 'Siguiente' : 'Next',
                    last: locale === 'es' ? 'Último' : 'Last',
                    first: locale === 'es' ? 'Primero' : 'First',
                    previous: locale === 'es' ? 'Anterior' : 'Previous',
                    loadingOoo: locale === 'es' ? 'Cargando...' : 'Loading...',
                    selectAll: locale === 'es' ? 'Seleccionar Todo' : 'Select All',
                    searchOoo: locale === 'es' ? 'Buscar...' : 'Search...',
                    blanks: locale === 'es' ? 'En blanco' : 'Blanks',
                    filterOoo: locale === 'es' ? 'Filtrar...' : 'Filter...',
                    applyFilter: locale === 'es' ? 'Aplicar Filtro' : 'Apply Filter',
                    equals: locale === 'es' ? 'Igual' : 'Equals',
                    notEqual: locale === 'es' ? 'No Igual' : 'Not Equal',
                    lessThan: locale === 'es' ? 'Menor que' : 'Less Than',
                    greaterThan: locale === 'es' ? 'Mayor que' : 'Greater Than',
                    contains: locale === 'es' ? 'Contiene' : 'Contains',
                    notContains: locale === 'es' ? 'No Contiene' : 'Not Contains',
                    startsWith: locale === 'es' ? 'Empieza con' : 'Starts With',
                    endsWith: locale === 'es' ? 'Termina con' : 'Ends With',
                    filters: locale === 'es' ? 'Filtros' : 'Filters',
                    columns: locale === 'es' ? 'Columnas' : 'Columns',
                    noRowsToShow: locale === 'es' ? 'No hay restaurantes para mostrar' : 'No restaurants to show'
                  }}
                />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Restaurant Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <RestaurantMap
            locale={locale}
            selectedRestaurants={selectedRows}
            onRestaurantSelect={onRestaurantSelect}
          />
        </motion.div>
      </div>
    </div>
  )
}