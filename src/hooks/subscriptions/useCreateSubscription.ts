import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { subscriptions } from "../../data/subscriptions";
import { queryKeys } from "../../constants/queryKeys";

import type { Subscription } from "../../types/subscription";

type NewSubscription = Omit<
  Subscription,
  "id" | "createdAt"
>;

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: NewSubscription
    ) => {
      const id = subscriptions.length
        ? Math.max(
            ...subscriptions.map(
              (item) => item.id
            )
          ) + 1
        : 1;

      const subscription: Subscription = {
        ...data,
        id,

        subscriptionCode:
          data.subscriptionCode ||
          `SUB${String(id).padStart(
            3,
            "0"
          )}`,

        createdAt:
          new Date().toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),
      };

      subscriptions.push(subscription);

      return subscription;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions,
      });
    },
  });
}
