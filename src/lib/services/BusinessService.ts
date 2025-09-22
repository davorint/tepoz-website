import { Locale } from '../i18n'
import {
  BusinessEntity,
  SortOption,
  BusinessEntityHelpers
} from '../types/business'

// Abstract base service for business entities
export abstract class BusinessService<T extends BusinessEntity> {

  // Abstract methods that must be implemented by concrete services
  abstract getAllItems(): T[]
  abstract getFeaturedItems(): T[]
  protected abstract getEntityName(entity: T, locale: Locale): string
  protected abstract getEntityDescription(entity: T, locale: Locale): string
  protected abstract matchesCategory(entity: T, category: string): boolean
  protected abstract matchesAtmosphere(entity: T, atmosphere: string): boolean

  // Common methods implemented once
  getItemById(id: string): T | undefined {
    return this.getAllItems().find(item => item.id === id)
  }

  getItemBySlug(slug: string): T | undefined {
    return this.getAllItems().find(item => item.slug === slug)
  }

  getName(entity: T, locale: Locale): string {
    return this.getEntityName(entity, locale)
  }

  getDescription(entity: T, locale: Locale): string {
    return this.getEntityDescription(entity, locale)
  }

  getAddress(entity: T, locale: Locale): string {
    return BusinessEntityHelpers.getAddress(entity, locale)
  }

  getHours(entity: T, locale: Locale): string {
    return BusinessEntityHelpers.getHours(entity, locale)
  }

  getSpecialties(entity: T, locale: Locale): string[] {
    return BusinessEntityHelpers.getSpecialties(entity, locale)
  }

  searchItems(
    query: string = '',
    category: string = 'all',
    atmosphere: string = 'all',
    priceRange: string = 'all',
    dietary: string[] = [],
    amenities: string[] = []
  ): T[] {
    return this.getAllItems().filter(item => {
      const matchesQuery = !query ||
        this.getEntityName(item, 'es').toLowerCase().includes(query.toLowerCase()) ||
        this.getEntityName(item, 'en').toLowerCase().includes(query.toLowerCase()) ||
        this.getEntityDescription(item, 'es').toLowerCase().includes(query.toLowerCase()) ||
        this.getEntityDescription(item, 'en').toLowerCase().includes(query.toLowerCase())

      const matchesCategory = category === 'all' || this.matchesCategory(item, category)
      const matchesAtmosphere = atmosphere === 'all' || this.matchesAtmosphere(item, atmosphere)
      const matchesPriceRange = priceRange === 'all' || item.priceRange === priceRange

      const matchesDietary = dietary.length === 0 ||
        dietary.every(diet => item.dietary.includes(diet as 'vegetarian' | 'vegan' | 'gluten-free' | 'organic'))

      const matchesAmenities = amenities.length === 0 ||
        amenities.every(amenity => item.amenities.includes(amenity))

      return matchesQuery && matchesCategory && matchesAtmosphere &&
             matchesPriceRange && matchesDietary && matchesAmenities
    })
  }

  sortItems(items: T[], sortBy: SortOption, locale: Locale): T[] {
    return BusinessEntityHelpers.sortEntities(
      items,
      sortBy,
      locale,
      (entity, locale) => this.getEntityName(entity, locale)
    )
  }

  searchAndSort(
    query: string = '',
    category: string = 'all',
    atmosphere: string = 'all',
    priceRange: string = 'all',
    dietary: string[] = [],
    amenities: string[] = [],
    sortBy: SortOption = 'featured',
    locale: Locale
  ): T[] {
    const filtered = this.searchItems(query, category, atmosphere, priceRange, dietary, amenities)
    return this.sortItems(filtered, sortBy, locale)
  }
}