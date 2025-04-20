import { injectable } from 'inversify'
import { PrismaClient, Action } from '@prisma/client'
import { NextRequest } from 'next/server'
import { z } from 'zod'

@injectable()
export class ActionService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getActions(): Promise<Action[]> {
    return this.prisma.action.findMany()
  }

  async getActionById(id: number): Promise<Action | null> {
    return this.prisma.action.findUnique({
      where: { id },
      include: {
        threeDModels: true
      }
    })
  }

  async createAction(req: NextRequest): Promise<Action> {
    const body = await req.json()

    const schema = z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      icon: z.string().min(1)
    })

    const validatedData = schema.parse(body)

    const action = await this.prisma.action.create({
      data: {
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return action
  }

  async updateAction(id: number, req: NextRequest): Promise<Action> {
    const body = await req.json()

    const schema = z.object({
      name: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      icon: z.string().min(1).optional()
    })

    const validatedData = schema.parse(body)

    const action = await this.prisma.action.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date()
      }
    })

    return action
  }

  async deleteAction(id: number): Promise<void> {
    await this.prisma.action.delete({
      where: { id }
    })
  }
} 