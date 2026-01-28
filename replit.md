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
│   ├── layout.tsx                    # Locale layout with NextIntlClientProvider
│   ├── page.tsx                      # Main landing page with hero, rooms, amenities, gallery
│   ├── booking/
│   │   └── page.tsx                  # Custom booking page with room search
│   └── payment/
│       └── page.tsx                  # QPay payment terminal
├── components/
│   ├── AvailabilityBar.tsx           # Fixed booking bar with date pickers
│   ├── LanguageSwitcher.tsx          # EN/MN toggle button
│   ├── BookingButton.tsx             # Booking button component
│   ├── SpecialOffers.tsx             # Carousel with 3 special offer packages
│   ├── DiscoverGrid.tsx              # 4-card visual navigation grid (Alpine Luxury style)
│   ├── InteractiveMap.tsx            # Resort map with clickable hotspots
│   └── Navbar.tsx                    # Navigation bar with locale-conditional links
├── lib/
│   └── cloudbeds.ts                  # Cloudbeds API client (x-api-key auth)
├── api/
│   ├── cloudbeds/
│   │   └── availability/route.ts     # Cloudbeds room availability API
│   └── qpay/
│       ├── create-invoice/route.ts   # QPay invoice creation
│       └── webhook/route.ts          # QPay payment webhook
messages/
├── en.json                           # English translations
├── mn.json                           # Mongolian translations
i18n/
└── request.ts                        # next-intl configuration
middleware.ts                         # Locale routing middleware
```

### Key Features
1. **Hero Section**: Full-screen video background with fade-in title animations
2. **Booking Bar**: Fixed floating bar with:
   - "Book Your Stay" - Opens Cloudbeds reservation
   - "Check Availability" - Scrolls to Rooms section
3. **Discover Grid**: 4 large visual navigation cards (Gers, Dining, Wellness, Experiences) with hover zoom
4. **Special Offers Carousel**: Shows only for Mongolian locale - 3 packages with promo codes
5. **Interactive Map**: Resort map with 3 clickable hotspots (Reception, Lakefront Gers, Forest Cabins)
6. **Custom Booking Flow**: 
   - Cloudbeds API v1.2 integration for real-time room availability
   - Simple x-api-key authentication
   - Date-based room search with enriched room details
6. **QPay Integration**: Payment API for Mongolian payments

### API Endpoints
- `GET /api/cloudbeds/availability?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD` - Get available rooms
- `POST /api/qpay/create-invoice` - Create QPay payment invoice

### Routes
- `/` or `/en` - English landing page
- `/mn` - Mongolian landing page
- `/booking` or `/mn/booking` - Room search and booking (accepts ?checkin=&checkout= params)
- `/mn/offers` - Special Offers page (Mongolian only - grid layout with 3 offer cards)
- `/payment` or `/mn/payment` - QPay payment terminal (accepts ?bookingId=&amount=&nights= params)

### Environment Variables Required
```
# Cloudbeds API (API Key method)
CLOUDBEDS_API_KEY=your_api_key
CLOUDBEDS_PROPERTY_ID=your_property_id

# QPay API
QPAY_USERNAME=your_qpay_username
QPAY_PASSWORD=your_qpay_password
QPAY_INVOICE_CODE=DALAI_EEJ_INVOICE  # Optional
NEXT_PUBLIC_BASE_URL=https://your-domain.com  # For webhook callback
```

### Running the Project
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Recent Changes
- **2026-01-28**: Created dedicated /offers page with grid layout (3 cards, 3:4 aspect ratio)
- **2026-01-28**: Added Navbar component with conditional offers link (MN only)
- **2026-01-28**: Added InteractiveMap with clickable hotspots showing resort areas
- **2026-01-28**: Reordered homepage: Hero → DiscoverGrid → SpecialOffers (MN only) → InteractiveMap → Footer
- **2026-01-28**: Alpine Luxury redesign - added DiscoverGrid component, removed Services/Featured Rooms sections
- **2026-01-28**: Special Offers carousel now shows only for Mongolian locale
- **2026-01-28**: Added Special Offers carousel with 3 packages (Couples, Erdenet, Early Bird) and promo codes
- **2026-01-28**: Aligned homepage components with standardized nested JSON structure (home.services, home.featured_rooms)
- **2026-01-27**: Added multi-language support (English/Mongolian) with next-intl, language switcher, and translated UI
- **2026-01-27**: Enhanced payment page with mobile deep links for Mongolian banks and manual transfer section
- **2026-01-27**: Fixed booking flow: proper navigation, date defaults (3 nights), total price calculation
- **2026-01-27**: Switched to Cloudbeds API Key authentication (x-api-key header), removed OAuth setup
- **2026-01-22**: Added custom Cloudbeds booking integration with availability API and booking page
- **2026-01-22**: Initial build - Created landing page, QPay API routes, theme styling

## User Preferences
- Flat file structure (no src/ folder)
- Next.js App Router
- Tailwind CSS for styling
- Framer Motion for animations
