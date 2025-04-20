import { Format, Prisma } from "@prisma/client";

import prisma from "@/src/lib/prisma";

import { FormatFormType, IFormatService } from "./IFormatService";

export class FormatService implements IFormatService {
  async getFormats(): Promise<Format[]> {
    const formats = await prisma.format.findMany();

    await prisma.$disconnect();

    return formats;
  }

  async getFormat(id: number): Promise<Format> {
    const format = await prisma.format.findFirst({
      where: {
        id,
      },
    });

    if (!format) {
      throw new Error("Format not found");
    }

    await prisma.$disconnect();

    return format;
  }

  async createFormat(format: FormatFormType): Promise<Format | null> {
    const { name } = format;

    try {
      const newFormat = await prisma.format.create({
        data: {
          name,
        },
      });

      await prisma.$disconnect();

      return newFormat;
    } catch (error) {
      console.error("Error creating format:", error);

      return null;
    }
  }

  async updateFormat(
    id: number,
    format: FormatFormType,
    tx?: Prisma.TransactionClient,
  ): Promise<Format> {
    const prismaClient = tx || prisma;
    const { name } = format;

    const updatedFormat = await prismaClient.format.update({
      where: { id },
      data: {
        name,
      },
    });

    await prisma.$disconnect();

    return updatedFormat;
  }

  async deleteFormat(id: number): Promise<void> {
    await prisma.format.delete({
      where: { id },
    });

    await prisma.$disconnect();
  }
} 