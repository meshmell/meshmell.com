import { injectable, inject } from 'inversify'
import { NextRequest } from 'next/server'

import { MainRole } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'

import type { MainRoleFormType, IMainRoleService } from '@/src/services/IMainRoleService'

@injectable()
export class MainRoleController {
  private mainRoleService: IMainRoleService

  constructor(@inject(TYPES.MainRoleService) mainRoleService: IMainRoleService) {
    this.mainRoleService = mainRoleService
  }

  /**
   * @route   GET /api/main-roles
   * @desc    Get main roles
   * @access  Public
   */
  public async getMainRoles() {
    try {
      const mainRoles = await this.mainRoleService.getMainRoles()
      return mainRoles
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
   * @route   GET /api/main-roles/[id]
   * @desc    Get main role
   * @access  Public
   */
  public async getMainRole(id: number) {
    try {
      return await this.mainRoleService.getMainRole(id)
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
   * @route   GET /api/main-roles/slug/[slug]
   * @desc    Get main role by slug
   * @access  Public
   */
  public async getMainRoleBySlug(slug: string) {
    try {
      return await this.mainRoleService.getMainRoleBySlug(slug)
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
   * @route   POST /api/main-roles
   * @desc    Create main role
   * @access  Private
   */
  public async createMainRole(req: NextRequest) {
    try {
      const data = await req.json() as MainRoleFormType
      return await this.mainRoleService.createMainRole(data)
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
   * @route   PUT /api/main-roles/[id]
   * @desc    Update main role
   * @access  Private
   */
  public async updateMainRole(id: number, req: NextRequest) {
    try {
      const data = await req.json() as MainRoleFormType
      return await this.mainRoleService.updateMainRole(id, data)
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
   * @route   DELETE /api/main-roles/[id]
   * @desc    Delete main role
   * @access  Private
   */
  public async deleteMainRole(id: number) {
    try {
      return await this.mainRoleService.deleteMainRole(id)
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