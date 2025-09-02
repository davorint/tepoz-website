import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Transpile motion package for proper bundling
  transpilePackages: ['motion'],
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  
  // Build optimization
  webpack: (config, { dev, isServer }) => {
    // Limit parallelism in development to prevent worker crashes
    if (dev) {
      config.parallelism = 1
    }
    
    // Add bundle analyzer in production
    if (!dev && !isServer && process.env.ANALYZE) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      )
    }
    
    return config
  },
  
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets - use multiple specific patterns
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache API routes for shorter periods
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      // Redirect old URLs to new language structure
      {
        source: '/hotels/:slug*',
        destination: '/es/hospedaje/hoteles/:slug*',
        permanent: true,
      },
      {
        source: '/restaurants/:slug*', 
        destination: '/es/comer/restaurantes/:slug*',
        permanent: true,
      },
      // Add more legacy URL redirects as needed
    ]
  },
}

export default nextConfig