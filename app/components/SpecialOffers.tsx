"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const offers = [
  {
    id: "couples",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&auto=format&fit=crop&q=80",
    promoCode: "LOVE2026",
    translationKey: "offers.couples"
  },
  {
    id: "erdenet",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    promoCode: "ERDENET",
    translationKey: "offers.erdenet"
  },
  {
    id: "early",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
    promoCode: "WELCOMEBACK",
    translationKey: "offers.early"
  }
];

export default function SpecialOffers() {
  const t = useTranslations();
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLocale = pathname.startsWith('/mn') ? 'mn' : 'en';
  const localePrefix = currentLocale === 'mn' ? '/mn' : '';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const currentOffer = offers[currentIndex];

  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
            {t('offers.title')}
          </h2>
          <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
            {t('offers.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]">
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentOffer.id}
                  src={currentOffer.image}
                  alt={t(`${currentOffer.translationKey}.title`)}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-forest-green/20" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentOffer.id}
                className="text-center lg:text-left px-4 lg:px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="inline-block bg-forest-green/10 text-forest-green font-body text-sm px-4 py-2 rounded-full mb-4">
                  {t('offers.promoLabel')}: {currentOffer.promoCode}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl text-forest-green mb-4">
                  {t(`${currentOffer.translationKey}.title`)}
                </h3>
                <p className="font-body text-forest-green/80 text-lg mb-6 leading-relaxed">
                  {t(`${currentOffer.translationKey}.desc`)}
                </p>
                <a
                  href={`${localePrefix}/booking?promo=${currentOffer.promoCode}`}
                  className="inline-block px-8 py-4 bg-forest-green text-cream font-body font-semibold rounded-lg hover:bg-forest-green/90 transition-colors duration-300"
                >
                  {t('offers.bookNow')}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-forest-green/10 hover:bg-forest-green/20 transition-colors"
              aria-label="Previous offer"
            >
              <ChevronLeft className="w-6 h-6 text-forest-green" />
            </button>

            <div className="flex gap-2">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-forest-green' : 'bg-forest-green/30'
                  }`}
                  aria-label={`Go to offer ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-forest-green/10 hover:bg-forest-green/20 transition-colors"
              aria-label="Next offer"
            >
              <ChevronRight className="w-6 h-6 text-forest-green" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
