"use client";

import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import LanguageSwitcher from "../../components/LanguageSwitcher";

const offers = [
  {
    id: "couples",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&auto=format&fit=crop&q=80",
    promoCode: "LOVE2026",
    titleKey: "offers.couples.title",
    descKey: "offers.couples.desc"
  },
  {
    id: "erdenet",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    promoCode: "ERDENET",
    titleKey: "offers.erdenet.title",
    descKey: "offers.erdenet.desc"
  },
  {
    id: "early",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
    promoCode: "WELCOMEBACK",
    titleKey: "offers.early.title",
    descKey: "offers.early.desc"
  }
];

export default function OffersPage() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <main className="min-h-screen bg-cream">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="bg-forest-green py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <a
            href={localePrefix || "/"}
            className="inline-flex items-center gap-2 text-cream/70 hover:text-cream transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-sm">{t('nav.home')}</span>
          </a>
          <h1 className="font-heading text-4xl md:text-6xl text-cream">
            {t('offers.title')}
          </h1>
          <p className="font-body text-cream/80 text-lg mt-4 max-w-2xl">
            {t('offers.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={offer.image}
                  alt={t(offer.titleKey)}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-forest-green/10 text-forest-green font-body text-xs px-3 py-1 rounded-full mb-3">
                  {t('offers.promoLabel')}: {offer.promoCode}
                </span>
                <h2 className="font-heading text-2xl text-forest-green mb-3">
                  {t(offer.titleKey)}
                </h2>
                <p className="font-body text-forest-green/70 text-sm mb-6 leading-relaxed">
                  {t(offer.descKey)}
                </p>
                <a
                  href={`${localePrefix}/booking?promo=${offer.promoCode}`}
                  className="block w-full text-center px-6 py-3 bg-forest-green text-cream font-body font-semibold rounded-lg hover:bg-forest-green/90 transition-colors duration-300"
                >
                  {t('offers.bookNow')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-forest-green/95 py-8 px-4 border-t border-cream/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-body text-cream/50 text-sm">
            &copy; {new Date().getFullYear()} {t('hero.title')}. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </main>
  );
}
