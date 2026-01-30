"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: localePrefix || "/", label: t('nav.home') },
    { href: `${localePrefix}/about`, label: t('nav.about') },
    { href: `${localePrefix}/amenities`, label: t('nav.amenities') },
    { href: `${localePrefix}/booking`, label: t('nav.book') },
  ];

  if (locale === 'mn') {
    navLinks.splice(2, 0, { href: `${localePrefix}/offers`, label: t('nav.offers') });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-forest-green/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href={localePrefix || "/"} className="font-heading text-xl text-cream">
            {t('hero.title')}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-cream/80 hover:text-cream transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cream"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-cream/80 hover:text-cream transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
