import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { GlobalLoadingProvider } from "@/components/providers/GlobalLoadingProvider";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas'
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tepoztlan.com'),
  title: {
    default: "Tepoztlán Tourism Guide - Discover the Magic Town | Hotels, Restaurants & Attractions",
    template: "%s | Tepoztlán Tourism Guide"
  },
  description: "Your comprehensive guide to Tepoztlán's best restaurants, hotels, eco-lodges, cafés, attractions, and local services. Discover the magic of this UNESCO World Heritage Pueblo Mágico in Morelos, Mexico.",
  keywords: [
    "Tepoztlán",
    "Pueblo Mágico", 
    "Morelos Mexico",
    "Tepozteco Pyramid",
    "Mexican tourism",
    "hotels Tepoztlán", 
    "restaurants Tepoztlán",
    "eco-lodges Mexico",
    "weekend getaway Mexico",
    "mystical Mexico",
    "indigenous culture",
    "UNESCO World Heritage"
  ],
  authors: [{ name: "Tepoztlán Tourism Guide" }],
  creator: "Tepoztlán Tourism Guide",
  publisher: "Tepoztlán Tourism Guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US'],
    url: 'https://tepoztlan.com',
    title: "Tepoztlán Tourism Guide - Discover the Magic Town",
    description: "Your comprehensive guide to Tepoztlán's best restaurants, hotels, eco-lodges, cafés, attractions, and local services. Discover the magic of this UNESCO World Heritage Pueblo Mágico.",
    siteName: "Tepoztlán Tourism Guide",
    images: [
      {
        url: '/images/og-tepoztlan-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Tepoztlán - Pueblo Mágico with Tepozteco Pyramid view'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tepoztlán Tourism Guide - Discover the Magic Town",
    description: "Your comprehensive guide to Tepoztlán's best restaurants, hotels, attractions, and local services in this UNESCO World Heritage Pueblo Mágico.",
    creator: '@TepoztlanGuide',
    images: ['/images/twitter-tepoztlan-hero.jpg']
  },
  // Search Engine Verification - Add your codes when you set up Search Console
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   other: {
  //     'msvalidate.01': 'your-bing-verification-code'
  //   }
  // },
  category: 'travel',
  classification: 'tourism guide',
  alternates: {
    canonical: 'https://tepoztlan.com',
    languages: {
      'es-MX': 'https://tepoztlan.com/es',
      'en-US': 'https://tepoztlan.com/en'
    }
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png'
  },
  manifest: '/manifest.webmanifest'
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Tepoztlán",
  "description": "UNESCO World Heritage Pueblo Mágico in Morelos, Mexico. Famous for the Tepozteco Pyramid, mystical energy, and rich indigenous culture.",
  "url": "https://tepoztlan.com",
  "sameAs": [
    "https://en.wikipedia.org/wiki/Tepoztl%C3%A1n",
    "https://www.mexicoescultura.com/recinto/54353/tepoztlan.html"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Morelos",
    "addressCountry": "Mexico"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "18.9847",
    "longitude": "-99.0940"
  },
  "touristType": ["Cultural Tourism", "Eco Tourism", "Spiritual Tourism", "Adventure Tourism"],
  "hasMap": "https://tepoztlan.com/en/map",
  "isAccessibleForFree": true,
  "publicAccess": true
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Critical viewport meta tag for mobile responsiveness and safe area support */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Tepoztlán Guide" />
      </head>
      <body className={`${inter.className} ${bebasNeue.variable} ${playfairDisplay.variable} ${montserrat.variable} antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalLoadingProvider>
            {children}
          </GlobalLoadingProvider>
        </ThemeProvider>
        {/* Google Analytics 4 - Only loads if GA_MEASUREMENT_ID is set */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
