import axios from "axios";

import {
  ThreeDModelAll,
  ThreeDModelBasicForm,
  ThreeDModelBasicFormWithID,
} from "@/src/types/threeDModel";

import { ThreeDModelOrderKeyType } from "../literal/threeDModel";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getThreeDModelById = async ({ id }: { id: number }) => {
  return (await axiosInstance.get<ThreeDModelAll>(`api/threeDModels/${id}/`))
    .data;
};

export const getThreeDModels = async ({
  pageNum,
  order,
  name,
  category,
  user,
}: {
  pageNum: number | null;
  order: ThreeDModelOrderKeyType | null;
  name: string | null;
  category: string | null;
  user: string | null;
}) => {
  return (
    await axiosInstance.get<{
      threeDModels: ThreeDModelAll[];
      count: number;
    }>("api/threeDModels/", {
      params: {
        page: pageNum,
        order,
        name,
        category,
        user,
      },
    })
  ).data;
};

export const createThreeDModel = async (threeDModel: ThreeDModelBasicForm) => {
  await axiosInstance.post("api/threeDModels/", threeDModel);
};

export const updateThreeDModel = async (
  threeDModel: ThreeDModelBasicFormWithID,
) => {
  await axiosInstance.put(`api/threeDModels/${threeDModel.id}/`, threeDModel);
};

export const deleteThreeDModel = async (id: number) => {
  await axiosInstance.delete(`api/threeDModels/${id}/`);
};

export const getThreeDModelsCSV = async () => {
  return (
    await axiosInstance.get<{
      csv: string;
    }>("api/threeDModels/csv/")
  ).data;
};
