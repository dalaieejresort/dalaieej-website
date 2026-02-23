import type { Metadata } from "next";
import { Playfair_Display, Lato, Pinyon_Script, Merriweather } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css";
import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Dalai Eej Resort | Luxury Hotel in Mongolia",
  description: "Experience the timeless beauty of Mongolia in unparalleled luxury at Dalai Eej Resort. Book your stay today.",
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Resort',
            name: 'Dalai Eej Resort',
            image: 'https://dalaieej.mn/images/hero.jpg',
            telephone: '+976-7011-1234',
            email: 'hello@dalaieej.com',
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
            url: 'https://dalaieej.mn',
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
