import { inject, injectable } from 'inversify'
import { NextRequest } from 'next/server'
import { User } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'
import { UserService } from '@/src/services/UserService'

@injectable()
export class UserController {
  private userService: UserService

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this.userService = userService
  }

  /**
   * @route   GET /api/users
   * @desc    Get users
   * @access  Private
   */
  async getUsers(req: NextRequest): Promise<User[]> {
    return this.userService.getUsers(req)
  }

  /**
   * @route   GET /api/users/[id]
   * @desc    Get user
   * @access  Private
   */
  async getUser(id: number): Promise<User | null> {
    return this.userService.getUserById(id)
  }

  /**
   * @route   GET /api/users/slug/[slug]
   * @desc    Get user by slug
   * @access  Private
   */
  public async getUserBySlug(slug: string) {
    try {
      return await this.userService.getUserBySlug(slug);
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
   * @route   POST /api/users
   * @desc    Create user
   * @access  Private
   */
  async createUser(req: NextRequest, userId: number): Promise<User> {
    return this.userService.createUser(req)
  }

  /**
   * @route   PUT /api/users/[id]
   * @desc    Update user
   * @access  Private
   */
  async updateUser(id: number, req: NextRequest): Promise<User> {
    return this.userService.updateUser(id, req)
  }

  /**
   * @route   DELETE /api/users/[id]
   * @desc    Delete user
   * @access  Private
   */
  async deleteUser(id: number): Promise<void> {
    return this.userService.deleteUser(id)
  }
} 