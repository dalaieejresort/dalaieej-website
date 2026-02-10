"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
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
      if (data.success && data.addons) {
        setAddons(data.addons);
      }
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
      if (addon.priceType === "per_night") {
        addonPrice *= nights;
      }
      return total + addonPrice;
    }, 0);
  };

  const roomsTotal = cartRooms.reduce((sum, room) => sum + (room.pricePerNight * room.quantity * nights), 0);
  const totalPrice = roomsTotal + calculateAddonsTotal();
  const currency = cartRooms[0]?.currency || "MNT";

  const validateForm = () => {
    if (!firstName.trim()) return t('errorFirstName');
    if (!lastName.trim()) return t('errorLastName');
    if (!email.trim()) return t('errorEmail');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return t('errorEmailInvalid');
    if (!termsAccepted) return t('errorTerms');
    return null;
  };

  const handleProceedToPayment = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const rooms = cartRooms.map(room => ({
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
          rooms,
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

      if (!response.ok) {
        throw new Error(data.error || "Failed to create reservation");
      }

      const paymentParams = new URLSearchParams({
        bookingId: data.reservationId || `booking-${Date.now()}`,
        amount: String(totalPrice),
        nights: String(nights),
        guestName: `${firstName} ${lastName}`,
      });

      router.push(`${localePrefix}/payment?${paymentParams.toString()}`);
    } catch (err) {
      console.error("Reservation error:", err);
      setError(err instanceof Error ? err.message : "Failed to process booking");
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(currentLocale === 'mn' ? 'mn-MN' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] pt-24 md:pt-16">
      <div className="bg-[#1D3C45] py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F5F0] mb-2">
            {t('title')}
          </h1>
          <p className="font-sans text-[#F5F5F0]/70 text-sm">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="font-serif text-xl text-[#333] mb-6 flex items-center gap-2">
                <Bed className="w-5 h-5 text-[#1D3C45]" />
                {currentLocale === 'mn' ? 'Сонгосон өрөөнүүд' : 'Selected Rooms'}
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
                            {room.adults} {currentLocale === 'mn' ? 'насанд хүрэгч' : 'adult'}{room.adults > 1 ? 's' : ''}
                            {room.children > 0 && `, ${room.children} ${currentLocale === 'mn' ? 'хүүхэд' : 'child'}${room.children > 1 ? 'ren' : ''}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#333]">
                            {(room.pricePerNight * room.quantity * nights).toLocaleString()} {room.currency}
                          </p>
                          <p className="text-xs text-[#333]/50">
                            {room.pricePerNight.toLocaleString()} × {nights} {currentLocale === 'mn' ? 'шөнө' : 'nights'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="font-serif text-xl text-[#333] mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#1D3C45]" />
                {t('guestInfo')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333]/70 text-sm mb-1">
                    {t('firstName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t('firstNamePlaceholder')}
                    className="w-full px-4 py-3 border border-[#333]/20 rounded-lg focus:outline-none focus:border-[#1D3C45] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#333]/70 text-sm mb-1">
                    {t('lastName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t('lastNamePlaceholder')}
                    className="w-full px-4 py-3 border border-[#333]/20 rounded-lg focus:outline-none focus:border-[#1D3C45] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#333]/70 text-sm mb-1 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {t('email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className="w-full px-4 py-3 border border-[#333]/20 rounded-lg focus:outline-none focus:border-[#1D3C45] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#333]/70 text-sm mb-1 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="w-full px-4 py-3 border border-[#333]/20 rounded-lg focus:outline-none focus:border-[#1D3C45] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#333]/70 text-sm mb-1 flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {t('country')}
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-[#333]/20 rounded-lg focus:outline-none focus:border-[#1D3C45] transition-colors bg-white"
                  >
                    <option value="MN">{currentLocale === 'mn' ? 'Монгол' : 'Mongolia'}</option>
                    <option value="US">{currentLocale === 'mn' ? 'АНУ' : 'USA'}</option>
                    <option value="CN">{currentLocale === 'mn' ? 'Хятад' : 'China'}</option>
                    <option value="RU">{currentLocale === 'mn' ? 'Орос' : 'Russia'}</option>
                    <option value="KR">{currentLocale === 'mn' ? 'Өмнөд Солонгос' : 'South Korea'}</option>
                    <option value="JP">{currentLocale === 'mn' ? 'Япон' : 'Japan'}</option>
                    <option value="DE">{currentLocale === 'mn' ? 'Герман' : 'Germany'}</option>
                    <option value="GB">{currentLocale === 'mn' ? 'Их Британи' : 'UK'}</option>
                    <option value="FR">{currentLocale === 'mn' ? 'Франц' : 'France'}</option>
                    <option value="AU">{currentLocale === 'mn' ? 'Австрали' : 'Australia'}</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#333]/70 text-sm mb-1 flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {t('specialRequests')}
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder={t('specialRequestsPlaceholder')}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#333]/20 rounded-lg focus:outline-none focus:border-[#1D3C45] transition-colors resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {addons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <button
                  onClick={() => setAddonsExpanded(!addonsExpanded)}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <h2 className="font-serif text-xl text-[#333] flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#1D3C45]" />
                    {t('addons')}
                  </h2>
                  {addonsExpanded ? <ChevronUp className="w-5 h-5 text-[#333]/50" /> : <ChevronDown className="w-5 h-5 text-[#333]/50" />}
                </button>

                {addonsExpanded && (
                  <div className="space-y-3">
                    {loadingAddons ? (
                      <div className="flex items-center gap-2 text-[#333]/50">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {tCommon('loading')}
                      </div>
                    ) : (
                      addons.map((addon) => {
                        const isSelected = selectedAddons.some(a => a.id === addon.id);
                        const selectedAddon = selectedAddons.find(a => a.id === addon.id);

                        return (
                          <div
                            key={addon.id}
                            className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                              isSelected ? 'border-[#1D3C45] bg-[#1D3C45]/5' : 'border-[#333]/10 hover:border-[#333]/30'
                            }`}
                            onClick={() => toggleAddon(addon)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                    isSelected ? 'bg-[#1D3C45] border-[#1D3C45]' : 'border-[#333]/30'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                  </div>
                                  <h4 className="font-medium text-[#333]">{addon.name}</h4>
                                </div>
                                {addon.description && (
                                  <p className="text-sm text-[#333]/60 mt-1 ml-7">{addon.description}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-[#333]">
                                  {addon.price.toLocaleString()} {addon.currency}
                                </p>
                                <p className="text-xs text-[#333]/50">
                                  {addon.priceType === "per_night" ? t('perNight') : t('oneTime')}
                                </p>
                              </div>
                            </div>

                            {isSelected && selectedAddon && (
                              <div className="mt-3 ml-7 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                                <span className="text-sm text-[#333]/70">{t('quantity')}:</span>
                                <button
                                  onClick={() => updateAddonQuantity(addon.id, -1)}
                                  className="w-7 h-7 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center">{selectedAddon.quantity}</span>
                                <button
                                  onClick={() => updateAddonQuantity(addon.id, 1)}
                                  className="w-7 h-7 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="font-serif text-xl text-[#333] mb-4">
                {t('summary')}
              </h2>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[#333]/50 text-xs uppercase">{currentLocale === 'mn' ? 'Огноо' : 'Dates'}</p>
                  <p className="text-[#333]">{formatDate(checkin)} - {formatDate(checkout)}</p>
                  <p className="text-[#333]/60">{nights} {nights === 1 ? t('night') : t('nights')}</p>
                </div>

                <div className="border-t border-[#333]/10 pt-3">
                  <p className="text-[#333]/50 text-xs uppercase mb-2">{currentLocale === 'mn' ? 'Өрөөнүүд' : 'Rooms'}</p>
                  {cartRooms.map((room, index) => (
                    <div key={`summary-${room.roomTypeID}-${index}`} className="flex justify-between mb-1">
                      <span className="text-[#333]">{room.roomTypeName}</span>
                      <span className="text-[#333]">{(room.pricePerNight * room.quantity * nights).toLocaleString()} {room.currency}</span>
                    </div>
                  ))}
                </div>

                {selectedAddons.length > 0 && (
                  <div className="border-t border-[#333]/10 pt-3">
                    <p className="text-[#333]/50 text-xs uppercase mb-2">{t('addons')}</p>
                    {selectedAddons.map((addon) => {
                      let addonTotal = addon.price * addon.quantity;
                      if (addon.priceType === "per_night") {
                        addonTotal *= nights;
                      }
                      return (
                        <div key={addon.id} className="flex justify-between mb-1">
                          <span className="text-[#333]">
                            {addon.name} {addon.quantity > 1 && `×${addon.quantity}`}
                          </span>
                          <span className="text-[#333]">{addonTotal.toLocaleString()} {addon.currency}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="border-t border-[#333]/10 pt-3">
                  <div className="flex justify-between font-serif text-lg text-[#333]">
                    <span>{t('total')}</span>
                    <span className="font-bold">{totalPrice.toLocaleString()} {currency}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="mt-6">
                <div className="mb-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#1D3C45] border-[#333]/30 rounded focus:ring-[#1D3C45]"
                    />
                    <span className="text-sm text-[#333]/70">
                      {t('agreeToTerms')}{' '}
                      <a href="#" className="text-[#1D3C45] underline">{t('termsLink')}</a>
                      {' '}{currentLocale === 'mn' ? 'болон' : 'and'}{' '}
                      <a href="#" className="text-[#1D3C45] underline">{t('cancellationLink')}</a>.
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={loading || !termsAccepted}
                  className={`w-full py-4 font-serif uppercase tracking-widest transition-all rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    termsAccepted && !loading
                      ? 'bg-[#1D3C45] text-white hover:bg-[#1D3C45]/90 cursor-pointer'
                      : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'
                  }`}
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? t('processing') : t('proceedToPayment')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={`${localePrefix}/booking?checkin=${checkin}&checkout=${checkout}`}
            className="text-[#333]/50 text-sm hover:text-[#333] transition-colors"
          >
            &larr; {t('backToRooms')}
          </a>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  const t = useTranslations('common');

  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <p className="text-[#333]">{t('loading')}</p>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}