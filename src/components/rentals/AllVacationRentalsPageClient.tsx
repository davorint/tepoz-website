'use client'

import React, { useMemo, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, GridReadyEvent, GridApi, ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { Locale } from '@/lib/i18n'
import { Rental, RentalService, rentalCategories, priceRanges } from '@/lib/rentals'
import { Search, Download, Filter, MapPin, Star, Users, Home, Bed, Bath, Wifi, Car, ChefHat, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([AllCommunityModule])

interface AllVacationRentalsPageClientProps {
  locale: Locale
}

const RentalTypeCellRenderer = (props: { data: Rental; locale: string }) => {
  const rental: Rental = props.data
  const category = rentalCategories.find(cat => cat.id === rental.category)
  return (
    <div className="flex items-center space-x-2">
      <span className="text-lg">{category?.emoji}</span>
      <span className="font-medium text-emerald-800">{category?.[props.locale as keyof typeof category] || rental.category}</span>
    </div>
  )
}

const RatingCellRenderer = (props: { data: Rental }) => {
  const rental: Rental = props.data
  return (
    <div className="flex items-center space-x-1">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="font-semibold text-yellow-700">{rental.rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">({rental.reviews})</span>
    </div>
  )
}

const PriceCellRenderer = (props: { data: Rental; locale: string }) => {
  const rental: Rental = props.data
  const priceRange = priceRanges.find(range => range.id === rental.priceRange)
  return (
    <div className="flex items-center space-x-2">
      <span className="font-bold text-emerald-700 text-lg">{priceRange?.symbol}</span>
      <div className="text-right">
        <div className="font-semibold text-emerald-800">${rental.roomInfo.pricePerNight.toLocaleString()}</div>
        <div className="text-xs text-gray-500">{props.locale === 'es' ? 'por noche' : 'per night'}</div>
      </div>
    </div>
  )
}

const RoomInfoCellRenderer = (props: { data: Rental }) => {
  const rental: Rental = props.data
  return (
    <div className="flex items-center space-x-3 text-sm">
      <div className="flex items-center space-x-1">
        <Bed className="w-4 h-4 text-emerald-600" />
        <span>{rental.roomInfo.bedrooms}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Bath className="w-4 h-4 text-emerald-600" />
        <span>{rental.roomInfo.bathrooms}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Users className="w-4 h-4 text-emerald-600" />
        <span>{rental.roomInfo.maxGuests}</span>
      </div>
    </div>
  )
}

const AmenitiesCellRenderer = (props: { data: Rental }) => {
  const rental: Rental = props.data
  return (
    <div className="flex items-center space-x-1">
      {rental.hasWifi && <Wifi className="w-4 h-4 text-emerald-600" />}
      {rental.hasParking && <Car className="w-4 h-4 text-emerald-600" />}
      {rental.hasKitchen && <ChefHat className="w-4 h-4 text-emerald-600" />}
      {rental.instantBook && <Calendar className="w-4 h-4 text-emerald-600" />}
    </div>
  )
}

const LocationCellRenderer = (props: { data: Rental }) => {
  const rental: Rental = props.data
  return (
    <div className="flex items-center space-x-1">
      <MapPin className="w-4 h-4 text-emerald-600" />
      <span className="text-sm font-medium text-emerald-800">{rental.location.neighborhood}</span>
    </div>
  )
}

export default function AllVacationRentalsPageClient({ locale }: AllVacationRentalsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)

  const rentals = useMemo(() => RentalService.getAllRentals(), [])

  const filteredRentals = useMemo(() => {
    return RentalService.searchRentals(searchTerm, selectedCategory, selectedPriceRange)
  }, [searchTerm, selectedCategory, selectedPriceRange])

  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: locale === 'es' ? 'Nombre' : 'Name',
      field: 'name',
      flex: 2,
      minWidth: 250,
      valueGetter: (params) => params.data.name[locale],
      cellClass: 'font-semibold text-emerald-900'
    },
    {
      headerName: locale === 'es' ? 'Tipo' : 'Type',
      field: 'category',
      flex: 1.2,
      minWidth: 130,
      cellRenderer: RentalTypeCellRenderer,
      cellRendererParams: { locale }
    },
    {
      headerName: locale === 'es' ? 'Habitaciones' : 'Room Info',
      field: 'roomInfo',
      flex: 1.2,
      minWidth: 140,
      cellRenderer: RoomInfoCellRenderer,
      sortable: false
    },
    {
      headerName: locale === 'es' ? 'Precio' : 'Price',
      field: 'pricePerNight',
      flex: 1.2,
      minWidth: 130,
      valueGetter: (params) => params.data.roomInfo.pricePerNight,
      cellRenderer: PriceCellRenderer,
      cellRendererParams: { locale }
    },
    {
      headerName: locale === 'es' ? 'Calificación' : 'Rating',
      field: 'rating',
      flex: 1.2,
      minWidth: 120,
      cellRenderer: RatingCellRenderer
    },
    {
      headerName: locale === 'es' ? 'Ubicación' : 'Location',
      field: 'location.neighborhood',
      flex: 1,
      minWidth: 120,
      cellRenderer: LocationCellRenderer
    },
    {
      headerName: locale === 'es' ? 'Amenidades' : 'Amenities',
      field: 'amenities',
      flex: 1.2,
      minWidth: 140,
      cellRenderer: AmenitiesCellRenderer,
      sortable: false
    },
    {
      headerName: locale === 'es' ? 'Contacto' : 'Contact',
      field: 'contact.phone',
      flex: 1.2,
      minWidth: 140,
      cellClass: 'text-emerald-700 font-medium'
    }
  ], [locale])

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api)
  }, [])

  const exportData = useCallback(() => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `vacation-rentals-tepoztlan-${new Date().toISOString().split('T')[0]}.csv`
      })
    }
  }, [gridApi])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">
              {locale === 'es' ? 'Directorio Completo' : 'Complete Directory'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">
            {locale === 'es' 
              ? 'Todas las Rentas Vacacionales'
              : 'All Vacation Rentals'
            }
          </h1>
          
          <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {locale === 'es'
              ? 'Directorio completo de todas las rentas vacacionales en Tepoztlán con información detallada y capacidades de búsqueda avanzada'
              : 'Complete directory of all vacation rentals in Tepoztlán with detailed information and advanced search capabilities'
            }
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 text-emerald-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{rentals.length}</div>
              <div className="text-sm">{locale === 'es' ? 'Propiedades' : 'Properties'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{rentalCategories.length - 1}</div>
              <div className="text-sm">{locale === 'es' ? 'Categorías' : 'Categories'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {Math.round(rentals.reduce((acc, rental) => acc + rental.rating, 0) / rentals.length * 10) / 10}
              </div>
              <div className="text-sm">{locale === 'es' ? 'Calificación Promedio' : 'Average Rating'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Controls */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type="text"
                  placeholder={locale === 'es' ? 'Buscar por nombre, ubicación...' : 'Search by name, location...'}
                  className="block w-full pl-10 pr-3 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/90 backdrop-blur-sm text-emerald-900 placeholder-emerald-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>{locale === 'es' ? 'Filtros' : 'Filters'}</span>
                </button>

                <button
                  onClick={exportData}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{locale === 'es' ? 'Exportar CSV' : 'Export CSV'}</span>
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      {locale === 'es' ? 'Categoría' : 'Category'}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
                    >
                      {rentalCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.emoji} {category[locale]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">
                      {locale === 'es' ? 'Rango de Precio' : 'Price Range'}
                    </label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
                    >
                      {priceRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                          {range[locale]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-emerald-700 font-medium">
            {locale === 'es' 
              ? `Mostrando ${filteredRentals.length} de ${rentals.length} propiedades`
              : `Showing ${filteredRentals.length} of ${rentals.length} properties`
            }
          </p>
        </div>

        {/* Data Grid */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">
          <div className="ag-theme-alpine ag-theme-custom" style={{ height: '600px', width: '100%' }}>
            <AgGridReact
              theme="legacy"
              columnDefs={columnDefs}
              rowData={filteredRentals}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                cellClass: 'flex items-center'
              }}
              pagination={true}
              paginationPageSize={20}
              domLayout="normal"
              onGridReady={onGridReady}
              className="rounded-xl"
              headerHeight={50}
              rowHeight={60}
            />
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-emerald-600 text-sm">
            {locale === 'es' 
              ? 'Datos actualizados en tiempo real • Haz clic en las columnas para ordenar • Usa los filtros para búsquedas específicas'
              : 'Real-time updated data • Click columns to sort • Use filters for specific searches'
            }
          </p>
        </div>
      </div>

      <style jsx global>{`
        .ag-theme-custom {
          --ag-background-color: transparent;
          --ag-header-background-color: rgb(4 120 87 / 0.1);
          --ag-odd-row-background-color: rgb(240 253 250 / 0.5);
          --ag-header-foreground-color: rgb(4 120 87);
          --ag-border-color: rgb(167 243 208);
          --ag-row-border-color: rgb(209 250 229);
        }
        
        .ag-theme-custom .ag-header {
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .ag-theme-custom .ag-cell {
          display: flex;
          align-items: center;
          border-right: 1px solid rgb(209 250 229);
        }
        
        .ag-theme-custom .ag-row {
          border-bottom: 1px solid rgb(209 250 229);
        }
        
        .ag-theme-custom .ag-row:hover {
          background-color: rgb(236 253 245) !important;
        }
      `}</style>
    </div>
  )
}