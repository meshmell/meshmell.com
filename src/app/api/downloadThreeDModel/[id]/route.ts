import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { checkAuthorization } from "../../utils/checkAuthorization";

import { DownloadService } from "@/src/services/DownloadService";

const path = "/downloads/";
const downloadService = new DownloadService();

/**
 * @route   GET /api/downloads/[id]
 * @desc    Get a single download record by ID
 * @access  Private (Admin only)
 */
export const GET = auth(async function GET(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const downloadData = await downloadService.getDownloadById(id);

    if (!downloadData) {
      return NextResponse.json(
        { error: "Download record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Success", download: downloadData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   DELETE /api/downloads/[id]
 * @desc    Delete a download record by ID
 * @access  Private (Admin only)
 */
export const DELETE = auth(async function DELETE(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const deleted = await downloadService.deleteDownload(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Download record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Download record deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
