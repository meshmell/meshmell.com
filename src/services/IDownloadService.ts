import { Download, Prisma } from "@prisma/client";

export interface IDownloadService {
  getDownloadsByModelId(threeDModelId: number): Promise<Download[]>;
  createDownload(threeDModelId: number): Promise<Download | null>;
} 