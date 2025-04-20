import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createThreeDModel,
  deleteThreeDModel,
  updateThreeDModel,
} from "@/src/apiRequestFromFront/threeDModel";
import {
  ThreeDModelBasicForm,
  ThreeDModelBasicFormWithID,
} from "@/src/types/threeDModel";

export const useDeleteModel = () => {
  return useMutation({
    mutationFn: (id: number) => deleteThreeDModel(id),
  });
};

export const useUpdateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ThreeDModelBasicFormWithID) => updateThreeDModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};

export const useCreateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ThreeDModelBasicForm) => createThreeDModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
