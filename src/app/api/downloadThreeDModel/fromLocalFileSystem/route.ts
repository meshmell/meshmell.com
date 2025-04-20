import fs from "fs";
import path from "path";

import { NextResponse, NextRequest } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const focusedModelsSlug = searchParams.get("focusedModelsSlug");
    const resolution = searchParams.get("resolution");
    const filename = searchParams.get("filename");

    if (!focusedModelsSlug || !filename) {
      return new NextResponse(
        JSON.stringify({ status: 400, message: "Bad request" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const filePath = path.resolve(
      `./gcs_dev/test_bucket/distribution/${focusedModelsSlug}/${resolution}/${filename}`,
    );

    if (!fs.existsSync(filePath)) {
      return new NextResponse(
        JSON.stringify({ status: 404, message: "File not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
