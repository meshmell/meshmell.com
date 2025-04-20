import { injectable, inject } from 'inversify'
import { NextRequest } from 'next/server'

import { ThreeDModelFormat } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'

import type { 
  IThreeDModelFormatService, 
  ThreeDModelFormatFormType 
} from '@/src/services/IThreeDModelFormatService'

@injectable()
export class ThreeDModelFormatController {
  private threeDModelFormatService: IThreeDModelFormatService

  constructor(@inject(TYPES.ThreeDModelFormatService) threeDModelFormatService: IThreeDModelFormatService) {
    this.threeDModelFormatService = threeDModelFormatService
  }

  /**
   * @route   GET /api/model-formats/model/[threeDModelId]
   * @desc    Get all formats for a 3D model
   * @access  Public
   */
  public async getFormatsByModelId(threeDModelId: number) {
    try {
      return await this.threeDModelFormatService.getFormatsByModelId(threeDModelId)
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

  /**
   * @route   GET /api/model-formats/[threeDModelId]/[formatId]
   * @desc    Get a specific format for a 3D model
   * @access  Public
   */
  public async getThreeDModelFormat(threeDModelId: number, formatId: number) {
    try {
      return await this.threeDModelFormatService.getThreeDModelFormat(threeDModelId, formatId)
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

  /**
   * @route   POST /api/model-formats
   * @desc    Create a new 3D model format
   * @access  Private
   */
  public async createThreeDModelFormat(req: NextRequest) {
    try {
      const data = await req.json() as ThreeDModelFormatFormType
      return await this.threeDModelFormatService.createThreeDModelFormat(data)
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

  /**
   * @route   PUT /api/model-formats/[threeDModelId]/[formatId]
   * @desc    Update a 3D model format
   * @access  Private
   */
  public async updateThreeDModelFormat(
    threeDModelId: number,
    formatId: number,
    req: NextRequest
  ) {
    try {
      const data = await req.json() as Partial<ThreeDModelFormatFormType>
      return await this.threeDModelFormatService.updateThreeDModelFormat(
        threeDModelId,
        formatId,
        data
      )
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

  /**
   * @route   DELETE /api/model-formats/[threeDModelId]/[formatId]
   * @desc    Delete a 3D model format
   * @access  Private
   */
  public async deleteThreeDModelFormat(threeDModelId: number, formatId: number) {
    try {
      return await this.threeDModelFormatService.deleteThreeDModelFormat(
        threeDModelId,
        formatId
      )
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
} 