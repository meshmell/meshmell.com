export type ApiKeyBasic = {
  name: string;
  key: string;
  isActive: boolean;
  lastUsedAt: Date | null;
};

export type ApiKeyBasicWithID = {
  id: number;
  userId: number;
  name: string;
  key: string;
  isActive: boolean;
};

export type ApiKeyBasicForm = {
  name: string;
  key: string;
  isActive: boolean;
};

export type ApiKeyBasicFormWithID = ApiKeyBasicForm & {
  id: number;
};

export type ApiKeyBasicWithIDForm = ApiKeyBasicForm & {
  id: number;
};

export type ApiKeyApiResponse = {
  id: number;
  userId: number;
  name: string;
  key: string;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
};
