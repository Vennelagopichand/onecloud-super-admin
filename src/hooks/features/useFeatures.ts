import { useQuery } from "@tanstack/react-query";

import { features } from "../../data/features";
import { queryKeys } from "../../constants/queryKeys";

export function useFeatures() {
  return useQuery({
    queryKey: queryKeys.features,
    queryFn: async () => [...features],
  });
}
