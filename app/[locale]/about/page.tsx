"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'mn' ? '/mn' : '';

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80"
            alt="Khuvsgul Lake"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-green/50" />
        </div>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            {t('about.hero.title')}
          </h1>
          <p className="font-body text-cream/90 text-lg md:text-xl max-w-2xl mx-auto">
            {t('about.hero.subtitle')}
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-cream/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-forest-green mb-8">
              {t('about.story.title')}
            </h2>
            <p className="font-body text-forest-green/80 text-lg leading-relaxed">
              {t('about.story.content')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-forest-green">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cream/50 mb-6 font-sans">
              {t('about.mission.label')}
            </p>
            <blockquote className="font-heading text-2xl md:text-4xl lg:text-5xl text-cream leading-relaxed mb-8">
              "{t('about.mission.quote')}"
            </blockquote>
            <p className="font-body text-cream/70 text-lg max-w-2xl mx-auto">
              {t('about.mission.content')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-forest-green mb-4">
              {t('about.experience.title')}
            </h2>
            <p className="font-body text-forest-green/70 max-w-2xl mx-auto">
              {t('about.experience.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['nature', 'culture', 'escape'].map((key, index) => (
              <motion.div
                key={key}
                className="text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <span className="font-heading text-2xl text-forest-green">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-heading text-xl text-forest-green mb-3">
                  {t(`about.experience.${key}.title`)}
                </h3>
                <p className="font-body text-forest-green/70 text-sm">
                  {t(`about.experience.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#F9F8F6]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-forest-green mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="font-body text-forest-green/70 mb-10 max-w-xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <a
              href={`${localePrefix}/booking`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-forest-green text-cream font-body font-medium rounded hover:bg-forest-green/90 transition-colors"
            >
              <span>{t('about.cta.button')}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="bg-forest-green py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-body text-cream/50 text-sm">
            &copy; {new Date().getFullYear()} {t('hero.title')}. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </main>
  );
}
