"use client";

import Video from 'next-video';
// Replace 'hero-loop.mp4' with your actual filename
import heroLoop from '@/videos/hero-loop.mp4';
import Image from 'next/image';
import { useState } from 'react';

export default function HeroVideo() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-brand-green">
      {/* 1. The Placeholder Image (Shows immediately) */}
      {!isLoaded && (
        <Image 
          src="/images/hero-placeholder.webp" // Create a 1920px still of your video
          alt="Dalai Eej Resort View"
          fill
          priority
          className="object-cover transition-opacity duration-1000"
        />
      )}

      {/* 2. The Optimized Video Engine */}
      <Video 
        src={heroLoop}
        autoPlay 
        muted 
        loop 
        playsInline 
        controls={false}
        onPlay={() => setIsLoaded(true)}
        className="w-full h-full object-cover transition-opacity duration-1000"
        // This CSS variable ensures the internal Mux player fills the container
        style={{ '--media-object-fit': 'cover' } as any}
      />

      {/* 3. The Text Overlay (Branding) */}
      <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-6">
        <h1 className="font-script text-brand-cream text-5xl md:text-7xl mb-4 drop-shadow-lg">
          A Return to the Source
        </h1>
        <p className="font-serif text-brand-cream/90 text-lg md:text-2xl tracking-widest uppercase">
          Khuvsgul Heritage • Est. 1990
        </p>
      </div>
    </section>
  );
}