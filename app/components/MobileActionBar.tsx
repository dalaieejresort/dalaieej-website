"use client";

import { Phone, MapPin, LayoutGrid } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function MobileActionBar() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  const actions = [
    {
      icon: Phone,
      label: locale === 'mn' ? "ЗАЛГАХ" : "CALL",
      href: "tel:+97670111234",
      external: true,
    },
    {
      icon: MapPin,
      label: locale === 'mn' ? "ГАЗРЫН ЗУРАГ" : "MAP",
      href: "https://www.google.com/maps/search/?api=1&query=51.0833,100.4667",
      external: true,
    },
    {
      icon: LayoutGrid,
      label: locale === 'mn' ? "ЗУРГИЙН САН" : "GALLERY",
      href: `${localePrefix}/gallery`,
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-lake-blue/10 safe-area-pb">
      <div className="grid grid-cols-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          if (action.external) {
            return (
              <a
                key={index}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center justify-center py-3 text-lake-blue hover:bg-lake-blue/5 transition-colors"
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-body font-medium tracking-widest uppercase">
                  {action.label}
                </span>
              </a>
            );
          }
          
          return (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center justify-center py-3 text-lake-blue hover:bg-lake-blue/5 transition-colors"
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-body font-medium tracking-widest uppercase">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
