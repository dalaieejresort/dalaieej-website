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
- **HTTP Client**: Axios (for QPay API)
- **Utilities**: clsx, tailwind-merge, uuid

### File Structure
```
app/
├── page.tsx          # Main landing page with hero, rooms, amenities
├── layout.tsx        # Root layout with fonts
├── globals.css       # Theme colors and custom styles
├── api/
│   └── qpay/
│       ├── create-invoice/route.ts  # QPay invoice creation
│       └── webhook/route.ts         # QPay payment webhook
```

### Key Features
1. **Hero Section**: Full-screen video background with fade-in title
2. **Booking Bar**: Fixed floating bar with:
   - "Book Your Stay" - Opens Cloudbeds reservation
   - "Check Availability" - Scrolls to Rooms section
3. **Rooms Section**: Three accommodation types with hover effects
4. **Amenities Section**: 4 key features with icons
5. **QPay Integration**: Payment API for Mongolian payments

### Environment Variables Required
```
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
- **2026-01-22**: Initial build - Created landing page, QPay API routes, theme styling

## User Preferences
- Flat file structure (no src/ folder)
- Next.js App Router
- Tailwind CSS for styling
- Framer Motion for animations
