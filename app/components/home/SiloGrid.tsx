"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

const silos = [
  {
    id: "sanctuary",
    href: "/accommodation",
    en: { title: "The Sanctuary", subtitle: "Rest among the pines" },
    mn: { title: "Амралтын газар", subtitle: "Шинэсэн ойд амрах" },
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "hearth",
    href: "/dining",
    en: { title: "The Hearth", subtitle: "Taste of the north" },
    mn: { title: "Гал голомт", subtitle: "Хойд нутгийн амт" },
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "stillness",
    href: "/wellness",
    en: { title: "The Stillness", subtitle: "Restore your rhythm" },
    mn: { title: "Намуухан", subtitle: "Өөрийгөө сэргээ" },
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "wilderness",
    href: "/experiences",
    en: { title: "The Wilderness", subtitle: "Roam the wilds" },
    mn: { title: "Зэрлэг байгаль", subtitle: "Байгалиар аялах" },
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=80"
  }
];

export default function SiloGrid() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-warm-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                className="group block relative aspect-[3/4] overflow-hidden rounded-lg"
              >
                <img
                  src={silo.image}
                  alt={locale === 'mn' ? silo.mn.title : silo.en.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 
                    className="text-2xl md:text-3xl text-white mb-2"
                    style={{ fontFamily: "'Sloops', 'Playfair Display', serif" }}
                  >
                    {locale === 'mn' ? silo.mn.title : silo.en.title}
                  </h3>
                  <p className="font-body text-sm text-white/70 tracking-wide">
                    {locale === 'mn' ? silo.mn.subtitle : silo.en.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
