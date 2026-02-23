import type { Metadata } from "next";
import { Playfair_Display, Lato, Pinyon_Script, Merriweather } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css";
import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/layout/Footer";

// Font Configurations for the "Heritage" Aesthetic
const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

// Dynamic SEO, Social Media, and Favicon Metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.index' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://dalaieej.com'),

    // Favicon and App Icons (Mapping files from your /public folder)
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
      ],
    },
    manifest: '/site.webmanifest',

    // Social Media Previews
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://dalaieej.com',
      siteName: 'Dalai Eej Resort',
      locale: locale === 'mn' ? 'mn_MN' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-heritage.jpg', 
          width: 1200,
          height: 630,
          alt: 'Dalai Eej Heritage Resort at Lake Khuvsgul',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-heritage.jpg'],
    },
  };
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Schema.org Markup for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Resort',
            name: 'Dalai Eej Heritage Site',
            image: 'https://dalaieej.com/images/hero.jpg',
            telephone: '+976-7011-1234',
            email: 'info@dalaieej.mn',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Khuvsgul Lake National Park',
              addressLocality: 'Khatgal',
              addressRegion: 'Khuvsgul',
              postalCode: '67143',
              addressCountry: 'MN'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '50.48479874018978',
              longitude: '100.18977589128245'
            },
            url: 'https://dalaieej.com',
            priceRange: '$$$'
          }) }}
        />
      </head>
      <body className={`${playfair.variable} ${lato.variable} ${pinyonScript.variable} ${merriweather.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <NavbarWrapper />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}