"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

const silos = [
  {
    id: "stay",
    href: "/accommodation",
    en: "STAY",
    mn: "БАЙРЛАХ",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "dining",
    href: "/dining",
    en: "DINING",
    mn: "ЗООГ",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "wellness",
    href: "/wellness",
    en: "WELLNESS",
    mn: "АМРАХУЙ",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "adventure",
    href: "/experiences",
    en: "ADVENTURE",
    mn: "АДАЛ ЯВДАЛ",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=80"
  }
];

export default function SiloGrid() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-warm-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {silos.map((silo, index) => (
            <motion.div
              key={silo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`${localePrefix}${silo.href}`}
                className="group block relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-lg"
              >
                <img
                  src={silo.image}
                  alt={locale === 'mn' ? silo.mn : silo.en}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 
                    className="text-4xl md:text-5xl lg:text-6xl text-white tracking-wide"
                    style={{ fontFamily: "'Sloops', 'Playfair Display', serif" }}
                  >
                    {locale === 'mn' ? silo.mn : silo.en}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
