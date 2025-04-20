import {
  Action,
  Category,
  Download,
  Resolution,
  ThreeDModel,
  ThreeDModelFormat,
  User,
} from "@prisma/client";

export type RotationDegreeForm = {
  x: number;
  y: number;
  z: number;
};

export type ThreeDModelMutationForm = {
  id: number;
  slug: string;
  name: string;
  description: string;
  creator: string;
  categoryIds: number[];
  price: number;
  resolutionIds: number[] | null;
  credit: string;
  license: string;
  scale: number;
  rotationDegree: RotationDegreeForm;
  formats: FormatMutationForm[];
  actions?: ActionMutationForm[];
  isDownloadable: boolean;
};

export type FormatMutationForm = {
  id: number;
  isUsed: boolean;
};

export type ActionMutationForm = {
  id: number;
  slug: string;
  name: string;
};

export type ThreeDModelApiResponse = ThreeDModel & {
  user: User;
  actions: Action[];
  categories: Category[];
  resolutions: Resolution[];
  formats: ThreeDModelFormat[];
  downloads: Download[];
};
