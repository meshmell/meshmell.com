import { NextRequest, NextResponse } from 'next/server'

import { container } from '@/inversify.config'
import { DownloadController } from '@/src/controllers/DownloadController'
import { TYPES } from '@/src/lib/di/types'

const downloadController = container.get<DownloadController>(
  TYPES.DownloadController,
)

/**
 * @route   POST /api/downloads/increment
 * @desc    Increment download count for a 3D model
 * @access  Public
 */
export const POST = async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    if (!body.threeDModelId) {
      return NextResponse.json({ error: 'threeDModelId is required' }, { status: 400 })
    }
    
    const threeDModelId = Number(body.threeDModelId)
    const download = await downloadController.incrementDownload(threeDModelId)

    return NextResponse.json(
      { message: 'Success', download },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: (error.cause as number) || 500 },
      )
    }

    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
} 