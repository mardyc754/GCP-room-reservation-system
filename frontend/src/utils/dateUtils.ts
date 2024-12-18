import type { ConfigType, ManipulateType } from "dayjs";

import { dayjs } from "@/lib/dayjs";

export function extractDateStringFromDate(date: ConfigType) {
  return date ? dayjs(date).format("DD.MM.YYYY") : "--.--.----";
}

export function extractHourStringFromDate(date: ConfigType) {
  return date ? dayjs(date).format("HH:mm") : "--:--";
}

export function changeHourToDate(hour: number) {
  return dayjs().hour(hour).minute(0).format("HH:mm");
}

export function dateWithHour(date: ConfigType, hour: number, minute = 0) {
  return dayjs(date).hour(hour).minute(minute).second(0).toDate();
}

export function create(date: ConfigType, hour: number) {
  return dayjs(date).hour(hour).minute(0).toDate();
}

export function displayDateWithHours(date: ConfigType) {
  return dayjs(date).format("DD.MM.YYYY HH:mm");
}

export function formatDateTime(date: ConfigType) {
  return dayjs(date).format("YYYY-MM-DDTHH:mm");
}

export function mergeDayDateAndHourDate(
  dayDate: ConfigType,
  hourDate: ConfigType
) {
  return dateWithHour(
    dayDate,
    dayjs(hourDate).hour(),
    dayjs(hourDate).minute()
  );
}

export function displayDayDateAndHourDate(
  dayDate: ConfigType,
  hourDate: ConfigType
) {
  return `${extractDateStringFromDate(dayDate)} ${extractHourStringFromDate(
    hourDate
  )}`;
}

export function getDateAfter(
  date: ConfigType,
  duration: number,
  unit?: ManipulateType
) {
  return dayjs(date).add(duration, unit).toDate();
}

export function advanceDateByNMinutes(date: ConfigType, minutes: number) {
  return dayjs(date).add(minutes, "m").toDate();
}

export function advanceDateByWeeks(date: ConfigType, weeks: number) {
  return dayjs(date).add(weeks, "w").toDate();
}

export function nextDay(date: ConfigType) {
  return dayjs(date).add(1, "d").toDate();
}

export function advanceByMinutes(date: ConfigType, minutes: number) {
  return dayjs(date).add(minutes, "m").toDate();
}

export function displayDatesAsTimeslot(
  startDate: ConfigType,
  endDate: ConfigType
) {
  return `${extractHourStringFromDate(startDate)} - ${extractHourStringFromDate(
    endDate
  )}`;
}

export function displayDatesAsFullTimeslot(
  startDate: ConfigType,
  endDate: ConfigType
) {
  return `${displayDateWithHours(startDate)} - ${extractHourStringFromDate(
    endDate
  )}`;
}

export function convertISOStringToDate(date: string) {
  return dayjs(date).toDate();
}

export function daysBetween(startDate: ConfigType, endDate: ConfigType) {
  return Math.abs(dayjs(endDate).diff(startDate, "day"));
}

export function minutesBetween(startDate: ConfigType, endDate: ConfigType) {
  return Math.abs(dayjs(endDate).diff(startDate, "minute"));
}

export function hoursBetween(startDate: ConfigType, endDate: ConfigType) {
  return Math.abs(dayjs(endDate).diff(startDate, "hour"));
}

export function getWeekDayName(date: ConfigType) {
  return dayjs(date).format("dddd");
}

export function isTheSameDay(firstDate: ConfigType, secondDate: ConfigType) {
  return dayjs(firstDate).isSame(secondDate, "day");
}

export function isAfter(firstDate: ConfigType, secondDate: ConfigType) {
  return dayjs(firstDate).isAfter(secondDate);
}

export function isBefore(firstDate: ConfigType, secondDate: ConfigType) {
  return dayjs(firstDate).isBefore(secondDate);
}

export function isAfterOrSame(firstDate: ConfigType, secondDate: ConfigType) {
  return (
    dayjs(firstDate).isAfter(secondDate) || dayjs(firstDate).isSame(secondDate)
  );
}

export function isBeforeOrSame(firstDate: ConfigType, secondDate: ConfigType) {
  return (
    dayjs(firstDate).isBefore(secondDate) || dayjs(firstDate).isSame(secondDate)
  );
}

export function isSame(firstDate: ConfigType, secondDate: ConfigType) {
  return dayjs(firstDate).isSame(secondDate);
}

export const startOfDay = (date: ConfigType) =>
  dayjs(date).startOf("day").toDate();

export const endOfDay = (date: ConfigType) => dayjs(date).endOf("day").toDate();

export const getTime = (date: ConfigType) => dayjs(date).toDate().getTime();

export const nextDayTimeSlot = () => {
  const nextDay = dayjs().add(1, "day");
  return {
    from: nextDay.startOf("day").toISOString(),
    to: nextDay.endOf("day").toISOString(),
  };
};

export const startOfWeek = (date: ConfigType) =>
  dayjs(date).startOf("week").toDate();

export const endOfWeek = (date: ConfigType) =>
  dayjs(date).endOf("week").toDate();

export const getTimeSlot = (date: ConfigType, duration: number) => {
  return {
    startDate: dayjs(date).toISOString(),
    endDate: advanceByMinutes(date, duration).toISOString(),
  };
};

export const getClosestDateFromNow = (dates: ConfigType[]) => {
  const now = dayjs().toDate();
  const futureDates = dates.filter((date) => isAfter(date, now));
  futureDates.sort((a, b) => getTime(a) - getTime(b));

  return futureDates[0];
};

export const extractYearAndMonthFromDateToString = (date: ConfigType) => {
  const year = dayjs(date).year();
  const month = dayjs(date).month();
  return `${year}-${month}`;
};

export const timeDifferenceBetween = (end: ConfigType, start: ConfigType) => {
  const duration = dayjs.duration(dayjs(end).diff(start));
  return duration.asMinutes();
};

export const isAtLeastOneDayBetween = (end: ConfigType, start: ConfigType) => {
  return dayjs(end).diff(start, "hours") >= 24;
};
