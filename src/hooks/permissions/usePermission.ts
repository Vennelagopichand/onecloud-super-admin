import { useQuery } from "@tanstack/react-query";

import { permissions } from "../../data/permissions";
import { queryKeys } from "../../constants/queryKeys";

export function usePermission(id: number) {
  return useQuery({
    queryKey: queryKeys.permission(id),

    queryFn: async () => {
      const permission = permissions.find(
        (item) => item.id === id
      );

      if (!permission) {
        throw new Error("Permission not found");
      }

      return permission;
    },

    enabled:
      Number.isFinite(id) &&
      id > 0,
  });
}
