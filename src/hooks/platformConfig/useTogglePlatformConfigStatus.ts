import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { platformConfigs } from "../../data/platformConfigs";
import { queryKeys } from "../../constants/queryKeys";

export function useTogglePlatformConfigStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const config =
        platformConfigs.find(
          (item) => item.id === id
        );

      if (!config) {
        throw new Error(
          "Platform configuration not found"
        );
      }

      config.status =
        config.status === "Active"
          ? "Inactive"
          : "Active";

      config.updatedAt =
        new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );

      return config;
    },

    onSuccess: (config) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.platformConfigs,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.platformConfig(
            config.id
          ),
      });
    },
  });
}
