import { useQuery } from "@tanstack/react-query";

import { notifications } from "../../data/notifications";
import { queryKeys } from "../../constants/queryKeys";

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: async () => [...notifications],
  });
}
