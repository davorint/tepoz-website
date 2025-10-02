import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom spacing for consistent touch targets
      spacing: {
        'touch-sm': '2.75rem', // 44px - minimum touch target
        'touch-md': '3rem',    // 48px - comfortable touch target
        'touch-lg': '3.5rem',  // 56px - large touch target
      },
      // Custom min heights for touch targets
      minHeight: {
        'touch': '2.75rem',    // 44px
        'touch-lg': '3rem',    // 48px
      },
      // Custom min widths for touch targets
      minWidth: {
        'touch': '2.75rem',    // 44px
        'touch-lg': '3rem',    // 48px
      },
      // Tepoztlán brand colors (already defined in CSS, but good to have here too)
      colors: {
        'tepoztlan': {
          earth: '#8B4513',
          sunset: '#FF6347',
          sky: '#87CEEB',
          forest: '#228B22',
          stone: '#A0522D',
          mist: '#B0C4DE',
        },
        'mexico': {
          red: '#CE1126',
          green: '#006847',
          gold: '#FFD700',
        },
      },
      // Custom font families (matches what's in CSS)
      fontFamily: {
        sans: ['var(--font-family-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-family-display)', 'Georgia', 'serif'],
        mono: ['var(--font-family-mono)', 'monospace'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      // Responsive container sizes
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
      },
      // Custom border radius for tourism cards
      borderRadius: {
        'card': '0.75rem',
        'card-lg': '1rem',
      },
      // Animation durations
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '600': '600ms',
      },
      // Touch-friendly tap highlight
      tapHighlightColor: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
