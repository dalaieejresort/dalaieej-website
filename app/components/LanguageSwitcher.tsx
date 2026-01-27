"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith('/mn') ? 'mn' : 'en';
  
  const switchLocale = (newLocale: string) => {
    let newPath = pathname;
    
    if (currentLocale === 'mn' && newLocale === 'en') {
      newPath = pathname.replace(/^\/mn/, '') || '/';
    } else if (currentLocale === 'en' && newLocale === 'mn') {
      newPath = '/mn' + pathname;
    }
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-[#F5F5DC]/70" />
      <div className="flex items-center gap-1 text-sm font-sans">
        <button
          onClick={() => switchLocale('en')}
          className={`px-2 py-1 rounded transition-colors ${
            currentLocale === 'en' 
              ? 'bg-[#F5F5DC] text-[#1A3C34] font-semibold' 
              : 'text-[#F5F5DC]/70 hover:text-[#F5F5DC]'
          }`}
        >
          EN
        </button>
        <span className="text-[#F5F5DC]/30">|</span>
        <button
          onClick={() => switchLocale('mn')}
          className={`px-2 py-1 rounded transition-colors ${
            currentLocale === 'mn' 
              ? 'bg-[#F5F5DC] text-[#1A3C34] font-semibold' 
              : 'text-[#F5F5DC]/70 hover:text-[#F5F5DC]'
          }`}
        >
          MN
        </button>
      </div>
    </div>
  );
}
