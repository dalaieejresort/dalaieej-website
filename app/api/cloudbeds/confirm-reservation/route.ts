import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

const CLOUDBEDS_API_BASE = "https://hotels.cloudbeds.com/api/v1.2";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.CLOUDBEDS_API_KEY;
    const propertyId = process.env.CLOUDBEDS_PROPERTY_ID;

    if (!apiKey || !propertyId) {
      throw new Error("Cloudbeds API credentials not configured");
    }

    const body = await request.json();
    const { reservationId } = body;

    if (!reservationId) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 }
      );
    }

    const payload = qs.stringify({
      propertyID: propertyId,
      reservationID: reservationId,
      status: "confirmed",
    });

    const response = await axios.put(
      `${CLOUDBEDS_API_BASE}/putReservation`,
      payload,
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to confirm reservation");
    }

    console.log(`Reservation ${reservationId} confirmed in Cloudbeds`);

    return NextResponse.json({
      success: true,
      reservationId,
      status: "confirmed",
    });
  } catch (error) {
    console.error("Cloudbeds confirm reservation error:", error instanceof Error ? error.message : error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return NextResponse.json(
        { error: `Failed to confirm reservation: ${message}` },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to confirm reservation" },
      { status: 500 }
    );
  }
}
