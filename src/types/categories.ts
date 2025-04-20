export type CategoryDetailsType = {
  slug: string;
  name: { en: string; ja: string };
  icon: string;
  color: string;
};

export type CategoryTypes =
  | "all"
  | "suggested"
  | "animal"
  | "furniture"
  | "nature"
  | "food"
  | "lowPoly"
  | "real";
