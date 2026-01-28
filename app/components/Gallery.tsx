"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    alt: "Mountain landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop&q=80",
    alt: "Lake view"
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80",
    alt: "Nature scenery"
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
    alt: "Misty mountains"
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    alt: "Dramatic peaks"
  },
  {
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop&q=80",
    alt: "Waterfall"
  }
];

export default function Gallery() {
  const t = useTranslations();

  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
            {t('gallery.title')}
          </h2>
          <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
            {t('gallery.subtitle')}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-forest-green/0 hover:bg-forest-green/20 transition-colors duration-300" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
