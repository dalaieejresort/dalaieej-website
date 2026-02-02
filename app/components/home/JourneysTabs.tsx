"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, Heart, Users, User } from "lucide-react";

const journeys = [
  {
    id: "couples",
    en: { 
      tab: "For Two",
      title: "Romance by the Lake",
      description: "Escape the ordinary with your beloved. Private dinners, couples spa, and starlit evenings.",
      itinerary: ["Arrival champagne toast", "Couples massage at sunrise", "Private lakeside dinner", "Horseback ride for two"]
    },
    mn: { 
      tab: "Хосуудад",
      title: "Нуурын эргийн романс",
      description: "Хайртай хүнтэйгээ онцгой мөчүүд өнгөрүүл. Хувийн зоог, хосын спа, одод харах үдэш.",
      itinerary: ["Ирэх үеийн шампань", "Нар мандах үеийн хосын массаж", "Нуурын эргийн хувийн зоог", "Хоёулаа морь унах"]
    },
    icon: Heart,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&auto=format&fit=crop&q=80"
  },
  {
    id: "family",
    en: { 
      tab: "The Tribe",
      title: "Adventures for All Ages",
      description: "Create lifelong memories with your family. From eagle watching to campfire stories.",
      itinerary: ["Family cabin with extra beds", "Kids' nature exploration", "Fishing on the lake", "Traditional music evening"]
    },
    mn: { 
      tab: "Гэр бүлд",
      title: "Бүх насныханд адал явдал",
      description: "Гэр бүлийнхээтэй мартагдашгүй дурсамж бүтээ. Бүргэд харахаас галын дэргэдэх түүх хүртэл.",
      itinerary: ["Нэмэлт ортой гэр бүлийн байр", "Хүүхдийн байгаль судлах", "Нуур дээр загас барих", "Уламжлалт хөгжмийн үдэш"]
    },
    icon: Users,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&auto=format&fit=crop&q=80"
  },
  {
    id: "solo",
    en: { 
      tab: "Solitude",
      title: "A Journey Within",
      description: "Find yourself in the silence of the taiga. Meditation, journaling, and self-discovery.",
      itinerary: ["Private cabin retreat", "Guided meditation sessions", "Forest bathing walks", "Sunrise yoga by the lake"]
    },
    mn: { 
      tab: "Ганцаараа",
      title: "Дотоод аялал",
      description: "Тайгын чимээгүй байдалд өөрийгөө ол. Бясалгал, тэмдэглэл хөтлөх, өөрийгөө танин мэдэх.",
      itinerary: ["Хувийн байрны амралт", "Удирдамжтай бясалгал", "Ойд алхах", "Нуурын эргийн нар мандахын йог"]
    },
    icon: User,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&auto=format&fit=crop&q=80"
  },
];

export default function JourneysTabs() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [activeTab, setActiveTab] = useState("couples");

  const activeJourney = journeys.find(j => j.id === activeTab)!;
  const content = locale === 'mn' ? activeJourney.mn : activeJourney.en;

  return (
    <section className="py-16 md:py-24 bg-lake-blue">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-body text-warm-beige/60 text-sm tracking-[0.2em] uppercase mb-4">
            {locale === 'mn' ? "Өөрийн хэмнэлийг ол" : "Tailored Experiences"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-beige">
            {locale === 'mn' ? "Өөрийн хэмнэлийг олоорой" : "Find Your Rhythm"}
          </h2>
        </div>

        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {journeys.map((journey) => {
            const Icon = journey.icon;
            const tabContent = locale === 'mn' ? journey.mn : journey.en;
            
            return (
              <button
                key={journey.id}
                onClick={() => setActiveTab(journey.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-body text-sm transition-all ${
                  activeTab === journey.id
                    ? "bg-warm-beige text-lake-blue"
                    : "bg-warm-beige/10 text-warm-beige/70 hover:bg-warm-beige/20 hover:text-warm-beige"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tabContent.tab}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={activeJourney.image}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lake-blue/40 to-transparent" />
            </div>

            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-warm-beige mb-4">
                {content.title}
              </h3>
              <p className="font-body text-warm-beige/70 mb-8 leading-relaxed">
                {content.description}
              </p>

              <div className="space-y-3 mb-8">
                {content.itinerary.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-warm-beige/10 flex items-center justify-center font-body text-xs text-warm-beige/60">
                      {index + 1}
                    </span>
                    <span className="font-body text-warm-beige/80">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`${localePrefix}/booking`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-warm-beige text-lake-blue font-body font-medium rounded hover:bg-white transition-colors"
              >
                {locale === 'mn' ? "Энэ аяллыг захиалах" : "Book This Journey"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
