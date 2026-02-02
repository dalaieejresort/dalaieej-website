"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { X, Instagram, Facebook, Phone, MapPin, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { 
    id: "stay",
    href: "/accommodation",
    en: "STAY",
    mn: "БАЙРЛАХ",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop&q=80"
  },
  { 
    id: "dining",
    href: "/dining",
    en: "DINING",
    mn: "ЗООГ",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
  },
  { 
    id: "wellness",
    href: "/wellness",
    en: "WELLNESS",
    mn: "АМРАХУЙ",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80"
  },
  { 
    id: "adventure",
    href: "/experiences",
    en: "ADVENTURE",
    mn: "АДАЛ ЯВДАЛ",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=80"
  },
  { 
    id: "offers",
    href: "/offers",
    en: "OFFERS",
    mn: "УРАМШУУЛАЛ",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80"
  },
  { 
    id: "about",
    href: "/about",
    en: "ABOUT",
    mn: "БИДНИЙ ТУХАЙ",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80"
  },
  { 
    id: "visit",
    href: "/contact",
    en: "VISIT",
    mn: "ЗОЧЛОХ",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80"
  },
];

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeImage = hoveredLink 
    ? navLinks.find(link => link.id === hoveredLink)?.image 
    : navLinks[0].image;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-lake-blue"
        >
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="flex justify-end p-6 md:p-10">
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="text-warm-beige/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-warm-beige/50 rounded-lg p-1"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row px-6 md:px-16 lg:px-24 pb-10">
              <div className="flex-1 flex flex-col justify-center">
                <nav className="space-y-2 md:space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={`${localePrefix}${link.href}`}
                        onClick={onClose}
                        onMouseEnter={() => setHoveredLink(link.id)}
                        onMouseLeave={() => setHoveredLink(null)}
                        onFocus={() => setHoveredLink(link.id)}
                        className="block font-serif text-3xl md:text-4xl lg:text-5xl text-warm-beige/70 hover:text-white focus:text-white transition-colors duration-300 focus:outline-none focus:underline"
                      >
                        {locale === 'mn' ? link.mn : link.en}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 mt-10"
                >
                  <a
                    href="tel:+97670111234"
                    className="flex items-center gap-2 px-4 py-3 min-h-[48px] text-warm-beige/60 hover:text-white transition-colors"
                    onClick={onClose}
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-body text-xs tracking-[0.15em] uppercase">
                      {locale === 'mn' ? "Залгах" : "Call"}
                    </span>
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=51.0833,100.4667"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 min-h-[48px] text-warm-beige/60 hover:text-white transition-colors"
                    onClick={onClose}
                  >
                    <MapPin className="w-5 h-5" />
                    <span className="font-body text-xs tracking-[0.15em] uppercase">
                      {locale === 'mn' ? "Газрын зураг" : "Map"}
                    </span>
                  </a>
                  <Link
                    href={`${localePrefix}/gallery`}
                    className="flex items-center gap-2 px-4 py-3 min-h-[48px] text-warm-beige/60 hover:text-white transition-colors"
                    onClick={onClose}
                  >
                    <LayoutGrid className="w-5 h-5" />
                    <span className="font-body text-xs tracking-[0.15em] uppercase">
                      {locale === 'mn' ? "Зургийн сан" : "Gallery"}
                    </span>
                  </Link>
                </motion.div>
              </div>

              <div className="hidden md:flex flex-1 items-center justify-center p-8">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden"
                >
                  <img
                    src={activeImage}
                    alt="Navigation preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lake-blue/40 to-transparent" />
                </motion.div>
              </div>
            </div>

            <div className="px-6 md:px-16 lg:px-24 pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-warm-beige/20 pt-6">
                <div className="flex gap-6 font-body text-sm text-warm-beige/50">
                  <Link
                    href={`${localePrefix}/contact`}
                    onClick={onClose}
                    className="hover:text-white transition-colors"
                  >
                    {locale === 'mn' ? "Холбоо барих" : "Contact"}
                  </Link>
                  <Link
                    href={`${localePrefix}/gallery`}
                    onClick={onClose}
                    className="hover:text-white transition-colors"
                  >
                    {locale === 'mn' ? "Зургийн сан" : "Gallery"}
                  </Link>
                  <Link
                    href={`${localePrefix}/fam-tour-application`}
                    onClick={onClose}
                    className="hover:text-white transition-colors"
                  >
                    {locale === 'mn' ? "Түншлэл" : "Partners"}
                  </Link>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-beige/50 hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-beige/50 hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
