import { Category, Prisma } from "@prisma/client";

import prisma from "@/src/lib/prisma";

import { CategoryFormType, ICategoryService } from "./ICategoryService";

export class CategoryService implements ICategoryService {
  async getCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany();

    await prisma.$disconnect();

    return categories;
  }

  async getCategory(id: number): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    await prisma.$disconnect();

    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: {
        slug,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    await prisma.$disconnect();

    return category;
  }

  async createCategory(category: CategoryFormType): Promise<Category | null> {
    const { name, slug, icon, color } = category;

    try {
      const newCategory = await prisma.category.create({
        data: {
          name,
          slug,
          icon,
          color,
        },
      });

      await prisma.$disconnect();

      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);

      return null;
    }
  }

  async updateCategory(
    id: number,
    category: CategoryFormType,
    tx?: Prisma.TransactionClient,
  ): Promise<Category> {
    const prismaClient = tx || prisma;
    const { name, slug, icon, color } = category;

    const updatedCategory = await prismaClient.category.update({
      where: { id },
      data: {
        name,
        slug,
        icon,
        color,
      },
    });

    await prisma.$disconnect();

    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });

    await prisma.$disconnect();
  }
} 