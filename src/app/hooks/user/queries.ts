import { useQuery } from "@tanstack/react-query";

import { getUsers, getUserById } from "@/src/apiRequestFromFront/user";

export const useQueryUser = (id: number, inSession: boolean) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById({ id }),
    enabled: inSession,
  });
};

export const useQueryUsers = ({
  id,
  inSession,
  role,
}: {
  id: number;
  inSession: boolean;
  role: string;
}) => {
  return useQuery({
    queryKey: ["users", id, role],
    queryFn: () => getUsers({ userId: id }),
    enabled: inSession,
  });
};
