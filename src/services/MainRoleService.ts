import { MainRole, Prisma } from "@prisma/client";

import prisma from "@/src/lib/prisma";

import { IMainRoleService, MainRoleFormType } from "./IMainRoleService";

export class MainRoleService implements IMainRoleService {
  async getMainRoles(): Promise<MainRole[]> {
    const mainRoles = await prisma.mainRole.findMany();

    await prisma.$disconnect();

    return mainRoles;
  }

  async getMainRole(id: number): Promise<MainRole> {
    const mainRole = await prisma.mainRole.findFirst({
      where: {
        id,
      },
    });

    if (!mainRole) {
      throw new Error("Main role not found");
    }

    await prisma.$disconnect();

    return mainRole;
  }

  async getMainRoleBySlug(slug: string): Promise<MainRole> {
    const mainRole = await prisma.mainRole.findFirst({
      where: {
        slug,
      },
    });

    if (!mainRole) {
      throw new Error("Main role not found");
    }

    await prisma.$disconnect();

    return mainRole;
  }

  async createMainRole(mainRole: MainRoleFormType): Promise<MainRole | null> {
    const { name, slug } = mainRole;

    try {
      const newMainRole = await prisma.mainRole.create({
        data: {
          name,
          slug,
        },
      });

      await prisma.$disconnect();

      return newMainRole;
    } catch (error) {
      console.error("Error creating main role:", error);

      return null;
    }
  }

  async updateMainRole(
    id: number,
    mainRole: MainRoleFormType,
    tx?: Prisma.TransactionClient,
  ): Promise<MainRole> {
    const prismaClient = tx || prisma;
    const { name, slug } = mainRole;

    const updatedMainRole = await prismaClient.mainRole.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    await prisma.$disconnect();

    return updatedMainRole;
  }

  async deleteMainRole(id: number): Promise<void> {
    await prisma.mainRole.delete({
      where: { id },
    });

    await prisma.$disconnect();
  }
} 