import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium luxury color palette
        'luxury': {
          // Deep, rich blacks for backgrounds
          'black': '#0A0A0A',
          'charcoal': '#1A1A1A',
          
          // Warm whites and creams for text on dark backgrounds
          'cream': '#FAF9F6',
          'pearl': '#F5F5F0',
          'ivory': '#FFFFF0',
          
          // Metallic accents
          'gold': '#D4AF37',
          'gold-dark': '#B8860B',
          'silver': '#C0C0C0',
          'platinum': '#E5E4E2',
          
          // Accent colors
          'forest': '#1A3D2E',
          'burgundy': '#800020',
          
          // Subtle grays
          'stone': '#8B8680',
          'smoke': '#F8F8F8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'widest': '0.25em',
        'ultra-wide': '0.3em',
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'screen-2xl': '1600px',
      },
      boxShadow: {
        'subtle': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'elegant': '0 4px 30px rgba(0, 0, 0, 0.08)',
        'luxury': '0 10px 60px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
