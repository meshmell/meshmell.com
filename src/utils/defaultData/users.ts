import { UserBasicWithID } from "@/src/types/user";

export const defaultSponsorInfo: UserBasicWithID = {
  id: 1,
  name: "User Name 1",
  email: "user1@example.com",
  models: [
    {
      model_id: "1",
      model_name: "Model Name 1",
    },
    {
      model_id: "2",
      model_name: "Model Name 2",
    },
  ],
};
