import { useQuery } from "@tanstack/react-query";

import { users } from "../data/users";
import { queryKeys } from "../constants/queryKeys";

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,

    queryFn: async () => {
      return [...users];
    },
  });
}
