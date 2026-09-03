import { useQuery } from "@tanstack/react-query";

import { notifications } from "../../data/notifications";
import { queryKeys } from "../../constants/queryKeys";

export function useNotification(id: number) {
  return useQuery({
    queryKey: queryKeys.notification(id),

    queryFn: async () => {
      const notification = notifications.find(
        (item) => item.id === id
      );

      if (!notification) {
        throw new Error("Notification not found");
      }

      return notification;
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}
