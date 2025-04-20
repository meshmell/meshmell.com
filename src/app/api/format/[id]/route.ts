import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { checkAuthorization } from "../../utils/checkAuthorization";

import { FormatService } from "@/src/services/FormatService";

const path = "/formats/";
const formatService = new FormatService();

/**
 * @route   GET /api/formats/[id]
 * @desc    Get a single format by ID
 * @access  Private (Admin only)
 */
export const GET = auth(async function GET(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const formatData = await formatService.getFormatById(id);

    if (!formatData) {
      return NextResponse.json({ error: "Format not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success", format: formatData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   PUT /api/formats/[id]
 * @desc    Update a format by ID
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
    const updatedFormat = await formatService.updateFormat(id, {
      name,
    });

    if (!updatedFormat) {
      return NextResponse.json({ error: "Format not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Format updated successfully", format: updatedFormat },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   DELETE /api/formats/[id]
 * @desc    Delete a format by ID
 * @access  Private (Admin only)
 */
export const DELETE = auth(async function DELETE(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const deleted = await formatService.deleteFormat(id);

    if (!deleted) {
      return NextResponse.json({ error: "Format not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Format deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
