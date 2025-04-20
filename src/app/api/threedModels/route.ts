import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { container } from '@/inversify.config'
import { ThreeDModelController } from '@/src/controllers/ThreeDModelController'
import { TYPES } from '@/src/lib/di/types'

import { checkSession } from '../../utils/session'

const threeDModelController = container.get<ThreeDModelController>(
  TYPES.ThreeDModelController,
)

/**
 * @route   GET /api/threedModels
 * @desc    Get all 3D models
 * @access  Public
 */
export const GET = async function GET(req: NextRequest) {
  try {
    const models = await threeDModelController.getThreeDModels(req)

    return NextResponse.json(
      { message: 'Success', models },
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

/**
 * @route   POST /api/threedModels
 * @desc    Create a new 3D model
 * @access  Private
 */
export const POST = async function POST(req: NextRequest) {
  return auth(async (request) => {
    try {
      await checkSession(request.auth)
      const userId = Number(request.auth?.user?.id)
      const model = await threeDModelController.createThreeDModel(req, userId)

      return NextResponse.json({ message: 'Success', model }, { status: 201 })
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: (error.cause as number) || 500 },
        )
      }

      return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
    }
  })(req, {}) as Promise<Response>
} 