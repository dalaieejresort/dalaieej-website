"use client";

import { useEffect, useRef } from "react";

interface BookingButtonProps {
  variant?: "primary" | "small";
  label?: string;
}

export default function BookingButton({ 
  variant = "primary", 
  label = "Book Your Stay" 
}: BookingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const scanForWidget = () => {
      if (typeof window !== "undefined" && (window as any).BE) {
        (window as any).BE.init();
      }
    };

    scanForWidget();

    const timer = setTimeout(scanForWidget, 1000);

    return () => clearTimeout(timer);
  }, []);

  const baseClasses = "bg-cream text-forest-green font-heading font-semibold rounded-lg hover:bg-white transition-colors duration-300 uppercase tracking-wider";
  
  const variantClasses = variant === "primary" 
    ? "px-8 py-4" 
    : "px-6 py-3 text-sm";

  return (
    <button
      ref={buttonRef}
      data-be-url="https://us2.cloudbeds.com/reservation/XQKeS3"
      className={`${baseClasses} ${variantClasses}`}
    >
      {label}
    </button>
  );
}
