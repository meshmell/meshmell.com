import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { container } from "@/inversify.config";
import { UserController } from "@/src/controllers/UserController";
import { TYPES } from "@/src/lib/di/types";

import { checkSession } from "../../utils/session";

const userController = container.get<UserController>(
  TYPES.UserController,
);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private
 */
export const GET = async function GET(req: NextRequest) {
  return auth(async (request) => {
    try {
      await checkSession(request.auth);
      const users = await userController.getUsers(request);

      return NextResponse.json(
        { message: "Success", users },
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
  })(req, {}) as Promise<Response>;
};

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Private
 */
export const POST = async function POST(req: NextRequest) {
  return auth(async (request) => {
    try {
      await checkSession(request.auth);
      const userId = Number(request.auth?.user?.id);
      const user = await userController.createUser(req, userId);

      return NextResponse.json({ message: "Success", user }, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: (error.cause as number) || 500 },
        );
      }

      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  })(req, {}) as Promise<Response>;
}; 