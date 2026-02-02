"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';
  const currentYear = new Date().getFullYear();

  const navigation = {
    experience: [
      { en: "Accommodation", mn: "Байр", href: "/accommodation" },
      { en: "Dining", mn: "Хоол", href: "/dining" },
      { en: "Wellness", mn: "Спа", href: "/wellness" },
      { en: "Experiences", mn: "Туршлага", href: "/experiences" },
    ],
    resort: [
      { en: "About Us", mn: "Бидний тухай", href: "/about" },
      { en: "Gallery", mn: "Галерей", href: "/gallery" },
      { en: "Contact", mn: "Холбоо барих", href: "/contact" },
      { en: "Careers", mn: "Ажлын байр", href: "/careers" },
    ],
  };

  return (
    <footer className="bg-lake-blue text-warm-beige">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href={localePrefix || "/"} className="font-serif text-3xl text-warm-beige hover:text-white transition-colors">
              Dalai Eej
            </Link>
            <p className="mt-4 font-body text-sm text-warm-beige/70 leading-relaxed max-w-xs">
              {locale === 'mn' 
                ? "Хөвсгөл нуурын эрэг дээрх тансаг зочид буудал. Байгалийн үзэсгэлэнт газарт амралт, тайван байдлыг мэдрээрэй."
                : "A luxury resort on the shores of Lake Khuvsgul. Experience tranquility and natural beauty in the heart of Mongolia."
              }
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-warm-beige/50 mb-6">
              {locale === 'mn' ? "Туршлага" : "Experience"}
            </h4>
            <ul className="space-y-3">
              {navigation.experience.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`${localePrefix}${item.href}`}
                    className="font-body text-sm text-warm-beige/80 hover:text-white transition-colors"
                  >
                    {locale === 'mn' ? item.mn : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-warm-beige/50 mb-6">
              {locale === 'mn' ? "Бүсгүй" : "Resort"}
            </h4>
            <ul className="space-y-3">
              {navigation.resort.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`${localePrefix}${item.href}`}
                    className="font-body text-sm text-warm-beige/80 hover:text-white transition-colors"
                  >
                    {locale === 'mn' ? item.mn : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-warm-beige/50 mb-6">
              {locale === 'mn' ? "Холбоо барих" : "Contact"}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-warm-beige/50 mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-warm-beige/80">
                  {locale === 'mn' 
                    ? "Хөвсгөл аймаг, Хатгал тосгон, Монгол"
                    : "Khatgal Village, Khuvsgul Province, Mongolia"
                  }
                </span>
              </li>
              <li>
                <a 
                  href="tel:+97670001234" 
                  className="flex items-center gap-3 font-body text-sm text-warm-beige/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-warm-beige/50 flex-shrink-0" />
                  +976 7000 1234
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@dalaieej.mn" 
                  className="flex items-center gap-3 font-body text-sm text-warm-beige/80 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-warm-beige/50 flex-shrink-0" />
                  info@dalaieej.mn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-warm-beige/10">
          <div className="flex flex-col items-center gap-4">
            <p className="font-body text-xs text-warm-beige/40 text-center">
              © {currentYear} Dalai Eej Resort. {locale === 'mn' ? "Бүх эрх хуулиар хамгаалагдсан." : "All rights reserved."}
            </p>
            <a
              href="https://matterofform.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors duration-300"
            >
              DIGITAL EXPERIENCE: MATTER OF FORM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
