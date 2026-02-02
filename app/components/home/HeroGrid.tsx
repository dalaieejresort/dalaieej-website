"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

const gridItems = [
  {
    id: "sanctuary",
    href: "/accommodation",
    en: { title: "The Sanctuary", subtitle: "Rest among the pines" },
    mn: { title: "Амралтын газар", subtitle: "Шинэсэн ойд амрах" },
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&auto=format&fit=crop&q=80",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2"
  },
  {
    id: "hearth",
    href: "/dining",
    en: { title: "The Hearth", subtitle: "Taste of the north" },
    mn: { title: "Голомт", subtitle: "Хойд нутгийн амт" },
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
    span: "col-span-1 row-span-1"
  },
  {
    id: "stillness",
    href: "/wellness",
    en: { title: "The Stillness", subtitle: "Restore your rhythm" },
    mn: { title: "Тайван байдал", subtitle: "Өөрийгөө сэргээ" },
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80",
    span: "col-span-1 row-span-1"
  },
  {
    id: "wilderness",
    href: "/experiences",
    en: { title: "The Wilderness", subtitle: "Roam the wilds" },
    mn: { title: "Зэрлэг байгаль", subtitle: "Адал явдалд гар" },
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&auto=format&fit=crop&q=80",
    span: "col-span-1 row-span-1 md:col-span-2 md:row-span-1"
  },
];

export default function HeroGrid() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <section className="min-h-screen pt-20">
      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[300px] gap-2 md:gap-3 p-2 md:p-3">
        {gridItems.map((item, index) => {
          const content = locale === 'mn' ? item.mn : item.en;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={item.span}
            >
              <Link
                href={`${localePrefix}${item.href}`}
                className="relative block w-full h-full group overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-lake-blue/20 group-hover:bg-lake-blue/10 transition-colors duration-500 z-10" />
                <img
                  src={item.image}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
                  <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-white mb-1 group-hover:text-warm-beige transition-colors">
                    {content.title}
                  </h2>
                  <p className="font-body text-xs md:text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    {content.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
