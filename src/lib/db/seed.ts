import { db } from '../db'
import { businesses, hotels, restaurants, experiences, events } from './schema'
import { HotelServiceStatic } from '../hotels'
import { RestaurantServiceStatic } from '../restaurants'
import { BarServiceStatic } from '../bars'
import { CafeServiceStatic } from '../cafes'
import { ExperienceService } from '../experiences'
import { EventService } from '../events'

async function seed() {
  console.log('🌱 Starting database seed...')

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await db.delete(experiences)
    await db.delete(restaurants)
    await db.delete(hotels)
    await db.delete(events)
    await db.delete(businesses)

    console.log('✅ Existing data cleared')

    // Seed Hotels
    console.log('\n🏨 Seeding hotels...')
    const hotelData = HotelServiceStatic.getAllHotels()
    let hotelCount = 0

    for (const hotel of hotelData) {
      const [business] = await db.insert(businesses).values({
        slug: hotel.slug,
        category: 'hotel',
        subcategory: hotel.type === 'eco-lodge' ? 'eco-lodge' : hotel.type === 'boutique' ? 'hotel' : 'hotel',
        nameEs: hotel.name.es,
        nameEn: hotel.name.en,
        descriptionEs: hotel.description.es,
        descriptionEn: hotel.description.en,
        addressEs: hotel.location.address.es,
        addressEn: hotel.location.address.en,
        neighborhood: hotel.location.neighborhood,
        latitude: hotel.coordinates[1].toString(),
        longitude: hotel.coordinates[0].toString(),
        phone: hotel.contact?.phone || null,
        whatsapp: hotel.contact?.whatsapp || null,
        email: hotel.contact?.email || null,
        website: hotel.contact?.website || null,
        images: hotel.images,
        amenitiesEs: hotel.amenities.es,
        amenitiesEn: hotel.amenities.en,
        priceEs: hotel.price.es,
        priceEn: hotel.price.en,
        priceLevel: hotel.priceLevel || 2,
        verified: hotel.verified || false,
        featured: hotel.featured || false,
        active: true,
        operatingHours: hotel.operatingHours || {
          monday: { open: '00:00', close: '23:59' },
          tuesday: { open: '00:00', close: '23:59' },
          wednesday: { open: '00:00', close: '23:59' },
          thursday: { open: '00:00', close: '23:59' },
          friday: { open: '00:00', close: '23:59' },
          saturday: { open: '00:00', close: '23:59' },
          sunday: { open: '00:00', close: '23:59' },
        },
        hasWifi: hotel.amenities.es.some(a => a.toLowerCase().includes('wifi') || a.toLowerCase().includes('internet')),
        hasParking: hotel.amenities.es.some(a => a.toLowerCase().includes('estacionamiento') || a.toLowerCase().includes('parking')),
        acceptsCards: true,
        isPetFriendly: hotel.amenities.es.some(a => a.toLowerCase().includes('mascotas') || a.toLowerCase().includes('pet')),
        rating: hotel.rating ? hotel.rating.toString() : '0',
        reviewCount: hotel.reviewCount || 0,
      }).returning()

      // Insert hotel-specific data
      await db.insert(hotels).values({
        businessId: business.id,
        rooms: hotel.rooms || null,
        hasPool: hotel.amenities.es.some(a => a.toLowerCase().includes('alberca') || a.toLowerCase().includes('piscina') || a.toLowerCase().includes('pool')),
        hasSpa: hotel.amenities.es.some(a => a.toLowerCase().includes('spa')),
        hasRestaurant: hotel.amenities.es.some(a => a.toLowerCase().includes('restaurante') || a.toLowerCase().includes('restaurant')),
        hasGym: hotel.amenities.es.some(a => a.toLowerCase().includes('gimnasio') || a.toLowerCase().includes('gym')),
        sustainable: hotel.sustainable || false,
        ecoFriendly: hotel.type === 'eco-lodge',
      })

      hotelCount++
    }

    console.log(`✅ Seeded ${hotelCount} hotels`)

    // Seed Restaurants
    console.log('\n🍽️  Seeding restaurants...')
    const restaurantData = RestaurantServiceStatic.getAllRestaurants()
    let restaurantCount = 0

    for (const restaurant of restaurantData) {
      const [business] = await db.insert(businesses).values({
        slug: restaurant.slug,
        category: 'restaurant',
        subcategory: 'restaurant',
        nameEs: restaurant.name.es,
        nameEn: restaurant.name.en,
        descriptionEs: restaurant.description.es,
        descriptionEn: restaurant.description.en,
        addressEs: restaurant.location.address.es,
        addressEn: restaurant.location.address.en,
        neighborhood: restaurant.location.neighborhood,
        latitude: restaurant.coordinates[1].toString(),
        longitude: restaurant.coordinates[0].toString(),
        phone: restaurant.contact?.phone || null,
        whatsapp: restaurant.contact?.whatsapp || null,
        email: restaurant.contact?.email || null,
        website: restaurant.contact?.website || null,
        images: restaurant.images,
        amenitiesEs: restaurant.amenities?.es || [],
        amenitiesEn: restaurant.amenities?.en || [],
        priceEs: restaurant.price.es,
        priceEn: restaurant.price.en,
        priceLevel: restaurant.priceLevel || 2,
        verified: restaurant.verified || false,
        featured: restaurant.featured || false,
        active: true,
        operatingHours: restaurant.operatingHours,
        hasWifi: restaurant.amenities?.es.some(a => a.toLowerCase().includes('wifi')) || false,
        hasParking: restaurant.amenities?.es.some(a => a.toLowerCase().includes('estacionamiento')) || false,
        acceptsCards: restaurant.amenities?.es.some(a => a.toLowerCase().includes('tarjeta')) || true,
        rating: restaurant.rating ? restaurant.rating.toString() : '0',
        reviewCount: restaurant.reviewCount || 0,
      }).returning()

      // Insert restaurant-specific data
      await db.insert(restaurants).values({
        businessId: business.id,
        cuisineEs: restaurant.cuisine?.es || [],
        cuisineEn: restaurant.cuisine?.en || [],
        dietaryOptionsEs: restaurant.dietaryOptions?.es || [],
        dietaryOptionsEn: restaurant.dietaryOptions?.en || [],
        hasOutdoorSeating: restaurant.amenities?.es.some(a => a.toLowerCase().includes('terraza') || a.toLowerCase().includes('exterior')) || false,
        hasDelivery: restaurant.amenities?.es.some(a => a.toLowerCase().includes('entrega') || a.toLowerCase().includes('domicilio')) || false,
        hasTakeout: restaurant.amenities?.es.some(a => a.toLowerCase().includes('para llevar')) || false,
      })

      restaurantCount++
    }

    console.log(`✅ Seeded ${restaurantCount} restaurants`)

    // Seed Bars
    console.log('\n🍺 Seeding bars...')
    const barData = BarServiceStatic.getAllBars()
    let barCount = 0

    for (const bar of barData) {
      await db.insert(businesses).values({
        slug: bar.slug,
        category: 'bar',
        subcategory: bar.type === 'pulqueria' ? 'pulqueria' : 'bar',
        nameEs: bar.name.es,
        nameEn: bar.name.en,
        descriptionEs: bar.description.es,
        descriptionEn: bar.description.en,
        addressEs: bar.location.address.es,
        addressEn: bar.location.address.en,
        neighborhood: bar.location.neighborhood,
        latitude: bar.coordinates[1].toString(),
        longitude: bar.coordinates[0].toString(),
        phone: bar.contact?.phone || null,
        whatsapp: bar.contact?.whatsapp || null,
        email: bar.contact?.email || null,
        website: bar.contact?.website || null,
        images: bar.images,
        amenitiesEs: bar.amenities?.es || [],
        amenitiesEn: bar.amenities?.en || [],
        priceEs: bar.price.es,
        priceEn: bar.price.en,
        priceLevel: bar.priceLevel || 2,
        verified: bar.verified || false,
        featured: bar.featured || false,
        active: true,
        operatingHours: bar.operatingHours,
        rating: bar.rating ? bar.rating.toString() : '0',
        reviewCount: bar.reviewCount || 0,
      }).returning()

      barCount++
    }

    console.log(`✅ Seeded ${barCount} bars`)

    // Seed Cafes
    console.log('\n☕ Seeding cafes...')
    const cafeData = CafeServiceStatic.getAllCafes()
    let cafeCount = 0

    for (const cafe of cafeData) {
      const [business] = await db.insert(businesses).values({
        slug: cafe.slug,
        category: 'cafe',
        subcategory: cafe.type === 'bakery' ? 'bakery' : 'cafe',
        nameEs: cafe.name.es,
        nameEn: cafe.name.en,
        descriptionEs: cafe.description.es,
        descriptionEn: cafe.description.en,
        addressEs: cafe.location.address.es,
        addressEn: cafe.location.address.en,
        neighborhood: cafe.location.neighborhood,
        latitude: cafe.coordinates[1].toString(),
        longitude: cafe.coordinates[0].toString(),
        phone: cafe.contact?.phone || null,
        whatsapp: cafe.contact?.whatsapp || null,
        email: cafe.contact?.email || null,
        website: cafe.contact?.website || null,
        images: cafe.images,
        amenitiesEs: cafe.amenities?.es || [],
        amenitiesEn: cafe.amenities?.en || [],
        priceEs: cafe.price.es,
        priceEn: cafe.price.en,
        priceLevel: cafe.priceLevel || 2,
        verified: cafe.verified || false,
        featured: cafe.featured || false,
        active: true,
        operatingHours: cafe.operatingHours,
        hasWifi: cafe.amenities?.es.some(a => a.toLowerCase().includes('wifi')) || false,
        rating: cafe.rating ? cafe.rating.toString() : '0',
        reviewCount: cafe.reviewCount || 0,
      }).returning()

      // Insert as restaurant (cafes use restaurant table)
      await db.insert(restaurants).values({
        businessId: business.id,
        cuisineEs: cafe.specialties?.es || [],
        cuisineEn: cafe.specialties?.en || [],
        hasOutdoorSeating: cafe.amenities?.es.some(a => a.toLowerCase().includes('terraza')) || false,
        hasTakeout: true,
      })

      cafeCount++
    }

    console.log(`✅ Seeded ${cafeCount} cafes`)

    // Seed Experiences
    console.log('\n🎯 Seeding experiences...')
    const experienceData = ExperienceService.getAllExperiences()
    let experienceCount = 0

    for (const exp of experienceData) {
      const [business] = await db.insert(businesses).values({
        slug: exp.slug,
        category: 'experience',
        subcategory: exp.category,
        nameEs: exp.name.es,
        nameEn: exp.name.en,
        descriptionEs: exp.description.es,
        descriptionEn: exp.description.en,
        addressEs: exp.location.es,
        addressEn: exp.location.en,
        latitude: exp.coordinates?.[1]?.toString() || '18.9847',
        longitude: exp.coordinates?.[0]?.toString() || '-99.0930',
        phone: exp.phone || null,
        email: exp.email || null,
        website: exp.website || null,
        images: exp.images,
        priceEs: exp.price.es,
        priceEn: exp.price.en,
        verified: exp.verified || false,
        featured: exp.featured || false,
        active: true,
        rating: exp.rating ? exp.rating.toString() : '0',
        reviewCount: exp.reviewCount || 0,
      }).returning()

      // Insert experience-specific data
      await db.insert(experiences).values({
        businessId: business.id,
        durationEs: exp.duration.es,
        durationEn: exp.duration.en,
        maxParticipants: exp.maxParticipants || null,
        intensity: exp.intensity || 'low',
        includesEs: exp.includes.es,
        includesEn: exp.includes.en,
        excludesEs: exp.excludes.es,
        excludesEn: exp.excludes.en,
        requirementsEs: exp.requirements.es,
        requirementsEn: exp.requirements.en,
        highlightsEs: exp.highlights.es,
        highlightsEn: exp.highlights.en,
        indigenous: exp.indigenous || false,
        sustainable: exp.sustainable || false,
      })

      experienceCount++
    }

    console.log(`✅ Seeded ${experienceCount} experiences`)

    // Seed Events
    console.log('\n🎉 Seeding events...')
    const eventData = EventService.getAllEvents()
    let eventCount = 0

    for (const event of eventData) {
      await db.insert(events).values({
        slug: event.slug,
        titleEs: event.title.es,
        titleEn: event.title.en,
        descriptionEs: event.description.es,
        descriptionEn: event.description.en,
        startDate: new Date(event.date.start),
        endDate: event.date.end ? new Date(event.date.end) : null,
        isRecurring: event.recurring || false,
        locationEs: event.location.es,
        locationEn: event.location.en,
        latitude: event.coordinates?.[1]?.toString() || null,
        longitude: event.coordinates?.[0]?.toString() || null,
        isFree: event.isFree || false,
        priceEs: event.price?.es || null,
        priceEn: event.price?.en || null,
        images: event.images,
        featured: event.featured || false,
        active: true,
      })

      eventCount++
    }

    console.log(`✅ Seeded ${eventCount} events`)

    console.log('\n🎊 Database seed completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Hotels: ${hotelCount}`)
    console.log(`   - Restaurants: ${restaurantCount}`)
    console.log(`   - Bars: ${barCount}`)
    console.log(`   - Cafes: ${cafeCount}`)
    console.log(`   - Experiences: ${experienceCount}`)
    console.log(`   - Events: ${eventCount}`)
    console.log(`   - Total: ${hotelCount + restaurantCount + barCount + cafeCount + experienceCount + eventCount}`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }

  process.exit(0)
}

seed()
