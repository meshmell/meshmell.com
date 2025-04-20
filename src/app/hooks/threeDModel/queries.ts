import { useQuery } from "@tanstack/react-query";

import {
  getThreeDModelById,
  getThreeDModels,
} from "@/src/apiRequestFromFront/threeDModel";
import { ThreeDModelOrderKeyType } from "@/src/literal/threeDModel";

export const useQueryModel = (id: number, inSession: boolean) => {
  return useQuery({
    queryKey: ["model", id],
    queryFn: () => getThreeDModelById({ id }),
    enabled: inSession,
  });
};

export const useQueryModels = ({
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
  return useQuery({
    queryKey: ["models"],
    queryFn: () => getThreeDModels({ pageNum, order, name, category, user }),
  });
};
