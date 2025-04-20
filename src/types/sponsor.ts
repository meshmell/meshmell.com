export type SponsorInfoType = {
  id: string;
  name: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  url?: string;
  published: string;
  updated: string;
  amount: number;
};
