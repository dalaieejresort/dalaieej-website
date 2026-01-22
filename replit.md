# Dalai Eej Resort - Luxury Hotel Landing Page

## Overview
A luxury hotel landing page for Dalai Eej Resort built with Next.js 16 (App Router). The site features a heritage luxury design with Deep Forest Green (#1A3C34), Cream (#F5F5DC), and White color scheme.

## Project Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router (flat file structure, no src/)
- **Styling**: Tailwind CSS 4
- **Fonts**: Playfair Display (headings), Lato (body) via next/font/google
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios (for Cloudbeds & QPay APIs)
- **Utilities**: clsx, tailwind-merge, uuid

### File Structure
```
app/
├── page.tsx                          # Main landing page with hero, rooms, amenities
├── layout.tsx                        # Root layout with fonts
├── globals.css                       # Theme colors and custom styles
├── booking/
│   └── page.tsx                      # Custom booking page with room search
├── payment/
│   └── page.tsx                      # QPay payment terminal
├── lib/
│   └── cloudbeds.ts                  # Cloudbeds OAuth2 token manager & API client
├── api/
│   ├── cloudbeds/
│   │   └── availability/route.ts     # Cloudbeds room availability API
│   └── qpay/
│       ├── create-invoice/route.ts   # QPay invoice creation
│       └── webhook/route.ts          # QPay payment webhook
```

### Key Features
1. **Hero Section**: Full-screen video background with fade-in title
2. **Booking Bar**: Fixed floating bar with:
   - "Book Your Stay" - Opens Cloudbeds reservation
   - "Check Availability" - Scrolls to Rooms section
3. **Rooms Section**: Three accommodation types with hover effects
4. **Amenities Section**: 4 key features with icons
5. **Custom Booking Flow**: 
   - Cloudbeds API integration for real-time room availability
   - OAuth2 client_credentials authentication
   - Date-based room search with enriched room details
6. **QPay Integration**: Payment API for Mongolian payments

### API Endpoints
- `GET /api/cloudbeds/availability?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD` - Get available rooms
- `POST /api/qpay/create-invoice` - Create QPay payment invoice

### Routes
- `/` - Landing page
- `/booking` - Room search and booking (accepts ?checkin=&checkout= params)
- `/payment` - QPay payment terminal (accepts ?bookingId=&amount= params)

### Environment Variables Required
```
# Cloudbeds API
CLOUDBEDS_CLIENT_ID=your_client_id
CLOUDBEDS_CLIENT_SECRET=your_client_secret
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
- **2026-01-22**: Added custom Cloudbeds booking integration with OAuth2 token manager, availability API, and booking page with room cards
- **2026-01-22**: Initial build - Created landing page, QPay API routes, theme styling

## User Preferences
- Flat file structure (no src/ folder)
- Next.js App Router
- Tailwind CSS for styling
- Framer Motion for animations
