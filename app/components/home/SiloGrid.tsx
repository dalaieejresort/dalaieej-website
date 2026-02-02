"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

const silos = [
  {
    id: "stay",
    href: "/accommodation",
    en: "Sanctuary",
    mn: "Өргөө",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "dining",
    href: "/dining",
    en: "Hearth",
    mn: "Гал голомт",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "wellness",
    href: "/wellness",
    en: "Stillness",
    mn: "Анир",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "adventure",
    href: "/experiences",
    en: "Wilderness",
    mn: "Хөвч",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80"
  }
];

export default function SiloGrid() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {silos.map((silo) => (
          <Link
            key={silo.id}
            href={`${localePrefix}${silo.href}`}
            className="group relative h-[50vh] md:h-[60vh] overflow-hidden"
          >
            <img
              src={silo.image}
              alt={locale === 'mn' ? silo.mn : silo.en}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-sloops text-3xl md:text-4xl lg:text-5xl text-white text-center tracking-wider capitalize">
                {locale === 'mn' ? silo.mn : silo.en}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}