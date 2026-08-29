# BOZIC Watches - Luxury Watch Showroom

A modern, elegant Next.js showroom frontend for a luxury watch business. Built with Next.js 16, TypeScript, and Tailwind CSS, featuring a Rolex-inspired luxury design.

## 📦 Repository Contents

Beyond the Next.js showroom app (deployed via Vercel), this repository contains:

- [`Konzept.md`](Konzept.md) — Strategiepapier für den Shopify-Handel: Verwaltungsebene, Abrechnung (§25a UStG), Google/Instagram-Kundengewinnung inkl. UTM-Konvention (German)
- [`shopify-theme/`](shopify-theme/) — **BOZIC Swiss**, a complete installable Shopify OS 2.0 theme (Swiss-typography design) with catalog, product sales-mode logic, Ankauf form, cart, and the Konzept page as its own template — see [`shopify-theme/README.md`](shopify-theme/README.md) for installation
- [`DESIGN.md`](DESIGN.md) — design-system documentation for the theme (paper/ink/signal-red, Hanken Grotesk, rule-work)
- [`PRODUCT.md`](PRODUCT.md) — product truth the theme and Konzept page are built from

## 🎨 Features

- **Luxury Design**: Elegant, minimalist design inspired by premium watch brands
- **Product Showcase**: Display luxury watches with detailed specifications
- **No E-commerce**: Focus on presentation and contact, no cart or checkout
- **Shopify Integration**: Products managed via Shopify Storefront API
- **Placeholder Images**: Local placeholder images (ready for future real images)
- **Responsive**: Fully responsive design for all devices
- **Mock Data**: Works without Shopify credentials using mock data

## 📋 Pages

- `/` - Homepage with hero, featured watches, and trust section
- `/uhren` - Watch catalog with filter options
- `/uhren/[handle]` - Individual watch detail pages
- `/ankauf` - Watch buying/trading information page
- `/kontakt` - Contact page with form

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pvoegele/bozic-watches.git
cd bozic-watches
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure Shopify:
   - Copy `.env.local.example` to `.env.local`
   - Add your Shopify credentials:
     ```
     NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
     NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
     ```
   - **Note**: The app works with mock data if no credentials are provided

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

### Color Palette (Rolex-inspired)

- **Cream** (`#FAF8F3`) - Primary background
- **Sand** (`#E8E4DC`) - Light sections
- **Stone** (`#A39A8B`) - Muted text
- **Charcoal** (`#2B2826`) - Dark text
- **Gold** (`#B8964A`) - Accent color
- **Forest** (`#1A3D2E`) - Dark green accents

### Typography

- **Headings**: Georgia, serif
- **Body**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)

## 📁 Project Structure

```
bozic-watches/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── uhren/               # Watch catalog
│   ├── ankauf/              # Buying page
│   └── kontakt/             # Contact page
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── WatchCard.tsx
├── lib/                     # Utility functions
│   └── shopify.ts          # Shopify API client
├── types/                   # TypeScript types
│   └── shopify.ts
└── public/
    └── placeholders/        # Placeholder images
```

## 🔧 Shopify Configuration

### Expected Metafields (namespace: "custom")

- `brand` - Watch brand (e.g., "Rolex")
- `model` - Model name (e.g., "Submariner Date")
- `reference` - Reference number
- `year` - Year of manufacture
- `case_size_mm` - Case size in millimeters
- `material` - Case material
- `movement` - Movement type
- `condition` - Watch condition
- `availability_status` - Status: "available", "reserved", or "sold"
- `show_price` - Boolean to show/hide price

## 📝 To-Do (Future Enhancements)

- Connect real product images from Shopify
- Implement working contact form (email service)
- Add SEO optimization
- Add multi-language support (DE/EN)
- Implement working filters on catalog page
- Add CMS for content management

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Shopify Storefront API (GraphQL)
- **Images**: next/image with local placeholders

## 📄 License

Copyright © 2026 BOZIC Watches. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the repository owner.

