"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const rooms = [
  {
    name: "Ger Suite",
    description: "Traditional Mongolian ger with modern luxury amenities",
    price: "From $350/night",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Forest Lodge",
    description: "Secluded cabin surrounded by pristine wilderness",
    price: "From $450/night",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Lakeside Villa",
    description: "Panoramic lake views with private terrace",
    price: "From $650/night",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80",
  },
];

const amenities = [
  { icon: Star, title: "5-Star Service", desc: "World-class hospitality" },
  { icon: MapPin, title: "Prime Location", desc: "Heart of Mongolian wilderness" },
  { icon: Users, title: "Private Tours", desc: "Exclusive guided experiences" },
  { icon: Calendar, title: "Flexible Booking", desc: "Easy reservations" },
];

export default function Home() {
  const roomsRef = useRef<HTMLDivElement>(null);

  const scrollToRooms = () => {
    roomsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openBooking = () => {
    window.open("https://hotels.cloudbeds.com/reservation/177930597200001", "_blank");
  };

  return (
    <main className="relative min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-forest-green">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&auto=format&fit=crop&q=80"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-forest-green/50 via-transparent to-forest-green/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-wide"
          >
            Dalai Eej Resort
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="font-body text-lg md:text-xl text-cream/90 max-w-2xl mx-auto"
          >
            Experience the timeless beauty of Mongolia in unparalleled luxury
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-cream/70"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      <section className="bg-cream py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
              A Sanctuary of Serenity
            </h2>
            <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
              Nestled in the heart of Mongolia&apos;s pristine wilderness, Dalai Eej Resort 
              offers an escape into nature without compromising on luxury.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-green/10 mb-4">
                  <amenity.icon className="w-8 h-8 text-forest-green" />
                </div>
                <h3 className="font-heading text-xl text-forest-green mb-2">{amenity.title}</h3>
                <p className="font-body text-forest-green/70">{amenity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={roomsRef} id="rooms" className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-forest-green mb-4">
              Accommodations
            </h2>
            <p className="font-body text-forest-green/80 max-w-2xl mx-auto text-lg">
              Choose from our collection of thoughtfully designed spaces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-forest-green/20 group-hover:bg-forest-green/40 transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-2xl text-forest-green mb-2">{room.name}</h3>
                <p className="font-body text-forest-green/70 mb-2">{room.description}</p>
                <p className="font-body text-forest-green font-semibold">{room.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-green py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6">
              Begin Your Journey
            </h2>
            <p className="font-body text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              Let us create an unforgettable experience tailored to your desires. 
              Contact our concierge team to start planning your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openBooking}
                className="px-8 py-4 bg-cream text-forest-green font-body font-semibold rounded-lg hover:bg-white transition-colors duration-300"
              >
                Reserve Now
              </button>
              <button
                onClick={scrollToRooms}
                className="px-8 py-4 border-2 border-cream text-cream font-body font-semibold rounded-lg hover:bg-cream/10 transition-colors duration-300"
              >
                Explore Rooms
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-forest-green/95 py-12 px-4 border-t border-cream/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-heading text-2xl text-cream mb-4">Dalai Eej Resort</h3>
              <p className="font-body text-cream/70 text-sm">
                Luxury retreat in the heart of Mongolia
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg text-cream mb-4">Contact</h4>
              <p className="font-body text-cream/70 text-sm">info@dalaieej.com</p>
              <p className="font-body text-cream/70 text-sm">+976 XXXX XXXX</p>
            </div>
            <div>
              <h4 className="font-heading text-lg text-cream mb-4">Location</h4>
              <p className="font-body text-cream/70 text-sm">
                Khuvsgul Province, Mongolia
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-cream/20 text-center">
            <p className="font-body text-cream/50 text-sm">
              &copy; {new Date().getFullYear()} Dalai Eej Resort. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-forest-green/95 backdrop-blur-sm border-t border-cream/20 py-4 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-heading text-cream text-lg">Ready to experience luxury?</p>
            <p className="font-body text-cream/70 text-sm">Book your stay at Dalai Eej Resort</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={scrollToRooms}
              className="px-6 py-3 border border-cream/50 text-cream font-body text-sm rounded-lg hover:bg-cream/10 transition-colors duration-300"
            >
              Check Availability
            </button>
            <button
              onClick={openBooking}
              className="px-6 py-3 bg-cream text-forest-green font-body text-sm font-semibold rounded-lg hover:bg-white transition-colors duration-300"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
