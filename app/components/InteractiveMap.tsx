"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Location {
  id: string;
  category: "accommodation" | "activities";
  left: number;
  top: number;
  image?: string;
}

const locations: Location[] = [
  { id: 'reception', category: 'accommodation', left: 66.27, top: 66.2, image: '/images/map/reception.jpg' },
  { id: 'annex', category: 'accommodation', left: 54.44, top: 63.5, image: '/images/map/annex.jpg' },
  { id: 'ensuite', category: 'accommodation', left: 28.32, top: 79.5, image: '/images/map/ensuite.jpg' },
  { id: 'heritage', category: 'accommodation', left: 47.88, top: 63.43, image: '/images/map/heritage.jpg' },
  { id: 'grand', category: 'accommodation', left: 41.23, top: 71.4, image: '/images/map/grand.jpg' },
  { id: 'bathhouse', category: 'accommodation', left: 69.01, top: 71.3, image: '/images/map/bathhouse.jpg' },
  { id: 'sauna', category: 'activities', left: 95.43, top: 75.53, image: '/images/map/sauna.jpg' },
  { id: 'pier', category: 'activities', left: 93.37, top: 66.03, image: '/images/map/pier.jpg' },
  { id: 'basketball', category: 'activities', left: 77.55, top: 63.6, image: '/images/map/basketball.jpg' },
  { id: 'volleyball', category: 'activities', left: 71.22, top: 62.87, image: '/images/map/volleyball.jpg' },
  { id: 'entrance', category: 'activities', left: 34.1, top: 51.3, image: '/images/map/entrance.jpg' },
  { id: 'overland', category: 'activities', left: 19.43, top: 99.7, image: '/images/map/overland.jpg' },
  { id: 'parking', category: 'activities', left: 0.03, top: 58.1, image: '/images/map/parking.jpg' }
];

type TabType = "accommodation" | "activities";

export default function InteractiveMap() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("accommodation");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const filteredLocations = locations.filter(loc => loc.category === activeTab);
  const isArrowMarker = (id: string) => id === 'overland' || id === 'parking';

  const handleHotspotClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  const handleBackgroundClick = () => {
    setActiveHotspot(null);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setActiveHotspot(null);
  };

  return (
    <section className="bg-cream py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
            {t('map.title')}
          </h2>
          <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
            {t('map.subtitle')}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-forest-green/10 rounded-full p-1">
            <button
              onClick={() => handleTabChange("accommodation")}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeTab === "accommodation"
                  ? "bg-forest-green text-cream shadow-md"
                  : "text-forest-green hover:bg-forest-green/10"
              }`}
            >
              {t('map.tabs.accommodation')}
            </button>
            <button
              onClick={() => handleTabChange("activities")}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeTab === "activities"
                  ? "bg-forest-green text-cream shadow-md"
                  : "text-forest-green hover:bg-forest-green/10"
              }`}
            >
              {t('map.tabs.activities')}
            </button>
          </div>
        </div>

        <div 
          className="relative w-full overflow-visible z-10 cursor-pointer" 
          style={{ aspectRatio: '6876 / 3000' }}
          onClick={handleBackgroundClick}
        >
          <img
            src="/images/resort-map.jpg"
            alt="Dalai Eej Resort Map"
            className="w-full h-full object-fill rounded-lg shadow-2xl"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
            >
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 ${activeHotspot === location.id ? 'z-50' : 'z-20'}`}
                  style={{ top: `${location.top}%`, left: `${location.left}%` }}
                >
                  <button
                    onClick={(e) => handleHotspotClick(e, location.id)}
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      isArrowMarker(location.id)
                        ? `w-8 h-8 rounded-md ${
                            activeHotspot === location.id
                              ? "bg-cream text-forest-green scale-110"
                              : "bg-forest-green/80 text-cream hover:bg-forest-green hover:scale-110"
                          }`
                        : `w-10 h-10 rounded-full ${
                            activeHotspot === location.id
                              ? "bg-cream text-forest-green scale-110"
                              : "bg-forest-green/80 text-cream hover:bg-forest-green hover:scale-110"
                          }`
                    }`}
                  >
                    {isArrowMarker(location.id) ? (
                      <ArrowUpRight className="w-5 h-5 rotate-180" />
                    ) : (
                      <span className="text-2xl font-light">+</span>
                    )}
                    {!isArrowMarker(location.id) && (
                      <span className="absolute w-full h-full rounded-full bg-forest-green/30 animate-ping" />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeHotspot === location.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-12 left-1/2 -translate-x-1/2 w-72 bg-white rounded-xl shadow-xl overflow-hidden z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center bg-white/90 rounded-full text-forest-green/70 hover:text-forest-green hover:bg-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {location.image && (
                          <div className="aspect-video w-full">
                            <img
                              src={location.image}
                              alt={t(`map.${location.id}.title`)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-heading text-lg text-forest-green mb-2">
                            {t(`map.${location.id}.title`)}
                          </h3>
                          <p className="font-body text-sm text-forest-green/70">
                            {t(`map.${location.id}.desc`)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center font-body text-forest-green/60 text-sm mt-4">
          {t('map.hint')}
        </p>
      </div>
    </section>
  );
}
