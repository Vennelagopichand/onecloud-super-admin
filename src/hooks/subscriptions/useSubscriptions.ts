import { useQuery } from "@tanstack/react-query";

import { subscriptions } from "../../data/subscriptions";
import { queryKeys } from "../../constants/queryKeys";

export function useSubscriptions() {
  return useQuery({
    queryKey: queryKeys.subscriptions,
    queryFn: async () => [...subscriptions],
  });
}
