import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { notifications } from "../../data/notifications";
import { queryKeys } from "../../constants/queryKeys";

import type { Notification } from "../../types/notification";

interface UpdateNotification {
  id: number;
  data: Partial<Notification>;
}

export function useUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateNotification) => {
      const index =
        notifications.findIndex(
          (item) => item.id === id
        );

      if (index === -1) {
        throw new Error(
          "Notification not found"
        );
      }

      notifications[index] = {
        ...notifications[index],
        ...data,
      };

      return notifications[index];
    },

    onSuccess: (notification) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.notification(
          notification.id
        ),
      });
    },
  });
}
