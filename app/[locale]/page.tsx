"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import AvailabilityBar from "../components/AvailabilityBar";
import LanguageSwitcher from "../components/LanguageSwitcher";
import SpecialOffers from "../components/SpecialOffers";

const roomImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80",
];

const serviceIcons = [Star, MapPin, Users, Calendar];

export default function Home() {
  const t = useTranslations();
  const pathname = usePathname();
  const roomsRef = useRef<HTMLDivElement>(null);
  
  const currentLocale = pathname.startsWith('/mn') ? 'mn' : 'en';
  const localePrefix = currentLocale === 'mn' ? '/mn' : '';
  
  const services = [
    { icon: serviceIcons[0], titleKey: 'home.services.service1_title', descKey: 'home.services.service1_desc' },
    { icon: serviceIcons[1], titleKey: 'home.services.service2_title', descKey: 'home.services.service2_desc' },
    { icon: serviceIcons[2], titleKey: 'home.services.service3_title', descKey: 'home.services.service3_desc' },
    { icon: serviceIcons[3], titleKey: 'home.services.service4_title', descKey: 'home.services.service4_desc' },
  ];
  
  const featuredRooms = [
    { nameKey: 'home.featured_rooms.room1_name', descKey: 'home.featured_rooms.room1_desc', priceKey: 'home.featured_rooms.room1_price', image: roomImages[0] },
    { nameKey: 'home.featured_rooms.room2_name', descKey: 'home.featured_rooms.room2_desc', priceKey: 'home.featured_rooms.room2_price', image: roomImages[1] },
    { nameKey: 'home.featured_rooms.room3_name', descKey: 'home.featured_rooms.room3_desc', priceKey: 'home.featured_rooms.room3_price', image: roomImages[2] },
  ];

  const scrollToRooms = () => {
    roomsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-forest-green">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&auto=format&fit=crop&q=80"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-forest-green/50 via-transparent to-forest-green/80" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-wide"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-body text-lg md:text-xl text-cream/90 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-cream/70"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      <section className="bg-cream py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
              {t('home.services.title')}
            </h2>
            <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.titleKey} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-green/10 mb-4">
                  <service.icon className="w-8 h-8 text-forest-green" />
                </div>
                <h3 className="font-heading text-xl text-forest-green mb-2">{t(service.titleKey)}</h3>
                <p className="font-body text-forest-green/70">{t(service.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={roomsRef} id="rooms" className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
              {t('home.featured_rooms.title')}
            </h2>
            <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
              {t('home.featured_rooms.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div key={room.nameKey} className="group cursor-pointer">
                <a href={`${localePrefix}/booking`}>
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={room.image}
                      alt={t(room.nameKey)}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-forest-green/20 group-hover:bg-forest-green/40 transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading text-2xl text-forest-green mb-2">{t(room.nameKey)}</h3>
                  <p className="font-body text-forest-green/70 mb-2">{t(room.descKey)}</p>
                  <p className="font-body text-forest-green font-semibold">{t(room.priceKey)}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpecialOffers />

      <section className="bg-forest-green py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6">
            {t('cta.title')}
          </h2>
          <p className="font-body text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToRooms}
              className="px-8 py-4 border-2 border-cream text-cream font-body font-semibold rounded-lg hover:bg-cream/10 transition-colors duration-300"
            >
              {t('cta.viewRooms')}
            </button>
            <a
              href={`${localePrefix}/booking`}
              className="px-8 py-4 bg-cream text-forest-green font-body font-semibold rounded-lg hover:bg-white transition-colors duration-300"
            >
              {t('cta.bookNow')}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-forest-green/95 py-12 px-4 border-t border-cream/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-heading text-2xl text-cream mb-4">{t('hero.title')}</h3>
              <p className="font-body text-cream/70 text-sm">
                {t('hero.subtitle')}
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg text-cream mb-4">{t('footer.contact_title')}</h4>
              <p className="font-body text-cream/70 text-sm">info@dalaieej.com</p>
              <p className="font-body text-cream/70 text-sm">+976 XXXX XXXX</p>
            </div>
            <div>
              <h4 className="font-heading text-lg text-cream mb-4">{t('footer.location_title')}</h4>
              <p className="font-body text-cream/70 text-sm">
                {t('footer.address')}
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg text-cream mb-4">{t('footer.links_title')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href={localePrefix || "/"} className="font-body text-cream/70 text-sm hover:text-cream transition-colors">
                    {t('nav.home')}
                  </a>
                </li>
                <li>
                  <a href="#rooms" className="font-body text-cream/70 text-sm hover:text-cream transition-colors">
                    {t('nav.rooms')}
                  </a>
                </li>
                <li>
                  <a href={`${localePrefix}/booking`} className="font-body text-cream/70 text-sm hover:text-cream transition-colors">
                    {t('nav.book')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-cream/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-cream/50 text-sm">
              &copy; {new Date().getFullYear()} {t('hero.title')}. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-cream/50 text-sm hover:text-cream transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="font-body text-cream/50 text-sm hover:text-cream transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AvailabilityBar />
    </main>
  );
}
