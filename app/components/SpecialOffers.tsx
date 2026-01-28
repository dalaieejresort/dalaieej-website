"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const offers = [
  {
    id: "couples",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.couples.title",
    descKey: "offers.couples.desc",
    offerKey: "offers.couples.offer"
  },
  {
    id: "erdenet",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.erdenet.title",
    descKey: "offers.erdenet.desc",
    offerKey: "offers.erdenet.offer"
  },
  {
    id: "pioneer",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.pioneer.title",
    descKey: "offers.pioneer.desc",
    offerKey: "offers.pioneer.offer"
  },
  {
    id: "early",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.early.title",
    descKey: "offers.early.desc",
    offerKey: "offers.early.offer"
  },
  {
    id: "longstay",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.longstay.title",
    descKey: "offers.longstay.desc",
    offerKey: "offers.longstay.offer"
  },
  {
    id: "family",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.family.title",
    descKey: "offers.family.desc",
    offerKey: "offers.family.offer"
  }
];

export default function SpecialOffers() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);

  const localePrefix = locale === 'mn' ? '/mn' : '';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const currentOffer = offers[currentIndex];

  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-sky-900 mb-4">
            {t('offers.title')}
          </h2>
          <p className="font-body text-sky-700/80 max-w-2xl mx-auto text-lg">
            {t('offers.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[450px]">
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentOffer.id}
                  src={currentOffer.image}
                  alt={t(currentOffer.titleKey)}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent" />
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
                <h3 className="font-heading text-3xl md:text-4xl text-sky-900 mb-4">
                  {t(currentOffer.titleKey)}
                </h3>
                <p className="font-body text-slate-600 text-lg mb-6 leading-relaxed">
                  {t(currentOffer.descKey)}
                </p>
                <div className="inline-block bg-amber-50 border border-amber-200 rounded-lg px-6 py-3 mb-6">
                  <p className="font-body text-amber-800 font-semibold">
                    {t(currentOffer.offerKey)}
                  </p>
                </div>
                <div className="block">
                  <a
                    href={`${localePrefix}/booking`}
                    className="inline-block px-8 py-4 bg-sky-700 text-white font-body font-semibold rounded-lg hover:bg-sky-800 transition-colors duration-300 uppercase tracking-wide"
                  >
                    {t('offers.bookNow')}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-sky-100 hover:bg-sky-200 transition-colors"
              aria-label="Previous offer"
            >
              <ChevronLeft className="w-6 h-6 text-sky-700" />
            </button>

            <div className="flex gap-2">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-sky-700' : 'bg-sky-200'
                  }`}
                  aria-label={`Go to offer ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-sky-100 hover:bg-sky-200 transition-colors"
              aria-label="Next offer"
            >
              <ChevronRight className="w-6 h-6 text-sky-700" />
            </button>
          </div>

          <div className="text-center mt-8">
            <a
              href={`${localePrefix}/offers`}
              className="font-body text-sky-700 hover:text-sky-900 underline underline-offset-4 transition-colors"
            >
              {t('nav.offers')} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
