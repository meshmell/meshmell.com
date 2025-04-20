import { injectable } from 'inversify'
import { PrismaClient, ThreeDModel } from '@prisma/client'
import { NextRequest } from 'next/server'
import { z } from 'zod'

@injectable()
export class ThreeDModelService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getThreeDModels(req: NextRequest): Promise<ThreeDModel[]> {
    return this.prisma.threeDModel.findMany({
      include: {
        actions: true,
        categories: true,
        resolutions: true,
        formats: {
          include: {
            format: true
          }
        },
        user: true
      }
    })
  }

  async getThreeDModelById(id: number): Promise<ThreeDModel | null> {
    return this.prisma.threeDModel.findUnique({
      where: { id },
      include: {
        actions: true,
        categories: true,
        resolutions: true,
        formats: {
          include: {
            format: true
          }
        },
        user: true,
        downloads: true
      }
    })
  }

  async createThreeDModel(req: NextRequest, userId: number): Promise<ThreeDModel> {
    const body = await req.json()

    const schema = z.object({
      scale: z.number().positive(),
      rotationDegreesX: z.number().int(),
      rotationDegreesY: z.number().int(),
      rotationDegreesZ: z.number().int(),
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string(),
      price: z.number().nonnegative(),
      license: z.string(),
      credit: z.string().optional(),
      isDownloadable: z.boolean(),
      publishedAt: z.string().datetime().optional(),
      actionIds: z.array(z.number().int().positive()).optional(),
      categoryIds: z.array(z.number().int().positive()).optional(),
      resolutionIds: z.array(z.number().int().positive()).optional(),
      formatIds: z.array(z.number().int().positive()).optional()
    })

    const validatedData = schema.parse(body)
    const { actionIds, categoryIds, resolutionIds, formatIds, ...modelData } = validatedData

    const threeDModel = await this.prisma.threeDModel.create({
      data: {
        ...modelData,
        userId,
        publishedAt: validatedData.publishedAt ? new Date(validatedData.publishedAt) : new Date(),
        ...(actionIds && {
          actions: {
            connect: actionIds.map((id) => ({ id }))
          }
        }),
        ...(categoryIds && {
          categories: {
            connect: categoryIds.map((id) => ({ id }))
          }
        }),
        ...(resolutionIds && {
          resolutions: {
            connect: resolutionIds.map((id) => ({ id }))
          }
        }),
        ...(formatIds && {
          formats: {
            create: formatIds.map((formatId) => ({
              format: {
                connect: { id: formatId }
              },
              isUsed: false
            }))
          }
        })
      },
      include: {
        actions: true,
        categories: true,
        resolutions: true,
        formats: {
          include: {
            format: true
          }
        }
      }
    })

    return threeDModel
  }

  async updateThreeDModel(id: number, req: NextRequest): Promise<ThreeDModel> {
    const body = await req.json()

    const schema = z.object({
      scale: z.number().positive().optional(),
      rotationDegreesX: z.number().int().optional(),
      rotationDegreesY: z.number().int().optional(),
      rotationDegreesZ: z.number().int().optional(),
      name: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      description: z.string().optional(),
      price: z.number().nonnegative().optional(),
      license: z.string().optional(),
      credit: z.string().optional().nullable(),
      isDownloadable: z.boolean().optional(),
      publishedAt: z.string().datetime().optional(),
      actionIds: z.array(z.number().int().positive()).optional(),
      categoryIds: z.array(z.number().int().positive()).optional(),
      resolutionIds: z.array(z.number().int().positive()).optional(),
      formatIds: z.array(z.number().int().positive()).optional()
    })

    const validatedData = schema.parse(body)
    const { actionIds, categoryIds, resolutionIds, formatIds, ...modelData } = validatedData

    // Handle publishedAt date conversion if provided
    const dataWithDateFixed = {
      ...modelData,
      ...(validatedData.publishedAt && { publishedAt: new Date(validatedData.publishedAt) })
    }

    // Update many-to-many relationships if they're provided
    if (actionIds !== undefined) {
      await this.prisma.threeDModel.update({
        where: { id },
        data: {
          actions: {
            set: []
          }
        }
      })
    }

    if (categoryIds !== undefined) {
      await this.prisma.threeDModel.update({
        where: { id },
        data: {
          categories: {
            set: []
          }
        }
      })
    }

    if (resolutionIds !== undefined) {
      await this.prisma.threeDModel.update({
        where: { id },
        data: {
          resolutions: {
            set: []
          }
        }
      })
    }

    if (formatIds !== undefined) {
      // Delete existing format relationships
      await this.prisma.threeDModelFormat.deleteMany({
        where: {
          threeDModelId: id
        }
      })
    }

    // Perform the update with all the changes
    const threeDModel = await this.prisma.threeDModel.update({
      where: { id },
      data: {
        ...dataWithDateFixed,
        ...(actionIds && {
          actions: {
            connect: actionIds.map((id) => ({ id }))
          }
        }),
        ...(categoryIds && {
          categories: {
            connect: categoryIds.map((id) => ({ id }))
          }
        }),
        ...(resolutionIds && {
          resolutions: {
            connect: resolutionIds.map((id) => ({ id }))
          }
        }),
        ...(formatIds && {
          formats: {
            create: formatIds.map((formatId) => ({
              format: {
                connect: { id: formatId }
              },
              isUsed: false
            }))
          }
        })
      },
      include: {
        actions: true,
        categories: true,
        resolutions: true,
        formats: {
          include: {
            format: true
          }
        }
      }
    })

    return threeDModel
  }

  async deleteThreeDModel(id: number): Promise<void> {
    // Delete the model formats first (handle the junction table)
    await this.prisma.threeDModelFormat.deleteMany({
      where: {
        threeDModelId: id
      }
    })

    // Then delete the model itself
    await this.prisma.threeDModel.delete({
      where: { id }
    })
  }
} 