import axios from "axios";

import {
  UserBasicForm,
  UserBasicFormWithID,
  UserBasicWithID,
} from "../types/user";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getUserById = async ({ id }: { id: number }) => {
  return (await axiosInstance.get<UserBasicWithID>(`api/users/${id}/`)).data;
};

export const getUsers = async ({ userId }: { userId: number | null }) => {
  return (
    await axiosInstance.get<{
      users: UserBasicWithID[];
    }>("api/users/", {
      params: {
        userId: userId,
      },
    })
  ).data;
};

export const createUser = async (user: UserBasicForm) => {
  await axiosInstance.post("api/users", user);
};

export const updateUser = async (user: UserBasicFormWithID) => {
  await axiosInstance.put(`api/users/${user.id}/`, user);
};

export const deleteUser = async (id: number) => {
  await axiosInstance.delete(`api/users/${id}/`);
};
