import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return new NextResponse("Hello, world!");
};
