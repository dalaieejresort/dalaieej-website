"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import NavigationOverlay from "./layout/NavigationOverlay";

export default function Navbar() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-lake-blue/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <Link 
              href={localePrefix || "/"}
              className="font-serif text-2xl md:text-3xl text-warm-beige hover:text-white transition-colors"
            >
              Dalai Eej
            </Link>

            <div className="flex items-center gap-4 md:gap-6">
              <LanguageSwitcher />
              
              <Link
                href={`${localePrefix}/booking`}
                className="hidden sm:inline-block px-5 py-2.5 bg-warm-beige text-lake-blue font-body text-xs font-semibold tracking-[0.1em] uppercase hover:bg-white transition-colors rounded"
              >
                {locale === 'mn' ? "Захиалах" : "Book"}
              </Link>
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-warm-beige hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-warm-beige/50 rounded-lg px-2 py-1"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="navigation-overlay"
              >
                <span className="hidden sm:inline font-body text-xs tracking-[0.1em] uppercase">
                  {locale === 'mn' ? "Цэс" : "Menu"}
                </span>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <NavigationOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
