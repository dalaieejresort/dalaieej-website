"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import { Users, Check, Tag, Loader2, Plus, Minus, ShoppingCart, Trash2, AlertTriangle } from "lucide-react";
import { useTranslations } from 'next-intl';

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

interface CartItem {
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

interface AvailabilityData {
  success: boolean;
  checkin: string;
  checkout: string;
  rooms: Room[];
}

function calculateNights(checkinDate: string, checkoutDate: string): number {
  if (!checkinDate || !checkoutDate) return 1;
  const start = new Date(checkinDate);
  const end = new Date(checkoutDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

function BookingContent() {
  const t = useTranslations('booking');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentLocale = pathname.startsWith('/mn') ? 'mn' : 'en';
  const localePrefix = currentLocale === 'mn' ? '/mn' : '';
  
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [totalAdults, setTotalAdults] = useState(2);
  const [totalChildren, setTotalChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searched, setSearched] = useState(false);
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const totalGuests = totalAdults + totalChildren;
  const cartCapacity = cart.reduce((sum, item) => sum + (item.maxGuests * item.quantity), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.pricePerNight * item.quantity * numberOfNights), 0);

  useEffect(() => {
    if (cart.length > 0 && cartCapacity < totalGuests) {
      const remaining = totalGuests - cartCapacity;
      setCapacityError(
        currentLocale === 'mn' 
          ? `Таны сагсанд ${cartCapacity} зочин багтах боломжтой. ${remaining} зочинд нэмэлт өрөө нэмнэ үү.`
          : `Your cart fits ${cartCapacity} guests. Please add rooms for ${remaining} more guest${remaining > 1 ? 's' : ''}.`
      );
    } else {
      setCapacityError("");
    }
  }, [cart, totalGuests, cartCapacity, currentLocale]);

  useEffect(() => {
    const urlCheckin = searchParams.get("checkin");
    const urlCheckout = searchParams.get("checkout");
    const urlPromo = searchParams.get("promo");
    const urlAdults = searchParams.get("adults");
    const urlChildren = searchParams.get("children");
    
    if (urlCheckin) setCheckin(urlCheckin);
    if (urlCheckout) setCheckout(urlCheckout);
    if (urlPromo) {
      setPromoCode(urlPromo);
      setAppliedPromo(urlPromo);
    }
    if (urlAdults) setTotalAdults(parseInt(urlAdults) || 2);
    if (urlChildren) setTotalChildren(parseInt(urlChildren) || 0);

    if (urlCheckin && urlCheckout) {
      setNumberOfNights(calculateNights(urlCheckin, urlCheckout));
      fetchAvailability(urlCheckin, urlCheckout, urlPromo || "");
    }
  }, [searchParams]);

  const fetchAvailability = async (checkInDate: string, checkOutDate: string, promo: string = "") => {
    setLoading(true);
    setError("");
    setRooms([]);

    try {
      let url = `/api/cloudbeds/availability?checkin=${checkInDate}&checkout=${checkOutDate}`;
      if (promo) {
        url += `&promo=${encodeURIComponent(promo)}`;
      }
      
      const response = await fetch(url);
      const data: AvailabilityData = await response.json();

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
      setError(currentLocale === 'mn' ? "Ирэх, гарах огноогоо сонгоно уу" : "Please select both check-in and check-out dates");
      return;
    }
    setNumberOfNights(calculateNights(checkin, checkout));
    fetchAvailability(checkin, checkout, appliedPromo);
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setPromoLoading(true);
    setAppliedPromo(promoCode.trim());
    
    if (checkin && checkout) {
      await fetchAvailability(checkin, checkout, promoCode.trim());
    }
    
    setPromoLoading(false);
  };

  const addToCart = (room: Room) => {
    const existingIndex = cart.findIndex(item => item.roomTypeID === room.roomTypeID);
    
    if (existingIndex >= 0) {
      const updated = [...cart];
      if (updated[existingIndex].quantity < room.roomsAvailable) {
        updated[existingIndex].quantity += 1;
        setCart(updated);
      }
    } else {
      const newItem: CartItem = {
        roomTypeID: room.roomTypeID,
        roomTypeName: room.roomTypeName,
        rateID: room.rateID,
        maxGuests: room.maxGuests || 2,
        pricePerNight: room.totalRate || 0,
        currency: room.currency || 'MNT',
        adults: Math.min(totalAdults, room.maxGuests || 2),
        children: 0,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (roomTypeID: string) => {
    setCart(cart.filter(item => item.roomTypeID !== roomTypeID));
  };

  const updateCartItemQuantity = (roomTypeID: string, delta: number) => {
    const room = rooms.find(r => r.roomTypeID === roomTypeID);
    const maxAvailable = room?.roomsAvailable || 10;
    
    setCart(cart.map(item => {
      if (item.roomTypeID === roomTypeID) {
        const newQty = Math.max(1, Math.min(maxAvailable, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      setError(currentLocale === 'mn' ? "Сагсанд өрөө нэмнэ үү" : "Please add rooms to your cart");
      return;
    }
    
    if (cartCapacity < totalGuests) {
      return;
    }

    const distributeGuests = () => {
      const distributed: CartItem[] = [];
      let remainingAdults = totalAdults;
      let remainingChildren = totalChildren;
      
      for (const item of cart) {
        for (let i = 0; i < item.quantity; i++) {
          const roomCapacity = item.maxGuests;
          const adultsForRoom = Math.min(remainingAdults, roomCapacity);
          remainingAdults -= adultsForRoom;
          
          const spaceLeft = roomCapacity - adultsForRoom;
          const childrenForRoom = Math.min(remainingChildren, spaceLeft);
          remainingChildren -= childrenForRoom;
          
          const finalAdults = adultsForRoom > 0 ? adultsForRoom : (childrenForRoom > 0 ? 0 : 1);
          
          distributed.push({
            ...item,
            quantity: 1,
            adults: finalAdults,
            children: childrenForRoom,
          });
        }
      }
      return distributed;
    };

    const distributedCart = distributeGuests();
    
    const checkoutParams = new URLSearchParams({
      checkin,
      checkout,
      nights: String(numberOfNights),
      totalAdults: String(totalAdults),
      totalChildren: String(totalChildren),
      cart: encodeURIComponent(JSON.stringify(distributedCart)),
    });
    
    if (appliedPromo) {
      checkoutParams.set('promo', appliedPromo);
    }
    
    window.location.href = `${localePrefix}/checkout?${checkoutParams.toString()}`;
  };

  const minDate = new Date().toISOString().split("T")[0];

  const placeholderImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=80",
  ];

  return (
    <main className="min-h-screen bg-[#F5F5DC] pt-24 md:pt-16">
      <div className="bg-[#1A3C34] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F5DC] mb-4">
            {t('findRoom')}
          </h1>
          <p className="font-sans text-[#F5F5DC]/70 mb-8">
            {t('selectDates')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto flex-wrap">
            <div className="flex flex-col">
              <label className="text-[#F5F5DC]/70 text-xs uppercase tracking-wider mb-1 font-sans text-left">
                {t('checkIn')}
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
                {t('checkOut')}
              </label>
              <input
                type="date"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                min={checkin || minDate}
                className="px-4 py-3 bg-white/10 border border-[#F5F5DC]/50 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#F5F5DC] transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#F5F5DC]/70 text-xs uppercase tracking-wider mb-1 font-sans text-left">
                {currentLocale === 'mn' ? 'Насанд хүрэгчид' : 'Adults'}
              </label>
              <div className="flex items-center gap-2 bg-white/10 border border-[#F5F5DC]/50 rounded-lg px-3 py-2">
                <button
                  onClick={() => setTotalAdults(Math.max(1, totalAdults - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#F5F5DC] hover:bg-white/10 rounded transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-[#F5F5DC] font-semibold">{totalAdults}</span>
                <button
                  onClick={() => setTotalAdults(Math.min(20, totalAdults + 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#F5F5DC] hover:bg-white/10 rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[#F5F5DC]/70 text-xs uppercase tracking-wider mb-1 font-sans text-left">
                {currentLocale === 'mn' ? 'Хүүхдүүд' : 'Children'}
              </label>
              <div className="flex items-center gap-2 bg-white/10 border border-[#F5F5DC]/50 rounded-lg px-3 py-2">
                <button
                  onClick={() => setTotalChildren(Math.max(0, totalChildren - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#F5F5DC] hover:bg-white/10 rounded transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-[#F5F5DC] font-semibold">{totalChildren}</span>
                <button
                  onClick={() => setTotalChildren(Math.min(10, totalChildren + 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#F5F5DC] hover:bg-white/10 rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="mt-6 sm:mt-6 px-8 py-3 bg-[#F5F5DC] text-[#1A3C34] font-serif uppercase tracking-widest hover:bg-white transition-all cursor-pointer rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? t('loading') : t('searchRooms')}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
              <Tag className="w-4 h-4 text-[#F5F5DC]/70" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder={t('enterPromo')}
                className="flex-1 px-3 py-2 bg-white/10 border border-[#F5F5DC]/30 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#F5F5DC] transition-colors placeholder:text-[#F5F5DC]/30 text-sm uppercase tracking-wider"
              />
            </div>
            <button
              onClick={handleApplyPromo}
              disabled={promoLoading || !promoCode.trim()}
              className="px-4 py-2 bg-[#F5F5DC]/20 text-[#F5F5DC] text-sm uppercase tracking-wider hover:bg-[#F5F5DC]/30 transition-all cursor-pointer rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {promoLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t('apply')}
            </button>
          </div>
          
          {appliedPromo && (
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                <Check className="w-4 h-4" />
                {t('promoApplied')} ({appliedPromo})
              </span>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {loading && (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#1A3C34]" />
                <p className="text-[#1A3C34]/70 mt-4">{t('loading')}</p>
              </div>
            )}

            {!loading && searched && rooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#1A3C34]/70 text-lg">{t('noRooms')}</p>
                <p className="text-[#1A3C34]/50 mt-2">{t('tryDifferent')}</p>
              </div>
            )}

            {!loading && rooms.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room, index) => {
                  const perNightRate = room.totalRate ? Number(room.totalRate) : 0;
                  const hasPrice = perNightRate > 0;
                  const photos = room.photos || [];
                  const features = room.features || [];
                  const cartItem = cart.find(item => item.roomTypeID === room.roomTypeID);
                  const inCart = !!cartItem;
                  const maxGuests = room.maxGuests || 2;
                  
                  return (
                    <div
                      key={room.roomTypeID || index}
                      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${inCart ? 'ring-2 ring-[#1A3C34]' : ''}`}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={photos[0] || placeholderImages[index % placeholderImages.length]}
                          alt={room.roomTypeName || "Room"}
                          className="w-full h-full object-cover"
                        />
                        {room.roomsAvailable && room.roomsAvailable <= 3 && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            {t('onlyLeft', { count: room.roomsAvailable })}
                          </div>
                        )}
                        {inCart && (
                          <div className="absolute top-3 left-3 bg-[#1A3C34] text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <ShoppingCart className="w-3 h-3" />
                            {currentLocale === 'mn' ? 'Сагсанд' : 'In Cart'} ({cartItem.quantity})
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-serif text-lg text-[#1A3C34] mb-2">
                          {room.roomTypeName || "Room"}
                        </h3>
                        
                        <p className="text-[#1A3C34]/60 text-sm mb-3 line-clamp-2">
                          {room.description || "Luxurious accommodation with premium amenities"}
                        </p>

                        <div className="flex items-center gap-4 mb-3 text-sm text-[#1A3C34]/70">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{currentLocale === 'mn' ? `${maxGuests} хүн хүртэл` : `Up to ${maxGuests} guests`}</span>
                          </div>
                        </div>

                        {features.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {features.slice(0, 2).map((feature, idx) => (
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

                        <div className="pt-3 border-t border-[#1A3C34]/10">
                          {hasPrice ? (
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-serif text-xl text-[#1A3C34] font-bold">
                                  {perNightRate.toLocaleString()} <span className="text-sm font-normal">{room.currency || "MNT"}</span>
                                </p>
                                <p className="text-[#1A3C34]/50 text-xs">{t('perNight')}</p>
                              </div>
                              
                              {totalGuests > maxGuests && !inCart ? (
                                <div className="text-right">
                                  <p className="text-orange-600 text-xs mb-1">
                                    {currentLocale === 'mn' 
                                      ? `${maxGuests} хүн багтана` 
                                      : `Fits ${maxGuests} guests`}
                                  </p>
                                  <button
                                    onClick={() => addToCart(room)}
                                    className="px-4 py-2 bg-[#1A3C34] text-white text-sm rounded-lg hover:bg-[#1A3C34]/90 transition-colors flex items-center gap-2"
                                  >
                                    <Plus className="w-4 h-4" />
                                    {currentLocale === 'mn' ? 'Нэмэх' : 'Add Room'}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => addToCart(room)}
                                  disabled={inCart && cartItem.quantity >= room.roomsAvailable}
                                  className="px-4 py-2 bg-[#1A3C34] text-white text-sm rounded-lg hover:bg-[#1A3C34]/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                  <Plus className="w-4 h-4" />
                                  {inCart 
                                    ? (currentLocale === 'mn' ? 'Өөр нэмэх' : 'Add Another')
                                    : (currentLocale === 'mn' ? 'Сагсанд нэмэх' : 'Add to Cart')
                                  }
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="font-serif text-lg text-[#1A3C34]/50">
                                {t('contactUs')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!searched && !loading && (
              <div className="text-center py-12">
                <p className="text-[#1A3C34]/50 text-lg">{t('selectDatesPrompt')}</p>
              </div>
            )}
          </div>

          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-serif text-xl text-[#1A3C34] mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                {currentLocale === 'mn' ? 'Таны сагс' : 'Your Cart'}
              </h3>

              {cart.length === 0 ? (
                <p className="text-[#1A3C34]/50 text-sm">
                  {currentLocale === 'mn' ? 'Сагс хоосон байна' : 'Your cart is empty'}
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {cart.map((item) => (
                      <div key={item.roomTypeID} className="border-b border-[#1A3C34]/10 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-[#1A3C34] text-sm">{item.roomTypeName}</p>
                            <p className="text-xs text-[#1A3C34]/50">
                              {currentLocale === 'mn' ? `${item.maxGuests} хүн хүртэл` : `Up to ${item.maxGuests} guests`}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.roomTypeID)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartItemQuantity(item.roomTypeID, -1)}
                              disabled={item.quantity <= 1}
                              className="w-6 h-6 border border-[#1A3C34]/20 rounded flex items-center justify-center hover:bg-[#F5F5DC] disabled:opacity-30"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateCartItemQuantity(item.roomTypeID, 1)}
                              className="w-6 h-6 border border-[#1A3C34]/20 rounded flex items-center justify-center hover:bg-[#F5F5DC]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-[#1A3C34]">
                            {(item.pricePerNight * item.quantity * numberOfNights).toLocaleString()} {item.currency}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#1A3C34]/10 pt-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#1A3C34]/70">
                        {currentLocale === 'mn' ? 'Нийт зочин' : 'Total Guests'}
                      </span>
                      <span className="font-medium">{totalGuests}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#1A3C34]/70">
                        {currentLocale === 'mn' ? 'Сагсны багтаамж' : 'Cart Capacity'}
                      </span>
                      <span className={`font-medium ${cartCapacity < totalGuests ? 'text-red-500' : 'text-green-600'}`}>
                        {cartCapacity}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#1A3C34]/70">{numberOfNights} {numberOfNights === 1 ? t('night') : t('nights')}</span>
                    </div>
                    <div className="flex justify-between font-serif text-lg text-[#1A3C34] font-bold">
                      <span>{currentLocale === 'mn' ? 'Нийт' : 'Total'}</span>
                      <span>{cartTotal.toLocaleString()} MNT</span>
                    </div>
                  </div>

                  {capacityError && (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <p className="text-orange-700 text-sm">{capacityError}</p>
                    </div>
                  )}

                  <button
                    onClick={proceedToCheckout}
                    disabled={cart.length === 0 || cartCapacity < totalGuests}
                    className={`w-full py-3 font-serif uppercase tracking-widest text-sm rounded-lg font-semibold transition-colors ${
                      cart.length > 0 && cartCapacity >= totalGuests
                        ? 'bg-[#1A3C34] text-white hover:bg-[#1A3C34]/90 cursor-pointer'
                        : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'
                    }`}
                  >
                    {currentLocale === 'mn' ? 'Үргэлжлүүлэх' : 'Continue to Checkout'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 text-center">
        <a
          href={localePrefix || "/"}
          className="text-[#1A3C34]/50 text-sm hover:text-[#1A3C34] transition-colors"
        >
          &larr; {t('backToHome')}
        </a>
      </div>
    </main>
  );
}

export default function BookingPage() {
  const t = useTranslations('common');
  
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-[#1A3C34]">{t('loading')}</p>
      </main>
    }>
      <BookingContent />
    </Suspense>
  );
}
