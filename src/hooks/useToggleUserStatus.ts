import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { users } from "../data/users";
import { queryKeys } from "../constants/queryKeys";

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      id: number
    ) => {
      const user = users.find(
        (item) => item.id === id
      );

      if (!user) {
        throw new Error(
          "User not found"
        );
      }

      user.status =
        user.status === "Active"
          ? "Inactive"
          : "Active";

      return user;
    },

    onSuccess: (user) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.user(user.id),
      });
    },
  });
}
