import { Prisma, SubRole } from "@prisma/client";

import prisma from "@/src/lib/prisma";

import { ISubRoleService, SubRoleFormType } from "./ISubRoleService";

export class SubRoleService implements ISubRoleService {
  async getSubRoles(): Promise<SubRole[]> {
    const subRoles = await prisma.subRole.findMany();

    await prisma.$disconnect();

    return subRoles;
  }

  async getSubRole(id: number): Promise<SubRole> {
    const subRole = await prisma.subRole.findFirst({
      where: {
        id,
      },
    });

    if (!subRole) {
      throw new Error("Sub role not found");
    }

    await prisma.$disconnect();

    return subRole;
  }

  async getSubRoleBySlug(slug: string): Promise<SubRole> {
    const subRole = await prisma.subRole.findFirst({
      where: {
        slug,
      },
    });

    if (!subRole) {
      throw new Error("Sub role not found");
    }

    await prisma.$disconnect();

    return subRole;
  }

  async createSubRole(subRole: SubRoleFormType): Promise<SubRole | null> {
    const { name, slug } = subRole;

    try {
      const newSubRole = await prisma.subRole.create({
        data: {
          name,
          slug,
        },
      });

      await prisma.$disconnect();

      return newSubRole;
    } catch (error) {
      console.error("Error creating sub role:", error);

      return null;
    }
  }

  async updateSubRole(
    id: number,
    subRole: SubRoleFormType,
    tx?: Prisma.TransactionClient,
  ): Promise<SubRole> {
    const prismaClient = tx || prisma;
    const { name, slug } = subRole;

    const updatedSubRole = await prismaClient.subRole.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    await prisma.$disconnect();

    return updatedSubRole;
  }

  async deleteSubRole(id: number): Promise<void> {
    await prisma.subRole.delete({
      where: { id },
    });

    await prisma.$disconnect();
  }
} 