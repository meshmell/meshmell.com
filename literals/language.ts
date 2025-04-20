export const Locale = {
  en: "en",
  ja: "ja",
} as const;

export type LocaleKeyType = keyof typeof Locale;

export const localeArray: LocaleKeyType[] = Object.values(Locale);

export const LocaleTextMap = {
  en: "English",
  ja: "日本語",
} as const;
