import { Prisma, User } from "@prisma/client";

export interface GetUsersQuery {
  mainRoleId?: number;
  subRoleIds?: number[];
}

export interface UserFormType {
  email?: string;
  password?: string;
  name: string;
  slug: string;
  description?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  youtubeUrl?: string;
  mainRoleId: number;
  subRoleIds?: number[];
}

export interface IUserService {
  getUsers(query?: GetUsersQuery): Promise<User[]>;
  getUser(id: number): Promise<User>;
  getUserBySlug(slug: string): Promise<User>;
  createUser(user: UserFormType): Promise<User | null>;
  updateUser(id: number, user: UserFormType, tx?: Prisma.TransactionClient): Promise<User>;
  deleteUser(id: number): Promise<void>;
} 