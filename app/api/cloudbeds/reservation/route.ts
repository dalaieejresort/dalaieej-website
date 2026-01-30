import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const CLOUDBEDS_API_BASE = "https://hotels.cloudbeds.com/api/v1.2";

interface RoomBooking {
  roomTypeID: string;
  roomRateID?: string;
  quantity: number;
  adults: number;
  children: number;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.CLOUDBEDS_API_KEY;
    const propertyId = process.env.CLOUDBEDS_PROPERTY_ID;

    if (!apiKey || !propertyId) {
      throw new Error("Cloudbeds API credentials not configured");
    }

    const body = await request.json();
    const {
      rooms,
      checkin,
      checkout,
      guestFirstName,
      guestLastName,
      guestEmail,
      guestPhone,
      guestCountry,
      specialRequests,
      addons,
      totalAmount,
    } = body;

    if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
      return NextResponse.json(
        { error: "At least one room is required" },
        { status: 400 }
      );
    }

    if (!checkin || !checkout || !guestFirstName || !guestLastName || !guestEmail) {
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
    
    if (guestCountry) {
      const countryCode = guestCountry.length === 2 ? guestCountry : "MN";
      reservationParams.set("guestCountry", countryCode);
    }
    
    if (specialRequests) reservationParams.set("customNotes", specialRequests);

    const roomList = rooms as RoomBooking[];
    
    if (roomList.length === 1) {
      const room = roomList[0];
      reservationParams.set("roomTypeID", room.roomTypeID);
      if (room.roomRateID) {
        reservationParams.set("roomRateID", room.roomRateID);
      }
      reservationParams.set("quantity", String(room.quantity || 1));
      reservationParams.set("adults", String(parseInt(String(room.adults)) || 1));
      reservationParams.set("children", String(parseInt(String(room.children)) || 0));
    } else {
      roomList.forEach((room, index) => {
        reservationParams.set(`rooms[${index}][roomTypeID]`, room.roomTypeID);
        if (room.roomRateID) {
          reservationParams.set(`rooms[${index}][roomRateID]`, room.roomRateID);
        }
        reservationParams.set(`rooms[${index}][quantity]`, String(room.quantity || 1));
        reservationParams.set(`rooms[${index}][adults]`, String(parseInt(String(room.adults)) || 1));
        reservationParams.set(`rooms[${index}][children]`, String(parseInt(String(room.children)) || 0));
      });
    }

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
