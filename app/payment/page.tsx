"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentContent() {
  const searchParams = useSearchParams();
  
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const urlBookingId = searchParams.get("bookingId");
    const urlAmount = searchParams.get("amount");
    
    if (urlBookingId) setBookingId(urlBookingId);
    if (urlAmount) setAmount(urlAmount);
  }, [searchParams]);

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

    try {
      const response = await fetch("/api/qpay/create-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <main className="min-h-screen bg-[#1A3C34] py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F5DC] mb-4">
            Complete Your Reservation
          </h1>
          <p className="font-sans text-[#F5F5DC]/70">
            Pay securely using QPay
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#F5F5DC]/20">
          {!qrCode ? (
            <div className="space-y-6">
              <div>
                <label className="block text-[#F5F5DC]/70 text-sm uppercase tracking-wider mb-2 font-sans">
                  Booking Reference Number
                </label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="Enter your booking ID"
                  className="w-full px-4 py-3 bg-transparent border border-[#F5F5DC]/50 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#F5F5DC] transition-colors placeholder:text-[#F5F5DC]/30"
                />
              </div>

              <div>
                <label className="block text-[#F5F5DC]/70 text-sm uppercase tracking-wider mb-2 font-sans">
                  Amount to Pay (MNT)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in MNT"
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
                {loading ? "Generating..." : "Generate QPay QR"}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div>
                <p className="text-[#F5F5DC]/70 text-sm mb-2">Booking Reference</p>
                <p className="text-[#F5F5DC] font-serif text-xl">{bookingId}</p>
              </div>
              
              <div>
                <p className="text-[#F5F5DC]/70 text-sm mb-2">Amount</p>
                <p className="text-[#F5F5DC] font-serif text-2xl">{parseInt(amount).toLocaleString()} MNT</p>
              </div>

              <div className="py-6">
                <p className="text-[#F5F5DC]/70 text-sm mb-4">Scan with your banking app</p>
                <div className="bg-white p-4 rounded-xl inline-block">
                  <img
                    src={`data:image/png;base64,${qrCode}`}
                    alt="QPay QR Code"
                    className="w-64 h-64 mx-auto"
                  />
                </div>
              </div>

              {invoiceId && (
                <p className="text-[#F5F5DC]/50 text-xs">
                  Invoice ID: {invoiceId}
                </p>
              )}

              <button
                onClick={checkPaymentStatus}
                disabled={checkingStatus}
                className="w-full py-4 border-2 border-[#F5F5DC] text-[#F5F5DC] font-serif uppercase tracking-widest hover:bg-[#F5F5DC]/10 transition-all cursor-pointer rounded-lg font-semibold disabled:opacity-50"
              >
                {checkingStatus ? "Checking..." : "Check Payment Status"}
              </button>

              {paymentStatus && (
                <div className="text-[#F5F5DC]/70 text-sm py-2">
                  {paymentStatus}
                </div>
              )}

              <button
                onClick={() => {
                  setQrCode("");
                  setInvoiceId("");
                  setPaymentStatus("");
                }}
                className="text-[#F5F5DC]/50 text-sm hover:text-[#F5F5DC] transition-colors"
              >
                Generate New QR
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-[#F5F5DC]/50 text-sm hover:text-[#F5F5DC] transition-colors"
          >
            &larr; Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#1A3C34] py-12 px-4 flex items-center justify-center">
        <p className="text-[#F5F5DC]">Loading...</p>
      </main>
    }>
      <PaymentContent />
    </Suspense>
  );
}
