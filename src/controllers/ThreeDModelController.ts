import { inject, injectable } from 'inversify'
import { NextRequest } from 'next/server'
import { ThreeDModel } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'
import { ThreeDModelService } from '@/src/services/ThreeDModelService'

@injectable()
export class ThreeDModelController {
  private threeDModelService: ThreeDModelService

  constructor(@inject(TYPES.ThreeDModelService) threeDModelService: ThreeDModelService) {
    this.threeDModelService = threeDModelService
  }

  /**
   * @route   GET /api/threeDModels
   * @desc    Get 3D models
   * @access  Public
   */
  async getThreeDModels(req: NextRequest): Promise<ThreeDModel[]> {
    return this.threeDModelService.getThreeDModels(req)
  }

  /**
   * @route   GET /api/threeDModels/[id]
   * @desc    Get 3D model
   * @access  Public
   */
  async getThreeDModel(id: number): Promise<ThreeDModel | null> {
    return this.threeDModelService.getThreeDModelById(id)
  }

  /**
   * @route   GET /api/threeDModels/id/[id]
   * @desc    Get 3D model by id
   * @access  Public
   */
  public async getThreeDModelById(id: string) {
    try {
      const idNumber = parseInt(id, 10);
      return await this.threeDModelService.getThreeDModelById(idNumber);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500,
        });
      }

      throw new Error("Unknown error", {
        cause: 500,
      });
    }
  }

  /**
   * @route   POST /api/threeDModels
   * @desc    Create 3D model
   * @access  Private
   */
  async createThreeDModel(req: NextRequest, userId: number): Promise<ThreeDModel> {
    return this.threeDModelService.createThreeDModel(req, userId)
  }

  /**
   * @route   PUT /api/threeDModels/[id]
   * @desc    Update 3D model
   * @access  Private
   */
  async updateThreeDModel(id: number, req: NextRequest): Promise<ThreeDModel> {
    return this.threeDModelService.updateThreeDModel(id, req)
  }

  /**
   * @route   DELETE /api/threeDModels/[id]
   * @desc    Delete 3D model
   * @access  Private
   */
  async deleteThreeDModel(id: number): Promise<void> {
    return this.threeDModelService.deleteThreeDModel(id)
  }

  /**
   * @route   POST /api/threeDModels/[id]/download
   * @desc    Increment download count
   * @access  Public
   */
  public async incrementDownload(id: number) {
    return await this.threeDModelService.incrementDownload(id);
  }
} 