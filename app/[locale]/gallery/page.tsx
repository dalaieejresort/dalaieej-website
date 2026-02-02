import { Metadata } from 'next';
import GalleryGrid from '@/app/components/gallery/GalleryGrid';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'mn' 
      ? 'Дурсамж Гэрэл Зурагт | Далай Ээж Ресорт' 
      : 'Visual Journey | Dalai Eej Resort',
    description: 'Explore the beauty of Khuvsgul Lake, our luxury cabins, and the wilderness. A visual guide to Dalai Eej Resort.',
  };
}

const galleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Dalai Eej Resort Photo Gallery',
  description: 'A visual journey through Dalai Eej Resort on Lake Khuvsgul, Mongolia',
  url: 'https://dalaieej.mn/gallery',
  about: {
    '@type': 'Resort',
    name: 'Dalai Eej Resort'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Dalai Eej Resort',
    url: 'https://dalaieej.mn'
  }
};

export default async function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <GalleryGrid />
    </>
  );
}
