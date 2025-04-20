import {
  ThreeDModelApiResponse,
  ThreeDModelBasicForm,
} from "@/src/types/threeDModel";

import {
  ThreeDModelOrderKeyType,
  VisibilityKeyType,
} from "../literal/threeDModel";

export type GetThreeDModelsQuery = {
  page: string;
  order: ThreeDModelOrderKeyType | undefined;
  searchWord: string | undefined;
  visibilities: VisibilityKeyType[];
  inSession: boolean;
  name: string | undefined;
  category: string | undefined;
  user: string | undefined;
};

export interface IThreeDModelService {
  getThreeDModels(
    query: GetThreeDModelsQuery,
  ): Promise<{ threeDModels: ThreeDModelApiResponse[]; count: number }>;
  getThreeDModel(threeDModelId: number): Promise<ThreeDModelApiResponse>;
  createThreeDModel(
    threeDModel: ThreeDModelBasicForm,
    thoughtId: number,
  ): Promise<ThreeDModelApiResponse>;
  updateThreeDModel(
    threeDModelId: number,
    threeDModel: ThreeDModelBasicForm,
  ): Promise<ThreeDModelApiResponse>;
  deleteThreeDModel(threeDModelId: number): Promise<void>;
}
