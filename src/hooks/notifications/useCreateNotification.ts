import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { notifications } from "../../data/notifications";
import { queryKeys } from "../../constants/queryKeys";

import type { Notification } from "../../types/notification";

type CreateNotification = Omit<
  Notification,
  "id" | "createdAt"
>;

export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateNotification
    ) => {
      const id =
        Math.max(
          0,
          ...notifications.map(
            (item) => item.id
          )
        ) + 1;

      const notification: Notification = {
        ...data,
        id,
        notificationCode:
          data.notificationCode ||
          `NOT${String(id).padStart(3, "0")}`,
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

      notifications.push(notification);

      return notification;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications,
      });
    },
  });
}
