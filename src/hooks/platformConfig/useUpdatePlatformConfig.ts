import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { platformConfigs } from "../../data/platformConfigs";
import { queryKeys } from "../../constants/queryKeys";

import type { PlatformConfig } from "../../types/platformConfig";

interface UpdatePlatformConfigInput {
  id: number;
  data: Partial<PlatformConfig>;
}

export function useUpdatePlatformConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdatePlatformConfigInput) => {
      const index =
        platformConfigs.findIndex(
          (item) => item.id === id
        );

      if (index === -1) {
        throw new Error(
          "Platform configuration not found"
        );
      }

      platformConfigs[index] = {
        ...platformConfigs[index],
        ...data,

        updatedAt:
          new Date().toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),
      };

      return platformConfigs[index];
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
