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
import { Filter, Columns, Home, MapPin, Activity, Star, Bed, Phone, Globe, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { Locale } from '@/lib/i18n'
import { Rental, RentalServiceStatic } from '@/lib/rentals'
import VacationRentalMap from './VacationRentalMap'

// TypeScript interfaces for AG-Grid components
interface RentalData extends Rental {
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

type CategoryRendererProps = ICellRendererParams<RentalData>
type RatingRendererProps = ICellRendererParams<RentalData>
type PriceRendererProps = ICellRendererParams<RentalData>
type RoomInfoRendererProps = { data?: RentalData; value?: unknown }
type AmenitiesRendererProps = ICellRendererParams<RentalData>
type ActionsRendererProps = ICellRendererParams<RentalData>
type StatusFilterProps = IFilterParams<RentalData>

interface StatusFilterRef {
  doesFilterPass: (params: { data: RentalData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}

interface AllVacationRentalsPageClientProps {
  locale: Locale
}

// Transform rental data for grid
const transformRentalData = (rentals: Rental[], locale: Locale): RentalData[] => {
  return rentals.map((rental) => ({
    ...rental,
    formattedPriceRange: rental.priceRange,
    formattedRating: `${rental.rating} (${rental.reviews || 0})`,
    formattedReviews: (rental.reviews || 0).toLocaleString(locale === 'es' ? 'es-MX' : 'en-US'),
    shortDescription: RentalServiceStatic.getRentalDescription(rental, locale).substring(0, 100) + '...',
    primaryCategory: RentalServiceStatic.getRentalCategory(rental, locale)
  }))
}

// Custom Cell Renderers
const CategoryRenderer = (props: CategoryRendererProps) => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Casa') || category.includes('House')) return '🏠'
    if (category.includes('Departamento') || category.includes('Apartment')) return '🏢'
    if (category.includes('Villa')) return '🏛️'
    if (category.includes('Cabaña') || category.includes('Cabin')) return '🏕️'
    if (category.includes('Studio')) return '🛏️'
    return '🏘️'
  }

  const categoryStyles: CategoryStyles = {
    'Casa': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'House': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Departamento': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Apartment': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Villa': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    'Cabaña': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Cabin': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'Studio': 'bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
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
  const reviews = props.data?.reviews?.length || 0
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
  const priceRange = props.data?.priceRange || '$'
  const priceSymbols = {
    '$': '$',
    '$$': '$$',
    '$$$': '$$$',
    '$$$$': '$$$$'
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
        {priceSymbols[priceRange as keyof typeof priceSymbols]}
      </span>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        ${props.data?.roomInfo?.pricePerNight || 0}/noche
      </div>
    </div>
  )
}

const RoomInfoRenderer = (props: RoomInfoRendererProps) => {
  const roomInfo = props.data?.roomInfo
  if (!roomInfo) return null
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Bed className="w-4 h-4 text-blue-500 dark:text-blue-400" />
        <span className="text-sm font-medium">{roomInfo.bedrooms}</span>
      </div>
      <div className="flex items-center gap-1">
        <Home className="w-4 h-4 text-green-500 dark:text-green-400" />
        <span className="text-sm font-medium">{roomInfo.bathrooms}</span>
      </div>
      <div className="flex items-center gap-1">
        <Users className="w-4 h-4 text-purple-500 dark:text-purple-400" />
        <span className="text-sm font-medium">{roomInfo.maxGuests}</span>
      </div>
    </div>
  )
}

const AmenitiesRenderer = (props: AmenitiesRendererProps) => {
  const rental = props.data
  if (!rental) return null
  const amenities = []
  
  if (rental.hasWifi) amenities.push('📶')
  if (rental.parking || rental.hasParking) amenities.push('🚗')
  if (rental.hasKitchen) amenities.push('👨‍🍳')
  if (rental.instantBook) amenities.push('⚡')
  
  return (
    <div className="flex items-center gap-1">
      {amenities.map((emoji, index) => (
        <span key={index} className="text-sm">{emoji}</span>
      ))}
    </div>
  )
}

const ActionsRenderer = (props: ActionsRendererProps) => {
  const rental = props.data
  if (!rental) return null
  
  return (
    <div className="flex items-center gap-1">
      {rental.contact?.phone && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
          <Phone className="h-4 w-4" />
        </Button>
      )}
      {rental.contact?.website && (
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
          <Globe className="h-4 w-4" />
        </Button>
      )}
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
        <MapPin className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Custom Filter
const CategoryFilter = React.forwardRef<StatusFilterRef, StatusFilterProps>((props, ref) => {
  const [filterValue, setFilterValue] = useState('')
  
  React.useImperativeHandle(ref, () => ({
    doesFilterPass: (params: { data: RentalData }) => {
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
        <SelectItem value="house">Casa</SelectItem>
        <SelectItem value="apartment">Departamento</SelectItem>
        <SelectItem value="villa">Villa</SelectItem>
        <SelectItem value="cabin">Cabaña</SelectItem>
        <SelectItem value="studio">Studio</SelectItem>
      </SelectContent>
    </Select>
  )
})
CategoryFilter.displayName = 'CategoryFilter'

export default function AllVacationRentalsPageClient({ locale }: AllVacationRentalsPageClientProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [rentalData, setRentalData] = useState<RentalData[]>([])
  const [selectedRows, setSelectedRows] = useState<RentalData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load rental data
  useEffect(() => {
    const rentals = RentalServiceStatic.getAllRentals()
    const transformedData = transformRentalData(rentals, locale)
    setRentalData(transformedData)
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
  
  // Create premium theme with emerald/green colors for vacation rentals
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#10b981', // Emerald accent
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(16, 185, 129, 0.1)',
      wrapperBorderRadius: 12,
      headerHeight: 45,
      rowHeight: 80,
      fontSize: 13,
      headerFontSize: 14
    }) : themeQuartz.withParams({
      backgroundColor: '#ffffff',
      foregroundColor: '#1f2937',
      borderColor: '#e5e7eb',
      chromeBackgroundColor: '#f9fafb',
      oddRowBackgroundColor: '#f3f4f6',
      headerBackgroundColor: '#f8fafc',
      headerTextColor: '#10b981', // Emerald accent
      rowHoverColor: '#f1f5f9',
      selectedRowBackgroundColor: 'rgba(16, 185, 129, 0.05)',
      wrapperBorderRadius: 12,
      headerHeight: 45,
      rowHeight: 80,
      fontSize: 13,
      headerFontSize: 14
    })
  }, [isDarkMode])

  // Column definitions with premium styling
  const columnDefs = useMemo<ColDef<RentalData>[]>(() => [
    {
      headerName: locale === 'es' ? 'Nombre de la Propiedad' : 'Property Name',
      field: 'name',
      flex: 2,
      minWidth: 200,
      valueGetter: (params) => RentalServiceStatic.getRentalName(params.data!, locale),
      cellClass: 'font-semibold text-gray-900 dark:text-gray-100',
      pinned: 'left'
    },
    {
      headerName: locale === 'es' ? 'Categoría' : 'Category',
      field: 'primaryCategory',
      flex: 1.2,
      minWidth: 140,
      cellRenderer: CategoryRenderer,
      filter: CategoryFilter,
      floatingFilter: true
    },
    {
      headerName: locale === 'es' ? 'Habitaciones' : 'Room Info',
      field: 'roomInfo',
      flex: 1.3,
      minWidth: 150,
      cellRenderer: RoomInfoRenderer,
      sortable: false
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
      headerName: locale === 'es' ? 'Calificación' : 'Rating',
      field: 'rating',
      flex: 1.3,
      minWidth: 140,
      cellRenderer: RatingRenderer,
      sort: 'desc'
    },
    {
      headerName: locale === 'es' ? 'Ubicación' : 'Location',
      field: 'address',
      flex: 1.2,
      minWidth: 130,
      valueGetter: (params) => RentalServiceStatic.getRentalAddress(params.data!, locale),
      cellClass: 'text-emerald-600 dark:text-emerald-400 font-medium'
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
    const selectedData = selectedNodes.map(node => node.data).filter(Boolean) as RentalData[]
    setSelectedRows(selectedData)
  }, [])

  const handleQuickFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuickFilter(e.target.value)
  }, [])


  const clearFilters = useCallback(() => {
    if (!gridApi) return
    gridApi.setFilterModel(null)
    setQuickFilter('')
  }, [gridApi])

  // Statistics calculations
  const stats = useMemo(() => {
    const totalRentals = rentalData.length
    const averageRating = rentalData.reduce((sum, rental) => sum + rental.rating, 0) / totalRentals || 0
    const totalReviews = rentalData.reduce((sum, rental) => sum + (rental.reviews?.length || 0), 0)
    const featuredCount = rentalData.filter(rental => rental.featured).length

    return {
      totalRentals,
      averageRating,
      totalReviews,
      featuredCount
    }
  }, [rentalData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 blur-lg" />
              <Badge className="relative bg-gradient-to-r from-emerald-400 to-green-400 text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase border-0 shadow-2xl">
                🏡 {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'} 🏡
              </Badge>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-green-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans">
            <span className="text-white drop-shadow-2xl">
              {locale === 'es' ? 'Base de Datos' : 'Database'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
              {locale === 'es' ? 'Inmobiliaria' : 'Real Estate'}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
            {locale === 'es' 
              ? 'Explora y filtra todas las propiedades con herramientas avanzadas de búsqueda y análisis'
              : 'Explore and filter all properties with advanced search and analysis tools'
            }
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { 
                label: locale === 'es' ? 'Total Propiedades' : 'Total Properties', 
                value: stats.totalRentals, 
                icon: Home,
                color: 'from-emerald-400 to-emerald-600'
              },
              { 
                label: locale === 'es' ? 'Calificación Promedio' : 'Average Rating', 
                value: stats.averageRating.toFixed(1), 
                icon: Star,
                color: 'from-green-400 to-green-600'
              },
              { 
                label: locale === 'es' ? 'Total Reseñas' : 'Total Reviews', 
                value: stats.totalReviews.toLocaleString(), 
                icon: Activity,
                color: 'from-teal-400 to-teal-600'
              },
              { 
                label: locale === 'es' ? 'Propiedades Destacadas' : 'Featured Properties', 
                value: stats.featuredCount, 
                icon: MapPin,
                color: 'from-lime-400 to-lime-600'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group">
                  <CardContent className="p-6">
                    {index === 3 ? (
                      // Special handling for the last card (Featured Properties) to show selection
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-2">
                          <p className="text-sm text-lime-300 font-medium">
                            {selectedRows.length > 0 ? (locale === 'es' ? 'Propiedad Seleccionada' : 'Selected Property') : (locale === 'es' ? 'Propiedades Destacadas' : 'Featured Properties')}
                          </p>
                          {selectedRows.length > 0 ? (
                            <p className="text-lg font-bold text-white leading-tight mt-1">
                              {RentalServiceStatic.getRentalName(selectedRows[0], locale)}
                            </p>
                          ) : (
                            <p className="text-3xl font-bold text-white mt-1">
                              {stats.featuredCount}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-lime-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          {selectedRows.length > 0 ? (
                            <Home className="h-10 w-10 text-lime-400 relative flex-shrink-0" />
                          ) : (
                            <MapPin className="h-10 w-10 text-lime-400 relative flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ) : (
                      // Standard display for other cards
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white/70">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Controls Section */}
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
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 blur-xl opacity-50" />
                      <div className="relative bg-gradient-to-r from-emerald-400 to-green-400 p-3 rounded-2xl shadow-2xl">
                        <Home className="h-8 w-8 text-white" />
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
                    <Badge variant="outline" className="text-lg px-6 py-3 bg-gradient-to-r from-emerald-400/10 to-green-400/10 text-white border-emerald-400/30 backdrop-blur-sm">
                      <Activity className="h-4 w-4 mr-2 text-emerald-400" />
                      <span className="font-bold">{rentalData.length}</span> {locale === 'es' ? 'Registros' : 'Records'}
                    </Badge>
                    {selectedRows.length > 0 && (
                      <Badge className="text-lg px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-400 text-white shadow-xl">
                        <span className="font-bold">{selectedRows.length}</span> {locale === 'es' ? 'Seleccionados' : 'Selected'}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
          </Card>
        </motion.div>

        {/* Enhanced Controls Bar */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Quick Filter */}
            <div className="flex-1 min-w-[280px] sm:min-w-[300px]">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={locale === 'es' ? 'Búsqueda rápida en todos los campos...' : 'Quick search across all fields...'}
                  value={quickFilter}
                  onChange={handleQuickFilterChange}
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
                <SelectItem value="25" className="text-white hover:bg-slate-700">25 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                <SelectItem value="50" className="text-white hover:bg-slate-700">50 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
                <SelectItem value="100" className="text-white hover:bg-slate-700">100 {locale === 'es' ? 'filas' : 'rows'}</SelectItem>
              </SelectContent>
            </Select>

            {/* Action Buttons */}
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

        {/* Premium Data Grid with Border Animation */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur opacity-25 animate-pulse" />
          <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
            <AgGridReact<RentalData>
              ref={gridRef}
              rowData={rentalData}
              columnDefs={columnDefs}
              theme={premiumTheme}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              quickFilterText={quickFilter}
              pagination={true}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={[10, 25, 50, 100]}
              rowSelection="multiple"
              suppressRowClickSelection={false}
              animateRows={true}
              enableCellTextSelection={true}
              suppressMovableColumns={false}
              suppressFieldDotNotation={false}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                floatingFilter: false,
                flex: 1,
                minWidth: 100
              }}
              className="ag-theme-premium"
            />
          </div>
        </div>

        {/* Vacation Rental Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <VacationRentalMap
            locale={locale}
            selectedRentals={selectedRows}
            onRentalSelect={(rental) => {
              // Find the rental in the grid and select it
              if (gridApi) {
                gridApi.forEachNode((node) => {
                  if (node.data && node.data.id === rental.id) {
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