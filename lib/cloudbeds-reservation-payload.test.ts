import { describe, expect, it } from "vitest";
import { groupReservationLinesForCloudbeds } from "./cloudbeds-reservation-payload";

describe("Cloudbeds reservation payload grouping", () => {
  it("aggregates multiple physical cabins of the same type into one Cloudbeds quantity", () => {
    expect(
      groupReservationLinesForCloudbeds([
        {
          roomTypeID: "198020352975040",
          roomRateID: "rate-1",
          adults: 1,
          children: 0,
        },
        {
          roomTypeID: "198020352975040",
          roomRateID: "rate-1",
          adults: 2,
          children: 1,
        },
      ])
    ).toEqual({
      rooms: [
        {
          roomTypeID: "198020352975040",
          roomRateID: "rate-1",
          quantity: 2,
        },
      ],
      adults: [
        {
          roomTypeID: "198020352975040",
          quantity: 3,
        },
      ],
      children: [
        {
          roomTypeID: "198020352975040",
          quantity: 1,
        },
      ],
    });
  });

  it("keeps different room types as separate Cloudbeds room and occupancy lines", () => {
    expect(
      groupReservationLinesForCloudbeds([
        {
          roomTypeID: "198020352975040-0",
          roomRateID: "rate-1",
          adults: 2,
          children: 0,
        },
        {
          roomTypeID: "198039847624896",
          roomRateID: "rate-2",
          adults: 1,
          children: 2,
        },
      ])
    ).toEqual({
      rooms: [
        {
          roomTypeID: "198020352975040",
          roomRateID: "rate-1",
          quantity: 1,
        },
        {
          roomTypeID: "198039847624896",
          roomRateID: "rate-2",
          quantity: 1,
        },
      ],
      adults: [
        {
          roomTypeID: "198020352975040",
          quantity: 2,
        },
        {
          roomTypeID: "198039847624896",
          quantity: 1,
        },
      ],
      children: [
        {
          roomTypeID: "198020352975040",
          quantity: 0,
        },
        {
          roomTypeID: "198039847624896",
          quantity: 2,
        },
      ],
    });
  });
});
