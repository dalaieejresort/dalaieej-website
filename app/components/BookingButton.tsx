"use client";

import Script from "next/script";

interface BookingButtonProps {
  variant?: "primary" | "small";
  label?: string;
}

export default function BookingButton({ 
  variant = "primary", 
  label = "Book Your Stay" 
}: BookingButtonProps) {
  const baseClasses = "bg-[#F5F5DC] text-[#1A3C34] font-serif uppercase tracking-widest hover:bg-white transition-all cursor-pointer";
  
  const variantClasses = variant === "primary" 
    ? "px-8 py-3" 
    : "px-6 py-3 text-sm";

  return (
    <div>
      <button
        data-be-url="https://us2.cloudbeds.com/reservation/XQKeS3"
        className={`${baseClasses} ${variantClasses}`}
      >
        {label}
      </button>
      <Script
        src="https://us2.cloudbeds.com/widget/load/XQKeS3/immersive"
        strategy="afterInteractive"
      />
    </div>
  );
}
