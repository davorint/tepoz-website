# Tepoztlán Store Locator - Comprehensive Implementation Guide

## Overview

This guide provides a complete implementation of a modern, accessible store locator for the Tepoztlán tourism website using **Mapbox GL JS**, **React**, **Next.js**, and **TypeScript**. The implementation includes advanced features like clustering, autocomplete search, favorites system, directions integration, and analytics tracking.

## 🚀 Features

### Core Features
- **Interactive Mapbox GL JS map** with custom markers and clustering
- **Advanced search** with autocomplete and suggestions
- **Multi-language support** (Spanish/English)
- **Category filtering** with visual indicators
- **Responsive design** optimized for mobile and desktop
- **Real-time user location** detection and distance calculation
- **Favorites system** with export/import functionality
- **Turn-by-turn directions** integration
- **Analytics tracking** for user behavior insights
- **Accessibility compliant** with ARIA labels and keyboard navigation

### Advanced Features
- **Map clustering** for better performance with many markers
- **3D map mode** and satellite view toggle
- **Smart search suggestions** with recent searches
- **Performance optimized** with lazy loading and debounced updates
- **Offline-ready** favorites storage
- **Social sharing** integration
- **Custom marker styling** per business category

## 📁 Project Structure

```
src/
├── components/business-finder/
│   ├── business-details.tsx          # Business details modal
│   ├── business-filters.tsx          # Filter controls
│   ├── business-list.tsx            # Business listing component
│   ├── business-map.tsx             # Standard map component
│   ├── clustered-map.tsx            # Enhanced map with clustering
│   ├── search-autocomplete.tsx      # Advanced search component
│   ├── directions-panel.tsx         # Turn-by-turn directions
│   └── favorites-panel.tsx          # Favorites management
├── data/
│   └── tepoztlan-businesses.ts      # Business data and utilities
├── hooks/
│   ├── use-favorites.ts             # Favorites management hook
│   └── use-analytics.ts             # Analytics tracking hook
├── types/
│   └── business-finder.ts           # TypeScript interfaces
└── app/[lang]/business-finder/
    └── page.tsx                     # Main page component
```

## 🛠 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Mapbox Configuration
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_access_token_here

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# API Configuration (Optional for future extensions)
NEXT_PUBLIC_API_BASE_URL=https://api.tepoztlan.com
```

### 2. Dependencies

The implementation uses these key dependencies (already in your package.json):

```json
{
  "mapbox-gl": "^3.14.0",
  "@types/mapbox-gl": "^3.4.1",
  "@turf/turf": "^7.2.0",
  "motion": "^12.23.12",
  "lucide-react": "^0.542.0"
}
```

### 3. Basic Implementation

#### Update your existing business-finder page to use the enhanced components:

```tsx
// app/[lang]/business-finder/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Locale } from '@/lib/i18n'

// Import enhanced components
import { BusinessList } from '@/components/business-finder/business-list'
import { BusinessDetails } from '@/components/business-finder/business-details'
import { BusinessFilters } from '@/components/business-finder/business-filters'
import { ClusteredBusinessMap } from '@/components/business-finder/clustered-map' // Enhanced map
import { SearchAutocomplete } from '@/components/business-finder/search-autocomplete'
import { DirectionsPanel } from '@/components/business-finder/directions-panel'
import { FavoritesPanel } from '@/components/business-finder/favorites-panel'

// Import enhanced data and hooks
import { tepoztlanBusinesses, businessCategories } from '@/data/tepoztlan-businesses'
import { useFavorites } from '@/hooks/use-favorites'
import { useAnalytics } from '@/hooks/use-analytics'
import { Business } from '@/types/business-finder'

