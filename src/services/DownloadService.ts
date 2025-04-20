import { Download, Prisma } from "@prisma/client";
import { injectable } from 'inversify'
import { PrismaClient } from '@prisma/client'

import { IDownloadService } from "./IDownloadService";

@injectable()
export class DownloadService implements IDownloadService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getDownloadsByModelId(threeDModelId: number): Promise<Download[]> {
    const downloads = await this.prisma.download.findMany({
      where: {
        threeDModelId,
      },
    });

    await this.prisma.$disconnect();

    return downloads;
  }

  async createDownload(threeDModelId: number): Promise<Download | null> {
    try {
      const newDownload = await this.prisma.download.create({
        data: {
          threeDModelId,
          downloadAt: new Date(),
        },
      });

      await this.prisma.$disconnect();

      return newDownload;
    } catch (error) {
      console.error("Error creating download:", error);

      return null;
    }
  }

  async incrementDownload(threeDModelId: number): Promise<Download> {
    // Create a new download record
    const download = await this.prisma.download.create({
      data: {
        threeDModelId,
        downloadAt: new Date()
      }
    })

    return download
  }
} 