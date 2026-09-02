import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { subscriptions } from "../../data/subscriptions";
import { queryKeys } from "../../constants/queryKeys";

import type { Subscription } from "../../types/subscription";

interface UpdateSubscriptionInput {
  id: number;
  data: Partial<Subscription>;
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateSubscriptionInput) => {
      const index =
        subscriptions.findIndex(
          (item) => item.id === id
        );

      if (index === -1) {
        throw new Error(
          "Subscription not found"
        );
      }

      subscriptions[index] = {
        ...subscriptions[index],
        ...data,
      };

      return subscriptions[index];
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
