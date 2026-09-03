import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { notifications } from "../../data/notifications";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleNotificationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const notification =
        notifications.find(
          (item) => item.id === id
        );

      if (!notification) {
        throw new Error(
          "Notification not found"
        );
      }

      notification.status =
        notification.status === "Active"
          ? "Inactive"
          : "Active";

      return notification;
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
