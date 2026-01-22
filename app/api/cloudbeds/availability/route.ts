import { NextRequest, NextResponse } from "next/server";
import { cloudbedsGet, AvailabilityResponse, RoomTypesResponse } from "@/app/lib/cloudbeds";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");

    if (!checkin || !checkout) {
      return NextResponse.json(
        { error: "checkin and checkout dates are required" },
        { status: 400 }
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(checkin) || !dateRegex.test(checkout)) {
      return NextResponse.json(
        { error: "Dates must be in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    const [availabilityData, roomTypesData] = await Promise.all([
      cloudbedsGet<AvailabilityResponse>("/getAvailableRoomTypes", {
        startDate: checkin,
        endDate: checkout,
      }),
      cloudbedsGet<RoomTypesResponse>("/getRoomTypes"),
    ]);

    const roomTypesMap = new Map(
      roomTypesData.data.map((rt) => [rt.roomTypeID, rt])
    );

    const enrichedRooms = availabilityData.data.roomTypes.map((rate) => {
      const roomTypeDetails = roomTypesMap.get(rate.roomTypeID);
      return {
        roomTypeID: rate.roomTypeID,
        roomTypeName: rate.roomTypeName,
        roomsAvailable: rate.roomsAvailable,
        rateID: rate.rateID,
        rateName: rate.rateName,
        totalRate: rate.totalRate,
        currency: rate.currency,
        description: roomTypeDetails?.roomTypeDescription || "",
        maxGuests: roomTypeDetails?.maxGuests || 2,
        photos: roomTypeDetails?.roomTypePhotos || [],
        features: roomTypeDetails?.roomTypeFeatures || [],
      };
    });

    return NextResponse.json({
      success: true,
      checkin,
      checkout,
      rooms: enrichedRooms,
    });
  } catch (error) {
    console.error("Cloudbeds availability error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
