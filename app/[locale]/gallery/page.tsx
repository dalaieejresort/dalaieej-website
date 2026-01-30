"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { X } from "lucide-react";

export default function GalleryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = [
    { id: "all", label: locale === 'mn' ? "Бүгд" : "All" },
    { id: "interiors", label: locale === 'mn' ? "Дотоод" : "Interiors" },
    { id: "lake", label: locale === 'mn' ? "Нуур" : "The Lake" },
    { id: "highlights", label: locale === 'mn' ? "Онцлох" : "Past Season Highlights" },
  ];

  const images = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80", category: "lake", alt: "Lake view" },
    { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80", category: "interiors", alt: "Bedroom interior" },
    { src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=80", category: "highlights", alt: "Cultural event" },
    { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80", category: "lake", alt: "Mountain lake" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80", category: "interiors", alt: "Living room" },
    { src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&auto=format&fit=crop&q=80", category: "highlights", alt: "Festival" },
    { src: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&auto=format&fit=crop&q=80", category: "lake", alt: "Winter lake" },
    { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80", category: "interiors", alt: "Dining room" },
    { src: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=80", category: "highlights", alt: "Horse riding" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80", category: "lake", alt: "Night sky" },
    { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop&q=80", category: "interiors", alt: "Cabin interior" },
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80", category: "highlights", alt: "Cuisine" },
    { src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80", category: "lake", alt: "Sunset lake" },
    { src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop&q=80", category: "interiors", alt: "Cabin exterior" },
    { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80", category: "highlights", alt: "Spa" },
  ];

  const filteredImages = activeFilter === "all" 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-16">
      <section className="py-12 px-4 bg-forest-green">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl text-cream mb-4"
          >
            {locale === 'mn' ? "Зургийн сан" : "Gallery"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-cream/70 max-w-2xl mx-auto"
          >
            {locale === 'mn' 
              ? "Далай Ээж Resort-ын гоо үзэсгэлэнг нүдээрээ үзээрэй"
              : "Explore the beauty of Dalai Eej Resort through our lens"}
          </motion.p>
        </div>
      </section>

      <section className="py-8 px-4 bg-cream sticky top-16 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 font-body text-sm rounded-full transition-all ${
                  activeFilter === filter.id
                    ? "bg-forest-green text-cream"
                    : "bg-white text-forest-green hover:bg-forest-green/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        index % 3 === 0 ? "h-80" : index % 3 === 1 ? "h-64" : "h-72"
                      }`}
                    />
                    <div className="absolute inset-0 bg-forest-green/0 group-hover:bg-forest-green/20 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.replace("w=800", "w=1600")}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
