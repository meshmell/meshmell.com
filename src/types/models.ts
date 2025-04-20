export type ModelDetailsType = {
  resolutions: string[];
  slug: string;
  formats: string[];
  usedFormat: string;
  scale: number;
  rotationDegree: {
    x: number;
    y: number;
    z: number;
  };
  name: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  creator: string;
  published: string;
  updated: string;
  categoryTags: string[];
  price: number;
  license: string;
  credit: string;
  actions: string[];
  isDownloadable: boolean;
};
