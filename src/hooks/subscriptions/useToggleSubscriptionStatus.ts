import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { subscriptions } from "../../data/subscriptions";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleSubscriptionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const subscription =
        subscriptions.find(
          (item) => item.id === id
        );

      if (!subscription) {
        throw new Error(
          "Subscription not found"
        );
      }

      subscription.status =
        subscription.status === "Active"
          ? "Suspended"
          : "Active";

      return subscription;
    },

    onSuccess: (subscription) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.subscriptions,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.subscription(
            subscription.id
          ),
      });
    },
  });
}
