import { useQuery } from "@tanstack/react-query";

import { users } from "../data/users";
import { queryKeys } from "../constants/queryKeys";

export function useUser(id: number) {
  return useQuery({
    queryKey: queryKeys.user(id),

    queryFn: async () => {
      const user = users.find(
        (item) => item.id === id
      );

      if (!user) {
        throw new Error(
          "User not found"
        );
      }

      return user;
    },

    enabled: Number.isFinite(id),
  });
}
