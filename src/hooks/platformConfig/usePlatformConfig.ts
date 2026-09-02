import { useQuery } from "@tanstack/react-query";

import { platformConfigs } from "../../data/platformConfigs";
import { queryKeys } from "../../constants/queryKeys";

export function usePlatformConfig(id: number) {
  return useQuery({
    queryKey: queryKeys.platformConfig(id),

    queryFn: async () => {
      const config = platformConfigs.find(
        (item) => item.id === id
      );

      if (!config) {
        throw new Error(
          "Platform configuration not found"
        );
      }

      return config;
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}
