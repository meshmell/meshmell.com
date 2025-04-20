import { Prisma, MainRole } from "@prisma/client";

export interface MainRoleFormType {
  name: string;
  slug: string;
}

export interface IMainRoleService {
  getMainRoles(): Promise<MainRole[]>;
  getMainRole(id: number): Promise<MainRole>;
  getMainRoleBySlug(slug: string): Promise<MainRole>;
  createMainRole(mainRole: MainRoleFormType): Promise<MainRole | null>;
  updateMainRole(id: number, mainRole: MainRoleFormType, tx?: Prisma.TransactionClient): Promise<MainRole>;
  deleteMainRole(id: number): Promise<void>;
} 