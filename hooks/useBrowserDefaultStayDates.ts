"use client";

import { useSyncExternalStore } from "react";
import {
  getDefaultAvailabilityStayDates,
  getLocalDateInputValue,
} from "@/lib/defaultStayDates";

type DefaultStayDates = ReturnType<typeof getDefaultAvailabilityStayDates>;

const SERVER_STAY_DATES: DefaultStayDates = { checkin: "", checkout: "" };
let cachedStayDates = SERVER_STAY_DATES;
let cachedStayDatesKey = "";

let cachedLocalDate = "";

function subscribeToBrowserDate(onStoreChange: () => void): () => void {
  const timeoutId = window.setTimeout(onStoreChange, 0);
  return () => window.clearTimeout(timeoutId);
}

function getBrowserStayDatesSnapshot(): DefaultStayDates {
  const nextStayDates = getDefaultAvailabilityStayDates();
  const nextKey = `${nextStayDates.checkin}|${nextStayDates.checkout}`;

  if (nextKey !== cachedStayDatesKey) {
    cachedStayDatesKey = nextKey;
    cachedStayDates = nextStayDates;
  }

  return cachedStayDates;
}

function getServerStayDatesSnapshot(): DefaultStayDates {
  return SERVER_STAY_DATES;
}

function getBrowserLocalDateSnapshot(): string {
  const nextLocalDate = getLocalDateInputValue();
  if (nextLocalDate !== cachedLocalDate) {
    cachedLocalDate = nextLocalDate;
  }
  return cachedLocalDate;
}

function getServerLocalDateSnapshot(): string {
  return "";
}

export function useBrowserDefaultStayDates(): DefaultStayDates {
  return useSyncExternalStore(
    subscribeToBrowserDate,
    getBrowserStayDatesSnapshot,
    getServerStayDatesSnapshot,
  );
}

export function useBrowserLocalDateInputValue(): string {
  return useSyncExternalStore(
    subscribeToBrowserDate,
    getBrowserLocalDateSnapshot,
    getServerLocalDateSnapshot,
  );
}
