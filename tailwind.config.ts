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
        // Luxury Rolex-inspired color palette
        'luxury': {
          'cream': '#FAF8F3',     // Background
          'sand': '#E8E4DC',      // Light sections
          'stone': '#A39A8B',     // Muted text
          'charcoal': '#2B2826',  // Dark text
          'gold': '#B8964A',      // Accent
          'forest': '#1A3D2E',    // Dark green
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
