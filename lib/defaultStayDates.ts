export const DEFAULT_STAY_CHECKIN_OFFSET_DAYS = 3;
export const DEFAULT_STAY_NIGHTS = 4;

function formatDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addCalendarDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return next;
}

export function getLocalDateInputValue(date = new Date()): string {
  return formatDateInputValue(date);
}

export function getDefaultAvailabilityStayDates(today = new Date()): {
  checkin: string;
  checkout: string;
} {
  const checkinDate = addCalendarDays(today, DEFAULT_STAY_CHECKIN_OFFSET_DAYS);
  const checkoutDate = addCalendarDays(checkinDate, DEFAULT_STAY_NIGHTS);

  return {
    checkin: formatDateInputValue(checkinDate),
    checkout: formatDateInputValue(checkoutDate),
  };
}
