"use client";

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export default function RouteFinderPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why do you recommend the North over the South?",
      a: "The South (Gobi) is spectacular, but it is an arid, demanding desert. If you want the 'Classic Mongolia' image of green grasslands and galloping horses, you find that in the North. Khuvsgul is a sanctuary—lush alpine forests and massive freshwater reserves. We believe the perfect expedition ends in the North to 'wash off the dust' of the steppe."
    },
    {
      q: "Do I need a tour guide?",
      a: "No. If you take the Sky & Lake route, we can arrange a private driver. If you take the Steppe Voyage, you can simply hire a 'Car and Driver' in Ulaanbaatar without paying for a full tour agency package."
    },
    {
      q: "Why are the Altai Mountains (West) excluded?",
      a: "Logistics. The Altai are over 1,500km away. Including them requires expensive domestic flights and a completely different itinerary. This tool focuses on routes that maximize landscape diversity for a standard 1-2 week trip."
    }
  ];

  return (
    <main className="bg-[#F9F8F6] min-h-screen">
      {/* --- HERO --- */}
      <section className="relative h-[70vh] flex items-end pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/64643a1d0c5968146b6cbd44/2269e1ae-5ec8-4118-87e2-d7803a67eda8/khuvsgul-lake-boat-tour-summer.jpg" 
            alt="Khuvsgul Lake"
            className="w-full h-full object-cover grayscale-[20%] brightness-[0.6]"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          <span className="font-body uppercase tracking-[0.4em] text-[10px] text-white/70 mb-4 block">
            Intelligence Report: 2026 Logistics
          </span>
          <h1 className="font-heading text-5xl md:text-8xl text-white leading-tight uppercase tracking-tighter">
            Route Finder
          </h1>
        </div>
      </section>

      {/* --- EDITORIAL INTRO --- */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <div className="border-l border-stone-300 pl-8 md:pl-16">
          <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-8 uppercase tracking-tight leading-none">
            Check your logic.
          </h2>
          <div className="space-y-8 font-editorial italic text-stone-600 text-xl md:text-2xl leading-relaxed">
            <p>
              "Travelers arrive with a checklist—ride a camel, see a monastery—only to realize too late that they have left the story unfinished."
            </p>
            <p>
              They spend 14 days bouncing in a van through the arid south, missing the ecological crown of the country: The North.
            </p>
          </div>
        </div>
      </section>

      {/* --- TALLY QUIZ --- */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto shadow-2xl overflow-hidden rounded-sm border border-stone-200">
          <iframe 
            src="https://tally.so/embed/XxoEPP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
            loading="lazy" 
            width="100%" 
            height="800" 
            frameBorder="0" 
            title="Mongolia Vibe Quiz"
          />
        </div>
      </section>

      {/* --- PHOTO GALLERY GRID --- */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="https://images.squarespace-cdn.com/content/v1/64643a1d0c5968146b6cbd44/d51a5a9a-64ab-469f-915d-24da7f7d2d1b/central-mongolia-road-trip-itinerary-mini-gobi-sand-dunes-self-drive.jpg" className="aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Steppe" />
          <img src="https://images.squarespace-cdn.com/content/v1/64643a1d0c5968146b6cbd44/9545271c-e91b-41b8-aec9-8c884a4d3b11/gobi-desert-to-khuvsgul-lake-overland-tour-route-mongolia.jpg" className="aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Gobi" />
          <img src="https://images.squarespace-cdn.com/content/v1/64643a1d0c5968146b6cbd44/7be81066-9eda-4a63-9aa5-dd865dd7ce1e/luxury-mongolia-honeymoon-lake-khuvsgul-picnic-fly-in-tour.jpg" className="aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Picnic" />
          <img src="https://images.squarespace-cdn.com/content/v1/64643a1d0c5968146b6cbd44/3636e8f5-ddf6-46ab-ab37-2e25d8112150/ulaanbaatar-city-tour-soviet-mosaics-gandan-monastery-cultural-guide.jpg" className="aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="UB" />
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6 bg-stone-900 text-[#F9F8F6]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl mb-16 uppercase tracking-tighter text-center">Inquiry & Logic</h2>
          <div className="divide-y divide-stone-700 border-t border-stone-700">
            {faqs.map((faq, index) => (
              <div key={index} className="py-8">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left group"
                >
                  <span className="font-heading text-lg md:text-xl uppercase tracking-tight group-hover:text-stone-400 transition-colors">
                    {faq.q}
                  </span>
                  {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {openFaq === index && (
                  <div className="mt-6 font-editorial italic text-stone-400 text-lg leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CONTACT & MAP --- */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
             <h2 className="font-heading text-4xl text-stone-900 uppercase tracking-tighter mb-8">Contact Field Office</h2>
             <div className="space-y-4 font-body text-stone-600 uppercase tracking-widest text-xs">
                <p><strong>HQ:</strong> Khatgal Village, Khuvsgul, Mongolia</p>
                <p><strong>Coordinates:</strong> 50.4° N, 100.1° E</p>
                <p><strong>Digital:</strong> hello@dalaieej.com</p>
                <p><strong>Signal:</strong> +976 9500 5595</p>
             </div>
             <a href="/reserve" className="mt-12 inline-block px-12 py-5 bg-stone-900 text-white font-body tracking-[0.2em] uppercase text-[10px] hover:bg-stone-800 transition-all shadow-xl">
               Book My Route
             </a>
          </div>
          <div className="md:w-1/2 h-[400px] bg-stone-200 border border-stone-300 rounded-sm overflow-hidden shadow-inner  contrast-125">
            {/* Placeholder for Map - Matches the archival tone */}
            <div className="w-full h-full flex items-center justify-center text-stone-400 font-editorial italic">
               Satellite Imaging Offline - Refer to Coordinates
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}