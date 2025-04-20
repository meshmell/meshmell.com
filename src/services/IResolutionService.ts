import { Prisma, Resolution } from "@prisma/client";

export interface ResolutionFormType {
  name: string;
}

export interface IResolutionService {
  getResolutions(): Promise<Resolution[]>;
  getResolution(id: number): Promise<Resolution>;
  createResolution(resolution: ResolutionFormType): Promise<Resolution | null>;
  updateResolution(id: number, resolution: ResolutionFormType, tx?: Prisma.TransactionClient): Promise<Resolution>;
  deleteResolution(id: number): Promise<void>;
} 