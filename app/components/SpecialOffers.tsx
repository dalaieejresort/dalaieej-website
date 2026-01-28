"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

const offers = [
  {
    id: "couples",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.couples.title",
    descKey: "offers.couples.offer"
  },
  {
    id: "erdenet",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.erdenet.title",
    descKey: "offers.erdenet.offer"
  },
  {
    id: "early",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
    titleKey: "offers.early.title",
    descKey: "offers.early.offer"
  }
];

export default function SpecialOffers() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);

  const localePrefix = locale === 'mn' ? '/mn' : '';
  const currentOffer = offers[currentIndex];

  return (
    <section className="bg-[#F9F8F6] py-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
          <div className="relative h-[350px] lg:h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentOffer.id}
                src={currentOffer.image}
                alt={t(currentOffer.titleKey)}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center justify-center px-8 lg:px-16 py-16 lg:py-0">
            <p className="text-xs tracking-[0.3em] uppercase text-[#3A4D3F]/70 mb-12">
              {t('offers.title')}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentOffer.id}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#3A4D3F] mb-6 font-light">
                  {t(currentOffer.titleKey)}
                </h3>
                <p className="font-body text-[#3A4D3F]/60 text-base mb-10">
                  {t(currentOffer.descKey)}
                </p>
                <a
                  href={`${localePrefix}/offers`}
                  className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#3A4D3F] hover:text-[#3A4D3F]/70 transition-colors duration-300"
                >
                  <span>{t('offers.viewOffer')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-16">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#3A4D3F]' 
                      : 'bg-[#3A4D3F]/20 hover:bg-[#3A4D3F]/40'
                  }`}
                  aria-label={`Go to offer ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
