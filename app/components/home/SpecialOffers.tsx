"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

const tabs = [
  { id: "all", en: "All", mn: "Бүгд" },
  { id: "romance", en: "Romance", mn: "Романтик" },
  { id: "events", en: "Events", mn: "Арга хэмжээ" },
  { id: "earlybird", en: "Early Bird", mn: "Эрт захиалга" }
];

const offers = [
  {
    id: 1,
    category: "romance",
    tag: { en: "SPECIAL OFFERS", mn: "ОНЦГОЙ САНАЛУУД" },
    title: { en: "Romantic Lake Retreat", mn: "Романтик Нуурын Амралт" },
    description: { en: "15% off + Complimentary Wine & Chocolate", mn: "15% хөнгөлөлт + Дарс & Шоколад бэлэг" },
    button: { en: "VIEW OFFER", mn: "САНАЛ ҮЗЭХ" },
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    category: "events",
    tag: { en: "SPECIAL OFFERS", mn: "ОНЦГОЙ САНАЛУУД" },
    title: { en: "Wedding Package", mn: "Хуримын Багц" },
    description: { en: "All-inclusive celebration by the lake", mn: "Нуурын эрэгт бүрэн багц баяр" },
    button: { en: "VIEW OFFER", mn: "САНАЛ ҮЗЭХ" },
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    category: "earlybird",
    tag: { en: "SPECIAL OFFERS", mn: "ОНЦГОЙ САНАЛУУД" },
    title: { en: "Early Bird Summer", mn: "Зуны Эрт Захиалга" },
    description: { en: "Book 60 days ahead, save 20%", mn: "60 хоногийн өмнө захиалж 20% хэмнэ" },
    button: { en: "VIEW OFFER", mn: "САНАЛ ҮЗЭХ" },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    category: "romance",
    tag: { en: "SPECIAL OFFERS", mn: "ОНЦГОЙ САНАЛУУД" },
    title: { en: "Honeymoon Escape", mn: "Зугаалгын Аялал" },
    description: { en: "5 nights luxury + spa treatment", mn: "5 шөнийн люкс + спа эмчилгээ" },
    button: { en: "VIEW OFFER", mn: "САНАЛ ҮЗЭХ" },
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80"
  }
];

export default function SpecialOffers() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [activeTab, setActiveTab] = useState("all");

  const filteredOffers = activeTab === "all" 
    ? offers 
    : offers.filter(offer => offer.category === activeTab);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-lake-blue">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl text-warm-beige mb-4"
            style={{ fontFamily: "'Sloops', 'Playfair Display', serif" }}
          >
            {locale === 'mn' ? "Онцгой Саналууд" : "Special Offers"}
          </h2>
          <p className="font-body text-warm-beige/70 max-w-2xl mx-auto">
            {locale === 'mn' 
              ? "Таны амралтыг онцгой болгох урамшуулал, багцууд" 
              : "Exclusive packages and promotions for your perfect getaway"}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-body text-sm tracking-[0.1em] uppercase transition-all duration-300 rounded-full ${
                activeTab === tab.id
                  ? "bg-warm-beige text-lake-blue"
                  : "bg-transparent text-warm-beige/60 hover:text-warm-beige border border-warm-beige/30"
              }`}
            >
              {locale === 'mn' ? tab.mn : tab.en}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-pine-green/30 rounded-lg overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={locale === 'mn' ? offer.title.mn : offer.title.en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-warm-beige/90 text-lake-blue text-xs font-body tracking-[0.1em] uppercase rounded">
                    {locale === 'mn' ? offer.tag.mn : offer.tag.en}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-warm-beige mb-2">
                    {locale === 'mn' ? offer.title.mn : offer.title.en}
                  </h3>
                  <p className="font-body text-sm text-warm-beige/70 mb-4">
                    {locale === 'mn' ? offer.description.mn : offer.description.en}
                  </p>
                  <Link
                    href={`${localePrefix}/offers`}
                    className="inline-block px-5 py-2.5 bg-warm-beige text-lake-blue font-body text-xs font-semibold tracking-[0.1em] uppercase hover:bg-white transition-colors rounded"
                  >
                    {locale === 'mn' ? offer.button.mn : offer.button.en}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
