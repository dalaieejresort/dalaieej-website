import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const MNT_TO_EUR_RATE = 3700;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, bookingId, guestName } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const amountInEur = Math.round(amount / MNT_TO_EUR_RATE * 100);

    if (amountInEur < 50) {
      return NextResponse.json(
        { error: "Amount too small for Stripe payment (minimum 0.50 EUR)" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInEur,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookingId: bookingId || "",
        guestName: guestName || "",
        originalAmountMNT: amount.toString(),
      },
      description: `Dalai Eej Resort - Booking ${bookingId || "N/A"}`,
    });

    const amountEurDisplay = (amountInEur / 100).toFixed(2);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amountEur: amountEurDisplay,
      amountMnt: amount,
    });
  } catch (error) {
    console.error("Stripe payment intent error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
