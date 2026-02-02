"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const personas = [
  {
    id: 1,
    en: { 
      title: "COUPLES",
      description: "Intimate escapes designed for two. Private dinners, spa retreats, and sunset moments by the lake."
    },
    mn: { 
      title: "ХОСУУД",
      description: "Хоёулаа төгс цагийг өнгөрүүлэх. Хувийн оройн хоол, спа амралт, нуурын хөвөөнд нар жаргах үзэгдэл."
    },
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80",
    href: "/experiences/couples"
  },
  {
    id: 2,
    en: { 
      title: "FAMILIES",
      description: "Create lasting memories together. Activities for all ages, from horseback riding to stargazing nights."
    },
    mn: { 
      title: "УРАГ ТӨРӨЛ",
      description: "Гэр бүлийн дурсамж бүтээх. Морь унах, од харах шөнөөс бүх насныханд зориулсан үйл ажиллагаа."
    },
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&auto=format&fit=crop&q=80",
    href: "/experiences/families"
  },
  {
    id: 3,
    en: { 
      title: "FRIENDS",
      description: "Adventures best shared. Group dining, bonfire nights, and explorations across the wilderness."
    },
    mn: { 
      title: "НАЙЗ НӨХӨД",
      description: "Хамтдаа адал явдал. Бүлгийн хоол, гал дотуур шөнө, байгалийн үзэсгэлэнт газраар аялах."
    },
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80",
    href: "/experiences/friends"
  },
  {
    id: 4,
    en: { 
      title: "ORGANIZATIONS",
      description: "Inspire your team in nature. Retreat facilities, team building, and conference spaces with a view."
    },
    mn: { 
      title: "БАЙГУУЛЛАГУУД",
      description: "Багаа байгалийн дунд урамшуулаарай. Багийн уулзалт, тийм билдинг, үзэсгэлэнт хурлын танхим."
    },
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop&q=80",
    href: "/experiences/organizations"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export default function PersonaSlider() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = activeIndex + newDirection;
    if (newIndex < 0) {
      setActiveIndex([personas.length - 1, newDirection]);
    } else if (newIndex >= personas.length) {
      setActiveIndex([0, newDirection]);
    } else {
      setActiveIndex([newIndex, newDirection]);
    }
  };

  const currentPersona = personas[activeIndex];
  const content = locale === 'mn' ? currentPersona.mn : currentPersona.en;

  return (
    <section className="py-16 md:py-24 bg-lake-blue">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center font-body text-warm-beige/60 text-xs tracking-[0.3em] uppercase mb-6">
          {locale === 'mn' ? "Дурсамж Бүтээгээрэй" : "Make Memories"}
        </p>

        <div className="relative">
          <div className="relative aspect-[16/9] md:aspect-[2.5/1] overflow-hidden rounded-lg">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPersona.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0"
              >
                <Image
                  src={currentPersona.image}
                  alt={content.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lake-blue/60 via-lake-blue/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-warm-beige/20 hover:bg-warm-beige/40 backdrop-blur-sm rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-warm-beige/20 hover:bg-warm-beige/40 backdrop-blur-sm rounded-full transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-body text-warm-beige/50 text-sm mb-2">
                {activeIndex + 1} / {personas.length}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPersona.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-beige mb-3">
                    {content.title}
                  </h3>
                  <p className="font-body text-warm-beige/70 max-w-xl">
                    {content.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Link
              href={`${localePrefix}${currentPersona.href}`}
              className="group inline-flex items-center gap-2 font-body text-sm tracking-[0.15em] uppercase text-warm-beige hover:text-white transition-colors"
            >
              <span>{locale === 'mn' ? "Дэлгэрэнгүй" : "Explore"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {personas.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex([index, index > activeIndex ? 1 : -1])}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-warm-beige w-6" 
                    : "bg-warm-beige/30 hover:bg-warm-beige/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
