import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { checkAuthorization } from "../../utils/checkAuthorization";

import { ResolutionService } from "@/src/services/ResolutionService";

const path = "/resolutions/";
const resolutionService = new ResolutionService();

/**
 * @route   GET /api/resolutions/[id]
 * @desc    Get a single resolution by ID
 * @access  Private (Admin only)
 */
export const GET = auth(async function GET(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const resolutionData = await resolutionService.getResolutionById(id);

    if (!resolutionData) {
      return NextResponse.json(
        { error: "Resolution not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Success", resolution: resolutionData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   PUT /api/resolutions/[id]
 * @desc    Update a resolution by ID
 * @access  Private (Admin only)
 */
export const PUT = auth(async function PUT(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name } = await req.json();

  try {
    const updatedResolution = await resolutionService.updateResolution(id, {
      name,
    });

    if (!updatedResolution) {
      return NextResponse.json(
        { error: "Resolution not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Resolution updated successfully",
        resolution: updatedResolution,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   DELETE /api/resolutions/[id]
 * @desc    Delete a resolution by ID
 * @access  Private (Admin only)
 */
export const DELETE = auth(async function DELETE(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const deleted = await resolutionService.deleteResolution(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Resolution not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Resolution deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
