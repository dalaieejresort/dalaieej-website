                  "use client";

                  import { useState, useEffect, useRef } from "react";
                  import { X, Phone, MapPin, LayoutGrid } from "lucide-react";
                  import Link from "next/link";
                  import { usePathname } from "next/navigation";
                  import { motion, AnimatePresence } from "framer-motion";

                  // 1. Primary Navigation with Images
                  const mainNavItems = [
                    { 
                      id: "stay",
                      href: "/accommodation", 
                      label: "Stay", 
                      mn: "Өргөө",
                      image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop&q=80"
                    },
                    { 
                      id: "dining",
                      href: "/dining", 
                      label: "Dining", 
                      mn: "Зоог",
                      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
                    },
                    { 
                      id: "wellness",
                      href: "/wellness", 
                      label: "Wellness", 
                      mn: "Амрахуй",
                      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80"
                    },
                    { 
                      id: "adventure",
                      href: "/experiences", 
                      label: "Adventures", 
                      mn: "Адал явдал",
                      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=80"
                    },
                    { 
                      id: "about",
                      href: "/about", 
                      label: "Our Story", 
                      mn: "Бидний тухай",
                      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80"
                    },
                  ];

                  // 2. Secondary Navigation (Utilities)
                  const secondaryNavItems = [
                    { href: "/contact", label: "Contact", mn: "Холбоо барих", icon: Phone },
                    { href: "/location", label: "Map", mn: "Байршил", icon: MapPin },
                    { href: "/gallery", label: "Gallery", mn: "Зургийн сан", icon: LayoutGrid },
                  ];

                  interface NavigationOverlayProps {
                    isOpen: boolean;
                    onClose: () => void;
                  }

                  export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
                    const pathname = usePathname();
                    const isMongolian = pathname.startsWith("/mn");

                    // State for the hover effect
                    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

                    // Determine which image to show (default to the first one if nothing hovered)
                    const activeImage = hoveredLink 
                      ? mainNavItems.find(item => item.id === hoveredLink)?.image 
                      : mainNavItems[0].image;

                    // Lock body scroll
                    useEffect(() => {
                      if (isOpen) {
                        document.body.style.overflow = "hidden";
                      } else {
                        document.body.style.overflow = "unset";
                      }
                      return () => {
                        document.body.style.overflow = "unset";
                      };
                    }, [isOpen]);

                    const toggleLanguage = () => {
                      const newLocale = isMongolian ? "" : "/mn";
                      const pathWithoutLocale = isMongolian 
                        ? pathname.replace("/mn", "") || "/" 
                        : pathname;
                      const newPath = `${newLocale}${pathWithoutLocale}`.replace("//", "/");
                      window.location.href = newPath;
                    };

                    return (
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[100] bg-[#1A3C34] text-[#F5F5DC] flex flex-col"
                          >
                            {/* Header: Close Button */}
                            <div className="flex justify-end p-6 md:p-8 shrink-0 z-20">
                              <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
                                aria-label="Close menu"
                              >
                                <X className="w-8 h-8 text-[#F5F5DC]" />
                              </button>
                            </div>

                            <div className="flex-1 flex flex-col md:flex-row w-full h-full max-w-7xl mx-auto">

                              {/* LEFT COLUMN: Navigation Links */}
                              <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pb-12">

                                {/* A. Main Navigation */}
                                <nav className="flex flex-col items-center md:items-start gap-4 md:gap-6">
                                  {mainNavItems.map((item, i) => (
                                    <motion.div
                                      key={item.href}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 + 0.1 }}
                                    >
                                      <Link
                                        href={`${isMongolian ? "/mn" : ""}${item.href}`}
                                        onClick={onClose}
                                        onMouseEnter={() => setHoveredLink(item.id)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                        className="font-serif text-4xl md:text-6xl text-[#F5F5DC]/60 hover:text-white transition-colors tracking-wide block"
                                      >
                                        {isMongolian ? item.mn : item.label}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </nav>

                                {/* Separator */}
                                <motion.div 
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ delay: 0.5, duration: 0.5 }}
                                  className="w-12 h-px bg-white/30 my-8 mx-auto md:mx-0"
                                />

                                {/* B. Secondary Navigation (Icons) */}
                                <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-6 mb-8 md:mb-0">
                                  {secondaryNavItems.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                      <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 + (i * 0.1) }}
                                      >
                                        <Link
                                          href={`${isMongolian ? "/mn" : ""}${item.href}`}
                                          onClick={onClose}
                                          className="group flex items-center gap-2 font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#F5F5DC]/80 hover:text-white transition-colors"
                                        >
                                          <Icon className="w-4 h-4 text-[#F5F5DC]/60 group-hover:text-white transition-colors" />
                                          <span>{isMongolian ? item.mn : item.label}</span>
                                        </Link>
                                      </motion.div>
                                    );
                                  })}
                                </nav>

                                {/* C. Language Switcher (Mobile: Bottom Center / Desktop: Bottom Left) */}
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.8 }}
                                  className="mt-auto md:mt-12 flex justify-center md:justify-start"
                                >
                                  <button
                                    onClick={toggleLanguage}
                                    className="font-sans text-xs tracking-[0.2em] font-medium text-[#F5F5DC]/70 hover:text-white transition-colors uppercase py-3 px-6 border border-white/10 rounded-full hover:border-white/30"
                                  >
                                    <span className={!isMongolian ? "text-white" : ""}>EN</span>
                                    <span className="mx-3 opacity-50">|</span>
                                    <span className={isMongolian ? "text-white" : ""}>MN</span>
                                  </button>
                                </motion.div>
                              </div>

                              {/* RIGHT COLUMN: Image Preview (Desktop Only) */}
                              <div className="hidden md:flex flex-1 items-center justify-center p-8 lg:p-12">
                                <div className="relative w-full max-w-lg aspect-[3/4] rounded-lg overflow-hidden bg-black/20">
                                  <AnimatePresence mode="wait">
                                    <motion.div
                                      key={activeImage}
                                      initial={{ opacity: 0, scale: 1.05 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.4 }}
                                      className="absolute inset-0"
                                    >
                                      <img
                                        src={activeImage}
                                        alt="Menu preview"
                                        className="w-full h-full object-cover"
                                      />
                                      {/* Subtle Overlay to ensure text readability if you overlay text later */}
                                      <div className="absolute inset-0 bg-black/10" />
                                    </motion.div>
                                  </AnimatePresence>
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  }