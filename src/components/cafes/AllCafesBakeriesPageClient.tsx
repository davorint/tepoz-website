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
import { Filter, Columns, Store, MapPin, Activity, Star, Coffee, Phone, Globe, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { Cafe, CafeService } from '@/lib/cafes'
import CafeMap from './CafeMap'

// TypeScript interfaces for AG-Grid components
interface CafeData extends Cafe {
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

type TypeRendererProps = ICellRendererParams<CafeData>
type RatingRendererProps = ICellRendererParams<CafeData>
type PriceRendererProps = ICellRendererParams<CafeData>
type AtmosphereRendererProps = ICellRendererParams<CafeData>
type AmenitiesRendererProps = ICellRendererParams<CafeData>
type ActionsRendererProps = ICellRendererParams<CafeData>
type StatusFilterProps = IFilterParams<CafeData>

interface StatusFilterRef {
  doesFilterPass: (params: { data: CafeData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}

interface AllCafesBakeriesPageClientProps {
  locale: Locale
}

// Transform cafe data for grid
const transformCafeData = (cafes: Cafe[], locale: Locale): CafeData[] => {
  return cafes.map((cafe) => ({
    ...cafe,
    formattedPriceRange: cafe.priceRange,
    formattedRating: `${cafe.rating} (${cafe.reviewCount})`,
    formattedReviews: cafe.reviewCount.toLocaleString(locale === 'es' ? 'es-MX' : 'en-US'),
    shortDescription: CafeService.getCafeDescription(cafe, locale).substring(0, 100) + '...',
    primaryType: CafeService.getCafeType(cafe, locale)
  }))
}

// Custom Cell Renderers
const TypeRenderer = (props: TypeRendererProps) => {
  const getTypeIcon = (type: string) => {
    if (type.includes('Coffee') || type.includes('Café')) return '☕'
    if (type.includes('Bakery') || type.includes('Panadería')) return '🥖'
    if (type.includes('Pastry') || type.includes('Repostería')) return '🧁'
    if (type.includes('Specialty') || type.includes('Especialidad')) return '✨'
    if (type.includes('Bistro')) return '🍽️'
    return '☕'
  }

  const typeStyles: TypeStyles = {
    'Café': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Coffee': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Bakery': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    'Panadería': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    'Pastry': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Repostería': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Specialty': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Especialidad': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Bistro': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
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

const AtmosphereRenderer = (props: AtmosphereRendererProps) => {
  const getAtmosphereIcon = (atmosphere: string) => {
    switch (atmosphere) {
      case 'cozy': return '🏠'
      case 'modern': return '🏢'
      case 'rustic': return '🌾'
      case 'artisan': return '🎨'
      case 'casual': return '😊'
      case 'elegant': return '✨'
      default: return '☕'
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
  const cafe = props.data
  if (!cafe) return null

  const amenities = []
  if (cafe.wifi) amenities.push('📶')
  if (cafe.parking) amenities.push('🚗')
  if (cafe.delivery) amenities.push('🚚')
  if (cafe.outdoorSeating) amenities.push('🌞')
  if (cafe.takeaway) amenities.push('🥤')
  if (cafe.petFriendly) amenities.push('🐕')

  return (
    <div className="flex gap-1 flex-wrap">
      {amenities.map((amenity, idx) => (
        <span key={idx} className="text-lg">{amenity}</span>
      ))}
    </div>
  )
}

const ActionsRenderer = (props: ActionsRendererProps) => {
  const cafe = props.data
  if (!cafe) return null

  return (
    <div className="flex gap-1">
      {cafe.phone && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Phone className="h-4 w-4" />
        </Button>
      )}
      {cafe.website && (
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
    doesFilterPass: (params: { data: CafeData }) => {
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
        <SelectItem value="cozy">Acogedor</SelectItem>
        <SelectItem value="modern">Moderno</SelectItem>
        <SelectItem value="rustic">Rústico</SelectItem>
        <SelectItem value="artisan">Artesanal</SelectItem>
        <SelectItem value="casual">Casual</SelectItem>
        <SelectItem value="elegant">Elegante</SelectItem>
      </SelectContent>
    </Select>
  )
})
AtmosphereFilter.displayName = 'AtmosphereFilter'

export default function AllCafesBakeriesPageClient({ locale }: AllCafesBakeriesPageClientProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [cafeData, setCafeData] = useState<CafeData[]>([])
  const [selectedRows, setSelectedRows] = useState<CafeData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load cafe data
  useEffect(() => {
    const cafes = CafeService.getAllCafes()
    const transformedData = transformCafeData(cafes, locale)
    setCafeData(transformedData)
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
  
  // Create premium theme matching cafe colors (amber/orange)
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#f59e0b', // Amber accent
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(245, 158, 11, 0.1)',
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
      headerTextColor: '#d97706', // Amber accent
      rowHoverColor: '#f3f4f6',
      selectedRowBackgroundColor: 'rgba(245, 158, 11, 0.08)',
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
      cellClass: 'font-semibold text-amber-600 dark:text-amber-400',
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
  
  const onCafeSelect = useCallback((cafe: Cafe) => {
    if (gridApi) {
      // Clear current selection
      gridApi.deselectAll()
      
      // Find and select the cafe in the grid
      gridApi.forEachNode((node) => {
        if (node.data?.id === cafe.id) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background - Matching main cafes page */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-yellow-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(251,146,60,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(245,158,11,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                📊 {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'} 📊
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Base de Datos' : 'Database'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Cafeterías' : 'Coffee & Bakeries'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Explora y filtra todos los cafés y panaderías con herramientas avanzadas de búsqueda y análisis'
              : 'Explore and filter all cafés and bakeries with advanced search and analysis tools'
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
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-xl opacity-50" />
                    <div className="relative bg-gradient-to-r from-amber-400 to-orange-400 p-3 rounded-2xl shadow-2xl">
                      <Coffee className="h-8 w-8 text-white" />
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
                  <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-amber-400/10 to-orange-400/10 text-white border-amber-400/30 backdrop-blur-sm">
                    <Activity className="h-4 w-4 mr-2 text-amber-400" />
                    <span className="font-bold">{cafeData.length}</span> {locale === 'es' ? 'Registros' : 'Records'}
                  </Badge>
                  {selectedRows.length > 0 && (
                    <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-xl">
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
                  <Card className="bg-gradient-to-br from-amber-400/10 to-orange-400/10 backdrop-blur-xl border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-amber-300 font-medium">{locale === 'es' ? 'Destacados' : 'Featured'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {cafeData.filter(c => c.featured).length}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-amber-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Star className="h-10 w-10 text-amber-400 relative" />
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
                  <Card className="bg-gradient-to-br from-orange-400/10 to-yellow-400/10 backdrop-blur-xl border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-300 font-medium">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-3xl font-bold text-white">
                              {(cafeData.reduce((sum, c) => sum + c.rating, 0) / cafeData.length || 0).toFixed(1)}
                            </p>
                            <span className="text-orange-400 text-xl">⭐</span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Coffee className="h-10 w-10 text-orange-400 relative" />
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
                  <Card className="bg-gradient-to-br from-yellow-400/10 to-amber-400/10 backdrop-blur-xl border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-300 font-medium">{locale === 'es' ? 'Total Reseñas' : 'Total Reviews'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {cafeData.reduce((sum, c) => sum + c.reviewCount, 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Activity className="h-10 w-10 text-yellow-400 relative" />
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
                  <Card className="bg-gradient-to-br from-orange-400/10 to-red-400/10 backdrop-blur-xl border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-2">
                          <p className="text-sm text-orange-300 font-medium">
                            {selectedRows.length > 0 ? (locale === 'es' ? 'Café Seleccionado' : 'Selected Café') : (locale === 'es' ? 'Tipos de Cafés' : 'Café Types')}
                          </p>
                          {selectedRows.length > 0 ? (
                            <p className="text-lg font-bold text-white leading-tight mt-1">
                              {CafeService.getCafeName(selectedRows[0], locale)}
                            </p>
                          ) : (
                            <p className="text-3xl font-bold text-white mt-1">
                              {new Set(cafeData.map(c => c.primaryType)).size}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          {selectedRows.length > 0 ? (
                            <Store className="h-10 w-10 text-orange-400 relative flex-shrink-0" />
                          ) : (
                            <MapPin className="h-10 w-10 text-orange-400 relative flex-shrink-0" />
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
                        className="w-full pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-amber-400/50 transition-colors"
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
                    className="h-12 gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 text-white border border-orange-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    <Filter className="h-4 w-4" />
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                  
                  <Button 
                    onClick={autosizeColumns} 
                    className="h-12 gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 hover:from-yellow-500/30 hover:to-amber-500/30 text-white border border-yellow-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
                  >
                    <Columns className="h-4 w-4" />
                    {locale === 'es' ? 'Ajustar Columnas' : 'Autosize Columns'}
                  </Button>
                </div>
              </div>
              
              {/* AG-Grid */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur opacity-25 animate-pulse" />
                <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
                <AgGridReact
                  theme={premiumTheme}
                  ref={gridRef}
                  rowData={cafeData}
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
                    noRowsToShow: locale === 'es' ? 'No hay cafés para mostrar' : 'No cafés to show'
                  }}
                />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cafe Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <CafeMap
            locale={locale}
            selectedCafes={selectedRows}
            onCafeSelect={onCafeSelect}
          />
        </motion.div>
      </div>
    </div>
  )
}