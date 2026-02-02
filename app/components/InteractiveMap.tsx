"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Location {
  id: string;
  category: "accommodation" | "activities";
  title: string;
  description: string;
  left: number;
  top: number;
}

const locations: Location[] = [
  {
    id: 'reception',
    category: 'accommodation',
    title: 'Reception & Restaurant',
    description: 'The main lodge featuring our lakefront dining hall and lounge bar.',
    left: 66.27,
    top: 66.2
  },
  {
    id: 'annex',
    category: 'accommodation',
    title: 'The Lodge Annex',
    description: 'Separate building housing the Lodge Rooms, adjacent to the restaurant.',
    left: 54.44,
    top: 63.5
  },
  {
    id: 'ensuite',
    category: 'accommodation',
    title: 'Ensuite Cabins (Quiet Zone)',
    description: 'Private cabins featuring indoor facilities, set back from the shoreline for privacy.',
    left: 28.32,
    top: 79.5
  },
  {
    id: 'heritage',
    category: 'accommodation',
    title: 'Heritage Cabins (Lakeside Zone)',
    description: 'Classic, wood-fired cabins positioned centrally along the water\'s edge.',
    left: 47.88,
    top: 63.43
  },
  {
    id: 'grand',
    category: 'accommodation',
    title: 'Grand Peninsula Suite',
    description: 'Premier residence commanding the tip of the peninsula.',
    left: 41.23,
    top: 71.4
  },
  {
    id: 'bathhouse',
    category: 'accommodation',
    title: 'The Bathhouse',
    description: 'Central facility with shared hot showers and restrooms.',
    left: 69.01,
    top: 71.3
  },
  {
    id: 'sauna',
    category: 'activities',
    title: 'Lakeside Sauna',
    description: 'Private wellness cabin located by the water.',
    left: 95.43,
    top: 75.53
  },
  {
    id: 'pier',
    category: 'activities',
    title: 'The Pier',
    description: 'Main boat landing, transfer point, and kayak launch.',
    left: 93.37,
    top: 66.03
  },
  {
    id: 'basketball',
    category: 'activities',
    title: 'Basketball Court',
    description: 'Sports court and location for morning yoga.',
    left: 77.55,
    top: 63.6
  },
  {
    id: 'volleyball',
    category: 'activities',
    title: 'Volleyball Court',
    description: 'Natural-surface court for recreation.',
    left: 71.22,
    top: 62.87
  },
  {
    id: 'entrance',
    category: 'activities',
    title: 'Grounds Entrance',
    description: 'Main gate to the peninsula.',
    left: 34.1,
    top: 51.3
  },
  {
    id: 'overland',
    category: 'activities',
    title: 'To Overland Grounds',
    description: 'Secure camping for tents and vehicles.',
    left: 19.43,
    top: 99.7
  },
  {
    id: 'parking',
    category: 'activities',
    title: 'To Guest Parking',
    description: 'Secure parking area.',
    left: 0.03,
    top: 58.1
  }
];

type TabType = "accommodation" | "activities";

export default function InteractiveMap() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("accommodation");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const filteredLocations = locations.filter(loc => loc.category === activeTab);
  const isArrowMarker = (id: string) => id === 'overland' || id === 'parking';

  const handleHotspotClick = (id: string) => {
    setActiveHotspot(activeHotspot === id ? null : id);
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
              Buildings & Accommodation
            </button>
            <button
              onClick={() => handleTabChange("activities")}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeTab === "activities"
                  ? "bg-forest-green text-cream shadow-md"
                  : "text-forest-green hover:bg-forest-green/10"
              }`}
            >
              Facilities & Activities
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-visible z-10" style={{ aspectRatio: '6876 / 3000' }}>
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
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: `${location.top}%`, left: `${location.left}%` }}
                >
                  <button
                    onClick={() => handleHotspotClick(location.id)}
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
                        className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-white rounded-lg shadow-2xl p-4 z-30"
                      >
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="absolute top-2 right-2 text-forest-green/60 hover:text-forest-green"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <h3 className="font-heading text-lg text-forest-green mb-2">
                          {location.title}
                        </h3>
                        <p className="font-body text-sm text-forest-green/70">
                          {location.description}
                        </p>
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
