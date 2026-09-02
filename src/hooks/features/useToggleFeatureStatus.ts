import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { features } from "../../data/features";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleFeatureStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const feature = features.find(
        (item) => item.id === id
      );

      if (!feature) {
        throw new Error("Feature not found");
      }

      feature.status =
        feature.status === "Enabled"
          ? "Disabled"
          : "Enabled";

      return feature;
    },

    onSuccess: (feature) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.features,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.feature(feature.id),
      });
    },
  });
}