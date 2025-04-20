import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { checkAuthorization } from "../../utils/checkAuthorization";

import { CategoryService } from "@/src/services/CategoryService";

const path = "/categories/";
const categoryService = new CategoryService();

/**
 * @route   GET /api/categories/[id]
 * @desc    Get a single category by ID
 * @access  Private (Admin only)
 */
export const GET = auth(async function GET(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const categoryData = await categoryService.getCategoryById(id);

    if (!categoryData) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success", category: categoryData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   PUT /api/categories/[id]
 * @desc    Update a category by ID
 * @access  Private (Admin only)
 */
export const PUT = auth(async function PUT(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name, slug, icon, color } = await req.json();

  try {
    const updatedCategory = await categoryService.updateCategory(id, {
      name,
      slug,
      icon,
      color,
      updatedAt: new Date(),
    });

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Category updated successfully", category: updatedCategory },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   DELETE /api/categories/[id]
 * @desc    Delete a category by ID
 * @access  Private (Admin only)
 */
export const DELETE = auth(async function DELETE(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const deleted = await categoryService.deleteCategory(id);

    if (!deleted) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

