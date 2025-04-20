import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { checkAuthorization } from "../../utils/checkAuthorization";

import { UserService } from "@/src/services/UserService";

const path = "/users/";
const userService = new UserService();

/**
 * @route   GET /api/users/[id]
 * @desc    Get a single user by ID
 * @access  Private (Admin or Self)
 */
export const GET = auth(async function GET(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || (!user.isAdmin && user.id !== id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const userData = await userService.getUserById(id);

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success", user: userData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   PUT /api/users/[id]
 * @desc    Update a user by ID
 * @access  Private (Admin or Self)
 */
export const PUT = auth(async function PUT(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user: authenticatedUser, errorMessage } =
    await checkAuthorization(req);

  if (
    errorMessage ||
    (!authenticatedUser.isAdmin && authenticatedUser.id !== id)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name, slug, description, twitterUrl, websiteUrl, youtubeUrl } =
    await req.json();

  try {
    const updatedUser = await userService.updateUser(id, {
      name,
      slug,
      description,
      twitterUrl,
      websiteUrl,
      youtubeUrl,
      updatedAt: new Date(),
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   DELETE /api/users/[id]
 * @desc    Delete a user by ID
 * @access  Private (Admin only)
 */
export const DELETE = auth(async function DELETE(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user: authenticatedUser, errorMessage } =
    await checkAuthorization(req);

  if (errorMessage || !authenticatedUser.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
