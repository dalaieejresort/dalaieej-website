"use client";

import { useLocale } from 'next-intl';
import HeroGrid from "../components/home/HeroGrid";
import EditorialIntro from "../components/home/EditorialIntro";
import OffersCarousel from "../components/home/OffersCarousel";
import JourneysTabs from "../components/home/JourneysTabs";
import InteractiveMap from "../components/InteractiveMap";
import AvailabilityBar from "../components/AvailabilityBar";
import WeatherWidget from "../components/WeatherWidget";

export default function Home() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <main className="relative min-h-screen">
      <HeroGrid />
      
      <EditorialIntro />
      
      <OffersCarousel />
      
      <JourneysTabs />
      
      <InteractiveMap />

      <footer className="bg-lake-blue py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
            <div className="md:col-span-2">
              <h3 className="font-serif text-3xl text-warm-beige mb-4">Dalai Eej Resort</h3>
              <p className="font-body text-warm-beige/60 max-w-md">
                {locale === 'mn' 
                  ? "Дэлхийн захад байрлах хоргодох газар. Хөвсгөл нуурын эрэг дээр."
                  : "A refuge at the edge of the world. On the shores of Lake Khuvsgul."}
              </p>
            </div>
            <div>
              <h4 className="font-body text-sm text-warm-beige/40 tracking-[0.15em] uppercase mb-4">
                {locale === 'mn' ? "Холбоо барих" : "Contact"}
              </h4>
              <p className="font-body text-warm-beige/70 text-sm mb-2">info@dalaieej.mn</p>
              <p className="font-body text-warm-beige/70 text-sm mb-4">+976 7011 1234</p>
              <div className="text-warm-beige">
                <WeatherWidget />
              </div>
            </div>
            <div>
              <h4 className="font-body text-sm text-warm-beige/40 tracking-[0.15em] uppercase mb-4">
                {locale === 'mn' ? "Байршил" : "Location"}
              </h4>
              <p className="font-body text-warm-beige/70 text-sm">
                {locale === 'mn' 
                  ? "Хөвсгөл Нуурын Үндэсний Цогцолборт Газар, Хатгал, Монгол"
                  : "Khuvsgul Lake National Park, Khatgal, Mongolia"}
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-warm-beige/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-warm-beige/40 text-sm">
              &copy; {new Date().getFullYear()} Dalai Eej Resort. {locale === 'mn' ? "Бүх эрх хамгаалагдсан." : "All rights reserved."}
            </p>
            <div className="flex gap-6">
              <a href={`${localePrefix}/contact`} className="font-body text-warm-beige/40 text-sm hover:text-warm-beige transition-colors">
                {locale === 'mn' ? "Нууцлалын бодлого" : "Privacy"}
              </a>
              <a href={`${localePrefix}/contact`} className="font-body text-warm-beige/40 text-sm hover:text-warm-beige transition-colors">
                {locale === 'mn' ? "Үйлчилгээний нөхцөл" : "Terms"}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AvailabilityBar />
    </main>
  );
}
