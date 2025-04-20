export const Visibility = {
  public: "public",
  private: "private",
} as const;

export type VisibilityKeyType = keyof typeof Visibility;

export const visibilityArray: VisibilityKeyType[] = Object.values(Visibility);

export const TagOrder = {
  popular: "popular",
  latestAttached: "latestAttached",
} as const;

export type TagOrderKeyType = keyof typeof TagOrder;

export const tagOrderArray: TagOrderKeyType[] = Object.values(TagOrder);

export const ThreeDModelOrder = {
  latest: "latest",
  oldest: "oldest",
} as const;

export type ThreeDModelOrderKeyType = keyof typeof ThreeDModelOrder;

export const threeDModelOrderArray: ThreeDModelOrderKeyType[] =
  Object.values(ThreeDModelOrder);

export const YearsOptions = (() => {
  const currentYear = new Date().getFullYear();
  const options: Record<number, number> = {};
  for (let year = 2024; year <= currentYear; year++) {
    options[year] = year;
  }

  return options;
})();

export type YearsOptions = keyof typeof YearsOptions;

export const MonthsOptions = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
] as const;

export type MonthsOptions = (typeof MonthsOptions)[number];
export type MonthValues = (typeof MonthsOptions)[number]["value"];
