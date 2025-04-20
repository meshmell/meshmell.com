import { Storage } from "@google-cloud/storage";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const useGCSEmulator: boolean =
    process.env.NEXT_PUBLIC_ENV_STATUS === "development" &&
    process.env.NEXT_PUBLIC_USE_GCS_EMULATOR === "true";

  try {
    const { searchParams } = new URL(req.url);
    const focusedModelsSlug = searchParams.get("focusedModelsSlug");
    const resolution = searchParams.get("resolution");
    const filename = searchParams.get("filename");

    if (!focusedModelsSlug || !filename) {
      throw new Error("Missing required parameters");
    }
    const storage = useGCSEmulator
      ? new Storage({
          apiEndpoint: "http://localhost:4443",
          projectId: "test",
        })
      : new Storage({
          projectId: process.env.GCS_PROJECT_ID,
          credentials: {
            type: process.env.GCS_TYPE,
            client_email: process.env.GCS_CLIENT_EMAIL,
            client_id: process.env.GCS_CLIENT_ID,
            private_key:
              process.env.GCS_PRIVATE_KEY &&
              process.env.GCS_PRIVATE_KEY.replace(/\\n/g, "\n"),
          },
        });
    const bucketName =
      (useGCSEmulator ? "test_bucket" : process.env.GCS_BUCKET_NAME) || "";
    const filePath = `models/distribution/${focusedModelsSlug}/${resolution}/${filename}`;
    const bucket = storage.bucket(bucketName, storage);
    const file = bucket.file(filePath);

    const fileExists = await file.exists();

    if (!fileExists[0]) {
      throw new Error("File not found");
    }

    const [fileBuffer] = await file.download();

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (error: any) {
    let status = 500;
    let message = "Internal Server Error";

    if (error.message === "Missing required parameters") {
      status = 400;
      message = "Bad request";
    } else if (error.message === "File not found") {
      status = 404;
      message = "File not found";
    }

    return new NextResponse(JSON.stringify({ status, message }), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
