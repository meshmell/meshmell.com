import { injectable } from 'inversify'
import { PrismaClient, User } from '@prisma/client'
import { NextRequest } from 'next/server'
import { z } from 'zod'

@injectable()
export class UserService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getUsers(req: NextRequest): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        mainRole: true,
        subRoles: true,
        threeDModels: true,
        accounts: true
      }
    })
  }

  async createUser(req: NextRequest): Promise<User> {
    const body = await req.json()

    const schema = z.object({
      email: z.string().email().optional(),
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().optional(),
      twitterUrl: z.string().url().optional(),
      websiteUrl: z.string().url().optional(),
      youtubeUrl: z.string().url().optional(),
      password: z.string().optional(),
      mainRoleId: z.number().int().positive(),
      subRoleIds: z.array(z.number().int().positive()).optional()
    })

    const validatedData = schema.parse(body)

    const { subRoleIds, ...userData } = validatedData

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        ...(subRoleIds && {
          subRoles: {
            connect: subRoleIds.map((id) => ({ id }))
          }
        })
      },
      include: {
        mainRole: true,
        subRoles: true
      }
    })

    return user
  }

  async updateUser(id: number, req: NextRequest): Promise<User> {
    const body = await req.json()

    const schema = z.object({
      email: z.string().email().optional(),
      name: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      description: z.string().optional(),
      twitterUrl: z.string().url().optional().nullable(),
      websiteUrl: z.string().url().optional().nullable(),
      youtubeUrl: z.string().url().optional().nullable(),
      password: z.string().optional(),
      mainRoleId: z.number().int().positive().optional(),
      subRoleIds: z.array(z.number().int().positive()).optional()
    })

    const validatedData = schema.parse(body)
    const { subRoleIds, ...userData } = validatedData

    if (subRoleIds !== undefined) {
      // First disconnect all existing subRoles
      await this.prisma.user.update({
        where: { id },
        data: {
          subRoles: {
            set: []
          }
        }
      })
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        ...(subRoleIds && {
          subRoles: {
            connect: subRoleIds.map((id) => ({ id }))
          }
        })
      },
      include: {
        mainRole: true,
        subRoles: true
      }
    })

    return user
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    })
  }
} 