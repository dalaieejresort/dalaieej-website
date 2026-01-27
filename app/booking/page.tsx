"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Users, Check } from "lucide-react";

interface Room {
  roomTypeID: string;
  roomTypeName: string;
  roomsAvailable: number;
  rateID: string;
  rateName: string;
  totalRate: number;
  currency: string;
  description: string;
  maxGuests: number;
  photos: string[];
  features: string[];
}

interface AvailabilityData {
  success: boolean;
  checkin: string;
  checkout: string;
  rooms: Room[];
}

function BookingContent() {
  const searchParams = useSearchParams();
  
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const urlCheckin = searchParams.get("checkin");
    const urlCheckout = searchParams.get("checkout");
    
    if (urlCheckin) setCheckin(urlCheckin);
    if (urlCheckout) setCheckout(urlCheckout);

    if (urlCheckin && urlCheckout) {
      fetchAvailability(urlCheckin, urlCheckout);
    }
  }, [searchParams]);

  const fetchAvailability = async (checkInDate: string, checkOutDate: string) => {
    setLoading(true);
    setError("");
    setRooms([]);

    try {
      const response = await fetch(
        `/api/cloudbeds/availability?checkin=${checkInDate}&checkout=${checkOutDate}`
      );
      const data: AvailabilityData = await response.json();

      console.log("Frontend received:", data);

      if (!response.ok) {
        throw new Error((data as any).error || "Failed to fetch availability");
      }

      setRooms(data.rooms || []);
      setSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!checkin || !checkout) {
      setError("Please select both check-in and check-out dates");
      return;
    }
    fetchAvailability(checkin, checkout);
  };

  const handleBookWithQPay = (room: Room) => {
    const paymentUrl = `/payment?bookingId=${room.roomTypeID}-${Date.now()}&amount=${room.totalRate}`;
    window.location.href = paymentUrl;
  };

  const minDate = new Date().toISOString().split("T")[0];

  const placeholderImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=80",
  ];

  return (
    <main className="min-h-screen bg-[#F5F5DC]">
      <div className="bg-[#1A3C34] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F5DC] mb-4">
            Find Your Perfect Room
          </h1>
          <p className="font-sans text-[#F5F5DC]/70 mb-8">
            Select your dates to view available accommodations
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            <div className="flex flex-col">
              <label className="text-[#F5F5DC]/70 text-xs uppercase tracking-wider mb-1 font-sans text-left">
                Check-in
              </label>
              <input
                type="date"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                min={minDate}
                className="px-4 py-3 bg-white/10 border border-[#F5F5DC]/50 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#F5F5DC] transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#F5F5DC]/70 text-xs uppercase tracking-wider mb-1 font-sans text-left">
                Check-out
              </label>
              <input
                type="date"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                min={checkin || minDate}
                className="px-4 py-3 bg-white/10 border border-[#F5F5DC]/50 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#F5F5DC] transition-colors"
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="mt-6 sm:mt-6 px-8 py-3 bg-[#F5F5DC] text-[#1A3C34] font-serif uppercase tracking-widest hover:bg-white transition-all cursor-pointer rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search Rooms"}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        {loading && (
          <div className="text-center py-12">
            <p className="text-[#1A3C34]/70">Loading available rooms...</p>
          </div>
        )}

        {!loading && searched && rooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#1A3C34]/70 text-lg">
              No rooms available for the selected dates.
            </p>
            <p className="text-[#1A3C34]/50 mt-2">
              Please try different dates.
            </p>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div
                key={room.roomTypeID}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.photos[0] || placeholderImages[index % placeholderImages.length]}
                    alt={room.roomTypeName}
                    className="w-full h-full object-cover"
                  />
                  {room.roomsAvailable <= 3 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Only {room.roomsAvailable} left
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl text-[#1A3C34] mb-2">
                    {room.roomTypeName}
                  </h3>
                  
                  <p className="text-[#1A3C34]/60 text-sm mb-4 line-clamp-2">
                    {room.description || "Luxurious accommodation with premium amenities"}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-[#1A3C34]/70">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Up to {room.maxGuests} guests</span>
                    </div>
                  </div>

                  {room.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 text-xs text-[#1A3C34]/60 bg-[#F5F5DC] px-2 py-1 rounded"
                        >
                          <Check className="w-3 h-3" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-[#1A3C34]/10">
                    <div>
                      <p className="text-[#1A3C34]/50 text-xs uppercase">Total</p>
                      <p className="font-serif text-2xl text-[#1A3C34]">
                        {room.totalRate.toLocaleString()} <span className="text-sm">{room.currency}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleBookWithQPay(room)}
                      className="px-6 py-3 bg-[#1A3C34] text-[#F5F5DC] font-serif uppercase text-sm tracking-wider hover:bg-[#1A3C34]/90 transition-colors rounded-lg"
                    >
                      Book with QPay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!searched && !loading && (
          <div className="text-center py-12">
            <p className="text-[#1A3C34]/50 text-lg">
              Select your dates above to see available rooms
            </p>
          </div>
        )}
      </div>

      <div className="py-8 text-center">
        <a
          href="/"
          className="text-[#1A3C34]/50 text-sm hover:text-[#1A3C34] transition-colors"
        >
          &larr; Back to Home
        </a>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-[#1A3C34]">Loading...</p>
      </main>
    }>
      <BookingContent />
    </Suspense>
  );
}
