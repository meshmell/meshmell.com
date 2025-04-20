import { Prisma, Category } from "@prisma/client";

export interface CategoryFormType {
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export interface ICategoryService {
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category>;
  getCategoryBySlug(slug: string): Promise<Category>;
  createCategory(category: CategoryFormType): Promise<Category | null>;
  updateCategory(id: number, category: CategoryFormType, tx?: Prisma.TransactionClient): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
} 