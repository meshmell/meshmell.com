import { injectable } from 'inversify'
import { Format, PrismaClient, ThreeDModelFormat } from '@prisma/client'
import { Prisma } from '@prisma/client'

import { 
  IThreeDModelFormatService, 
  ThreeDModelFormatFormType 
} from './IThreeDModelFormatService'

@injectable()
export class ThreeDModelFormatService implements IThreeDModelFormatService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getThreeDModelFormats(threeDModelId: number): Promise<ThreeDModelFormat[]> {
    return this.prisma.threeDModelFormat.findMany({
      where: { threeDModelId }
    })
  }

  async getThreeDModelFormat(threeDModelId: number, formatId: number): Promise<ThreeDModelFormat | null> {
    return this.prisma.threeDModelFormat.findUnique({
      where: {
        threeDModelId_formatId: {
          threeDModelId,
          formatId
        }
      }
    })
  }

  async createThreeDModelFormat(modelFormat: ThreeDModelFormatFormType): Promise<ThreeDModelFormat | null> {
    try {
      return await this.prisma.threeDModelFormat.create({
        data: {
          threeDModelId: modelFormat.threeDModelId,
          formatId: modelFormat.formatId,
          isUsed: modelFormat.isUsed
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500
        })
      }
      
      throw new Error('Unknown error', {
        cause: 500
      })
    }
  }

  async updateThreeDModelFormat(
    threeDModelId: number, 
    formatId: number, 
    modelFormat: Partial<ThreeDModelFormatFormType>,
    tx?: Prisma.TransactionClient
  ): Promise<ThreeDModelFormat> {
    const client = tx || this.prisma
    
    try {
      return await client.threeDModelFormat.update({
        where: {
          threeDModelId_formatId: {
            threeDModelId,
            formatId
          }
        },
        data: {
          isUsed: modelFormat.isUsed
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500
        })
      }
      
      throw new Error('Unknown error', {
        cause: 500
      })
    }
  }

  async deleteThreeDModelFormat(threeDModelId: number, formatId: number): Promise<void> {
    try {
      await this.prisma.threeDModelFormat.delete({
        where: {
          threeDModelId_formatId: {
            threeDModelId,
            formatId
          }
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500
        })
      }
      
      throw new Error('Unknown error', {
        cause: 500
      })
    }
  }

  async getFormatsByModelId(threeDModelId: number): Promise<(ThreeDModelFormat & { format: Format })[]> {
    return this.prisma.threeDModelFormat.findMany({
      where: { threeDModelId },
      include: { format: true }
    })
  }
} 