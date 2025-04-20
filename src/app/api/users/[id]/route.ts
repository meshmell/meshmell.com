import { NextRequest, NextResponse } from "next/server";

import { auth, NextAuthRequest } from "@/auth";
import { container } from "@/sample/inversify.config";
import { UserController } from "@/src/controllers/user/UserController";
import { TYPES } from "@/src/lib/di/types";

import { checkSession } from "../../utils/session";

const userController = container.get<UserController>(
  TYPES.UserController,
);

/**
 * @route   GET /api/users/[id]
 * @desc    Get user by ID
 * @access  Private
 */
export const GET = async function GET(
  req: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;

  return auth(async (request) => {
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    try {
      await checkSession(request.auth);

      const user = await userController.getUser(Number(id));
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(
        { message: "Success", user },
        { status: 200 },
      );
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: (error.cause as number) || 500 },
        );
      }

      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  })(req, { params: resolvedParams }) as Promise<Response>;
};

/**
 * @route   PUT /api/users/[id]
 * @desc    Update user
 * @access  Private
 */
export const PUT = async function PUT(
  req: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;

  return auth(async (request) => {
    try {
      await checkSession(request.auth);

      const id = resolvedParams.id;

      const updatedUser = await userController.updateUser(
        Number(id),
        req,
      );

      return NextResponse.json(
        { message: "Success", user: updatedUser },
        { status: 200 },
      );
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: (error.cause as number) || 500 },
        );
      }

      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  })(req, { params: resolvedParams }) as Promise<Response>;
};

/**
 * @route   DELETE /api/users/[id]
 * @desc    Delete user
 * @access  Private
 */
export const DELETE = async function DELETE(
  req: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;

  return auth(async (request) => {
    try {
      await checkSession(request.auth);

      const id = resolvedParams.id;

      await userController.deleteUser(Number(id));

      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: (error.cause as number) || 500 },
        );
      }

      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  })(req, { params: resolvedParams }) as Promise<Response>;
}; 