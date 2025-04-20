import { injectable, inject } from 'inversify'
import { NextRequest } from 'next/server'

import { Resolution } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'

import type { ResolutionFormType, IResolutionService } from '@/src/services/IResolutionService'

@injectable()
export class ResolutionController {
  private resolutionService: IResolutionService

  constructor(@inject(TYPES.ResolutionService) resolutionService: IResolutionService) {
    this.resolutionService = resolutionService
  }

  /**
   * @route   GET /api/resolutions
   * @desc    Get resolutions
   * @access  Public
   */
  public async getResolutions() {
    try {
      const resolutions = await this.resolutionService.getResolutions()
      return resolutions
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
   * @route   GET /api/resolutions/[id]
   * @desc    Get resolution
   * @access  Public
   */
  public async getResolution(id: number) {
    try {
      return await this.resolutionService.getResolution(id)
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
   * @route   POST /api/resolutions
   * @desc    Create resolution
   * @access  Private
   */
  public async createResolution(req: NextRequest) {
    try {
      const data = await req.json() as ResolutionFormType
      return await this.resolutionService.createResolution(data)
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
   * @route   PUT /api/resolutions/[id]
   * @desc    Update resolution
   * @access  Private
   */
  public async updateResolution(id: number, req: NextRequest) {
    try {
      const data = await req.json() as ResolutionFormType
      return await this.resolutionService.updateResolution(id, data)
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
   * @route   DELETE /api/resolutions/[id]
   * @desc    Delete resolution
   * @access  Private
   */
  public async deleteResolution(id: number) {
    try {
      return await this.resolutionService.deleteResolution(id)
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