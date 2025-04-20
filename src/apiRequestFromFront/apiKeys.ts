import axios from "axios";

import {
  ApiKeyBasicForm,
  ApiKeyBasicFormWithID,
  ApiKeyBasicWithID,
} from "@/src/types/apiKey";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getApiKeyById = async ({ id }: { id: number }) => {
  return (
    await axiosInstance.get<ApiKeyBasicWithID>(`api/thoughts/apiKeys/${id}/`)
  ).data;
};

export const getApiKeys = async ({ userId }: { userId: number | null }) => {
  return (
    await axiosInstance.get<{
      apiKeys: ApiKeyBasicWithID[];
    }>("api/thoughts/apiKeys/", {
      params: {
        userId: userId,
      },
    })
  ).data;
};

export const createApiKey = async (apiKey: ApiKeyBasicForm) => {
  await axiosInstance.post("api/thoughts/apiKeys", apiKey);
};

export const updateApiKey = async (apiKey: ApiKeyBasicFormWithID) => {
  await axiosInstance.put(`api/thoughts/apiKeys/${apiKey.id}/`, apiKey);
};

export const deleteApiKey = async (id: number) => {
  await axiosInstance.delete(`api/thoughts/apiKeys/${id}/`);
};
