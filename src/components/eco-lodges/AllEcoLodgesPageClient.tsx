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
import { Download, Filter, Columns, Leaf, MapPin, Activity, Star, Home, Phone, Globe, Sun, Droplet, Recycle, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { EcoLodge, EcoLodgeService, ecoLodgeCategories, ecoLodgePriceRanges } from '@/lib/eco-lodges'

// TypeScript interfaces for AG-Grid components
interface EcoLodgeData extends EcoLodge {
  // Additional computed fields for the grid
  formattedPriceRange: string
  formattedRating: string
  formattedReviews: string
  shortDescription: string
  averagePrice: number
  sustainabilityScore: number
}

interface CategoryStyles {
  [key: string]: string
}

type CategoryRendererProps = ICellRendererParams<EcoLodgeData> & { locale: Locale }
type RatingRendererProps = ICellRendererParams<EcoLodgeData>
type PriceRendererProps = ICellRendererParams<EcoLodgeData> & { locale: Locale }
type SustainabilityRendererProps = ICellRendererParams<EcoLodgeData>
type RoomTypesRendererProps = ICellRendererParams<EcoLodgeData> & { locale: Locale }
type ActionsRendererProps = ICellRendererParams<EcoLodgeData>
type CategoryFilterProps = IFilterParams<EcoLodgeData>

interface CategoryFilterRef {
  doesFilterPass: (params: { data: EcoLodgeData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}

interface AllEcoLodgesPageClientProps {
  locale: Locale
}

// Transform eco-lodge data for grid
const transformEcoLodgeData = (lodges: EcoLodge[], locale: Locale): EcoLodgeData[] => {
  return lodges.map((lodge) => {
    const avgPrice = lodge.roomTypes && lodge.roomTypes.length > 0 
      ? lodge.roomTypes.reduce((acc, room) => acc + room.price, 0) / lodge.roomTypes.length
      : 0
    const sustainabilityScore = [
      lodge.solarPower,
      lodge.organicFood,
      lodge.waterConservation,
      lodge.localMaterials
    ].filter(Boolean).length
    
    return {
      ...lodge,
      formattedPriceRange: lodge.priceRange,
      formattedRating: `${lodge.rating} (${lodge.reviews})`,
      formattedReviews: lodge.reviews.toLocaleString(locale === 'es' ? 'es-MX' : 'en-US'),
      shortDescription: EcoLodgeService.getEcoLodgeDescription(lodge, locale).substring(0, 100) + '...',
      averagePrice: avgPrice,
      sustainabilityScore
    }
  })
}

// Custom Cell Renderers
const CategoryRenderer = (props: CategoryRendererProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'eco-resort': return '🌴'
      case 'treehouse': return '🌳'
      case 'glamping': return '⛺'
      case 'sustainable-hotel': return '🏨'
      case 'nature-retreat': return '🏔️'
      case 'organic-farm': return '🚜'
      default: return '🌿'
    }
  }

  const categoryStyles: CategoryStyles = {
    'eco-resort': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    'treehouse': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'glamping': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'sustainable-hotel': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    'nature-retreat': 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400',
    'organic-farm': 'bg-lime-100 text-lime-700 dark:bg-lime-900/20 dark:text-lime-400'
  }
  
  const categoryData = ecoLodgeCategories.find(cat => cat.id === props.data?.category)
  const categoryName = categoryData?.[props.locale as keyof typeof categoryData] || props.data?.category
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg drop-shadow-md">{getCategoryIcon(props.data?.category || '')}</span>
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
        categoryStyles[props.data?.category || ''] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
      }`}>
        {categoryName}
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

  const getPriceEmoji = (priceRange: string) => {
    switch (priceRange) {
      case '$': return '💚'
      case '$$': return '💛'
      case '$$$': return '🧡'
      case '$$$$': return '❤️'
      default: return '💰'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{getPriceEmoji(props.value)}</span>
      <span className={`font-bold text-lg ${getPriceColor(props.value)}`}>
        {props.value}
      </span>
      <div className="text-right text-xs text-gray-600 dark:text-gray-400">
        <div>${props.data?.averagePrice?.toLocaleString()}</div>
        <div>{props.locale === 'es' ? 'promedio' : 'avg'}</div>
      </div>
    </div>
  )
}

const RoomTypesRenderer = (props: RoomTypesRendererProps) => {
  const lodge = props.data
  if (!lodge || !lodge.roomTypes || lodge.roomTypes.length === 0) return null
  
  const minCapacity = Math.min(...lodge.roomTypes.map(room => room.capacity))
  const maxCapacity = Math.max(...lodge.roomTypes.map(room => room.capacity))
  
  const getCapacityEmoji = (capacity: number) => {
    if (capacity <= 2) return '👫'
    if (capacity <= 4) return '👨‍👩‍👧‍👦'
    if (capacity <= 6) return '👥'
    return '👥👥'
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{getCapacityEmoji(maxCapacity)}</span>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {minCapacity === maxCapacity ? minCapacity : `${minCapacity}-${maxCapacity}`}
        </span>
        <span className="text-xs text-gray-500">{props.locale === 'es' ? 'personas' : 'people'}</span>
      </div>
      <span className="text-gray-400">•</span>
      <span className="text-xs text-green-600 font-medium">
        {lodge.roomTypes.length} {props.locale === 'es' ? 'tipos' : 'types'}
      </span>
    </div>
  )
}

const SustainabilityRenderer = (props: SustainabilityRendererProps) => {
  const lodge = props.data
  if (!lodge) return null

  const sustainabilityFeatures = []
  if (lodge.solarPower) sustainabilityFeatures.push('☀️')
  if (lodge.organicFood) sustainabilityFeatures.push('🥬')
  if (lodge.waterConservation) sustainabilityFeatures.push('💧')
  if (lodge.localMaterials) sustainabilityFeatures.push('🏗️')

  const getScoreColor = (score: number) => {
    if (score >= 3) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 2) return 'text-green-600 dark:text-green-400'
    if (score >= 1) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 3) return '🌟'
    if (score >= 2) return '🌿'
    if (score >= 1) return '🌱'
    return '🌫️'
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{getScoreBadge(lodge.sustainabilityScore)}</span>
      <div className="flex gap-0.5">
        {sustainabilityFeatures.map((feature, idx) => (
          <span key={idx} className="text-sm">{feature}</span>
        ))}
      </div>
      <span className={`text-sm font-bold ${getScoreColor(lodge.sustainabilityScore)}`}>
        {lodge.sustainabilityScore}/4
      </span>
    </div>
  )
}

const ActionsRenderer = (props: ActionsRendererProps) => {
  const lodge = props.data
  if (!lodge) return null

  return (
    <div className="flex gap-1">
      {lodge.contact.phone && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Phone className="h-4 w-4" />
        </Button>
      )}
      {lodge.contact.website && (
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
const CategoryFilter = React.forwardRef<CategoryFilterRef, CategoryFilterProps>((props, ref) => {
  const [filterValue, setFilterValue] = useState('')
  
  React.useImperativeHandle(ref, () => ({
    doesFilterPass: (params: { data: EcoLodgeData }) => {
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
        <SelectItem value="">Todas</SelectItem>
        {ecoLodgeCategories.slice(1).map(category => (
          <SelectItem key={category.id} value={category.id}>
            {category.emoji} {category.es}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
})
CategoryFilter.displayName = 'CategoryFilter'

export default function AllEcoLodgesPageClient({ locale }: AllEcoLodgesPageClientProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [ecoLodgeData, setEcoLodgeData] = useState<EcoLodgeData[]>([])
  const [selectedRows, setSelectedRows] = useState<EcoLodgeData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load eco-lodge data
  useEffect(() => {
    const lodges = EcoLodgeService.getAllEcoLodges()
    const transformedData = transformEcoLodgeData(lodges, locale)
    setEcoLodgeData(transformedData)
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
  
  // Create premium theme matching eco-lodge colors (green/emerald)
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#10b981', // Green accent
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(16, 185, 129, 0.1)',
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
      headerTextColor: '#059669', // Green accent
      rowHoverColor: '#f3f4f6',
      selectedRowBackgroundColor: 'rgba(16, 185, 129, 0.08)',
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
      field: 'category',
      headerName: locale === 'es' ? 'Categoría' : 'Category',
      width: 180,
      cellRenderer: CategoryRenderer,
      cellRendererParams: { locale },
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
      width: 120,
      cellRenderer: PriceRenderer,
      cellRendererParams: { locale },
      filter: 'agTextColumnFilter'
    },
    {
      field: 'roomTypes',
      headerName: locale === 'es' ? 'Habitaciones' : 'Room Types',
      width: 160,
      cellRenderer: RoomTypesRenderer,
      cellRendererParams: { locale },
      sortable: false,
      filter: false
    },
    {
      field: 'location.neighborhood',
      headerName: locale === 'es' ? 'Ubicación' : 'Location',
      width: 130,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">📍</span>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{params.data?.location?.neighborhood}</span>
        </div>
      )
    },
    {
      field: 'sustainabilityScore',
      headerName: locale === 'es' ? 'Sustentabilidad' : 'Sustainability',
      width: 150,
      cellRenderer: SustainabilityRenderer,
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'contact.phone',
      headerName: locale === 'es' ? 'Teléfono' : 'Phone',
      width: 150,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">📞</span>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{params.data?.contact?.phone}</span>
        </div>
      )
    },
    {
      field: 'contact.email',
      headerName: 'Email',
      width: 200,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">📧</span>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{params.data?.contact?.email}</span>
        </div>
      )
    },
    {
      field: 'contact.website',
      headerName: 'Website',
      width: 150,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">🌐</span>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 truncate">{params.data?.contact?.website}</span>
        </div>
      )
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
      fileName: `eco_lodges_tepoztlan_${new Date().toISOString().split('T')[0]}.csv`
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
      {/* Ultra Premium Background - Matching eco-lodge theme */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-emerald-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-teal-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s" />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_transparent,_rgba(16,185,129,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(5,150,105,0.2))]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-green-400 to-emerald-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🌿 {locale === 'es' ? 'Directorio Sustentable' : 'Sustainable Directory'} 🌿
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Base de Datos' : 'Database'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Eco-Lodges' : 'Eco-Lodges'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Explora y filtra todos los eco-lodges sustentables con herramientas avanzadas de búsqueda y análisis'
              : 'Explore and filter all sustainable eco-lodges with advanced search and analysis tools'
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
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-xl opacity-50" />
                    <div className="relative bg-gradient-to-r from-green-400 to-emerald-400 p-3 rounded-2xl shadow-2xl">
                      <Leaf className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-white">
                      {locale === 'es' ? 'Análisis Sustentable' : 'Sustainability Analysis'}
                    </CardTitle>
                    <CardDescription className="text-white/70 mt-1">
                      {locale === 'es' 
                        ? 'Herramientas profesionales de búsqueda y filtrado ecológico'
                        : 'Professional ecological search and filtering tools'
                      }
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-green-400/10 to-emerald-400/10 text-white border-green-400/30 backdrop-blur-sm">
                    <Activity className="h-4 w-4 mr-2 text-green-400" />
                    <span className="font-bold">{ecoLodgeData.length}</span> {locale === 'es' ? 'Registros' : 'Records'}
                  </Badge>
                  {selectedRows.length > 0 && (
                    <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-xl">
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
                  <Card className="bg-gradient-to-br from-green-400/10 to-emerald-400/10 backdrop-blur-xl border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-300 font-medium">{locale === 'es' ? 'Destacados' : 'Featured'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {ecoLodgeData.filter(l => l.featured).length}
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
                  <Card className="bg-gradient-to-br from-emerald-400/10 to-teal-400/10 backdrop-blur-xl border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-emerald-300 font-medium">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-3xl font-bold text-white">
                              {(ecoLodgeData.reduce((sum, l) => sum + l.rating, 0) / ecoLodgeData.length || 0).toFixed(1)}
                            </p>
                            <span className="text-emerald-400 text-xl">★</span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Leaf className="h-10 w-10 text-emerald-400 relative" />
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
                  <Card className="bg-gradient-to-br from-teal-400/10 to-green-400/10 backdrop-blur-xl border-teal-400/20 hover:border-teal-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-teal-300 font-medium">{locale === 'es' ? 'Total Reseñas' : 'Total Reviews'}</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {ecoLodgeData.reduce((sum, l) => sum + l.reviews, 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-teal-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Activity className="h-10 w-10 text-teal-400 relative" />
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
                  <Card className="bg-gradient-to-br from-lime-400/10 to-green-400/10 backdrop-blur-xl border-lime-400/20 hover:border-lime-400/40 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-2">
                          <p className="text-sm text-lime-300 font-medium">
                            {selectedRows.length > 0 ? (locale === 'es' ? 'Eco-Lodge Seleccionado' : 'Selected Eco-Lodge') : (locale === 'es' ? 'Sustentabilidad Promedio' : 'Avg Sustainability')}
                          </p>
                          {selectedRows.length > 0 ? (
                            <p className="text-lg font-bold text-white leading-tight mt-1">
                              {EcoLodgeService.getEcoLodgeName(selectedRows[0], locale)}
                            </p>
                          ) : (
                            <div className="flex items-baseline gap-1 mt-1">
                              <p className="text-3xl font-bold text-white">
                                {(ecoLodgeData.reduce((sum, l) => sum + l.sustainabilityScore, 0) / ecoLodgeData.length || 0).toFixed(1)}
                              </p>
                              <span className="text-lime-400 text-lg">/4</span>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-lime-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <Recycle className="h-10 w-10 text-lime-400 relative" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Enhanced Controls Bar */}
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
                        className="w-full pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-emerald-400/50 transition-colors"
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
                    className="h-12 gap-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 text-white border border-emerald-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    <Download className="h-4 w-4" />
                    {locale === 'es' ? 'Exportar CSV' : 'Export CSV'}
                  </Button>
                  
                  <Button 
                    onClick={clearFilters} 
                    className="h-12 gap-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 text-white border border-green-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                  >
                    <Filter className="h-4 w-4" />
                    {locale === 'es' ? 'Limpiar Filtros' : 'Clear Filters'}
                  </Button>
                  
                  <Button 
                    onClick={autosizeColumns} 
                    className="h-12 gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 text-white border border-teal-400/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                  >
                    <Columns className="h-4 w-4" />
                    {locale === 'es' ? 'Ajustar Columnas' : 'Autosize Columns'}
                  </Button>
                </div>
              </div>

              {/* Premium AG-Grid */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur opacity-25 animate-pulse" />
                <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
                <AgGridReact
                  theme={premiumTheme}
                  ref={gridRef}
                  rowData={ecoLodgeData}
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
                    noRowsToShow: locale === 'es' ? 'No hay eco-lodges para mostrar' : 'No eco-lodges to show'
                  }}
                />
                </div>
              </div>

              {/* Footer Info */}
              <div className="text-center pt-6">
                <p className="text-white/60 text-sm leading-relaxed">
                  {locale === 'es'
                    ? '🌿 Datos actualizados en tiempo real • Filtra por categoría, precio y sustentabilidad • Exporta a CSV para análisis avanzado'
                    : '🌿 Real-time data updates • Filter by category, price, and sustainability • Export to CSV for advanced analysis'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}