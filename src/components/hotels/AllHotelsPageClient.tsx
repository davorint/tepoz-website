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
import { Filter, Columns, Hotel, MapPin, Activity, Star, Building, Phone, Globe } from 'lucide-react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { Hotel as HotelType, HotelService } from '@/lib/hotels'
import HotelMap from './HotelMap'

// TypeScript interfaces for AG-Grid components
interface HotelData extends HotelType {
  // Additional computed fields for the grid
  formattedPriceRange: string
  formattedRating: string
  formattedReviews: string
  shortDescription: string
  primaryCategory: string
}

interface CategoryStyles {
  [key: string]: string
}

type CategoryRendererProps = ICellRendererParams<HotelData>
type RatingRendererProps = ICellRendererParams<HotelData>
type PriceRendererProps = ICellRendererParams<HotelData>
type AmenitiesRendererProps = ICellRendererParams<HotelData>
type ActionsRendererProps = ICellRendererParams<HotelData>
type StatusFilterProps = IFilterParams<HotelData>

interface StatusFilterRef {
  doesFilterPass: (params: { data: HotelData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}

interface AllHotelsPageClientProps {
  locale: Locale
}

// Transform hotel data for grid
const transformHotelData = (hotels: HotelType[], locale: Locale): HotelData[] => {
  return hotels.map((hotel) => ({
    ...hotel,
    formattedPriceRange: hotel.priceRange,
    formattedRating: `${hotel.rating} (${hotel.reviews})`,
    formattedReviews: hotel.reviews.toLocaleString(locale === 'es' ? 'es-MX' : 'en-US'),
    shortDescription: HotelService.getHotelDescription(hotel, locale).substring(0, 100) + '...',
    primaryCategory: hotel.category
  }))
}

// Custom Cell Renderers
const CategoryRenderer = (props: CategoryRendererProps) => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Boutique') || category.includes('boutique')) return '✨'
    if (category.includes('Luxury') || category.includes('Lujo')) return '💎'
    if (category.includes('Business') || category.includes('Negocios')) return '💼'
    if (category.includes('Budget') || category.includes('Económico')) return '💰'
    if (category.includes('Resort')) return '🏖️'
    if (category.includes('Historic') || category.includes('Histórico')) return '🏛️'
    return '🏨'
  }

