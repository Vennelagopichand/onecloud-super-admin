import { useQuery } from "@tanstack/react-query";

import { roles } from "../data/roles";
import { queryKeys } from "../constants/queryKeys";

export function useRoles() {
  return useQuery({
    queryKey: queryKeys.roles,

    queryFn: async () => {
      return [...roles];
    },
  });
}
