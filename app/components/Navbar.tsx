"use client";

import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  const navLinks = [
    { href: localePrefix || "/", label: t('nav.home') },
    { href: `${localePrefix}/about`, label: t('nav.about') },
    { href: `${localePrefix}/amenities`, label: t('nav.accommodations') },
    { href: `${localePrefix}/offers`, label: t('nav.offers') },
    { href: `#contact`, label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-forest-green shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <a 
            href={localePrefix || "/"} 
            className="font-heading text-lg md:text-xl text-cream font-semibold whitespace-nowrap"
          >
            {t('hero.title')}
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-cream/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="lg:hidden">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="lg:hidden border-t border-cream/20">
          <div 
            className="flex overflow-x-auto scrollbar-hide px-2 py-3 gap-1"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-cream/90 hover:text-white hover:bg-cream/10 transition-colors text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
