import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { platformConfigs } from "../../data/platformConfigs";
import { queryKeys } from "../../constants/queryKeys";

import type { PlatformConfig } from "../../types/platformConfig";

type CreatePlatformConfigInput = Omit<
  PlatformConfig,
  "id" | "updatedAt"
>;

export function useCreatePlatformConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreatePlatformConfigInput
    ) => {
      const id =
        platformConfigs.length > 0
          ? Math.max(
              ...platformConfigs.map(
                (item) => item.id
              )
            ) + 1
          : 1;

      const config: PlatformConfig = {
        ...data,

        id,

        configCode:
          data.configCode ||
          `CFG${String(id).padStart(
            3,
            "0"
          )}`,

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

      platformConfigs.push(config);

      return config;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.platformConfigs,
      });
    },
  });
}
