import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { container } from "@/sample/inversify.config";
import { ThreeDModelController } from "@/src/controllers/threeDModel/ThreeDModelController";
import { TYPES } from "@/src/lib/di/types";

import { checkSession } from "../../utils/session";

const threeDModelController = container.get<ThreeDModelController>(
  TYPES.ThreeDModelController,
);

/**
 * @route   GET /api/threeDModels/[id]
 * @desc    Get 3D model
 * @access  Public
 */
export const GET = async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const model = await threeDModelController.getThreeDModel(id);

    return NextResponse.json({ message: "Success", model }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: (error.cause as number) || 500 },
      );
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
};

/**
 * @route   PUT /api/threeDModels/[id]
 * @desc    Update 3D model
 * @access  Private
 */
export const PUT = async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return auth(async (request) => {
    await checkSession(request.auth);

    try {
      const id = Number(params.id);
      const model = await threeDModelController.updateThreeDModel(id, req);

      return NextResponse.json({ message: "Success", model }, { status: 200 });
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
 * @route   DELETE /api/threeDModels/[id]
 * @desc    Delete 3D model
 * @access  Private
 */
export const DELETE = async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return auth(async (request) => {
    await checkSession(request.auth);

    try {
      const id = Number(params.id);
      await threeDModelController.deleteThreeDModel(id);

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
  })(req, {}) as Promise<Response>;
}; 