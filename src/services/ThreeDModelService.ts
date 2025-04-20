import { Prisma } from "@prisma/client";

import {
  ThreeDModelApiResponse,
  ThreeDModelBasicFormForCreate,
  ThreeDModelBasicFormForUpdate,
} from "@/src/types/threeDModel";
import { prisma, prismaMain } from "@/src/utils/prismaMain";

import {
  GetThreeDModelsQuery,
  IThreeDModelService,
} from "./IThreeDModelService";

export class ThreeDModelService implements IThreeDModelService {
  async getThreeDModels(
    query: GetThreeDModelsQuery,
  ): Promise<{ threeDModels: ThreeDModelApiResponse[]; count: number }> {
    const { name, category, user } = query;

    await prismaMain();

    const whereClause: Prisma.ThreeDModelWhereInput = {
      name: name
        ? {
            contains: name,
            mode: "insensitive",
          }
        : undefined,
      categories: category
        ? {
            some: {
              name: {
                contains: category,
                mode: "insensitive",
              },
            },
          }
        : undefined,
      user: {
        name: user
          ? {
              contains: user,
              mode: "insensitive",
            }
          : undefined,
      },
    };

    const threeDModels = await prisma.threeDModel.findMany({
      where: whereClause,
      include: {
        actions: true,
        downloads: true,
        resolutions: true,
        formats: {
          include: {
            format: true,
          },
        },
        user: true,
        categories: true,
      },
    });

    await prisma.$disconnect();
    const count = await prisma.threeDModel.count({
      where: whereClause,
    });

    return { threeDModels, count };
  }

  async getThreeDModel(threeDModelId: number): Promise<ThreeDModelApiResponse> {
    await prismaMain();
    const threeDModel = await prisma.threeDModel.findFirst({
      where: {
        id: threeDModelId,
      },
      include: {
        actions: true,
        downloads: true,
        resolutions: true,
        formats: {
          include: {
            format: true,
          },
        },
        user: true,
        categories: true,
      },
    });

    if (!threeDModel) {
      throw new Error("ThreeDModel not found");
    }

    await prisma.$disconnect();

    return threeDModel;
  }

  async createThreeDModel(
    threeDModel: ThreeDModelBasicFormForCreate,
    userIdGotFromHere: number,
  ): Promise<ThreeDModelApiResponse> {
    await prismaMain();

    const createdModel = await prisma.threeDModel.create({
      data: {
        name: threeDModel.name,
        slug: threeDModel.slug,
        publishedAt: threeDModel.publishedAt,
        userId: userIdGotFromHere,
        description: threeDModel.description,
        categories: {
          connect: threeDModel.categoryIds.map((id) => ({ id })),
        },
        price: threeDModel.price,
        resolutions: {
          connect: threeDModel.resolutionIds.map((id) => ({ id })),
        },
        credit: threeDModel.credit,
        license: threeDModel.license,
        scale: threeDModel.scale,
        rotationDegreesX: threeDModel.rotationDegree.x,
        rotationDegreesY: threeDModel.rotationDegree.y,
        rotationDegreesZ: threeDModel.rotationDegree.z,
        formats: {
          create: threeDModel.formats.map((format) => ({
            formatId: format.id,
            isUsed: format.isUsed,
          })),
        },
        actions: threeDModel.actions
          ? {
              connect: threeDModel.actions.map((action) => ({ id: action.id })),
            }
          : undefined,
        isDownloadable: threeDModel.isDownloadable,
        downloads: {
          create: [],
        },
      },
      include: {
        actions: true,
        resolutions: true,
        categories: true,
        user: true,
        downloads: true,
        formats: {
          include: {
            format: true,
          },
        },
      },
    });

    if (!createdModel) {
      throw new Error("Failed to create the ThreeDModel");
    }

    await prisma.$disconnect();

    return createdModel;
  }

  async updateThreeDModel(
    threeDModelId: number,
    threeDModel: ThreeDModelBasicFormForUpdate,
  ): Promise<ThreeDModelApiResponse> {
    await prismaMain();

    const updatedThreeDModel = await prisma.threeDModel.update({
      where: { id: threeDModelId },
      data: {
        name: threeDModel.name,
        slug: threeDModel.slug,
        publishedAt: threeDModel.publishedAt,
        userId: threeDModel.userId,
        description: threeDModel.description,
        categories: {
          set: threeDModel.categoryIds?.map((id) => ({ id })),
        },
        resolutions: {
          set: threeDModel.resolutionIds?.map((id) => ({ id })),
        },
        actions: threeDModel.actions
          ? {
              set: threeDModel.actions.map((action) => ({ id: action.id })),
            }
          : undefined,
        isDownloadable: threeDModel.isDownloadable,
      },
      include: {
        actions: true,
        resolutions: true,
        categories: true,
        user: true,
        downloads: true,
        formats: {
          include: {
            format: true,
          },
        },
      },
    });

    await prisma.$disconnect();

    return updatedThreeDModel;
  }

  async deleteThreeDModel(threeDModelId: number): Promise<void> {
    await prismaMain();

    await prisma.threeDModel.delete({
      where: { id: threeDModelId },
    });
  }
}
