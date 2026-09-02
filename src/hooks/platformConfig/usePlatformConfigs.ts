import { useQuery } from "@tanstack/react-query";

import { platformConfigs } from "../../data/platformConfigs";
import { queryKeys } from "../../constants/queryKeys";

export function usePlatformConfigs() {
  return useQuery({
    queryKey: queryKeys.platformConfigs,

    queryFn: async () => {
      return [...platformConfigs];
    },
  });
}
