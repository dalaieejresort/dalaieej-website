import { describe, expect, it } from "vitest";
import {
  addCalendarDays,
  getDefaultAvailabilityStayDates,
  getLocalDateInputValue,
} from "./defaultStayDates";

describe("default stay dates", () => {
  it("starts three local calendar days ahead and keeps a four-night stay", () => {
    expect(getDefaultAvailabilityStayDates(new Date(2026, 6, 3, 23, 30))).toEqual({
      checkin: "2026-07-06",
      checkout: "2026-07-10",
    });
  });

  it("rolls across month boundaries using calendar dates", () => {
    expect(getDefaultAvailabilityStayDates(new Date(2026, 6, 30, 8, 0))).toEqual({
      checkin: "2026-08-02",
      checkout: "2026-08-06",
    });
  });

  it("formats the local date input value without UTC conversion", () => {
    expect(getLocalDateInputValue(new Date(2026, 6, 3, 1, 0))).toBe("2026-07-03");
  });

  it("adds whole calendar days from local midnight", () => {
    expect(getLocalDateInputValue(addCalendarDays(new Date(2026, 6, 3, 23, 30), 3))).toBe(
      "2026-07-06",
    );
  });
});
