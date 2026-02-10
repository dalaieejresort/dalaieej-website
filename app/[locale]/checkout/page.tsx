"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { User, Mail, Phone, Globe, MessageSquare, Plus, Minus, Loader2, AlertCircle, Check, ChevronDown, ChevronUp, Bed } from "lucide-react";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";

interface CartRoom {
  roomTypeID: string;
  roomTypeName: string;
  rateID: string;
  maxGuests: number;
  pricePerNight: number;
  currency: string;
  adults: number;
  children: number;
  quantity: number;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  priceType: string;
  category: string;
  image: string | null;
  maxQuantity: number;
}

interface SelectedAddon extends Addon {
  quantity: number;
}

function CheckoutContent() {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith('/mn') ? 'mn' : 'en';
  const localePrefix = currentLocale === 'mn' ? '/mn' : '';

  const [cartRooms, setCartRooms] = useState<CartRoom[]>([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [nights, setNights] = useState(1);
  const [totalAdults, setTotalAdults] = useState(1);
  const [totalChildren, setTotalChildren] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("MN");
  const [specialRequests, setSpecialRequests] = useState("");

  const [addons, setAddons] = useState<Addon[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([]);
  const [loadingAddons, setLoadingAddons] = useState(false);
  const [addonsExpanded, setAddonsExpanded] = useState(true);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlCheckin = searchParams.get("checkin");
    const urlCheckout = searchParams.get("checkout");
    const urlNights = searchParams.get("nights");
    const urlCart = searchParams.get("cart");
    const urlTotalAdults = searchParams.get("totalAdults");
    const urlTotalChildren = searchParams.get("totalChildren");

    if (urlCheckin) setCheckin(urlCheckin);
    if (urlCheckout) setCheckout(urlCheckout);
    if (urlNights) setNights(parseInt(urlNights));
    if (urlTotalAdults) setTotalAdults(parseInt(urlTotalAdults));
    if (urlTotalChildren) setTotalChildren(parseInt(urlTotalChildren));

    if (urlCart) {
      try {
        const decodedCart = decodeURIComponent(urlCart);
        const parsedCart = JSON.parse(decodedCart);
        setCartRooms(parsedCart);

        if (urlCheckin && urlCheckout && parsedCart.length > 0) {
          fetchAddons(urlCheckin, urlCheckout, parsedCart[0].roomTypeID);
        }
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, [searchParams]);

  const fetchAddons = async (checkIn: string, checkOut: string, roomType: string) => {
    setLoadingAddons(true);
    try {
      const response = await fetch(`/api/cloudbeds/addons?checkin=${checkIn}&checkout=${checkOut}&roomTypeId=${roomType}`);
      const data = await response.json();
      if (data.success && data.addons) setAddons(data.addons);
    } catch (err) {
      console.error("Failed to fetch add-ons:", err);
    } finally {
      setLoadingAddons(false);
    }
  };

  const toggleAddon = (addon: Addon) => {
    const existing = selectedAddons.find(a => a.id === addon.id);
    if (existing) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, { ...addon, quantity: 1 }]);
    }
  };

  const updateAddonQuantity = (addonId: string, delta: number) => {
    setSelectedAddons(selectedAddons.map(addon => {
      if (addon.id === addonId) {
        const newQty = Math.max(1, Math.min(addon.maxQuantity, addon.quantity + delta));
        return { ...addon, quantity: newQty };
      }
      return addon;
    }));
  };

  const calculateAddonsTotal = () => {
    return selectedAddons.reduce((total, addon) => {
      let addonPrice = addon.price * addon.quantity;
      if (addon.priceType === "per_night") addonPrice *= nights;
      return total + addonPrice;
    }, 0);
  };

  // FIX: Ensure pricing calculation is based on room instances, not guest counts
  const roomsTotal = cartRooms.reduce((sum, room) => sum + (room.pricePerNight * room.quantity * nights), 0);
  const totalPrice = roomsTotal + calculateAddonsTotal();
  const currency = cartRooms[0]?.currency || "MNT";

  const handleProceedToPayment = async () => {
    if (!firstName || !lastName || !email || !termsAccepted) {
      setError(t('pleaseFillRequired'));
      return;
    }

    setLoading(true);
    setError("");

    try {
      // FIX: Ensure guest counts are correctly mapped per room item
      const roomsToBook = cartRooms.map(room => ({
        roomTypeID: room.roomTypeID,
        roomRateID: room.rateID,
        quantity: room.quantity,
        adults: room.adults, 
        children: room.children,
      }));

      const response = await fetch("/api/cloudbeds/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rooms: roomsToBook,
          checkin,
          checkout,
          guestFirstName: firstName,
          guestLastName: lastName,
          guestEmail: email,
          guestPhone: phone,
          guestCountry: country,
          specialRequests,
          addons: selectedAddons.map(a => ({ id: a.id, quantity: a.quantity })),
          totalAmount: totalPrice,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create reservation");

      const paymentParams = new URLSearchParams({
        bookingId: data.reservationId || `booking-${Date.now()}`,
        amount: String(totalPrice),
        nights: String(nights),
        guestName: `${firstName} ${lastName}`,
      });

      router.push(`${localePrefix}/payment?${paymentParams.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process booking");
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(currentLocale === 'mn' ? 'mn-MN' : 'en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] pt-24 md:pt-16">
      <div className="bg-[#1D3C45] py-8 px-4 text-[#F5F50] text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">{t('title')}</h1>
        <p className="font-sans text-white/70 text-sm">{t('subtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-xl text-[#333] mb-6 flex items-center gap-2">
                <Bed className="w-5 h-5 text-[#1D3C45]" /> {currentLocale === 'mn' ? 'Сонгосон өрөөнүүд' : 'Selected Rooms'}
              </h2>
              {cartRooms.length === 0 ? (
                <p className="text-[#333]/50">{currentLocale === 'mn' ? 'Өрөө сонгоогүй байна' : 'No rooms selected'}</p>
              ) : (
                <div className="space-y-4">
                  {cartRooms.map((room, index) => (
                    <div key={`${room.roomTypeID}-${index}`} className="border border-[#333]/10 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-[#333]">{room.roomTypeName}</h3>
                          <p className="text-sm text-[#333]/60">
                            {room.quantity} x {room.adults} {currentLocale === 'mn' ? 'насанд хүрэгч' : 'adult'}{room.adults > 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#333]">{(room.pricePerNight * room.quantity * nights).toLocaleString()} {room.currency}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Guest Info Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-xl text-[#333] mb-6 flex items-center gap-2"><User className="w-5 h-5 text-[#1D3C45]" />{t('guestInfo')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t('firstName')} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#1D3C45]" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t('lastName')} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#1D3C45]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#1D3C45]" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('phone')} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#1D3C45]" />
              </div>
            </motion.div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-serif text-xl text-[#333] mb-4">{t('summary')}</h2>
              <div className="space-y-3 text-sm">
                <p className="text-[#333]">{formatDate(checkin)} - {formatDate(checkout)}</p>
                <div className="border-t pt-3 flex justify-between font-serif text-lg text-[#333]">
                  <span>{t('total')}</span>
                  <span className="font-bold">{totalPrice.toLocaleString()} {currency}</span>
                </div>
              </div>
              <label className="flex items-start gap-3 mt-6 cursor-pointer">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 w-4 h-4" />
                <span className="text-xs text-[#333]/70">{t('agreeToTerms')} <a href="#" className="underline">{t('termsLink')}</a></span>
              </label>
              <button onClick={handleProceedToPayment} disabled={loading || !termsAccepted} className={`w-full mt-6 py-4 font-serif uppercase tracking-widest rounded-lg font-semibold flex items-center justify-center gap-2 ${termsAccepted && !loading ? 'bg-[#1D3C45] text-white' : 'bg-gray-200 text-gray-400'}`}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('proceedToPayment')}
              </button>
              {error && <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-start gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0" />{error}</div>}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  const t = useTranslations('common');
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F5F5F0] flex items-center justify-center"><p>{t('loading')}</p></main>}>
      <CheckoutContent />
    </Suspense>
  );
}