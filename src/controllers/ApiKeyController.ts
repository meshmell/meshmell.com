import { inject, injectable } from 'inversify'
import { NextRequest } from 'next/server'

import { TYPES } from '@/src/lib/di/types'
import { ApiKeyService } from '@/src/services/ApiKeyService'

@injectable()
export class ApiKeyController {
  private apiKeyService: ApiKeyService

  constructor(@inject(TYPES.ApiKeyService) apiKeyService: ApiKeyService) {
    this.apiKeyService = apiKeyService
  }

  async getApiKeys(req: NextRequest) {
    return this.apiKeyService.getApiKeys(req)
  }

  async getApiKey(id: number) {
    return this.apiKeyService.getApiKey(id)
  }

  async createApiKey(req: NextRequest, userId: number) {
    return this.apiKeyService.createApiKey(req, userId)
  }

  async updateApiKey(id: number, req: NextRequest) {
    return this.apiKeyService.updateApiKey(id, req)
  }

  async deleteApiKey(id: number) {
    return this.apiKeyService.deleteApiKey(id)
  }
} 