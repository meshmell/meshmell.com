import { Prisma, Action } from "@prisma/client";

export interface ActionFormType {
  name: string;
  slug: string;
  icon: string;
}

export interface IActionService {
  getActions(): Promise<Action[]>;
  getAction(id: number): Promise<Action>;
  getActionBySlug(slug: string): Promise<Action>;
  createAction(action: ActionFormType): Promise<Action | null>;
  updateAction(id: number, action: ActionFormType, tx?: Prisma.TransactionClient): Promise<Action>;
  deleteAction(id: number): Promise<void>;
} 