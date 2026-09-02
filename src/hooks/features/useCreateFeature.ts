import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { features } from "../../data/features";
import { queryKeys } from "../../constants/queryKeys";

import type { Feature } from "../../types/feature";

type NewFeature = Omit<
  Feature,
  "id" | "createdAt" | "enabledTenants"
>;

export function useCreateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewFeature) => {
      const id =
        features.length > 0
          ? Math.max(...features.map((item) => item.id)) + 1
          : 1;

      const feature: Feature = {
        ...data,
        id,
        featureCode:
          data.featureCode ||
          `FEA${String(id).padStart(3, "0")}`,
        enabledTenants: 0,
        createdAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      features.push(feature);

      return feature;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.features,
      });
    },
  });
}
