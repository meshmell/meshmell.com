import { inject, injectable } from 'inversify'
import { Download } from '@prisma/client'

import { TYPES } from '@/src/lib/di/types'
import { DownloadService } from '@/src/services/DownloadService'

@injectable()
export class DownloadController {
  private downloadService: DownloadService

  constructor(@inject(TYPES.DownloadService) downloadService: DownloadService) {
    this.downloadService = downloadService
  }

  async incrementDownload(threeDModelId: number): Promise<Download> {
    return this.downloadService.incrementDownload(threeDModelId)
  }
} 