import { Prisma, ThreeDModel } from "@prisma/client";

export interface GetThreeDModelsQuery {
  userId?: number;
  categoryIds?: number[];
  actionIds?: number[];
  resolutionIds?: number[];
  formatIds?: number[];
}

export interface ThreeDModelFormType {
  scale: number;
  rotationDegreesX: number;
  rotationDegreesY: number;
  rotationDegreesZ: number;
  name: string;
  slug: string;
  description: string;
  userId: number;
  price: number;
  license: string;
  credit?: string;
  isDownloadable: boolean;
  publishedAt: Date;
  categoryIds?: number[];
  actionIds?: number[];
  resolutionIds?: number[];
  formatIds?: number[];
}

export interface IThreeDModelService {
  getThreeDModels(query?: GetThreeDModelsQuery): Promise<ThreeDModel[]>;
  getThreeDModel(id: number): Promise<ThreeDModel>;
  getThreeDModelBySlug(slug: string): Promise<ThreeDModel>;
  createThreeDModel(model: ThreeDModelFormType): Promise<ThreeDModel | null>;
  updateThreeDModel(id: number, model: ThreeDModelFormType, tx?: Prisma.TransactionClient): Promise<ThreeDModel>;
  deleteThreeDModel(id: number): Promise<void>;
  incrementDownload(id: number): Promise<void>;
} 