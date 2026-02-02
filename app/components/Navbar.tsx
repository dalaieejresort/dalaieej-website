"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

interface DropdownItem {
  href: string;
  label: string;
  description?: string;
}

interface NavPillar {
  label: string;
  dropdown?: DropdownItem[];
  href?: string;
}

export default function Navbar() {
  const t = useTranslations();
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPillars: NavPillar[] = [
    {
      label: tNav('accommodation'),
      dropdown: [
        { href: `${localePrefix}/cabins`, label: locale === 'mn' ? "Модон байшингууд" : "Cabins", description: locale === 'mn' ? "Ойн дунд" : "Nestled in the forest" },
        { href: `${localePrefix}/lodge`, label: locale === 'mn' ? "Гол байшин" : "The Lodge", description: locale === 'mn' ? "Нуурын эрэг дээр" : "On the lakeshore" },
        { href: `${localePrefix}/amenities`, label: locale === 'mn' ? "Үйлчилгээ" : "Amenities", description: locale === 'mn' ? "Зочны туршлага" : "Guest experience" },
      ]
    },
    {
      label: tNav('dining'),
      dropdown: [
        { href: `${localePrefix}/restaurant`, label: locale === 'mn' ? "Рестуран" : "The Restaurant", description: locale === 'mn' ? "Орон нутгийн хоол" : "Local cuisine" },
        { href: `${localePrefix}/restaurant#private`, label: locale === 'mn' ? "Хувийн зоог" : "Private Dining", description: locale === 'mn' ? "Онцгой үдэшлэг" : "Intimate experiences" },
      ]
    },
    {
      label: tNav('wellness'),
      dropdown: [
        { href: `${localePrefix}/wellness`, label: locale === 'mn' ? "Спа & Сэргээх" : "Spa & Wellness", description: locale === 'mn' ? "Амралт ба сэргэлт" : "Rest and restoration" },
        { href: `${localePrefix}/wellness#treatments`, label: locale === 'mn' ? "Эмчилгээ" : "Treatments", description: locale === 'mn' ? "Уламжлалт аргууд" : "Traditional methods" },
      ]
    },
    {
      label: tNav('experiences'),
      dropdown: [
        { href: `${localePrefix}/about/the-lake`, label: locale === 'mn' ? "Нуур" : "The Lake", description: locale === 'mn' ? "Байгаль" : "Nature" },
        { href: `${localePrefix}/about`, label: locale === 'mn' ? "Хойморь" : "The Peninsula", description: locale === 'mn' ? "Байршил" : "Location" },
        { href: `${localePrefix}/stories`, label: locale === 'mn' ? "Өгүүллэг" : "The Journal", description: locale === 'mn' ? "Блог" : "Stories" },
        ...(locale === 'mn' ? [
          { href: `${localePrefix}/journeys/families`, label: "Ураг Төрөл", description: "Өргөтгөсөн гэр бүлд" },
          { href: `${localePrefix}/journeys/friends`, label: "Найз Нөхөд", description: "Хамтдаа" },
          { href: `${localePrefix}/journeys/couples`, label: "Хосууд", description: "Романтик амралт" },
          { href: `${localePrefix}/journeys/companies`, label: "Байгууллага", description: "Корпорэйт уулзалт" },
        ] : [
          { href: `${localePrefix}/journeys/road-trippers`, label: "Road Trippers", description: "Adventure seekers" },
          { href: `${localePrefix}/journeys/solo`, label: "The Solo Seeker", description: "Personal retreat" },
          { href: `${localePrefix}/journeys/lovers`, label: "Khuvsgul Lovers", description: "Return visitors" },
          { href: `${localePrefix}/journeys/operators`, label: "Tour Operators", description: "Partner with us" },
        ])
      ]
    },
    {
      label: tNav('escapes'),
      dropdown: [
        { href: `${localePrefix}/offers`, label: locale === 'mn' ? "Тусгай багцууд" : "Special Packages", description: locale === 'mn' ? "Онцгой санал" : "Exclusive offers" },
      ]
    },
    {
      label: tNav('story'),
      dropdown: [
        { href: `${localePrefix}/about`, label: locale === 'mn' ? "Бидний түүх" : "Our Story", description: locale === 'mn' ? "Далай Ээж" : "Dalai Eej" },
        { href: `${localePrefix}/about/the-family`, label: locale === 'mn' ? "Гэр бүл" : "The Family", description: locale === 'mn' ? "Манай хамт олон" : "Our team" },
        { href: `${localePrefix}/about#history`, label: locale === 'mn' ? "Түүх" : "History", description: locale === 'mn' ? "Өв уламжлал" : "Heritage" },
      ]
    },
    {
      label: tNav('location'),
      href: `${localePrefix}/location`
    },
  ];

  const toggleMobileAccordion = (label: string) => {
    setMobileAccordion(mobileAccordion === label ? null : label);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-lake-blue shadow-lg' : 'bg-lake-blue/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20 px-6">
            <a 
              href={localePrefix || "/"} 
              className="font-serif text-xl md:text-2xl text-warm-beige font-normal tracking-wide"
            >
              Dalai Eej
            </a>

            <div className="hidden xl:flex items-center gap-1">
              {navPillars.map((pillar, index) => (
                pillar.dropdown ? (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(pillar.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1.5 px-4 py-2 font-body text-warm-beige/90 hover:text-white transition-colors text-xs font-medium tracking-[0.15em] uppercase">
                      {pillar.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === pillar.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`absolute top-full left-0 pt-3 transition-all duration-200 ${
                      activeDropdown === pillar.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      <div className="bg-lake-blue/98 backdrop-blur-md rounded-lg shadow-2xl border border-warm-beige/10 py-3 min-w-[240px]">
                        {pillar.dropdown.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            className="block px-5 py-3 hover:bg-pine-green/30 transition-colors group"
                          >
                            <span className="block font-body text-warm-beige text-sm font-medium group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="block font-body text-warm-beige/50 text-xs mt-0.5 group-hover:text-warm-beige/70 transition-colors">
                                {item.description}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={index}
                    href={pillar.href}
                    className="px-4 py-2 font-body text-warm-beige/90 hover:text-white transition-colors text-xs font-medium tracking-[0.15em] uppercase"
                  >
                    {pillar.label}
                  </a>
                )
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden xl:flex items-center gap-4">
                <LanguageSwitcher />
                <a
                  href={`${localePrefix}/booking`}
                  className="px-6 py-2.5 bg-warm-beige text-lake-blue font-body text-xs font-semibold tracking-[0.1em] uppercase hover:bg-white transition-colors rounded"
                >
                  {locale === 'mn' ? "Захиалах" : "Book"}
                </a>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-warm-beige hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <div className={`absolute top-20 left-0 right-0 bottom-0 bg-lake-blue overflow-y-auto transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="p-6 space-y-2">
            {navPillars.map((pillar, index) => (
              <div key={index} className="border-b border-warm-beige/10">
                {pillar.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileAccordion(pillar.label)}
                      className="w-full flex items-center justify-between py-4 font-body text-warm-beige text-sm font-medium tracking-[0.1em] uppercase"
                    >
                      {pillar.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        mobileAccordion === pillar.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      mobileAccordion === pillar.label ? 'max-h-96 pb-4' : 'max-h-0'
                    }`}>
                      <div className="pl-4 space-y-1">
                        {pillar.dropdown.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-3 font-body text-warm-beige/70 hover:text-white text-sm transition-colors"
                          >
                            {item.label}
                            {item.description && (
                              <span className="block text-warm-beige/40 text-xs mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={pillar.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 font-body text-warm-beige text-sm font-medium tracking-[0.1em] uppercase"
                  >
                    {pillar.label}
                  </a>
                )}
              </div>
            ))}
            
            <div className="pt-6 space-y-4">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <a
                href={`${localePrefix}/booking`}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-4 bg-warm-beige text-lake-blue font-body text-sm font-semibold tracking-[0.1em] uppercase text-center rounded"
              >
                {locale === 'mn' ? "Захиалах" : "Book Now"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
