import { useQuery } from "@tanstack/react-query";

import { roles } from "../data/roles";
import { queryKeys } from "../constants/queryKeys";

export function useRole(id: number) {
  return useQuery({
    queryKey: queryKeys.role(id),

    queryFn: async () => {
      const role = roles.find(
        (item) => item.id === id
      );

      if (!role) {
        throw new Error(
          "Role not found"
        );
      }

      return role;
    },

    enabled: Number.isFinite(id),
  });
}
