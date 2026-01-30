"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { User, Mail, Phone, Globe, MessageSquare, Plus, Minus, Loader2, AlertCircle, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";

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
  
  const [roomTypeId, setRoomTypeId] = useState("");
  const [rateId, setRateId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [nights, setNights] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const [currency, setCurrency] = useState("MNT");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  
  const [addons, setAddons] = useState<Addon[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([]);
  const [loadingAddons, setLoadingAddons] = useState(false);
  const [addonsExpanded, setAddonsExpanded] = useState(true);
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlRoomTypeId = searchParams.get("roomTypeId");
    const urlRateId = searchParams.get("rateId");
    const urlRoomName = searchParams.get("roomName");
    const urlCheckin = searchParams.get("checkin");
    const urlCheckout = searchParams.get("checkout");
    const urlNights = searchParams.get("nights");
    const urlPrice = searchParams.get("price");
    const urlCurrency = searchParams.get("currency");
    
    if (urlRoomTypeId) setRoomTypeId(urlRoomTypeId);
    if (urlRateId) setRateId(urlRateId);
    if (urlRoomName) setRoomName(decodeURIComponent(urlRoomName));
    if (urlCheckin) setCheckin(urlCheckin);
    if (urlCheckout) setCheckout(urlCheckout);
    if (urlNights) setNights(parseInt(urlNights));
    if (urlPrice) setBasePrice(parseFloat(urlPrice));
    if (urlCurrency) setCurrency(urlCurrency);
    
    if (urlCheckin && urlCheckout && urlRoomTypeId) {
      fetchAddons(urlCheckin, urlCheckout, urlRoomTypeId);
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

  const totalPrice = basePrice + calculateAddonsTotal();

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
      const response = await fetch("/api/cloudbeds/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomTypeId,
          rateId,
          checkin,
          checkout,
          guestFirstName: firstName,
          guestLastName: lastName,
          guestEmail: email,
          guestPhone: phone,
          guestCountry: country,
          specialRequests,
          adults,
          children,
          addons: selectedAddons.map(a => ({ id: a.id, quantity: a.quantity })),
          totalAmount: totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create reservation");
      }

      const paymentParams = new URLSearchParams({
        bookingId: data.reservationId || `${roomTypeId}-${Date.now()}`,
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
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={t('countryPlaceholder')}
                    className="w-full px-4 py-3 border border-[#333]/20 rounded-lg focus:outline-none focus:border-[#1D3C45] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#333]/70 text-sm mb-1">
                    {t('guests')}
                  </label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#333]/60">{t('adults')}</span>
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(Math.min(10, adults + 1))}
                        className="w-8 h-8 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#333]/60">{t('children')}</span>
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(Math.min(10, children + 1))}
                        className="w-8 h-8 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
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
            </motion.div>

            {(addons.length > 0 || loadingAddons) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setAddonsExpanded(!addonsExpanded)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <h2 className="font-serif text-xl text-[#333] flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#1D3C45]" />
                    {t('addons')}
                    {selectedAddons.length > 0 && (
                      <span className="ml-2 text-sm font-sans bg-[#1D3C45] text-white px-2 py-0.5 rounded-full">
                        {selectedAddons.length}
                      </span>
                    )}
                  </h2>
                  {addonsExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#333]/50" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#333]/50" />
                  )}
                </button>

                {addonsExpanded && (
                  <div className="px-6 pb-6">
                    {loadingAddons ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-[#1D3C45]" />
                        <span className="ml-2 text-[#333]/60">{t('loadingAddons')}</span>
                      </div>
                    ) : addons.length > 0 ? (
                      <div className="space-y-3">
                        {addons.map((addon) => {
                          const isSelected = selectedAddons.some(a => a.id === addon.id);
                          const selectedAddon = selectedAddons.find(a => a.id === addon.id);
                          return (
                            <div
                              key={addon.id}
                              className={`border rounded-lg p-4 transition-all ${
                                isSelected ? 'border-[#1D3C45] bg-[#1D3C45]/5' : 'border-[#333]/10 hover:border-[#333]/30'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => toggleAddon(addon)}
                                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                                        isSelected ? 'bg-[#1D3C45] border-[#1D3C45]' : 'border-[#333]/30'
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </button>
                                    <h3 className="font-medium text-[#333]">{addon.name}</h3>
                                  </div>
                                  {addon.description && (
                                    <p className="text-sm text-[#333]/60 mt-1 ml-7">{addon.description}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="font-serif text-[#1D3C45]">
                                    {addon.price.toLocaleString()} {addon.currency}
                                  </p>
                                  <p className="text-xs text-[#333]/50">
                                    {addon.priceType === 'per_night' ? t('perNight') : t('perStay')}
                                  </p>
                                </div>
                              </div>
                              {isSelected && selectedAddon && (
                                <div className="mt-3 ml-7 flex items-center gap-3">
                                  <span className="text-sm text-[#333]/60">{t('quantity')}:</span>
                                  <button
                                    onClick={() => updateAddonQuantity(addon.id, -1)}
                                    className="w-8 h-8 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-6 text-center">{selectedAddon.quantity}</span>
                                  <button
                                    onClick={() => updateAddonQuantity(addon.id, 1)}
                                    className="w-8 h-8 border border-[#333]/20 rounded flex items-center justify-center hover:bg-[#F5F5F0]"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-center text-[#333]/50 py-4">{t('noAddons')}</p>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="font-serif text-xl text-[#333] mb-4">{t('bookingSummary')}</h2>

              <div className="space-y-3 pb-4 border-b border-[#333]/10">
                <div>
                  <p className="text-xs text-[#333]/50 uppercase tracking-wider">{t('accommodation')}</p>
                  <p className="font-medium text-[#333]">{roomName || "Room"}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#333]/60">{t('checkIn')}</span>
                  <span className="text-[#333]">{formatDate(checkin)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#333]/60">{t('checkOut')}</span>
                  <span className="text-[#333]">{formatDate(checkout)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#333]/60">{t('duration')}</span>
                  <span className="text-[#333]">{nights} {nights === 1 ? t('night') : t('nights')}</span>
                </div>
              </div>

              <div className="py-4 border-b border-[#333]/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#333]/60">{t('roomRate')}</span>
                  <span className="text-[#333]">{basePrice.toLocaleString()} {currency}</span>
                </div>
                {selectedAddons.map((addon) => {
                  let addonTotal = addon.price * addon.quantity;
                  if (addon.priceType === "per_night") addonTotal *= nights;
                  return (
                    <div key={addon.id} className="flex justify-between text-sm">
                      <span className="text-[#333]/60">
                        {addon.name} {addon.quantity > 1 && `x${addon.quantity}`}
                      </span>
                      <span className="text-[#333]">{addonTotal.toLocaleString()} {currency}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-serif text-lg text-[#333]">{t('total')}</span>
                  <span className="font-serif text-2xl text-[#1D3C45]">
                    {totalPrice.toLocaleString()} {currency}
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-4 p-3 bg-[#F5F5F0] rounded-lg">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-[#333]/30 text-[#1D3C45] focus:ring-[#1D3C45] cursor-pointer accent-[#1D3C45]"
                  />
                  <label htmlFor="terms" className="text-[#333]/80 text-xs cursor-pointer leading-relaxed">
                    {currentLocale === 'mn' 
                      ? <>Би <a href={`${localePrefix}/terms`} className="text-[#1D3C45] underline hover:text-[#1D3C45]/80">{t('termsLink')}</a> болон <a href={`${localePrefix}/cancellation`} className="text-[#1D3C45] underline hover:text-[#1D3C45]/80">{t('cancellationLink')}</a>-г зөвшөөрч байна.</>
                      : <>I agree to the <a href={`${localePrefix}/terms`} className="text-[#1D3C45] underline hover:text-[#1D3C45]/80">{t('termsLink')}</a> and <a href={`${localePrefix}/cancellation`} className="text-[#1D3C45] underline hover:text-[#1D3C45]/80">{t('cancellationLink')}</a>.</>
                    }
                  </label>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={loading || !termsAccepted}
                  className={`w-full py-4 font-serif uppercase tracking-widest transition-all rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    termsAccepted && !loading
                      ? 'bg-[#1D3C45] text-[#F5F5F0] hover:bg-[#1D3C45]/90 cursor-pointer'
                      : 'bg-[#333]/20 text-[#333]/50 cursor-not-allowed'
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
