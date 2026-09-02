import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { features } from "../../data/features";
import { queryKeys } from "../../constants/queryKeys";

import type { Feature } from "../../types/feature";

interface UpdateFeatureInput {
  id: number;
  data: Partial<Feature>;
}

export function useUpdateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateFeatureInput) => {
      const index = features.findIndex(
        (item) => item.id === id
      );

      if (index === -1) {
        throw new Error("Feature not found");
      }

      features[index] = {
        ...features[index],
        ...data,
      };

      return features[index];
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