export default function EnhancedBusinessFinderPage({ params }: { params: Promise<{ lang: string }> }) {
  // ... existing state management ...
  const [showFavoritesPanel, setShowFavoritesPanel] = useState(false)
  const [showDirectionsPanel, setShowDirectionsPanel] = useState(false)
  
  // Enhanced hooks
  const { isFavorite, toggleFavorite, favoritesCount } = useFavorites()
  const { trackBusinessClick, trackSearch, trackCategorySelection } = useAnalytics()

  // Enhanced business selection with analytics
  const handleBusinessSelect = useCallback((businessId: string, source: 'map' | 'list' | 'search' = 'list') => {
    const business = filteredBusinesses.find(b => b.id === businessId)
    if (business) {
      setSelectedBusiness(businessId)
      setShowBusinessDetails(true)
      
      // Track the interaction
      trackBusinessClick({
        businessId,
        businessName: business.name,
        businessCategory: business.category,
        clickSource: source,
        userLocation
      })
    }
  }, [filteredBusinesses, trackBusinessClick, userLocation])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Enhanced Header with Favorites */}
      <motion.div className="relative overflow-hidden py-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              {lang === 'es' ? 'DESCUBRE TEPOZTLÁN' : 'DISCOVER TEPOZTLÁN'}
            </h1>
            
            {/* Favorites Button */}
            <Button
              onClick={() => setShowFavoritesPanel(true)}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white rounded-full px-6 py-3"
            >
              <Heart className={`w-5 h-5 mr-2 ${favoritesCount > 0 ? 'fill-current text-pink-400' : ''}`} />
              {lang === 'es' ? 'Favoritos' : 'Favorites'}
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {favoritesCount}
                </span>
              )}
            </Button>
          </div>

          {/* Enhanced Search */}
          <SearchAutocomplete
            businesses={tepoztlanBusinesses}
            searchQuery={searchQuery}
            lang={lang}
            onSearchChange={setSearchQuery}
            onBusinessSelect={(id) => handleBusinessSelect(id, 'search')}
            onFilterSelect={(filter) => {
              // Handle quick filter selection
              if (filter === 'wifi') setSelectedFeatures(['wifi'])
              if (filter === 'cards') setSelectedFeatures(['cards'])
              // etc.
            }}
            className="max-w-2xl mx-auto mb-8"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Enhanced Filters */}
        <BusinessFilters
          // ... existing props ...
          onCategoryChange={(category) => {
            setSelectedCategory(category)
            trackCategorySelection(category, getBusinessesByCategory(category).length)
          }}
        />

        {/* Enhanced Clustered Map */}
        <motion.div className="mb-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 shadow-2xl">
            <ClusteredBusinessMap
              businesses={filteredBusinesses}
              selectedBusiness={selectedBusiness}
              selectedCategory={selectedCategory}
              userLocation={userLocation}
              lang={lang}
              onBusinessSelect={(id) => handleBusinessSelect(id, 'map')}
              onLocationUpdate={setUserLocation}
            />
          </div>
        </motion.div>

        {/* Business List */}
        <BusinessList
          // ... existing props ...
          onBusinessSelect={(id) => handleBusinessSelect(id, 'list')}
        />
      </div>

      {/* Enhanced Business Details with Favorites */}
      <BusinessDetails
        business={selectedBusinessData}
        category={selectedBusinessData ? businessCategories.find(c => c.id === selectedBusinessData.category) : undefined}
        isOpen={showBusinessDetails}
        lang={lang}
        isFavorite={selectedBusinessData ? isFavorite(selectedBusinessData.id) : false}
        onClose={() => {
          setShowBusinessDetails(false)
          setSelectedBusiness(null)
        }}
        onFavorite={(id) => {
          if (selectedBusinessData) {
            toggleFavorite(id, {
              name: selectedBusinessData.name,
              category: selectedBusinessData.category,
              coordinates: selectedBusinessData.coordinates
            })
          }
        }}
        onGetDirections={() => setShowDirectionsPanel(true)}
      />

      {/* Directions Panel */}
      <DirectionsPanel
        business={selectedBusinessData}
        userLocation={userLocation}
        isOpen={showDirectionsPanel}
        lang={lang}
        onClose={() => setShowDirectionsPanel(false)}
      />

      {/* Favorites Panel */}
      <FavoritesPanel
        businesses={tepoztlanBusinesses}
        categories={businessCategories}
        isOpen={showFavoritesPanel}
        lang={lang}
        onClose={() => setShowFavoritesPanel(false)}
        onBusinessSelect={handleBusinessSelect}
      />
    </div>
  )
}
```

## 🎨 Customization

### 1. Styling and Theming

The components use Tailwind CSS with custom gradients and backdrop blur effects. Key design tokens:

```css
/* Custom color palette */
.bg-tepoztlan-gradient {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%);
}

