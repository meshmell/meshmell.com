import { NextResponse } from 'next/server'

import { auth, NextAuthRequest } from '@/auth'
import { container } from '@/inversify.config'
import { ThreeDModelController } from '@/src/controllers/ThreeDModelController'
import { TYPES } from '@/src/lib/di/types'

import { checkSession } from '../../../utils/session'

const threeDModelController = container.get<ThreeDModelController>(
  TYPES.ThreeDModelController,
)

/**
 * @route   GET /api/threedModels/[id]
 * @desc    Get 3D model by ID
 * @access  Public
 */
export const GET = async function GET(
  req: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params

  try {
    const id = resolvedParams.id

    if (!id) {
      return NextResponse.json({ error: 'Id is required' }, { status: 400 })
    }

    const model = await threeDModelController.getThreeDModel(Number(id))
    
    if (!model) {
      return NextResponse.json({ error: '3D model not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Success', model },
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
 * @route   PUT /api/threedModels/[id]
 * @desc    Update 3D model
 * @access  Private
 */
export const PUT = async function PUT(
  req: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params

  return auth(async (request) => {
    try {
      await checkSession(request.auth)

      const id = resolvedParams.id

      const updatedModel = await threeDModelController.updateThreeDModel(
        Number(id),
        req,
      )

      return NextResponse.json(
        { message: 'Success', model: updatedModel },
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
  })(req, { params: resolvedParams }) as Promise<Response>
}

/**
 * @route   DELETE /api/threedModels/[id]
 * @desc    Delete 3D model
 * @access  Private
 */
export const DELETE = async function DELETE(
  req: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params

  return auth(async (request) => {
    try {
      await checkSession(request.auth)

      const id = resolvedParams.id

      await threeDModelController.deleteThreeDModel(Number(id))

      return NextResponse.json({ message: 'Success' }, { status: 200 })
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: (error.cause as number) || 500 },
        )
      }

      return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
    }
  })(req, { params: resolvedParams }) as Promise<Response>
} 