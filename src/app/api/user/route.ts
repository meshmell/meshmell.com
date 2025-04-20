import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { checkAuthorization } from "../utils/checkAuthorization";

import { UserService } from "@/src/services/UserService";

const userService = new UserService();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (Admin only)
 */
export const GET = auth(async function GET(req) {
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || user?.role?.name !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const users = await userService.getAllUsers();

    return NextResponse.json({ message: "Success", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
});

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
export const POST = async function POST(req) {
  const {
    email,
    password,
    name,
    slug,
    description,
    twitterUrl,
    websiteUrl,
    youtubeUrl,
  } = await req.json();

  try {
    const newUser = await userService.createUser({
      email,
      password,
      name,
      slug,
      description,
      twitterUrl,
      websiteUrl,
      youtubeUrl,
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

/**
 * @route   PATCH /api/users/:id
 * @desc    Update user details
 * @access  Private (User or Admin)
 */
export const PATCH = auth(async function PATCH(req) {
  const userId = req.nextUrl.searchParams.get("id");
  const { user: authenticatedUser, errorMessage } =
    await checkAuthorization(req);

  if (errorMessage) {
    return NextResponse.json({ error: errorMessage }, { status: 403 });
  }

  if (
    !userId ||
    (authenticatedUser.id !== parseInt(userId) &&
      authenticatedUser.role !== "ADMIN")
  ) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  const { name, slug, description, twitterUrl, websiteUrl, youtubeUrl } =
    await req.json();

  try {
    const updatedUser = await userService.updateUser(parseInt(userId), {
      name,
      slug,
      description,
      twitterUrl,
      websiteUrl,
      youtubeUrl,
    });

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