/* Category colors */
.restaurant-marker { color: #e53e3e; }
.hotel-marker { color: #3182ce; }
.cafe-marker { color: #d69e2e; }
.shopping-marker { color: #38a169; }
.attraction-marker { color: #d53f8c; }
```

### 2. Business Data Structure

Add businesses to `/src/data/tepoztlan-businesses.ts`:

```typescript
const newBusiness: Business = {
  id: 'unique-business-id',
  name: 'Business Name',
  nameEn: 'Business Name (English)',
  category: 'restaurant', // restaurant | hotel | cafe | shopping | attraction | experience | service
  subcategory: 'mexican', // Optional subcategory
  coordinates: [-99.1017, 18.9847], // [longitude, latitude]
  rating: 4.5,
  priceLevel: 2, // 1-4 ($-$$$$)
  description: 'Descripción en español...',
  descriptionEn: 'English description...',
  address: 'Full address',
  phone: '+52 739 XXX XXXX',
  website: 'https://business-website.com',
  hours: '9:00 AM - 9:00 PM',
  featured: true, // Highlight as featured
  tags: ['tag1', 'tag2', 'tag3'],
  amenities: {
    es: ['WiFi gratis', 'Estacionamiento', 'Pet friendly'],
    en: ['Free WiFi', 'Parking', 'Pet friendly']
  },
  hasWifi: true,
  acceptsCards: true,
  hasParking: true,
  isPetFriendly: false,
  operatingHours: {
    monday: { open: '09:00', close: '21:00' },
    tuesday: { open: '09:00', close: '21:00' },
    // ... other days
    sunday: { closed: true }
  },
  images: ['/images/business1.jpg', '/images/business2.jpg'],
  reviewCount: 150,
  isVerified: true
}
```

### 3. Map Customization

#### Custom Map Styles
```typescript
// In clustered-map.tsx
const mapStyles = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
  custom: 'mapbox://styles/your-username/your-custom-style'
}
```

#### Custom Markers
```typescript
// Create custom marker images
const createCustomMarker = (category: string, color: string, icon: string) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  // ... custom drawing logic
}
```

### 4. Search Configuration

Customize search behavior in `/src/data/tepoztlan-businesses.ts`:

```typescript
export const searchSuggestions = {
  es: ['comida mexicana', 'hotel boutique', 'café artesanal'],
  en: ['mexican food', 'boutique hotel', 'artisan coffee']
}

export const popularFilters = {
  es: [
    { name: 'Con WiFi', value: 'wifi' },
    { name: 'Acepta tarjetas', value: 'cards' }
  ],
  en: [
    { name: 'WiFi available', value: 'wifi' },
    { name: 'Cards accepted', value: 'cards' }
  ]
}
```

## 📱 Mobile Optimization

### Responsive Design Features
- **Touch-friendly interactions** with proper touch targets (44px minimum)
- **Swipe gestures** for mobile map navigation
- **Bottom sheet modals** for mobile-first UI
- **Optimized map controls** for touch devices
- **Progressive Web App** features with offline capabilities

### Performance Optimizations
- **Lazy loading** of map components
- **Debounced search** to reduce API calls
- **Virtual scrolling** for large business lists
- **Image optimization** with Next.js Image component
- **Bundle splitting** for faster initial loads

## 🔧 Advanced Features

### 1. Analytics Integration

Track user interactions:

```typescript
const { trackBusinessView, trackSearch, trackMapInteraction } = useAnalytics()

// Track business views
useEffect(() => {
  if (selectedBusiness) {
    trackBusinessView({
      businessId: selectedBusiness.id,
      businessName: selectedBusiness.name,
      businessCategory: selectedBusiness.category,
      userLocation
    })
  }
}, [selectedBusiness])
```

### 2. Favorites System

Implement favorites with persistence:

```typescript
const { 
  isFavorite, 
  toggleFavorite, 
  exportFavorites, 
  importFavorites 
} = useFavorites()

// Add to favorites
const handleFavorite = (business: Business) => {
  toggleFavorite(business.id, {
    name: business.name,
    category: business.category,
    coordinates: business.coordinates
  })
}
```

### 3. Directions Integration

Provide turn-by-turn directions:

```typescript
// Mapbox Directions API integration
const getDirections = async (origin: [number, number], destination: [number, number]) => {
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  )
  return response.json()
}
```

## 🎯 Best Practices

### 1. Performance
- Use `React.memo` for expensive components
- Implement virtual scrolling for large lists
- Debounce search inputs and map interactions
- Lazy load images and non-critical components
- Use Web Workers for heavy computations

### 2. Accessibility
- Provide proper ARIA labels for all interactive elements
- Ensure keyboard navigation works throughout
- Use semantic HTML elements
- Provide alternative text for images
- Support screen readers with proper announcements

### 3. SEO
- Server-side render business data where possible
- Generate structured data (JSON-LD) for businesses
- Create SEO-friendly URLs with business slugs
- Optimize images with proper alt text
- Use proper heading hierarchy

### 4. Security
- Validate and sanitize all user inputs
- Use environment variables for sensitive data
- Implement proper CORS policies
- Sanitize business data before rendering
- Use Content Security Policy (CSP) headers

## 🚀 Deployment

### 1. Environment Setup
```bash
# Production environment variables
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_production_token
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
NODE_ENV=production
```

### 2. Build Optimization
```bash
# Build with optimizations
npm run build

# Analyze bundle size
npm run analyze

# Test production build locally
npm run start
```

### 3. Performance Monitoring
- Set up error tracking (Sentry, Bugsnag)
- Monitor Core Web Vitals
- Track user interactions and conversion rates
- Monitor API response times
- Set up uptime monitoring

## 📊 Analytics & Metrics

### Key Metrics to Track
- **Business discovery rate**: How many businesses users view
- **Search usage**: Most common search terms and filters
- **Map interactions**: Zoom levels, style preferences
- **Conversion rates**: Calls, directions, website visits
- **User location adoption**: Permission grant rates
- **Favorites usage**: Save and export rates

### Implementation
```typescript
// Track key business metrics
const trackBusinessDiscovery = () => {
  trackEvent('business_discovery', {
    total_viewed: viewedBusinesses.length,
    categories_explored: uniqueCategories.length,
    search_used: searchQuery.length > 0,
    filters_used: activeFilters.length > 0
  })
}
```

## 🔮 Future Enhancements

### Planned Features
1. **User Reviews System** - Allow users to leave reviews and ratings
2. **Business Owner Dashboard** - Let businesses manage their listings
3. **Events Integration** - Show upcoming events at businesses
4. **Reservation System** - Book tables or appointments directly
5. **Social Features** - Share favorite lists with friends
6. **AR Integration** - Augmented reality business discovery
7. **Voice Search** - Voice-activated search and navigation
8. **Push Notifications** - Notify users of nearby favorites or deals

### Technical Improvements
1. **Progressive Web App** - Full offline functionality
2. **Real-time Updates** - Live business status and availability
3. **Advanced Clustering** - Smarter grouping algorithms
4. **Machine Learning** - Personalized business recommendations
5. **WebGL Optimization** - Custom map rendering for better performance

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for all new components
- Follow the existing component structure and naming conventions
- Add proper error handling and loading states
- Include accessibility considerations
- Write tests for complex logic
- Update documentation for new features

## 📞 Support

For implementation support or questions about this store locator:

- **Documentation**: This comprehensive guide
- **Examples**: Check the implemented components
- **Issues**: Create GitHub issues for bugs or feature requests
- **Community**: Join discussions in project issues

---

This implementation provides a solid foundation for a modern, accessible store locator that can be easily customized and extended for your specific needs. The modular architecture ensures maintainability while the comprehensive feature set provides an excellent user experience.