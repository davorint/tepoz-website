import { BusinessListing, BusinessFilters } from '@/types/business'
import { BusinessService } from '@/lib/business-data'
import { Locale } from '@/lib/i18n'

// Multilingual search mappings as per document Section 8.1
export const searchMappings = {
  es: {
    // Spanish -> English Recognition
    'piramide': ['pyramid', 'tepozteco'],
    'mercado': ['market', 'tianguis'],
    'alberca': ['pool', 'swimming'],
    'antojitos': ['snacks', 'street food'],
    'hospedaje': ['accommodation', 'hotel', 'stay'],
    'restaurante': ['restaurant', 'dining'],
    'experiencias': ['experiences', 'activities'],
    'eventos': ['events', 'festivals'],
    'servicios': ['services', 'medical', 'transport'],
    'compras': ['shopping', 'artisans', 'markets'],
    'senderismo': ['hiking', 'trails'],
    'bienestar': ['wellness', 'spa', 'temazcal'],
    'aventura': ['adventure', 'climbing'],
    'espiritual': ['spiritual', 'ceremonies'],
    'cultural': ['cultural', 'museums'],
    'gastronomia': ['gastronomy', 'food'],
    'transporte': ['transportation', 'taxi'],
    'medico': ['medical', 'clinic'],
    'financiero': ['financial', 'bank', 'atm']
  },
  en: {
    // English -> Spanish Recognition
    'pyramid': ['piramide', 'tepozteco'],
    'market': ['mercado', 'tianguis'],
    'swimming pool': ['alberca', 'piscina'],
    'street food': ['antojitos', 'comida callejera'],
    'accommodation': ['hospedaje', 'hotel'],
    'restaurant': ['restaurante', 'comida'],
    'experiences': ['experiencias', 'actividades'],
    'events': ['eventos', 'festivales'],
    'services': ['servicios', 'medicos', 'transporte'],
    'shopping': ['compras', 'artesanos', 'mercados'],
    'hiking': ['senderismo', 'caminata'],
    'wellness': ['bienestar', 'spa', 'temazcal'],
    'adventure': ['aventura', 'escalada'],
    'spiritual': ['espiritual', 'ceremonias'],
    'cultural': ['cultural', 'museos'],
    'gastronomy': ['gastronomia', 'comida'],
    'transportation': ['transporte', 'taxi'],
    'medical': ['medico', 'clinica'],
    'financial': ['financiero', 'banco', 'cajero']
  }
} as const

export interface SearchOptions {
  lang: Locale
  filters?: BusinessFilters
  fuzzySearch?: boolean
  includeAlternatives?: boolean
}

export interface SearchResult {
  businesses: BusinessListing[]
  totalResults: number
  query: string
  suggestions?: string[]
  appliedFilters?: BusinessFilters
}