  const categoryStyles: CategoryStyles = {
    'Boutique': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'boutique': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Luxury': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Lujo': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Business': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Negocios': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Budget': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    'Económico': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    'Resort': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400',
    'Historic': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Histórico': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg drop-shadow-md">{getCategoryIcon(props.value)}</span>
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${categoryStyles[props.value] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'}`}>
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
        ({props.data?.reviews})
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

const AmenitiesRenderer = (props: AmenitiesRendererProps) => {
  const hotel = props.data
  if (!hotel) return null

  const amenities = []
  if (hotel.amenities.includes('wifi')) amenities.push('📶')
  if (hotel.amenities.includes('parking')) amenities.push('🚗')
  if (hotel.amenities.includes('pool')) amenities.push('🏊‍♂️')
  if (hotel.amenities.includes('spa')) amenities.push('💆‍♀️')
  if (hotel.amenities.includes('restaurant')) amenities.push('🍽️')
  if (hotel.petFriendly) amenities.push('🐕')
  if (hotel.sustainability) amenities.push('🌱')

  return (
    <div className="flex gap-1 flex-wrap">
      {amenities.map((amenity, idx) => (
        <span key={idx} className="text-lg">{amenity}</span>
      ))}
    </div>
  )
}

const ActionsRenderer = (props: ActionsRendererProps) => {
  const hotel = props.data
  if (!hotel) return null

  return (
    <div className="flex gap-1">
      {hotel.contact.phone && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Phone className="h-4 w-4" />
        </Button>
      )}
      {hotel.contact.website && (
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
const CategoryFilter = React.forwardRef<StatusFilterRef, StatusFilterProps>((props, ref) => {
  const [filterValue, setFilterValue] = useState('')
  
  React.useImperativeHandle(ref, () => ({
    doesFilterPass: (params: { data: HotelData }) => {
      if (!filterValue) return true
      return params.data.category === filterValue
    },
    isFilterActive: () => filterValue !== '',
    getModel: () => filterValue,
    setModel: (model: string | null) => setFilterValue(model || '')
  }))
  
  return (
    <Select value={filterValue} onValueChange={setFilterValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccionar categoría..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Todos</SelectItem>
        <SelectItem value="boutique">Boutique</SelectItem>
        <SelectItem value="luxury">Lujo</SelectItem>
        <SelectItem value="business">Negocios</SelectItem>
        <SelectItem value="budget">Económico</SelectItem>
        <SelectItem value="resort">Resort</SelectItem>
        <SelectItem value="historic">Histórico</SelectItem>
      </SelectContent>
    </Select>
  )
})
CategoryFilter.displayName = 'CategoryFilter'

export default function AllHotelsPageClient({ locale }: AllHotelsPageClientProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [hotelData, setHotelData] = useState<HotelData[]>([])
  const [selectedRows, setSelectedRows] = useState<HotelData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load hotel data
  useEffect(() => {
    const hotels = HotelService.getAllHotels()
    const transformedData = transformHotelData(hotels, locale)
    setHotelData(transformedData)
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
  
  // Create premium theme matching hotel colors (blue/indigo/purple)
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#3b82f6', // Blue accent
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(59, 130, 246, 0.1)',
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
      headerTextColor: '#2563eb', // Blue accent
      rowHoverColor: '#f3f4f6',
      selectedRowBackgroundColor: 'rgba(59, 130, 246, 0.08)',
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
      cellClass: 'font-semibold text-blue-600 dark:text-blue-400',
      valueGetter: (params) => locale === 'es' ? params.data?.name?.es : params.data?.name?.en
    },
    {
      field: 'primaryCategory',
      headerName: locale === 'es' ? 'Categoría' : 'Category',
      width: 180,
      cellRenderer: CategoryRenderer,
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
      field: 'location.address',
      headerName: locale === 'es' ? 'Dirección' : 'Address',
      width: 200,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => params.data?.location?.address
    },
    {
      field: 'contact.phone',
      headerName: locale === 'es' ? 'Teléfono' : 'Phone',
      width: 150,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => params.data?.contact?.phone
    },
    {
      headerName: locale === 'es' ? 'Servicios' : 'Amenities',
      width: 150,
      cellRenderer: AmenitiesRenderer,
      sortable: false,
      filter: false
    },
    {
      field: 'contact.email',
      headerName: 'Email',
      width: 200,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => params.data?.contact?.email
    },
    {
      field: 'contact.website',
      headerName: 'Website',
      width: 150,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => params.data?.contact?.website
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background - Matching main hotels page */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(59,130,246,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(99,102,241,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                📊 {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'} 📊
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-indigo-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Base de Datos' : 'Database'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Hotelera' : 'Hotels'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Explora y filtra todos los hoteles con herramientas avanzadas de búsqueda y análisis'
              : 'Explore and filter all hotels with advanced search and analysis tools'
            }
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-6 bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl">
            <CardHeader className="border-b border-white/10 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 blur-xl opacity-50" />
                    <div className="relative bg-gradient-to-r from-blue-400 to-indigo-400 p-3 rounded-2xl shadow-2xl">
                      <Hotel className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-white">
                      {locale === 'es' ? 'Análisis de Datos' : 'Data Analysis'}
                    </CardTitle>
                    <CardDescription className="text-white/70 mt-1">
                      {locale === 'es' 
                        ? 'Herramientas profesionales de búsqueda y filtrado'
                        : 'Professional search and filtering tools'
                      }
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 text-white border-blue-400/30 backdrop-blur-sm">
                    <Activity className="h-4 w-4 mr-2 text-blue-400" />
                    <span className="font-bold">{hotelData.length}</span> {locale === 'es' ? 'Registros' : 'Records'}
                  </Badge>
                  {selectedRows.length > 0 && (
                    <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-xl">
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
                  <Card className="bg-gradient-to-br from-blue-400/10 to-indigo-400/10 backdrop-blur-xl border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-300 font-medium">{locale === 'es' ? 'Destacados' : 'Featured'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {hotelData.filter(h => h.featured).length}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Star className="h-10 w-10 text-blue-400 relative" />
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
                  <Card className="bg-gradient-to-br from-indigo-400/10 to-purple-400/10 backdrop-blur-xl border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-indigo-300 font-medium">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-3xl font-bold text-white">
                              {(hotelData.reduce((sum, h) => sum + h.rating, 0) / hotelData.length || 0).toFixed(1)}
                            </p>
                            <span className="text-indigo-400 text-xl">⭐</span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Building className="h-10 w-10 text-indigo-400 relative" />
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
                  <Card className="bg-gradient-to-br from-purple-400/10 to-blue-400/10 backdrop-blur-xl border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-300 font-medium">{locale === 'es' ? 'Total Reseñas' : 'Total Reviews'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {hotelData.reduce((sum, h) => sum + h.reviews, 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Activity className="h-10 w-10 text-purple-400 relative" />
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
                  <Card className="bg-gradient-to-br from-indigo-400/10 to-blue-400/10 backdrop-blur-xl border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-2">
                          <p className="text-sm text-indigo-300 font-medium">
                            {selectedRows.length > 0 ? (locale === 'es' ? 'Hotel Seleccionado' : 'Selected Hotel') : (locale === 'es' ? 'Categorías' : 'Categories')}
                          </p>
                          {selectedRows.length > 0 ? (
                            <p className="text-lg font-bold text-white leading-tight mt-1">
                              {HotelService.getHotelName(selectedRows[0], locale)}
                            </p>
                          ) : (
                            <p className="text-3xl font-bold text-white mt-1">
                              {new Set(hotelData.map(h => h.primaryCategory)).size}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          {selectedRows.length > 0 ? (
                            <Hotel className="h-10 w-10 text-indigo-400 relative flex-shrink-0" />
                          ) : (
                            <MapPin className="h-10 w-10 text-indigo-400 relative flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              {/* Controls Bar */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
                <div className="flex flex-wrap gap-4">
                  {/* Quick Filter */}
                  <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                      <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder={locale === 'es' ? 'Búsqueda rápida en todos los campos...' : 'Quick search across all fields...'}
                        value={quickFilter}
                        onChange={(e) => setQuickFilter(e.target.value)}
                        className="w-full pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Page Size */}
                  <Select value={paginationPageSize.toString()} onValueChange={(v) => setPaginationPageSize(Number(v))}>
                    <SelectTrigger className="w-[140px] h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-colors">
                      <SelectValue placeholder="Filas" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="10" className="text-white hover:bg-slate-700">10 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                      <SelectItem value="20" className="text-white hover:bg-slate-700">20 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                      <SelectItem value="50" className="text-white hover:bg-slate-700">50 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                      <SelectItem value="100" className="text-white hover:bg-slate-700">100 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Action Buttons */}
                  <Button 
                    onClick={clearFilters} 
                    className="h-12 gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-white border border-indigo-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    <Filter className="h-4 w-4" />
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                  
                  <Button 
                    onClick={autosizeColumns} 
                    className="h-12 gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white border border-purple-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <Columns className="h-4 w-4" />
                    {locale === 'es' ? 'Ajustar Columnas' : 'Autosize Columns'}
                  </Button>
                </div>
              </div>
              
              {/* AG-Grid */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-25 animate-pulse" />
                <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
                <AgGridReact
                  theme={premiumTheme}
                  ref={gridRef}
                  rowData={hotelData}
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
                    noRowsToShow: locale === 'es' ? 'No hay hoteles para mostrar' : 'No hotels to show'
                  }}
                />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hotel Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <HotelMap
            locale={locale}
            selectedHotels={selectedRows.map(row => ({
              id: row.id,
              name: row.name,
              description: row.description,
              category: row.category,
              priceRange: row.priceRange,
              rating: row.rating,
              reviews: row.reviews,
              images: row.images,
              amenities: row.amenities,
              roomTypes: row.roomTypes,
              location: row.location,
              contact: row.contact,
              features: row.features,
              featured: row.featured,
              sustainability: row.sustainability,
              petFriendly: row.petFriendly,
              adultsOnly: row.adultsOnly
            }))}
            onHotelSelect={(hotel) => {
              // Find the hotel in the grid and select it
              if (gridApi) {
                gridApi.forEachNode((node) => {
                  if (node.data && node.data.id === hotel.id) {
                    node.setSelected(true, true)
                    gridApi.ensureNodeVisible(node)
                  }
                })
              }
            }}
            className="w-full"
          />
        </motion.div>
      </div>
    </div>
  )
}