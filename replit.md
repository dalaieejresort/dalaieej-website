# Dalai Eej Resort - Luxury Hotel Landing Page

## Overview
A luxury hotel landing page for Dalai Eej Resort built with Next.js 16 (App Router). The site features a heritage luxury design with Deep Forest Green (#1A3C34), Cream (#F5F5DC), and White color scheme. Supports English and Mongolian languages.

## Project Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router (flat file structure, no src/)
- **Styling**: Tailwind CSS 4
- **Fonts**: Playfair Display (headings), Lato (body) via next/font/google
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios (for Cloudbeds & QPay APIs)
- **i18n**: next-intl for English/Mongolian support
- **Utilities**: clsx, tailwind-merge, uuid

### File Structure
```
app/
├── layout.tsx                        # Root layout (minimal wrapper)
├── globals.css                       # Theme colors and custom styles
├── [locale]/
│   ├── layout.tsx                    # Locale layout with NextIntlClientProvider + NavbarWrapper
│   ├── page.tsx                      # Main landing page with hero, discover grid, map
│   ├── about/
│   │   ├── page.tsx                  # About Us main page
│   │   ├── the-family/page.tsx       # The Family subpage
│   │   └── the-lake/page.tsx         # The Lake subpage
│   ├── cabins/page.tsx               # Forest Cabins accommodation page
│   ├── lodge/page.tsx                # Main Lodge accommodation page
│   ├── restaurant/page.tsx           # Restaurant & dining page
│   ├── experiences/page.tsx          # Activities & adventures page
│   ├── wellness/page.tsx             # Spa & wellness page
│   ├── celebrate/page.tsx            # Meet & Celebrate events page
│   ├── stories/page.tsx              # Blog/Stories page (Dalai Eej Stories)
│   ├── location/page.tsx             # How to Reach Us with map placeholder
│   ├── gallery/page.tsx              # Masonry photo gallery with category filtering
│   ├── amenities/page.tsx            # Amenities & Guest Experience page
│   ├── booking/page.tsx              # Custom booking page with room search
│   ├── offers/page.tsx               # Special Offers page (Mongolian only)
│   ├── fam-tour-application/page.tsx # FAM Tour application form
│   └── payment/page.tsx              # QPay payment terminal
├── components/
│   ├── Navbar.tsx                    # Navigation with hover dropdowns + Gallery icon
│   ├── NavbarWrapper.tsx             # Server-side wrapper for Navbar
│   ├── LanguageSwitcher.tsx          # EN/MN toggle button
│   ├── AvailabilityBar.tsx           # Fixed booking bar with date pickers
│   ├── BookingButton.tsx             # Booking button component
│   ├── SpecialOffers.tsx             # Carousel with 3 special offer packages
│   ├── DiscoverGrid.tsx              # 4-card visual navigation grid
│   ├── InteractiveMap.tsx            # Resort map with clickable hotspots
│   └── WeatherWidget.tsx             # Weather display for Khuvsgul Lake
├── lib/
│   └── cloudbeds.ts                  # Cloudbeds API client (x-api-key auth)
├── api/
│   ├── cloudbeds/availability/route.ts
│   ├── qpay/create-invoice/route.ts
│   ├── qpay/webhook/route.ts
│   └── weather/route.ts              # OpenWeatherMap API route
messages/
├── en.json                           # English translations
├── mn.json                           # Mongolian translations
i18n/
└── request.ts                        # next-intl configuration
middleware.ts                         # Locale routing middleware
```

### Key Features
1. **Hero Section**: Full-screen video background with fade-in title animations
2. **Navigation Bar**: 
   - Hover dropdowns for About Us (The Family, The Lake) and Accommodations (Cabins, Lodge)
   - All links visible (no hamburger menu) - horizontal scroll on mobile
   - Gallery icon (Grid) separate from language switcher
3. **Discover Grid**: 4 large visual navigation cards with hover zoom
4. **Special Offers Carousel**: Shows only for Mongolian locale - 3 packages with promo codes
5. **Gallery Page**: Masonry grid with category filtering (All, Interiors, The Lake, Past Season Highlights)
6. **Interactive Map**: Resort map with 3 clickable hotspots
7. **Custom Booking Flow**: Cloudbeds API v1.2 integration
8. **QPay Integration**: Payment API for Mongolian payments

### API Endpoints
- `GET /api/cloudbeds/availability?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD` - Get available rooms
- `POST /api/qpay/create-invoice` - Create QPay payment invoice
- `GET /api/weather` - Get current weather for Khuvsgul Lake

### Routes
- `/` or `/en` - English landing page
- `/mn` - Mongolian landing page
- `/about` - About Us main page
- `/about/the-family` - The Family story page
- `/about/the-lake` - Lake Khuvsgul information
- `/cabins` - Forest Cabins accommodation
- `/lodge` - Main Lodge accommodation
- `/restaurant` - Restaurant & dining
- `/experiences` - Activities & adventures
- `/wellness` - Spa & wellness
- `/celebrate` - Meet & Celebrate events
- `/stories` - Blog (Dalai Eej Stories)
- `/location` - How to Reach Us with directions
- `/gallery` - Photo gallery with filtering
- `/amenities` - Amenities & Guest Experience page
- `/booking` - Room search and booking
- `/mn/offers` - Special Offers page (Mongolian only)
- `/fam-tour-application` - FAM Tour application form
- `/payment` - QPay payment terminal

### Environment Variables Required
```
# Cloudbeds API (API Key method)
CLOUDBEDS_API_KEY=your_api_key
CLOUDBEDS_PROPERTY_ID=your_property_id

# QPay API
QPAY_USERNAME=your_qpay_username
QPAY_PASSWORD=your_qpay_password
QPAY_INVOICE_CODE=DALAI_EEJ_INVOICE
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Weather API
OPENWEATHERMAP_API_KEY=your_api_key
```

### Running the Project
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Recent Changes
- **2026-01-30**: Major content expansion - added 10 new pages (cabins, lodge, restaurant, experiences, wellness, celebrate, stories, location, the-family, the-lake)
- **2026-01-30**: Created Gallery page with masonry grid and category filtering (All, Interiors, The Lake, Past Season Highlights)
- **2026-01-30**: Updated Navbar with hover dropdowns for About Us and Accommodations
- **2026-01-30**: Added Gallery icon (Grid3X3) to Navbar, separate from language switcher
- **2026-01-30**: Fixed global Navbar - moved to locale layout, removed duplicates from individual pages
- **2026-01-28**: Updated InteractiveMap to use custom image from App Storage
- **2026-01-28**: Added custom Sloops font from App Storage for DiscoverGrid titles
- **2026-01-28**: Created About Us page with hero, story, mission quote, and experience cards
- **2026-01-28**: Implemented FAM Tour Application system for tour operators
- **2026-01-28**: Redesigned navigation bar - no hamburger menu, horizontal scroll on mobile
- **2026-01-28**: Created Amenities & Guest Experience page
- **2026-01-28**: Added WeatherWidget component with OpenWeatherMap integration
- **2026-01-27**: Added multi-language support (English/Mongolian) with next-intl
- **2026-01-22**: Initial build - Created landing page, QPay API routes, theme styling

## User Preferences
- Flat file structure (no src/ folder)
- Next.js App Router
- Tailwind CSS for styling
- Framer Motion for animations
- No hamburger menu - all navigation links must be visible text
- Luxury resort aesthetic - whitespace, serif fonts, high-quality images
