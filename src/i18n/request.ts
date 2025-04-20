import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { LocaleKeyType } from "@/src/types/locale";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale: LocaleKeyType = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
