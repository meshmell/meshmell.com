import { NextResponse } from 'next/server'

import { auth, NextAuthRequest } from '@/auth'
import { container } from '@/inversify.config'
import { ActionController } from '@/src/controllers/ActionController'
import { TYPES } from '@/src/lib/di/types'

import { checkSession } from '../../../utils/session'

const actionController = container.get<ActionController>(
  TYPES.ActionController,
)

/**
 * @route   GET /api/actions/[id]
 * @desc    Get action by ID
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

    const action = await actionController.getAction(Number(id))
    
    if (!action) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Success', action },
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
 * @route   PUT /api/actions/[id]
 * @desc    Update action
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

      const updatedAction = await actionController.updateAction(
        Number(id),
        req,
      )

      return NextResponse.json(
        { message: 'Success', action: updatedAction },
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
 * @route   DELETE /api/actions/[id]
 * @desc    Delete action
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

      await actionController.deleteAction(Number(id))

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