"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import AvailabilityBar from "../components/AvailabilityBar";
import LanguageSwitcher from "../components/LanguageSwitcher";
import DiscoverGrid from "../components/DiscoverGrid";
import SpecialOffers from "../components/SpecialOffers";
import InteractiveMap from "../components/InteractiveMap";
import WeatherWidget from "../components/WeatherWidget";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <main className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <DiscoverGrid />

      {locale === 'mn' && <SpecialOffers />}

      <InteractiveMap />

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
              <p className="font-body text-cream/70 text-sm mb-4">
                {t('footer.address')}
              </p>
              <div className="text-cream">
                <WeatherWidget />
              </div>
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
