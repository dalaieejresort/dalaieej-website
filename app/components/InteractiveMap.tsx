"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Hotspot {
  id: string;
  top: number;
  left: number;
  title: string;
  description: string;
  isArrow?: boolean;
}

const buildingsAccommodation: Hotspot[] = [
  {
    id: "reception",
    top: 50,
    left: 50,
    title: "Reception & Restaurant",
    description: "The main lodge featuring our lakefront dining hall and lounge bar."
  },
  {
    id: "annex",
    top: 50,
    left: 50,
    title: "The Lodge Annex",
    description: "Separate building housing the Lodge Rooms, adjacent to the restaurant."
  },
  {
    id: "ensuite",
    top: 50,
    left: 50,
    title: "Ensuite Cabins (Quiet Zone)",
    description: "Private cabins featuring indoor facilities, set back from the shoreline for privacy."
  },
  {
    id: "heritage",
    top: 50,
    left: 50,
    title: "Heritage Cabins (Lakeside Zone)",
    description: "Classic, wood-fired cabins positioned centrally along the water's edge."
  },
  {
    id: "grand",
    top: 50,
    left: 50,
    title: "Grand Peninsula Suite",
    description: "Premier residence commanding the tip of the peninsula."
  },
  {
    id: "bathhouse",
    top: 50,
    left: 50,
    title: "The Bathhouse",
    description: "Central facility with shared hot showers and restrooms."
  }
];

const facilitiesActivities: Hotspot[] = [
  {
    id: "sauna",
    top: 50,
    left: 50,
    title: "Lakeside Sauna",
    description: "Private wellness cabin located by the water."
  },
  {
    id: "pier",
    top: 50,
    left: 50,
    title: "The Pier",
    description: "Main boat landing, transfer point, and kayak launch."
  },
  {
    id: "basketball",
    top: 50,
    left: 50,
    title: "Basketball Court",
    description: "Sports court and location for morning yoga."
  },
  {
    id: "volleyball",
    top: 50,
    left: 50,
    title: "Volleyball Court",
    description: "Natural-surface court for recreation."
  },
  {
    id: "entrance",
    top: 50,
    left: 50,
    title: "Grounds Entrance",
    description: "Main gate to the peninsula."
  },
  {
    id: "overland",
    top: 50,
    left: 50,
    title: "To Overland Grounds",
    description: "Secure camping for tents and vehicles.",
    isArrow: true
  },
  {
    id: "parking",
    top: 50,
    left: 50,
    title: "To Guest Parking",
    description: "Secure parking area.",
    isArrow: true
  }
];

type TabType = "buildings" | "facilities";

export default function InteractiveMap() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("buildings");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots = activeTab === "buildings" ? buildingsAccommodation : facilitiesActivities;

  const handleHotspotClick = (id: string) => {
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setActiveHotspot(null);
  };

  return (
    <section className="bg-cream py-20 px-4">
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
              onClick={() => handleTabChange("buildings")}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeTab === "buildings"
                  ? "bg-forest-green text-cream shadow-md"
                  : "text-forest-green hover:bg-forest-green/10"
              }`}
            >
              Buildings & Accommodation
            </button>
            <button
              onClick={() => handleTabChange("facilities")}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeTab === "facilities"
                  ? "bg-forest-green text-cream shadow-md"
                  : "text-forest-green hover:bg-forest-green/10"
              }`}
            >
              Facilities & Activities
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
          <img
            src="/images/resort-map.jpg"
            alt="Dalai Eej Resort Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-green/10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {hotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute"
                  style={{ top: `${hotspot.top}%`, left: `${hotspot.left}%` }}
                >
                  <button
                    onClick={() => handleHotspotClick(hotspot.id)}
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      hotspot.isArrow
                        ? `w-8 h-8 rounded-md ${
                            activeHotspot === hotspot.id
                              ? "bg-cream text-forest-green scale-110"
                              : "bg-forest-green/80 text-cream hover:bg-forest-green hover:scale-110"
                          }`
                        : `w-10 h-10 rounded-full ${
                            activeHotspot === hotspot.id
                              ? "bg-cream text-forest-green scale-110"
                              : "bg-forest-green/80 text-cream hover:bg-forest-green hover:scale-110"
                          }`
                    }`}
                  >
                    {hotspot.isArrow ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <span className="text-2xl font-light">+</span>
                    )}
                    {!hotspot.isArrow && (
                      <span className="absolute w-full h-full rounded-full bg-forest-green/30 animate-ping" />
                    )}
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
                          {hotspot.title}
                        </h3>
                        <p className="font-body text-sm text-forest-green/70">
                          {hotspot.description}
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
