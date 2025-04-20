import { Format, Prisma, ThreeDModelFormat } from "@prisma/client";

export interface ThreeDModelFormatFormType {
  threeDModelId: number;
  formatId: number;
  isUsed: boolean;
}

export interface IThreeDModelFormatService {
  getThreeDModelFormats(threeDModelId: number): Promise<ThreeDModelFormat[]>;
  getThreeDModelFormat(threeDModelId: number, formatId: number): Promise<ThreeDModelFormat | null>;
  createThreeDModelFormat(modelFormat: ThreeDModelFormatFormType): Promise<ThreeDModelFormat | null>;
  updateThreeDModelFormat(
    threeDModelId: number, 
    formatId: number, 
    modelFormat: Partial<ThreeDModelFormatFormType>,
    tx?: Prisma.TransactionClient
  ): Promise<ThreeDModelFormat>;
  deleteThreeDModelFormat(threeDModelId: number, formatId: number): Promise<void>;
  getFormatsByModelId(threeDModelId: number): Promise<(ThreeDModelFormat & { format: Format })[]>;
} 