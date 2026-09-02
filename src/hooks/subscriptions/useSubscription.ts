import { useQuery } from "@tanstack/react-query";

import { subscriptions } from "../../data/subscriptions";
import { queryKeys } from "../../constants/queryKeys";

export function useSubscription(id: number) {
  return useQuery({
    queryKey: queryKeys.subscription(id),

    queryFn: async () => {
      const subscription = subscriptions.find(
        (item) => item.id === id
      );

      if (!subscription) {
        throw new Error("Subscription not found");
      }

      return subscription;
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}
