import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        {children}
        <Script
          src="https://us2.cloudbeds.com/widget/load/XQKeS3/float"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
