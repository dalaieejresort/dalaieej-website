"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const offers = [
  {
    id: "stay4pay3",
    en: { title: "Stay 4, Pay 3", description: "Extended escape discount" },
    mn: { title: "4 хон, 3 төл", description: "Урт хугацааны хөнгөлөлт" },
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80",
    tag: "SEASONAL"
  },
  {
    id: "honeymoon",
    en: { title: "Honeymoon Escape", description: "Romance by the lake" },
    mn: { title: "Зодиак Аялал", description: "Нуурын эргийн романс" },
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=80",
    tag: "ROMANCE"
  },
  {
    id: "adventure",
    en: { title: "Wild at Heart", description: "7-day expedition package" },
    mn: { title: "Зэрлэг зүрх", description: "7 хоногийн адал явдал" },
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&auto=format&fit=crop&q=80",
    tag: "ADVENTURE"
  },
  {
    id: "wellness",
    en: { title: "Reset & Restore", description: "Wellness retreat" },
    mn: { title: "Сэргээх амралт", description: "Эрүүл мэндийн амралт" },
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
    tag: "WELLNESS"
  },
];

export default function OffersCarousel() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-lake-blue/60 text-sm tracking-[0.2em] uppercase mb-2">
              {locale === 'mn' ? "Тусгай санал" : "Special Offers"}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-lake-blue">
              {locale === 'mn' ? "Онцгой багцууд" : "Curated Escapes"}
            </h2>
          </div>
          <Link
            href={`${localePrefix}/offers`}
            className="hidden md:inline-flex items-center gap-2 font-body text-sm text-lake-blue hover:gap-3 transition-all"
          >
            {locale === 'mn' ? "Бүгдийг харах" : "View All"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          {offers.map((offer, index) => {
            const content = locale === 'mn' ? offer.mn : offer.en;
            
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-72 md:w-80 snap-start"
              >
                <Link
                  href={`${localePrefix}/offers`}
                  className="block group"
                >
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4">
                    <img
                      src={offer.image}
                      alt={content.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-warm-beige/90 text-lake-blue font-body text-[10px] tracking-[0.15em] uppercase rounded">
                      {offer.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-lake-blue mb-1 group-hover:text-pine-green transition-colors">
                    {content.title}
                  </h3>
                  <p className="font-body text-sm text-charcoal/60">
                    {content.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href={`${localePrefix}/offers`}
            className="inline-flex items-center gap-2 font-body text-sm text-lake-blue"
          >
            {locale === 'mn' ? "Бүгдийг харах" : "View All"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
