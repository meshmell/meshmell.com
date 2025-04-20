import { NextResponse } from "next/server";

import prisma from "@/src/lib/prisma";

export async function checkAuthorization(req: any) {
  // Check if the request is authorized
  if (!req.auth || req.auth.user?.email !== process.env.ADMIN_EMAIL) {
    return {
      user: null,
      errorMessage: NextResponse.json(
        { message: "Unauthorized", error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  // Fetch the user from the Prisma database using the email
  const user = await prisma.user.findUnique({
    where: {
      email: req.auth.user?.email,
    },
    include: {
      mainRole: true,
    },
  });

  // Check if the user has a valid ID
  if (!user?.id) {
    return {
      user: null,
      errorMessage: NextResponse.json(
        { message: "User ID is missing", error: "Invalid User" },
        { status: 400 },
      ),
    };
  }

  // Return the user and null as the error message if everything is valid
  return { user, errorMessage: null };
}
