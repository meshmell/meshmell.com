import { injectable, inject } from 'inversify'
import { NextRequest } from 'next/server'

import { SubRole } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'

import type { SubRoleFormType, ISubRoleService } from '@/src/services/ISubRoleService'

@injectable()
export class SubRoleController {
  private subRoleService: ISubRoleService

  constructor(@inject(TYPES.SubRoleService) subRoleService: ISubRoleService) {
    this.subRoleService = subRoleService
  }

  /**
   * @route   GET /api/sub-roles
   * @desc    Get sub roles
   * @access  Public
   */
  public async getSubRoles() {
    try {
      const subRoles = await this.subRoleService.getSubRoles()
      return subRoles
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
   * @route   GET /api/sub-roles/[id]
   * @desc    Get sub role
   * @access  Public
   */
  public async getSubRole(id: number) {
    try {
      return await this.subRoleService.getSubRole(id)
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
   * @route   GET /api/sub-roles/slug/[slug]
   * @desc    Get sub role by slug
   * @access  Public
   */
  public async getSubRoleBySlug(slug: string) {
    try {
      return await this.subRoleService.getSubRoleBySlug(slug)
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
   * @route   POST /api/sub-roles
   * @desc    Create sub role
   * @access  Private
   */
  public async createSubRole(req: NextRequest) {
    try {
      const data = await req.json() as SubRoleFormType
      return await this.subRoleService.createSubRole(data)
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
   * @route   PUT /api/sub-roles/[id]
   * @desc    Update sub role
   * @access  Private
   */
  public async updateSubRole(id: number, req: NextRequest) {
    try {
      const data = await req.json() as SubRoleFormType
      return await this.subRoleService.updateSubRole(id, data)
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
   * @route   DELETE /api/sub-roles/[id]
   * @desc    Delete sub role
   * @access  Private
   */
  public async deleteSubRole(id: number) {
    try {
      return await this.subRoleService.deleteSubRole(id)
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