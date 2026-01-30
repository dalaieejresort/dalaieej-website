"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Grid3X3 } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

interface DropdownItem {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { href: localePrefix || "/", label: t('nav.home') },
    { 
      label: t('nav.about'),
      dropdown: [
        { href: `${localePrefix}/about`, label: locale === 'mn' ? "Бидний тухай" : "About Us" },
        { href: `${localePrefix}/about/the-family`, label: locale === 'mn' ? "Гэр бүл" : "The Family" },
        { href: `${localePrefix}/about/the-lake`, label: locale === 'mn' ? "Нуур" : "The Lake" },
      ]
    },
    { 
      label: t('nav.accommodations'),
      dropdown: [
        { href: `${localePrefix}/cabins`, label: locale === 'mn' ? "Модон байшин" : "Cabins" },
        { href: `${localePrefix}/lodge`, label: locale === 'mn' ? "Гол байшин" : "Lodge" },
        { href: `${localePrefix}/amenities`, label: locale === 'mn' ? "Үйлчилгээ" : "Amenities" },
      ]
    },
    { href: `${localePrefix}/restaurant`, label: locale === 'mn' ? "Рестуран" : "Restaurant" },
    { href: `${localePrefix}/experiences`, label: locale === 'mn' ? "Туршлага" : "Experiences" },
    { href: `${localePrefix}/wellness`, label: locale === 'mn' ? "Эрүүл мэнд" : "Wellness" },
    { href: `${localePrefix}/celebrate`, label: locale === 'mn' ? "Уулзалт & Баяр" : "Meet & Celebrate" },
    { href: `${localePrefix}/stories`, label: locale === 'mn' ? "Stories" : "Stories" },
    { href: `${localePrefix}/location`, label: locale === 'mn' ? "Байршил" : "Contact" },
    ...(locale === 'mn' ? [{ href: `${localePrefix}/offers`, label: t('nav.offers') }] : []),
  ];

  const mobileNavItems = [
    { href: localePrefix || "/", label: t('nav.home') },
    { href: `${localePrefix}/about`, label: t('nav.about') },
    { href: `${localePrefix}/about/the-family`, label: locale === 'mn' ? "Гэр бүл" : "The Family" },
    { href: `${localePrefix}/about/the-lake`, label: locale === 'mn' ? "Нуур" : "The Lake" },
    { href: `${localePrefix}/cabins`, label: locale === 'mn' ? "Модон байшин" : "Cabins" },
    { href: `${localePrefix}/lodge`, label: locale === 'mn' ? "Гол байшин" : "Lodge" },
    { href: `${localePrefix}/amenities`, label: locale === 'mn' ? "Үйлчилгээ" : "Amenities" },
    { href: `${localePrefix}/restaurant`, label: locale === 'mn' ? "Рестуран" : "Restaurant" },
    { href: `${localePrefix}/experiences`, label: locale === 'mn' ? "Туршлага" : "Experiences" },
    { href: `${localePrefix}/wellness`, label: locale === 'mn' ? "Эрүүл мэнд" : "Wellness" },
    { href: `${localePrefix}/celebrate`, label: locale === 'mn' ? "Уулзалт & Баяр" : "Meet & Celebrate" },
    { href: `${localePrefix}/stories`, label: locale === 'mn' ? "Stories" : "Stories" },
    { href: `${localePrefix}/location`, label: locale === 'mn' ? "Байршил" : "Contact" },
    ...(locale === 'mn' ? [{ href: `${localePrefix}/offers`, label: t('nav.offers') }] : []),
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

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              item.dropdown ? (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 font-body text-cream/90 hover:text-white transition-colors text-sm font-medium tracking-wide">
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-forest-green/95 backdrop-blur-sm rounded-lg shadow-xl border border-cream/10 py-2 min-w-[180px]">
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <a
                            key={dropIndex}
                            href={dropItem.href}
                            className="block px-4 py-2.5 font-body text-cream/80 hover:text-white hover:bg-cream/10 transition-colors text-sm"
                          >
                            {dropItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="font-body text-cream/90 hover:text-white transition-colors text-sm font-medium tracking-wide"
                >
                  {item.label}
                </a>
              )
            ))}
            
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-cream/20">
              <a
                href={`${localePrefix}/gallery`}
                className="text-cream/80 hover:text-white transition-colors p-1.5 hover:bg-cream/10 rounded-lg"
                title={locale === 'mn' ? "Зургийн сан" : "Gallery"}
              >
                <Grid3X3 className="w-5 h-5" />
              </a>
              <LanguageSwitcher />
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <a
              href={`${localePrefix}/gallery`}
              className="text-cream/80 hover:text-white transition-colors p-1.5"
              title={locale === 'mn' ? "Зургийн сан" : "Gallery"}
            >
              <Grid3X3 className="w-5 h-5" />
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="lg:hidden border-t border-cream/20">
          <div 
            className="flex overflow-x-auto scrollbar-hide px-2 py-3 gap-1"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {mobileNavItems.map((link, index) => (
              <a
                key={index}
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
