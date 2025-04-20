import { Prisma, SubRole } from "@prisma/client";

export interface SubRoleFormType {
  name: string;
  slug: string;
}

export interface ISubRoleService {
  getSubRoles(): Promise<SubRole[]>;
  getSubRole(id: number): Promise<SubRole>;
  getSubRoleBySlug(slug: string): Promise<SubRole>;
  createSubRole(subRole: SubRoleFormType): Promise<SubRole | null>;
  updateSubRole(id: number, subRole: SubRoleFormType, tx?: Prisma.TransactionClient): Promise<SubRole>;
  deleteSubRole(id: number): Promise<void>;
} 