export class AdvancedSearchService {
  private static normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .trim()
  }

  private static expandQuery(query: string, lang: Locale): string[] {
    const normalizedQuery = this.normalizeText(query)
    const mappings = searchMappings[lang]
    const expandedTerms = [normalizedQuery]

    // Add mapped alternatives
    Object.entries(mappings).forEach(([key, alternatives]) => {
      if (normalizedQuery.includes(key)) {
        expandedTerms.push(...alternatives)
      }
    })

    return expandedTerms
  }

  private static scoreMatch(business: BusinessListing, searchTerms: string[], lang: Locale): number {
    let score = 0
    const businessText = [
      business.name[lang],
      business.description[lang],
      business.location.address[lang],
      ...business.amenities[lang]
    ].join(' ').toLowerCase()

    const normalizedBusinessText = this.normalizeText(businessText)

    searchTerms.forEach(term => {
      const normalizedTerm = this.normalizeText(term)
      
      // Exact match in name gets highest score
      if (this.normalizeText(business.name[lang]).includes(normalizedTerm)) {
        score += 10
      }
      
      // Match in description
      if (this.normalizeText(business.description[lang]).includes(normalizedTerm)) {
        score += 5
      }
      
      // Match in amenities
      if (business.amenities[lang].some(amenity => 
        this.normalizeText(amenity).includes(normalizedTerm)
      )) {
        score += 3
      }
      
      // Match in address/location
      if (this.normalizeText(business.location.address[lang]).includes(normalizedTerm)) {
        score += 2
      }
      
      // Fuzzy match (partial word matching)
      if (normalizedBusinessText.includes(normalizedTerm)) {
        score += 1
      }
    })

    return score
  }

  private static applyFilters(businesses: BusinessListing[], filters?: BusinessFilters): BusinessListing[] {
    if (!filters) return businesses

    return businesses.filter(business => {
      // Category filter
      if (filters.category && business.category !== filters.category) {
        return false
      }

      // Subcategory filter
      if (filters.subcategory && business.subcategory !== filters.subcategory) {
        return false
      }

      // Price range filter
      if (filters.priceRange && filters.priceRange.length > 0) {
        if (!filters.priceRange.includes(business.priceRange)) {
          return false
        }
      }

      // Rating filter
      if (filters.rating && business.rating < filters.rating) {
        return false
      }

      // Amenity filters
      if (filters.acceptsCards !== undefined && business.acceptsCards !== filters.acceptsCards) {
        return false
      }
      
      if (filters.hasParking !== undefined && business.hasParking !== filters.hasParking) {
        return false
      }
      
      if (filters.hasWifi !== undefined && business.hasWifi !== filters.hasWifi) {
        return false
      }
      
      if (filters.isPetFriendly !== undefined && business.isPetFriendly !== filters.isPetFriendly) {
        return false
      }

      // Location filter (neighborhood)
      if (filters.location && business.location.neighborhood !== filters.location) {
        return false
      }

      return true
    })
  }

  private static generateSuggestions(query: string, lang: Locale): string[] {
    const suggestions: string[] = []
    const mappings = searchMappings[lang]
    const normalizedQuery = this.normalizeText(query)

    // Find close matches in mappings
    Object.keys(mappings).forEach(key => {
      if (key.startsWith(normalizedQuery) || normalizedQuery.includes(key.substring(0, 3))) {
        suggestions.push(key)
      }
    })

    // Add category suggestions
    const categories = lang === 'es' 
      ? ['hoteles', 'restaurantes', 'experiencias', 'eventos', 'servicios']
      : ['hotels', 'restaurants', 'experiences', 'events', 'services']
      
    categories.forEach(category => {
      if (category.startsWith(normalizedQuery)) {
        suggestions.push(category)
      }
    })

    return suggestions.slice(0, 5) // Limit to 5 suggestions
  }

  static async search(query: string, options: SearchOptions): Promise<SearchResult> {
    const { lang, filters, fuzzySearch: _fuzzySearch = true, includeAlternatives = true } = options // eslint-disable-line @typescript-eslint/no-unused-vars
    
    if (!query.trim()) {
      return {
        businesses: [],
        totalResults: 0,
        query: query.trim(),
        suggestions: this.generateSuggestions(query, lang)
      }
    }

    // Get all businesses (in a real app, this would be from a database)
    const allBusinesses = await BusinessService.searchBusinesses(query, lang)
    
    // Expand query terms with mappings
    const searchTerms = includeAlternatives 
      ? this.expandQuery(query, lang)
      : [query]

    // Score and sort results
    const scoredBusinesses = allBusinesses
      .map(business => ({
        business,
        score: this.scoreMatch(business, searchTerms, lang)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.business)

    // Apply filters
    const filteredBusinesses = this.applyFilters(scoredBusinesses, filters)

    return {
      businesses: filteredBusinesses,
      totalResults: filteredBusinesses.length,
      query: query.trim(),
      suggestions: filteredBusinesses.length === 0 
        ? this.generateSuggestions(query, lang)
        : [],
      appliedFilters: filters
    }
  }

  // Quick search for autocomplete
  static async quickSearch(query: string, lang: Locale, limit: number = 5): Promise<BusinessListing[]> {
    if (!query.trim()) return []
    
    const result = await this.search(query, { lang, fuzzySearch: true })
    return result.businesses.slice(0, limit)
  }

  // Popular searches by language
  static getPopularSearches(lang: Locale): string[] {
    return lang === 'es' 
      ? ['Pirámide del Tepozteco', 'Hoteles centro', 'Restaurantes mexicanos', 'Temazcal', 'Senderismo', 'Mercado artesanal']
      : ['Tepozteco Pyramid', 'Downtown hotels', 'Mexican restaurants', 'Temazcal', 'Hiking', 'Artisan market']
  }
}