import { inject, injectable } from 'inversify'
import { NextRequest } from 'next/server'
import { Action } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'
import { ActionService } from '@/src/services/ActionService'

@injectable()
export class ActionController {
  private actionService: ActionService

  constructor(@inject(TYPES.ActionService) actionService: ActionService) {
    this.actionService = actionService
  }

  async getActions(): Promise<Action[]> {
    return this.actionService.getActions()
  }

  async getAction(id: number): Promise<Action | null> {
    return this.actionService.getActionById(id)
  }

  async createAction(req: NextRequest): Promise<Action> {
    return this.actionService.createAction(req)
  }

  async updateAction(id: number, req: NextRequest): Promise<Action> {
    return this.actionService.updateAction(id, req)
  }

  async deleteAction(id: number): Promise<void> {
    return this.actionService.deleteAction(id)
  }
} 