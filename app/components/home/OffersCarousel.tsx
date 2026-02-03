"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const offers = [
  {
    id: 1,
    en: { 
      tag: "Special Offers",
      title: "Romantic Lake Retreat", 
      description: "15% off + Complimentary Wine & Chocolate" 
    },
    mn: { 
      tag: "Онцгой Саналууд",
      title: "Романтик Нуурын Амралт", 
      description: "15% хөнгөлөлт + Дарс & Шоколад бэлэг" 
    },
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    en: { 
      tag: "Special Offers",
      title: "Summer 2026 Early Booking", 
      description: "Book ahead and save 15%" 
    },
    mn: { 
      tag: "Онцгой Саналууд",
      title: "Зун 2026 Эрт захиалга", 
      description: "Урьдчилж төлөөд 15% хэмнэ" 
    },
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    en: { 
      tag: "Special Offers",
      title: "Honeymoon Package", 
      description: "5 nights luxury + spa treatment" 
    },
    mn: { 
      tag: "Онцгой Саналууд",
      title: "Зугаалгын Аялал", 
      description: "5 шөнийн люкс + спа эмчилгээ" 
    },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80"
  }
];

export default function OffersCarousel() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offers.length);
    }, 7000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isPaused, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (!isPaused) {
      startAutoPlay();
    }
  };

  const currentOffer = offers[activeIndex];
  const content = locale === 'mn' ? currentOffer.mn : currentOffer.en;

  return (
    <section className="bg-[#F9F8F6] py-0">
      <div 
        className="max-w-7xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
          <div className="relative h-[350px] lg:h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentOffer.id}
                src={currentOffer.image}
                alt={content.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center justify-center px-8 lg:px-16 py-16 lg:py-0">
            <p className="text-xs tracking-[0.3em] uppercase text-[#3A4D3F]/70 mb-12">
              {content.tag}
            </p>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentOffer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#3A4D3F] mb-6 font-light">
                  {content.title}
                </h3>
                <p className="font-body text-[#3A4D3F]/60 text-base mb-10">
                  {content.description}
                </p>
                <Link
                  href={`${localePrefix}/offers`}
                  className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#3A4D3F] hover:text-[#3A4D3F]/70 transition-colors duration-300"
                >
                  <span>{locale === 'mn' ? "Санал Үзэх" : "View Offer"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-16">
              {offers.map((offer, index) => (
                <button
                  key={offer.id}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-[#3A4D3F]" 
                      : "bg-[#3A4D3F]/20 hover:bg-[#3A4D3F]/40"
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
