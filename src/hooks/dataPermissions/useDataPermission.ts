import { useQuery } from "@tanstack/react-query";

import { dataPermissions } from "../../data/dataPermissions";
import { queryKeys } from "../../constants/queryKeys";

export function useDataPermission(
  id: number
) {
  return useQuery({
    queryKey:
      queryKeys.dataPermission(id),

    queryFn: async () => {
      const dataPermission =
        dataPermissions.find(
          (item) => item.id === id
        );

      if (!dataPermission) {
        throw new Error(
          "Data permission not found"
        );
      }

      return dataPermission;
    },

    enabled:
      Number.isFinite(id) &&
      id > 0,
  });
}
