import { injectable, inject } from "inversify";
import { NextRequest } from "next/server";

import { Category } from "@prisma/client";

import { TYPES } from "@/src/lib/di/types";

import type { CategoryFormType, ICategoryService } from "@/src/services/ICategoryService";

@injectable()
export class CategoryController {
  private categoryService: ICategoryService;

  constructor(@inject(TYPES.CategoryService) categoryService: ICategoryService) {
    this.categoryService = categoryService;
  }

  /**
   * @route   GET /api/categories
   * @desc    Get categories
   * @access  Public
   */
  public async getCategories() {
    try {
      const categories = await this.categoryService.getCategories();

      return categories;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500,
        });
      }

      throw new Error("Unknown error", {
        cause: 500,
      });
    }
  }

  /**
   * @route   GET /api/categories/[id]
   * @desc    Get category
   * @access  Public
   */
  public async getCategory(id: number) {
    try {
      return await this.categoryService.getCategory(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500,
        });
      }

      throw new Error("Unknown error", {
        cause: 500,
      });
    }
  }

  /**
   * @route   GET /api/categories/slug/[slug]
   * @desc    Get category by slug
   * @access  Public
   */
  public async getCategoryBySlug(slug: string) {
    try {
      return await this.categoryService.getCategoryBySlug(slug);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500,
        });
      }

      throw new Error("Unknown error", {
        cause: 500,
      });
    }
  }

  /**
   * @route   POST /api/categories
   * @desc    Create category
   * @access  Private
   */
  public async createCategory(req: NextRequest) {
    const categoryData: CategoryFormType = await req.json();

    try {
      const category = await this.categoryService.createCategory(categoryData);

      return category;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message, {
          cause: 500,
        });
      }

      throw new Error("Unknown error", {
        cause: 500,
      });
    }
  }

  /**
   * @route   PUT /api/categories/[id]
   * @desc    Update category
   * @access  Private
   */
  public async updateCategory(id: number, req: NextRequest) {
    const categoryData: CategoryFormType = await req.json();

    return await this.categoryService.updateCategory(id, categoryData);
  }

  /**
   * @route   DELETE /api/categories/[id]
   * @desc    Delete category
   * @access  Private
   */
  public async deleteCategory(id: number) {
    return await this.categoryService.deleteCategory(id);
  }
} 