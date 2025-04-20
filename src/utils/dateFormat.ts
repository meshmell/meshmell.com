import { LocaleKeyType } from "@/src/types/locale";

export const dateFormat = (date: Date, locale: LocaleKeyType): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (locale === "ja") {
    options.month = "numeric";
    options.day = "numeric";
  }

  // Convert date to Date object if it's not already
  const validDate = date instanceof Date ? date : new Date(date);

  // Check if validDate is valid, otherwise use current date
  const safeDate = !isNaN(validDate.getTime()) ? validDate : new Date();
  const formattedDate = new Intl.DateTimeFormat(locale, options).format(
    safeDate,
  );

  return formattedDate;
};
