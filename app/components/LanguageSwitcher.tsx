"use client";

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  // Get the path without the locale prefix for Link
  const getPathWithoutLocale = () => {
    if (pathname.startsWith('/mn')) {
      return pathname.replace(/^\/mn/, '') || '/';
    }
    if (pathname.startsWith('/en')) {
      return pathname.replace(/^\/en/, '') || '/';
    }
    return pathname;
  };
  
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-warm-beige/70" />
      <div className="flex items-center gap-1 text-sm font-sans">
        <Link
          href={pathWithoutLocale}
          locale="en"
          className={`px-2 py-1 rounded transition-colors ${
            currentLocale === 'en' 
              ? 'bg-warm-beige text-lake-blue font-semibold' 
              : 'text-warm-beige/70 hover:text-warm-beige'
          }`}
        >
          EN
        </Link>
        <span className="text-warm-beige/30">|</span>
        <Link
          href={pathWithoutLocale}
          locale="mn"
          className={`px-2 py-1 rounded transition-colors ${
            currentLocale === 'mn' 
              ? 'bg-warm-beige text-lake-blue font-semibold' 
              : 'text-warm-beige/70 hover:text-warm-beige'
          }`}
        >
          MN
        </Link>
      </div>
    </div>
  );
}
