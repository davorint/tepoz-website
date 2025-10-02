import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tepoztlán Tourism Guide - Discover the Magic Town',
    short_name: 'Tepoztlán Guide',
    description: 'Your comprehensive guide to Tepoztlán\'s best restaurants, hotels, eco-lodges, cafés, attractions, and local services. Discover the magic of this UNESCO World Heritage Pueblo Mágico.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f59e0b',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['travel', 'tourism', 'lifestyle', 'navigation'],
    lang: 'es-MX',
    dir: 'ltr',
    prefer_related_applications: false,
    related_applications: [],
    screenshots: [
      {
        src: '/images/screenshot-mobile-es.jpg',
        sizes: '390x844',
        type: 'image/jpeg',
        form_factor: 'narrow',
        label: 'Tepoztlán Guide - Discover page'
      },
      {
        src: '/images/screenshot-tablet-es.jpg',
        sizes: '768x1024',
        type: 'image/jpeg',
        form_factor: 'wide',
        label: 'Tepoztlán Guide - Map view'
      }
    ]
  }
}
