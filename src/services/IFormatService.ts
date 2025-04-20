import { Prisma, Format } from "@prisma/client";

export interface FormatFormType {
  name: string;
}

export interface IFormatService {
  getFormats(): Promise<Format[]>;
  getFormat(id: number): Promise<Format>;
  createFormat(format: FormatFormType): Promise<Format | null>;
  updateFormat(id: number, format: FormatFormType, tx?: Prisma.TransactionClient): Promise<Format>;
  deleteFormat(id: number): Promise<void>;
} 