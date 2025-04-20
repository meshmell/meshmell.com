import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { checkAuthorization } from "../../utils/checkAuthorization";

import { RoleService } from "@/src/services/RoleService";

const path = "/roles/";
const roleService = new RoleService();

/**
 * @route   GET /api/roles/[id]
 * @desc    Get a single role by ID
 * @access  Private (Admin only)
 */
export const GET = auth(async function GET(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const roleData = await roleService.getRoleById(id);

    if (!roleData) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success", role: roleData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   PUT /api/roles/[id]
 * @desc    Update a role by ID
 * @access  Private (Admin only)
 */
export const PUT = auth(async function PUT(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name, slug } = await req.json();

  try {
    const updatedRole = await roleService.updateRole(id, { name, slug });

    if (!updatedRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Role updated successfully", role: updatedRole },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

/**
 * @route   DELETE /api/roles/[id]
 * @desc    Delete a role by ID
 * @access  Private (Admin only)
 */
export const DELETE = auth(async function DELETE(req) {
  const id: number = parseInt(req.url.split(path)[1], 10);
  const { user, errorMessage } = await checkAuthorization(req);

  if (errorMessage || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const deleted = await roleService.deleteRole(id);

    if (!deleted) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Role deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
