export type CreatorDetailsType = {
  slug: string;
  name: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  twitter?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  linkedIn?: string;
  youtube?: string;
  github?: string;
  artStation?: string;
  paypal?: string;
  roles: ("developer" | "creator")[];
};
