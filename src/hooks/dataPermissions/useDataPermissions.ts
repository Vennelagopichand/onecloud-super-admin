import { useQuery } from "@tanstack/react-query";

import { dataPermissions } from "../../data/dataPermissions";
import { queryKeys } from "../../constants/queryKeys";

export function useDataPermissions() {
  return useQuery({
    queryKey: queryKeys.dataPermissions,

    queryFn: async () => {
      return [...dataPermissions];
    },
  });
}
