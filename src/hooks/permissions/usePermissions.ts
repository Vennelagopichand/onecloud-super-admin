import { useQuery } from "@tanstack/react-query";

import { permissions } from "../../data/permissions";
import { queryKeys } from "../../constants/queryKeys";

export function usePermissions() {
  return useQuery({
    queryKey: queryKeys.permissions,

    queryFn: async () => {
      return [...permissions];
    },
  });
}
