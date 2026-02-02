import type { Metadata } from 'next';

const jsonLd = {
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
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+976-7011-1234',
    contactType: 'reservations',
    'areaServed': ['MN', 'US', 'KR', 'DE', 'GB', 'JP', 'CN', 'RU', 'FR'],
    availableLanguage: ['English', 'Mongolian']
  },
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Free Airport Transfer',
      value: 'True'
    }
  ],
  url: 'https://dalaieej.mn',
  priceRange: '$$$'
};

export const metadata: Metadata = {
  title: 'Dalai Eej Resort | Luxury Lakeside Retreat at Khuvsgul',
  description: 'Experience luxury and nature at Dalai Eej Resort on the shores of Lake Khuvsgul, Mongolia. Forest cabins, fine dining, and unforgettable adventures await.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
