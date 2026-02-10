import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css";
import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dalai Eej Resort | Luxury Hotel in Mongolia",
  description: "Experience the timeless beauty of Mongolia in unparalleled luxury at Dalai Eej Resort. Book your stay today.",
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <NavbarWrapper />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
