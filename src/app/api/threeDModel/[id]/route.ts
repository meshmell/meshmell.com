import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { ThreeDModelService } from "@/src/services/ThreeDModelService";
import { ThreeDModelBasic } from "@/src/types/threeDModel";

import { checkAuthorization } from "../../utils/checkAuthorization";

const path = "/threeDModels/";
const threeDModelService = new ThreeDModelService();

/**
 * @route   GET /api/threeDModels/[id]
 * @desc    Get a single threeDModel by ID
 * @access  Public / Private
 */
export const GET = auth(async function GET(req) {
  if (!req.auth || req.auth.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json(
      { message: "Unauthorized", error: "Unauthorized" },
      { status: 401 },
    );
  }

  const id: number = parseInt(req.url.split(path)[1], 10);

  try {
    const threeDModel = await threeDModelService.getThreeDModel(id);

    if (!threeDModel) {
      return NextResponse.json(
        { error: "ThreeDModel not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Success", threeDModel },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
});

/**
 * @route   PUT /api/threeDModels/[id]
 * @desc    Update a threeDModel by ID
 * @access  Private (Only the creator or admin)
 */
export const PUT = auth(async function PUT(req) {
  const { errorMessage } = await checkAuthorization(req);

  if (errorMessage) {
    return errorMessage;
  }

  const id: number = parseInt(req.url.split(path)[1], 10);

  const { user: userGotFromHere } = await checkAuthorization(req);

  if (!userGotFromHere) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const {
    name,
    slug,
    description,
    creator,
    categoryIds,
    price,
    resolutionIds,
    credit,
    license,
    scale,
    rotationDegree,
    formats,
    actions,
    isDownloadable,
  }: Partial<ThreeDModelBasic> = await req.json();

  try {
    const updatedThreeDModel = await threeDModelService.updateThreeDModel(id, {
      name,
      description,
      creator,
      categoryIds,
      price,
      resolutionIds,
      credit,
      license,
      scale,
      rotationDegree,
      formats,
      actions,
      isDownloadable,
      slug,
    });

    if (!updatedThreeDModel) {
      return NextResponse.json(
        { error: "ThreeDModel not found or not authorized" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "ThreeDModel updated successfully", updatedThreeDModel },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   DELETE /api/threeDModels/[id]
 * @desc    Delete a threeDModel by ID
 * @access  Private (Only the creator or admin)
 */
export const DELETE = auth(async function DELETE(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);

  const { errorMessage } = await checkAuthorization(req);

  if (errorMessage) {
    return NextResponse.json({ error: errorMessage }, { status: 403 });
  }

  try {
    await threeDModelService.deleteThreeDModel(id);

    return NextResponse.json(
      { message: "ThreeDModel deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
