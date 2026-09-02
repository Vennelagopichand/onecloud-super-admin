import { useQuery } from "@tanstack/react-query";

import { features } from "../../data/features";
import { queryKeys } from "../../constants/queryKeys";

export function useFeature(id: number) {
  return useQuery({
    queryKey: queryKeys.feature(id),

    queryFn: async () => {
      const feature = features.find(
        (item) => item.id === id
      );

      if (!feature) {
        throw new Error("Feature not found");
      }

      return feature;
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}
