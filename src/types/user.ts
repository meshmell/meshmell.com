export type UserBasic = {
  name: string;
  email: string;
};

export type UserBasicWithPassword = UserBasic & {
  currentPassword: string;
  newPassword: string;
};

export type UserBasicWithID = UserBasic & {
  id: number;
};

export type UserDataResponse = {
  id: number;
  name: string | null;
  email: string | null;
  password?: string | null;
};

export type UserBasicForm = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword?: string | null;
};

export type UserBasicFormInAPI = {
  name: string;
  email: string;
  newPassword: string;
};

export type UserBasicFormWithID = UserBasicForm & {
  id: number;
};
