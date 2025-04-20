import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { container } from '@/inversify.config'
import { ActionController } from '@/src/controllers/ActionController'
import { TYPES } from '@/src/lib/di/types'

import { checkSession } from '../../utils/session'

const actionController = container.get<ActionController>(
  TYPES.ActionController,
)

/**
 * @route   GET /api/actions
 * @desc    Get all actions
 * @access  Public
 */
export const GET = async function GET(req: NextRequest) {
  try {
    const actions = await actionController.getActions()

    return NextResponse.json(
      { message: 'Success', actions },
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
 * @route   POST /api/actions
 * @desc    Create a new action
 * @access  Private
 */
export const POST = async function POST(req: NextRequest) {
  return auth(async (request) => {
    try {
      await checkSession(request.auth)
      const action = await actionController.createAction(req)

      return NextResponse.json({ message: 'Success', action }, { status: 201 })
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