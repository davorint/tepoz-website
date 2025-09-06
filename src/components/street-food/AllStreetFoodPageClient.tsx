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
import { Download, Filter, Columns, Store, MapPin, Activity, Star, Utensils, Phone, Globe, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { StreetFood, StreetFoodService } from '@/lib/street-food'

// TypeScript interfaces for AG-Grid components
interface StreetFoodData extends StreetFood {
  // Additional computed fields for the grid
  formattedPriceRange: string
  formattedRating: string
  formattedReviews: string
  shortDescription: string
  primaryType: string
}

interface TypeStyles {
  [key: string]: string
}

type TypeRendererProps = ICellRendererParams<StreetFoodData>
type RatingRendererProps = ICellRendererParams<StreetFoodData>
type PriceRendererProps = ICellRendererParams<StreetFoodData>
type VenueRendererProps = ICellRendererParams<StreetFoodData>
type AmenitiesRendererProps = ICellRendererParams<StreetFoodData>
type ActionsRendererProps = ICellRendererParams<StreetFoodData>
type StatusFilterProps = IFilterParams<StreetFoodData>

interface StatusFilterRef {
  doesFilterPass: (params: { data: StreetFoodData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}

interface AllStreetFoodPageClientProps {
  locale: Locale
}

// Transform street food data for grid
const transformStreetFoodData = (streetFoods: StreetFood[], locale: Locale): StreetFoodData[] => {
  return streetFoods.map((streetFood) => ({
    ...streetFood,
    formattedPriceRange: streetFood.priceRange,
    formattedRating: `${streetFood.rating} (${streetFood.reviewCount})`,
    formattedReviews: streetFood.reviewCount.toLocaleString(locale === 'es' ? 'es-MX' : 'en-US'),
    shortDescription: StreetFoodService.getStreetFoodDescription(streetFood, locale).substring(0, 100) + '...',
    primaryType: StreetFoodService.getStreetFoodType(streetFood, locale)
  }))
}

// Custom Cell Renderers
const TypeRenderer = (props: TypeRendererProps) => {
  const getTypeIcon = (type: string) => {
    if (type.includes('Tacos') || type.includes('Taco')) return '🌮'
    if (type.includes('Elotes') || type.includes('Esquites')) return '🌽'
    if (type.includes('Quesadillas') || type.includes('Quesadilla')) return '🫓'
    if (type.includes('Tortas') || type.includes('Torta')) return '🥪'
    if (type.includes('Fruit') || type.includes('Fruta')) return '🍉'
    if (type.includes('Drinks') || type.includes('Bebidas')) return '🥤'
    if (type.includes('Sweets') || type.includes('Dulces')) return '🍭'
    if (type.includes('Ice') || type.includes('Nieve')) return '🍧'
    return '🍴'
  }

  const typeStyles: TypeStyles = {
    'Tacos': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    'Elotes': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Quesadillas': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    'Tortas': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Fruit': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'Fruta': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'Drinks': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Bebidas': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Sweets': 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400',
    'Dulces': 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400',
    'Ice': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400',
    'Nieve': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400'
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg drop-shadow-md">{getTypeIcon(props.value)}</span>
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${typeStyles[props.value] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'}`}>
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

const VenueRenderer = (props: VenueRendererProps) => {
  const getVenueIcon = (venue: string) => {
    switch (venue) {
      case 'street-cart': return '🛒'
      case 'market-stall': return '🏪'
      case 'food-truck': return '🚚'
      case 'sidewalk': return '🚶‍♂️'
      case 'plaza': return '🏛️'
      case 'festival': return '🎪'
      default: return '🍽️'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{getVenueIcon(props.value)}</span>
      <span className="capitalize text-sm">
        {props.value.replace('-', ' ')}
      </span>
    </div>
  )
}

const AmenitiesRenderer = (props: AmenitiesRendererProps) => {
  const streetFood = props.data
  if (!streetFood) return null

  const amenities = []
  if (streetFood.cashOnly) amenities.push('💵')
  if (streetFood.dietary.includes('spicy')) amenities.push('🌶️')
  if (streetFood.dietary.includes('vegetarian')) amenities.push('🌱')
  if (streetFood.dietary.includes('gluten-free')) amenities.push('🌾')
  if (streetFood.localFavorite) amenities.push('✨')
  if (streetFood.verified) amenities.push('✅')

  return (
    <div className="flex gap-1 flex-wrap">
      {amenities.map((amenity, idx) => (
        <span key={idx} className="text-lg">{amenity}</span>
      ))}
    </div>
  )
}

const ActionsRenderer = (props: ActionsRendererProps) => {
  const streetFood = props.data
  if (!streetFood) return null

  return (
    <div className="flex gap-1">
      {streetFood.phone && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Phone className="h-4 w-4" />
        </Button>
      )}
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <Globe className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <MapPin className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Custom Filter
const VenueFilter = React.forwardRef<StatusFilterRef, StatusFilterProps>((props, ref) => {
  const [filterValue, setFilterValue] = useState('')
  
  React.useImperativeHandle(ref, () => ({
    doesFilterPass: (params: { data: StreetFoodData }) => {
      if (!filterValue) return true
      return params.data.venueType === filterValue
    },
    isFilterActive: () => filterValue !== '',
    getModel: () => filterValue,
    setModel: (model: string | null) => setFilterValue(model || '')
  }))
  
  return (
    <Select value={filterValue} onValueChange={setFilterValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccionar ubicación..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Todos</SelectItem>
        <SelectItem value="street-cart">Carrito de Calle</SelectItem>
        <SelectItem value="market-stall">Puesto de Mercado</SelectItem>
        <SelectItem value="food-truck">Food Truck</SelectItem>
        <SelectItem value="sidewalk">Banqueta</SelectItem>
        <SelectItem value="plaza">Plaza</SelectItem>
        <SelectItem value="festival">Festival</SelectItem>
      </SelectContent>
    </Select>
  )
})
VenueFilter.displayName = 'VenueFilter'

export default function AllStreetFoodPageClient({ locale }: AllStreetFoodPageClientProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [streetFoodData, setStreetFoodData] = useState<StreetFoodData[]>([])
  const [selectedRows, setSelectedRows] = useState<StreetFoodData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load street food data
  useEffect(() => {
    const streetFoods = StreetFoodService.getAllStreetFoods()
    const transformedData = transformStreetFoodData(streetFoods, locale)
    setStreetFoodData(transformedData)
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
  
  // Create premium theme matching street food colors (green/yellow)
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#22c55e', // Green accent
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(34, 197, 94, 0.1)',
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
      headerTextColor: '#16a34a', // Green accent
      rowHoverColor: '#f3f4f6',
      selectedRowBackgroundColor: 'rgba(34, 197, 94, 0.08)',
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
      cellClass: 'font-semibold text-green-600 dark:text-green-400',
      valueGetter: (params) => locale === 'es' ? params.data?.name?.es : params.data?.name?.en
    },
    {
      field: 'primaryType',
      headerName: locale === 'es' ? 'Tipo' : 'Type',
      width: 180,
      cellRenderer: TypeRenderer,
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
      field: 'venueType',
      headerName: locale === 'es' ? 'Ubicación' : 'Venue',
      width: 140,
      cellRenderer: VenueRenderer,
      filter: VenueFilter
    },
    {
      field: 'location.es',
      headerName: locale === 'es' ? 'Dirección' : 'Address',
      width: 200,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => locale === 'es' ? params.data?.location?.es : params.data?.location?.en
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
      headerName: locale === 'es' ? 'Características' : 'Features',
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
      field: 'socialMedia',
      headerName: locale === 'es' ? 'Redes Sociales' : 'Social Media',
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
  
  // Export to CSV
  const exportToCSV = useCallback(() => {
    gridApi?.exportDataAsCsv({
      fileName: `comida_callejera_tepoztlan_${new Date().toISOString().split('T')[0]}.csv`
    })
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background - Matching main street food page */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-yellow-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-lime-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(34,197,94,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(234,179,8,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-green-400 to-yellow-400 text-black px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                📊 {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'} 📊
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Base de Datos' : 'Database'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-300 via-yellow-300 to-lime-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Comida Callejera' : 'Street Food'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Explora y filtra toda la comida callejera con herramientas avanzadas de búsqueda y análisis'
              : 'Explore and filter all street food with advanced search and analysis tools'
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
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 blur-xl opacity-50" />
                    <div className="relative bg-gradient-to-r from-green-400 to-yellow-400 p-3 rounded-2xl shadow-2xl">
                      <Utensils className="h-8 w-8 text-black" />
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
                  <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-green-400/10 to-yellow-400/10 text-white border-green-400/30 backdrop-blur-sm">
                    <Activity className="h-4 w-4 mr-2 text-green-400" />
                    <span className="font-bold">{streetFoodData.length}</span> {locale === 'es' ? 'Registros' : 'Records'}
                  </Badge>
                  {selectedRows.length > 0 && (
                    <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-green-400 to-yellow-400 text-black shadow-xl">
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
                  <Card className="bg-gradient-to-br from-green-400/10 to-lime-400/10 backdrop-blur-xl border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-300 font-medium">{locale === 'es' ? 'Destacados' : 'Featured'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {streetFoodData.filter(s => s.featured).length}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Star className="h-10 w-10 text-green-400 relative" />
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
                  <Card className="bg-gradient-to-br from-yellow-400/10 to-lime-400/10 backdrop-blur-xl border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-300 font-medium">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-3xl font-bold text-white">
                              {(streetFoodData.reduce((sum, s) => sum + s.rating, 0) / streetFoodData.length || 0).toFixed(1)}
                            </p>
                            <span className="text-yellow-400 text-xl">⭐</span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Utensils className="h-10 w-10 text-yellow-400 relative" />
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
                  <Card className="bg-gradient-to-br from-lime-400/10 to-green-400/10 backdrop-blur-xl border-lime-400/20 hover:border-lime-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-lime-300 font-medium">{locale === 'es' ? 'Total Reseñas' : 'Total Reviews'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {streetFoodData.reduce((sum, s) => sum + s.reviewCount, 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-lime-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Activity className="h-10 w-10 text-lime-400 relative" />
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
                  <Card className="bg-gradient-to-br from-yellow-400/10 to-orange-400/10 backdrop-blur-xl border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-2">
                          <p className="text-sm text-yellow-300 font-medium">
                            {selectedRows.length > 0 ? (locale === 'es' ? 'Seleccionado' : 'Selected Item') : (locale === 'es' ? 'Tipos de Comida' : 'Food Types')}
                          </p>
                          {selectedRows.length > 0 ? (
                            <p className="text-lg font-bold text-white leading-tight mt-1">
                              {StreetFoodService.getStreetFoodName(selectedRows[0], locale)}
                            </p>
                          ) : (
                            <p className="text-3xl font-bold text-white mt-1">
                              {new Set(streetFoodData.map(s => s.primaryType)).size}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          {selectedRows.length > 0 ? (
                            <Store className="h-10 w-10 text-yellow-400 relative flex-shrink-0" />
                          ) : (
                            <MapPin className="h-10 w-10 text-yellow-400 relative flex-shrink-0" />
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
                        className="w-full pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-green-400/50 transition-colors"
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
                    onClick={exportToCSV} 
                    className="h-12 gap-2 bg-gradient-to-r from-green-500/20 to-lime-500/20 hover:from-green-500/30 hover:to-lime-500/30 text-white border border-green-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                  >
                    <Download className="h-4 w-4" />
                    {locale === 'es' ? 'Exportar CSV' : 'Export CSV'}
                  </Button>
                  
                  <Button 
                    onClick={clearFilters} 
                    className="h-12 gap-2 bg-gradient-to-r from-yellow-500/20 to-green-500/20 hover:from-yellow-500/30 hover:to-green-500/30 text-white border border-yellow-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
                  >
                    <Filter className="h-4 w-4" />
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                  
                  <Button 
                    onClick={autosizeColumns} 
                    className="h-12 gap-2 bg-gradient-to-r from-lime-500/20 to-green-500/20 hover:from-lime-500/30 hover:to-green-500/30 text-white border border-lime-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/20"
                  >
                    <Columns className="h-4 w-4" />
                    {locale === 'es' ? 'Ajustar Columnas' : 'Autosize Columns'}
                  </Button>
                </div>
              </div>
              
              {/* AG-Grid */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-2xl blur opacity-25 animate-pulse" />
                <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
                <AgGridReact
                  theme={premiumTheme}
                  ref={gridRef}
                  rowData={streetFoodData}
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
                    noRowsToShow: locale === 'es' ? 'No hay comida callejera para mostrar' : 'No street food to show'
                  }}
                />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}