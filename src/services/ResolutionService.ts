import { Prisma, Resolution } from "@prisma/client";

import prisma from "@/src/lib/prisma";

import { IResolutionService, ResolutionFormType } from "./IResolutionService";

export class ResolutionService implements IResolutionService {
  async getResolutions(): Promise<Resolution[]> {
    const resolutions = await prisma.resolution.findMany();

    await prisma.$disconnect();

    return resolutions;
  }

  async getResolution(id: number): Promise<Resolution> {
    const resolution = await prisma.resolution.findFirst({
      where: {
        id,
      },
    });

    if (!resolution) {
      throw new Error("Resolution not found");
    }

    await prisma.$disconnect();

    return resolution;
  }

  async createResolution(resolution: ResolutionFormType): Promise<Resolution | null> {
    const { name } = resolution;

    try {
      const newResolution = await prisma.resolution.create({
        data: {
          name,
        },
      });

      await prisma.$disconnect();

      return newResolution;
    } catch (error) {
      console.error("Error creating resolution:", error);

      return null;
    }
  }

  async updateResolution(
    id: number,
    resolution: ResolutionFormType,
    tx?: Prisma.TransactionClient,
  ): Promise<Resolution> {
    const prismaClient = tx || prisma;
    const { name } = resolution;

    const updatedResolution = await prismaClient.resolution.update({
      where: { id },
      data: {
        name,
      },
    });

    await prisma.$disconnect();

    return updatedResolution;
  }

  async deleteResolution(id: number): Promise<void> {
    await prisma.resolution.delete({
      where: { id },
    });

    await prisma.$disconnect();
  }
} 