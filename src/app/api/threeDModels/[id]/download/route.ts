import { NextRequest, NextResponse } from "next/server";

import { container } from "@/sample/inversify.config";
import { ThreeDModelController } from "@/src/controllers/threeDModel/ThreeDModelController";
import { TYPES } from "@/src/lib/di/types";

const threeDModelController = container.get<ThreeDModelController>(
  TYPES.ThreeDModelController,
);

/**
 * @route   POST /api/threeDModels/[id]/download
 * @desc    Increment download count
 * @access  Public
 */
export const POST = async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    await threeDModelController.incrementDownload(id);

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
}; 