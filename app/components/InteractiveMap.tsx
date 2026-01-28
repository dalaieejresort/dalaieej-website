"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Hotspot {
  id: string;
  top: string;
  left: string;
  titleKey: string;
  descKey: string;
}

const hotspots: Hotspot[] = [
  {
    id: "reception",
    top: "35%",
    left: "25%",
    titleKey: "map.reception.title",
    descKey: "map.reception.desc"
  },
  {
    id: "lakefront",
    top: "55%",
    left: "60%",
    titleKey: "map.lakefront.title",
    descKey: "map.lakefront.desc"
  },
  {
    id: "forest",
    top: "25%",
    left: "75%",
    titleKey: "map.forest.title",
    descKey: "map.forest.desc"
  }
];

export default function InteractiveMap() {
  const t = useTranslations();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const handleHotspotClick = (id: string) => {
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
            {t('map.title')}
          </h2>
          <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
            {t('map.subtitle')}
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80"
            alt="Resort Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-green/10" />

          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="absolute"
              style={{ top: hotspot.top, left: hotspot.left }}
            >
              <button
                onClick={() => handleHotspotClick(hotspot.id)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeHotspot === hotspot.id
                    ? "bg-cream text-forest-green scale-110"
                    : "bg-forest-green/80 text-cream hover:bg-forest-green hover:scale-110"
                }`}
              >
                <span className="text-2xl font-light">+</span>
                <span className="absolute w-full h-full rounded-full bg-forest-green/30 animate-ping" />
              </button>

              <AnimatePresence>
                {activeHotspot === hotspot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-white rounded-lg shadow-2xl p-4 z-10"
                  >
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="absolute top-2 right-2 text-forest-green/60 hover:text-forest-green"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <h3 className="font-heading text-lg text-forest-green mb-2">
                      {t(hotspot.titleKey)}
                    </h3>
                    <p className="font-body text-sm text-forest-green/70">
                      {t(hotspot.descKey)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-forest-green/60 text-sm mt-4">
          {t('map.hint')}
        </p>
      </div>
    </section>
  );
}
