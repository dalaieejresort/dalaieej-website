"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Smartphone, QrCode } from "lucide-react";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "../../components/LanguageSwitcher";

interface BankUrl {
  name: string;
  description: string;
  logo: string;
  link: string;
}

function PaymentContent() {
  const t = useTranslations('payment');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentLocale = pathname.startsWith('/mn') ? 'mn' : 'en';
  const localePrefix = currentLocale === 'mn' ? '/mn' : '';
  
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");
  const [nights, setNights] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [bankUrls, setBankUrls] = useState<BankUrl[]>([]);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [manualExpanded, setManualExpanded] = useState(false);

  useEffect(() => {
    const urlBookingId = searchParams.get("bookingId");
    const urlAmount = searchParams.get("amount");
    const urlNights = searchParams.get("nights");
    
    if (urlBookingId) setBookingId(urlBookingId);
    if (urlAmount) setAmount(urlAmount);
    if (urlNights) setNights(urlNights);

    if (urlBookingId && urlAmount) {
      generateQRAutomatic(urlBookingId, urlAmount);
    }
  }, [searchParams]);

  const generateQRAutomatic = async (bid: string, amt: string) => {
    const numAmount = parseFloat(amt);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/qpay/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numAmount,
          description: `Dalai Eej Resort - Booking ${bid}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate payment");
      }

      setQrCode(data.qrCode);
      setInvoiceId(data.invoiceId);
      setBankUrls(data.bankUrls || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const generateQR = async () => {
    if (!bookingId || !amount) {
      setError("Please enter both booking reference and amount");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setQrCode("");
    setBankUrls([]);

    try {
      const response = await fetch("/api/qpay/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numAmount,
          description: `Dalai Eej Resort - Booking ${bookingId}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate QR code");
      }

      setQrCode(data.qrCode);
      setInvoiceId(data.invoiceId);
      setBankUrls(data.bankUrls || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    setCheckingStatus(true);
    setPaymentStatus("");

    setTimeout(() => {
      setPaymentStatus("Checking payment status... Please wait for confirmation from your bank.");
      setCheckingStatus(false);
    }, 2000);
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("5765050027");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedAmount = amount ? parseInt(amount).toLocaleString() : "0";
  const tBooking = useTranslations('booking');

  return (
    <main className="min-h-screen bg-[#1A3C34] py-8 px-4">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F5DC] mb-3">
            {t('title')}
          </h1>
          <p className="font-sans text-[#F5F5DC]/70 text-sm">
            {t('subtitle')}
          </p>
        </div>

        {!qrCode && !loading ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[#F5F5DC]/20">
            <div className="space-y-5">
              <div>
                <label className="block text-[#F5F5DC]/70 text-sm uppercase tracking-wider mb-2 font-sans">
                  {t('bookingRef')}
                </label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder={t('enterBookingId')}
                  className="w-full px-4 py-3 bg-transparent border border-[#F5F5DC]/50 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#F5F5DC] transition-colors placeholder:text-[#F5F5DC]/30"
                />
              </div>

              <div>
                <label className="block text-[#F5F5DC]/70 text-sm uppercase tracking-wider mb-2 font-sans">
                  {t('amount')}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t('enterAmount')}
                  className="w-full px-4 py-3 bg-transparent border border-[#F5F5DC]/50 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#F5F5DC] transition-colors placeholder:text-[#F5F5DC]/30"
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center py-2">
                  {error}
                </div>
              )}

              <button
                onClick={generateQR}
                disabled={loading}
                className="w-full py-4 bg-[#F5F5DC] text-[#1A3C34] font-serif uppercase tracking-widest hover:bg-white transition-all cursor-pointer rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('generating') : t('generatePayment')}
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[#F5F5DC]/20 text-center">
            <p className="text-[#F5F5DC]">{t('generating')}</p>
          </div>
        ) : (
          <>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-[#F5F5DC]/20 mb-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-[#F5F5DC]/70 text-xs">{t('bookingRef')}</p>
                  <p className="text-[#F5F5DC] font-serif">{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#F5F5DC]/70 text-xs">{nights} {parseInt(nights) !== 1 ? tBooking('nights') : tBooking('night')}</p>
                  <p className="text-[#F5F5DC] font-serif text-xl">{formattedAmount} MNT</p>
                </div>
              </div>
            </div>

            {bankUrls.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-[#F5F5DC]/20 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-[#F5F5DC]" />
                  <h2 className="font-serif text-lg text-[#F5F5DC]">{t('payWithApp')}</h2>
                </div>
                <p className="text-[#F5F5DC]/60 text-sm mb-4">
                  {t('tapBank')}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {bankUrls.map((bank, index) => (
                    <a
                      key={index}
                      href={bank.link}
                      className="flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-[#F5F5DC]/10 hover:border-[#F5F5DC]/30"
                    >
                      {bank.logo ? (
                        <img
                          src={bank.logo}
                          alt={bank.name}
                          className="w-12 h-12 object-contain mb-2 rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-[#F5F5DC]/20 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-[#F5F5DC] text-lg font-bold">
                            {bank.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-[#F5F5DC] text-xs text-center font-medium line-clamp-2">
                        {bank.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-[#F5F5DC]/20 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-[#F5F5DC]" />
                <h2 className="font-serif text-lg text-[#F5F5DC]">{t('scanQR')}</h2>
              </div>
              <p className="text-[#F5F5DC]/60 text-sm mb-4 hidden md:block">
                {t('scanWithApp')}
              </p>
              <p className="text-[#F5F5DC]/60 text-sm mb-4 md:hidden">
                {t('scanOtherDevice')}
              </p>
              
              <div className="flex justify-center">
                <div className="bg-white p-3 rounded-xl inline-block">
                  <img
                    src={`data:image/png;base64,${qrCode}`}
                    alt="QPay QR Code"
                    className="w-48 h-48 md:w-56 md:h-56"
                  />
                </div>
              </div>

              {invoiceId && (
                <p className="text-[#F5F5DC]/40 text-xs text-center mt-3">
                  Invoice: {invoiceId}
                </p>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-[#F5F5DC]/20 mb-4 overflow-hidden">
              <button
                onClick={() => setManualExpanded(!manualExpanded)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <div>
                  <h2 className="font-serif text-lg text-[#F5F5DC]">{t('manualTransfer')}</h2>
                  <p className="text-[#F5F5DC]/60 text-sm">{t('alternativePayment')}</p>
                </div>
                {manualExpanded ? (
                  <ChevronUp className="w-5 h-5 text-[#F5F5DC]/70" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#F5F5DC]/70" />
                )}
              </button>
              
              {manualExpanded && (
                <div className="px-5 pb-5 space-y-4">
                  <div className="bg-[#F5F5DC]/10 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="text-[#F5F5DC]/60 text-xs uppercase tracking-wider">{t('bank')}</p>
                      <p className="text-[#F5F5DC] font-medium">Khan Bank</p>
                    </div>
                    <div>
                      <p className="text-[#F5F5DC]/60 text-xs uppercase tracking-wider">{t('accountNumber')}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[#F5F5DC] font-mono text-lg">5765050027</p>
                        <button
                          onClick={copyAccountNumber}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Copy account number"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-[#F5F5DC]/70" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#F5F5DC]/60 text-xs uppercase tracking-wider">{t('accountName')}</p>
                      <p className="text-[#F5F5DC] font-medium">Dalai Eej Resort</p>
                    </div>
                    <div>
                      <p className="text-[#F5F5DC]/60 text-xs uppercase tracking-wider">{t('amount')}</p>
                      <p className="text-[#F5F5DC] font-serif text-xl">{formattedAmount} MNT</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4">
                    <p className="text-amber-200 text-sm">
                      <strong>Important:</strong> {t('importantMemo')}: {bookingId}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={checkPaymentStatus}
                disabled={checkingStatus}
                className="w-full py-4 border-2 border-[#F5F5DC] text-[#F5F5DC] font-serif uppercase tracking-widest hover:bg-[#F5F5DC]/10 transition-all cursor-pointer rounded-lg font-semibold disabled:opacity-50"
              >
                {checkingStatus ? t('checking') : t('checkStatus')}
              </button>

              {paymentStatus && (
                <div className="text-[#F5F5DC]/70 text-sm text-center py-2">
                  {paymentStatus}
                </div>
              )}

              <button
                onClick={() => {
                  setQrCode("");
                  setInvoiceId("");
                  setBankUrls([]);
                  setPaymentStatus("");
                }}
                className="w-full text-[#F5F5DC]/50 text-sm hover:text-[#F5F5DC] transition-colors py-2"
              >
                {t('generateNew')}
              </button>
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          <a
            href={localePrefix || "/"}
            className="text-[#F5F5DC]/50 text-sm hover:text-[#F5F5DC] transition-colors"
          >
            &larr; {tBooking('backToHome')}
          </a>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  const t = useTranslations('common');
  
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#1A3C34] py-12 px-4 flex items-center justify-center">
        <p className="text-[#F5F5DC]">{t('loading')}</p>
      </main>
    }>
      <PaymentContent />
    </Suspense>
  );
}
