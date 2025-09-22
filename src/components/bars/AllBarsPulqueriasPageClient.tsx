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
import { Filter, Columns, Store, MapPin, Activity, Star, Wine, Phone, Globe } from 'lucide-react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { Bar, BarService } from '@/lib/bars'
import BarMap from './BarMap'

// TypeScript interfaces for AG-Grid components
interface BarData extends Bar {
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

type TypeRendererProps = ICellRendererParams<BarData>
type RatingRendererProps = ICellRendererParams<BarData>
type PriceRendererProps = ICellRendererParams<BarData>
type AtmosphereRendererProps = ICellRendererParams<BarData>
type AmenitiesRendererProps = ICellRendererParams<BarData>
type ActionsRendererProps = ICellRendererParams<BarData>
type StatusFilterProps = IFilterParams<BarData>

interface StatusFilterRef {
  doesFilterPass: (params: { data: BarData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}

interface AllBarsPulqueriasPageClientProps {
  locale: Locale
}

// Transform bar data for grid
const transformBarData = (bars: Bar[], locale: Locale): BarData[] => {
  return bars.map((bar) => ({
    ...bar,
    formattedPriceRange: bar.priceRange,
    formattedRating: `${bar.rating} (${bar.reviewCount})`,
    formattedReviews: bar.reviewCount.toLocaleString(locale === 'es' ? 'es-MX' : 'en-US'),
    shortDescription: BarService.getBarDescription(bar, locale).substring(0, 100) + '...',
    primaryType: BarService.getBarType(bar, locale)
  }))
}

// Custom Cell Renderers
const TypeRenderer = (props: TypeRendererProps) => {
  const getTypeIcon = (type: string) => {
    if (type.includes('Bar')) return '🍻'
    if (type.includes('Pulquería')) return '🌵'
    if (type.includes('Cantina')) return '🎭'
    if (type.includes('Mezcalería')) return '🥃'
    if (type.includes('Cocktail')) return '🍸'
    if (type.includes('Sports')) return '⚽'
    return '🍺'
  }

  const typeStyles: TypeStyles = {
    'Bar': 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400',
    'Pulquería': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    'Cantina': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    'Mezcalería': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Cocktail Bar': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400',
    'Sports Bar': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
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
  const reviews = props.data?.reviewCount || 0
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
        ({reviews})
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
      case 'upscale': return '🍾'
      case 'casual': return '😊'
      case 'traditional': return '🏛️'
      case 'modern': return '🏢'
      case 'rustic': return '🪵'
      case 'lively': return '🎉'
      default: return '🍷'
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
  const bar = props.data
  if (!bar) return null

  const amenities = []
  if (bar.wifi) amenities.push('📶')
  if (bar.parking) amenities.push('🚗')
  if (bar.liveMusic) amenities.push('🎵')
  if (bar.outdoorSeating) amenities.push('🌞')
  if (bar.danceFloor) amenities.push('💃')
  if (bar.smokingArea) amenities.push('🚬')

  return (
    <div className="flex gap-1 flex-wrap">
      {amenities.map((amenity, idx) => (
        <span key={idx} className="text-lg">{amenity}</span>
      ))}
    </div>
  )
}

const ActionsRenderer = (props: ActionsRendererProps) => {
  const bar = props.data
  if (!bar) return null

  return (
    <div className="flex gap-1">
      {bar.phone && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Phone className="h-4 w-4" />
        </Button>
      )}
      {bar.website && (
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
    doesFilterPass: (params: { data: BarData }) => {
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
        <SelectItem value="upscale">Upscale</SelectItem>
        <SelectItem value="casual">Casual</SelectItem>
        <SelectItem value="traditional">Traditional</SelectItem>
        <SelectItem value="modern">Modern</SelectItem>
        <SelectItem value="rustic">Rustic</SelectItem>
        <SelectItem value="lively">Lively</SelectItem>
      </SelectContent>
    </Select>
  )
})
AtmosphereFilter.displayName = 'AtmosphereFilter'

export default function AllBarsPulqueriasPageClient({ locale }: AllBarsPulqueriasPageClientProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [barData, setBarData] = useState<BarData[]>([])
  const [selectedRows, setSelectedRows] = useState<BarData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load bar data
  useEffect(() => {
    const bars = BarService.getAllBars()
    const transformedData = transformBarData(bars, locale)
    setBarData(transformedData)
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
  
  // Create premium theme with purple/magenta colors for bars
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#14b8a6', // Teal accent
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(192, 132, 252, 0.1)',
      wrapperBorderRadius: 12,
      headerHeight: 40,
      rowHeight: 60,
      fontSize: 12,
      headerFontSize: 13
    }) : themeQuartz.withParams({
      backgroundColor: '#ffffff',
      foregroundColor: '#1f2937',
      borderColor: '#e5e7eb',
      chromeBackgroundColor: '#f9fafb',
      oddRowBackgroundColor: '#f3f4f6',
      headerBackgroundColor: '#f8fafc',
      headerTextColor: '#14b8a6', // Teal accent
      rowHoverColor: '#f1f5f9',
      selectedRowBackgroundColor: 'rgba(192, 132, 252, 0.05)',
      wrapperBorderRadius: 12,
      headerHeight: 40,
      rowHeight: 60,
      fontSize: 12,
      headerFontSize: 13
    })
  }, [isDarkMode])

  // Column definitions with premium styling
  const columnDefs = useMemo<ColDef<BarData>[]>(() => [
    {
      headerName: locale === 'es' ? 'Nombre del Local' : 'Bar Name',
      field: 'name',
      flex: 2,
      minWidth: 200,
      valueGetter: (params) => BarService.getBarName(params.data!, locale),
      cellClass: 'font-semibold text-gray-900 dark:text-gray-100',
      pinned: 'left'
    },
    {
      headerName: locale === 'es' ? 'Tipo' : 'Type',
      field: 'primaryType',
      flex: 1.2,
      minWidth: 140,
      cellRenderer: TypeRenderer,
      filter: AtmosphereFilter,
      floatingFilter: true
    },
    {
      headerName: locale === 'es' ? 'Calificación' : 'Rating',
      field: 'rating',
      flex: 1.3,
      minWidth: 140,
      cellRenderer: RatingRenderer,
      sort: 'desc'
    },
    {
      headerName: locale === 'es' ? 'Precio' : 'Price',
      field: 'priceRange',
      flex: 1.2,
      minWidth: 120,
      cellRenderer: PriceRenderer,
      sort: 'desc'
    },
    {
      headerName: locale === 'es' ? 'Ambiente' : 'Atmosphere',
      field: 'atmosphere',
      flex: 1.3,
      minWidth: 130,
      cellRenderer: AtmosphereRenderer
    },
    {
      headerName: locale === 'es' ? 'Ubicación' : 'Location',
      field: 'address',
      flex: 1.2,
      minWidth: 130,
      valueGetter: (params) => BarService.getBarAddress(params.data!, locale),
      cellClass: 'text-teal-600 dark:text-teal-400 font-medium'
    },
    {
      headerName: locale === 'es' ? 'Amenidades' : 'Amenities',
      field: 'amenities',
      flex: 1,
      minWidth: 100,
      cellRenderer: AmenitiesRenderer,
      sortable: false
    },
    {
      headerName: locale === 'es' ? 'Descripción' : 'Description',
      field: 'shortDescription',
      flex: 2,
      minWidth: 200,
      cellClass: 'text-sm text-gray-600 dark:text-gray-300',
      wrapText: false,
      autoHeight: false,
      cellStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    {
      headerName: locale === 'es' ? 'Acciones' : 'Actions',
      field: 'id',
      flex: 1,
      minWidth: 120,
      cellRenderer: ActionsRenderer,
      sortable: false,
      filter: false,
      pinned: 'right'
    }
  ], [locale])
  
  // Autosize columns
  const autosizeColumns = useCallback(() => {
    const allColumnIds: string[] = []
    gridApi?.getColumns()?.forEach((column) => {
      allColumnIds.push(column.getId())
    })
    gridApi?.autoSizeColumns(allColumnIds)
  }, [gridApi])

  // Grid event handlers
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api)
    params.api.sizeColumnsToFit()
    // Auto-size columns after data loads
    setTimeout(() => {
      autosizeColumns()
    }, 100)
  }, [autosizeColumns])

  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const selectedNodes = event.api.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data).filter(Boolean) as BarData[]
    setSelectedRows(selectedData)
  }, [])
  
  const onBarSelect = useCallback((bar: Bar) => {
    if (gridApi) {
      // Clear current selection
      gridApi.deselectAll()
      
      // Find and select the bar in the grid
      gridApi.forEachNode((node) => {
        if (node.data?.id === bar.id) {
          node.setSelected(true, false)
          
          // Scroll to the selected row
          gridApi.ensureNodeVisible(node, 'middle')
        }
      })
    }
  }, [gridApi])


  const clearFilters = useCallback(() => {
    if (!gridApi) return
    gridApi.setFilterModel(null)
    setQuickFilter('')
  }, [gridApi])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-300/70 via-blue-400/50 to-indigo-400/40 dark:bg-gradient-to-b dark:from-slate-950 dark:via-teal-800 dark:to-slate-900 relative overflow-hidden">
      {/* Ultra Premium Background - Matching social/cultural theme */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-emerald-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(192,132,252,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(217,70,239,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(192, 132, 252, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(192, 132, 252, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-teal-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                📊 {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'} 📊
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-magenta-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Base de Datos' : 'Database'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Bebidas Tradicionales' : 'Traditional Beverages'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Descubre cantinas históricas, pulquerías tradicionales y mezcalerías artesanales con herramientas avanzadas de búsqueda'
              : 'Discover historic cantinas, traditional pulquerías and artisanal mezcal bars with advanced search tools'
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
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 blur-xl opacity-50" />
                    <div className="relative bg-gradient-to-r from-teal-400 to-cyan-400 p-3 rounded-2xl shadow-2xl">
                      <Wine className="h-8 w-8 text-white" />
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
                  <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 text-white border-teal-400/30 backdrop-blur-sm">
                    <Activity className="h-4 w-4 mr-2 text-teal-400" />
                    <span className="font-bold">{barData.length}</span> {locale === 'es' ? 'Registros' : 'Records'}
                  </Badge>
                  {selectedRows.length > 0 && (
                    <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-white shadow-xl">
                      <span className="font-bold">{selectedRows.length}</span> {locale === 'es' ? 'Seleccionados' : 'Selected'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* Quick Stats Cards */}
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <motion.div whileHover={{ scale: 1.05 }} className="group cursor-pointer">
                  <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-400/20 hover:border-teal-400/40 transition-all duration-300 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-white/70 mb-1">{locale === 'es' ? 'Total Bares' : 'Total Bars'}</p>
                          <p className="text-3xl font-bold text-white">{barData.length}</p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-teal-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          {selectedRows.length > 0 ? (
                            <Store className="h-10 w-10 text-teal-400 relative flex-shrink-0" />
                          ) : (
                            <MapPin className="h-10 w-10 text-teal-400 relative flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="group cursor-pointer">
                  <Card className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-white/70 mb-1">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</p>
                          <p className="text-3xl font-bold text-white">
                            {barData.length > 0 ? (barData.reduce((sum, bar) => sum + bar.rating, 0) / barData.length).toFixed(1) : '0.0'}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Star className="h-10 w-10 text-cyan-400 relative flex-shrink-0" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="group cursor-pointer">
                  <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-white/70 mb-1">{locale === 'es' ? 'Total Reseñas' : 'Total Reviews'}</p>
                          <p className="text-3xl font-bold text-white">
                            {barData.reduce((sum, bar) => sum + bar.reviewCount, 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Activity className="h-10 w-10 text-pink-400 relative flex-shrink-0" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="group cursor-pointer">
                  <Card className="bg-gradient-to-br from-violet-500/10 to-magenta-500/10 border-violet-400/20 hover:border-violet-400/40 transition-all duration-300 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-white/70 mb-1">{locale === 'es' ? 'Lugares Tradicionales' : 'Traditional Venues'}</p>
                          <p className="text-3xl font-bold text-white">
                            {barData.filter(bar => bar.atmosphere === 'traditional' || bar.type === 'pulqueria' || bar.type === 'cantina').length}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Wine className="h-10 w-10 text-emerald-400 relative flex-shrink-0" />
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
                        className="w-full pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-teal-400/50 transition-colors"
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
                    variant="outline"
                    className="h-12 gap-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  >
                    <Filter className="h-4 w-4" />
                    {locale === 'es' ? 'Limpiar' : 'Clear'}
                  </Button>

                  <Button 
                    onClick={autosizeColumns}
                    variant="outline"
                    className="h-12 gap-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  >
                    <Columns className="h-4 w-4" />
                    {locale === 'es' ? 'Ajustar' : 'Autofit'}
                  </Button>
                </div>
              </div>

              {/* Selected Items Display */}
              {selectedRows.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-teal-400/30 p-4 mb-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Store className="h-5 w-5 text-teal-400" />
                      {locale === 'es' ? 'Lugares Seleccionados' : 'Selected Places'}
                      <Badge className="bg-teal-400/20 text-teal-300 px-2 py-1 text-sm">
                        {selectedRows.length}
                      </Badge>
                    </h3>
                    <Button 
                      onClick={() => {
                        if (gridRef.current?.api) {
                          gridRef.current.api.deselectAll()
                        }
                      }}
                      size="sm"
                      variant="outline"
                      className="text-xs bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-teal-400/50"
                    >
                      {locale === 'es' ? 'Limpiar' : 'Clear'}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRows.map((bar, index) => (
                      <Badge 
                        key={bar.id || index}
                        className="bg-gradient-to-r from-teal-400/20 to-cyan-400/20 text-white border border-teal-400/30 px-3 py-1.5 text-sm font-medium hover:bg-teal-400/30 transition-colors cursor-pointer"
                        onClick={() => {
                          // Remove this specific item from selection
                          if (gridRef.current?.api) {
                            const rowNode = gridRef.current.api.getRowNode(bar.id?.toString() || index.toString())
                            if (rowNode) {
                              rowNode.setSelected(false)
                            }
                          }
                        }}
                      >
                        <span className="mr-2">{BarService.getBarName(bar, locale)}</span>
                        <span className="text-teal-300 hover:text-white transition-colors">×</span>
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Premium Data Grid */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="h-[600px] w-full">
                <AgGridReact<BarData>
                  ref={gridRef}
                  rowData={barData}
                  columnDefs={columnDefs}
                  theme={premiumTheme}
                  onGridReady={onGridReady}
                  onSelectionChanged={onSelectionChanged}
                  quickFilterText={quickFilter}
                  pagination={true}
                  paginationPageSize={paginationPageSize}
                  rowSelection="multiple"
                  suppressRowClickSelection={false}
                  animateRows={true}
                  enableCellTextSelection={true}
                  defaultColDef={{
                    sortable: true,
                    filter: true,
                    resizable: true,
                    flex: 1
                  }}
                  localeText={{
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
                    noRowsToShow: locale === 'es' ? 'No hay bares para mostrar' : 'No bars to show'
                  }}
                />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <BarMap
            locale={locale}
            selectedBars={selectedRows}
            onBarSelect={onBarSelect}
          />
        </motion.div>

      </div>
    </div>
  )
}