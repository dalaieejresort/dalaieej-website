import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const CLOUDBEDS_API_BASE = "https://hotels.cloudbeds.com/api/v1.2";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.CLOUDBEDS_API_KEY;
    const propertyId = process.env.CLOUDBEDS_PROPERTY_ID;

    if (!apiKey || !propertyId) {
      throw new Error("Cloudbeds API credentials not configured");
    }

    const body = await request.json();
    const {
      roomTypeId,
      rateId,
      checkin,
      checkout,
      guestFirstName,
      guestLastName,
      guestEmail,
      guestPhone,
      guestCountry,
      specialRequests,
      adults,
      children,
      addons,
      totalAmount,
    } = body;

    if (!roomTypeId || !checkin || !checkout || !guestFirstName || !guestLastName || !guestEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reservationParams = new URLSearchParams();
    reservationParams.set("propertyID", propertyId);
    reservationParams.set("startDate", checkin);
    reservationParams.set("endDate", checkout);
    reservationParams.set("guestFirstName", guestFirstName);
    reservationParams.set("guestLastName", guestLastName);
    reservationParams.set("guestEmail", guestEmail);
    if (guestPhone) reservationParams.set("guestPhone", guestPhone);
    if (guestCountry) reservationParams.set("guestCountry", guestCountry);
    if (specialRequests) reservationParams.set("customNotes", specialRequests);
    reservationParams.set("adults", String(adults || 1));
    if (children) reservationParams.set("children", String(children));
    
    reservationParams.set("rooms[0][roomTypeID]", roomTypeId);
    if (rateId) reservationParams.set("rooms[0][roomRateID]", rateId);
    reservationParams.set("rooms[0][quantity]", "1");

    reservationParams.set("source", "Website");
    reservationParams.set("status", "not_confirmed");
    reservationParams.set("paymentMethod", "bank_transfer");

    console.log("Creating Cloudbeds reservation with params:", Object.fromEntries(reservationParams));

    const response = await axios.post(
      `${CLOUDBEDS_API_BASE}/postReservation`,
      reservationParams.toString(),
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Cloudbeds reservation response:", JSON.stringify(response.data, null, 2));

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to create reservation");
    }

    const reservationId = response.data.reservationID || response.data.data?.reservationID;

    if (addons && addons.length > 0 && reservationId) {
      for (const addon of addons) {
        try {
          const chargeParams = new URLSearchParams();
          chargeParams.set("propertyID", propertyId);
          chargeParams.set("reservationID", reservationId);
          chargeParams.set("itemID", addon.id);
          chargeParams.set("quantity", String(addon.quantity || 1));

          await axios.post(
            `${CLOUDBEDS_API_BASE}/postCharge`,
            chargeParams.toString(),
            {
              headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
        } catch (addonError) {
          console.error("Failed to add addon:", addon.id, addonError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      reservationId,
      guestName: `${guestFirstName} ${guestLastName}`,
      totalAmount,
      message: "Reservation created successfully",
    });
  } catch (error) {
    console.error("Cloudbeds reservation error:", error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return NextResponse.json(
        { error: `Failed to create reservation: ${message}` },
        { status: 500 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
