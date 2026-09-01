import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { users } from "../data/users";
import { queryKeys } from "../constants/queryKeys";

import type { User } from "../types/user";

interface UpdateUserInput {
  id: number;
  data: Partial<User>;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateUserInput) => {
      const index =
        users.findIndex(
          (item) => item.id === id
        );

      if (index === -1) {
        throw new Error(
          "User not found"
        );
      }

      users[index] = {
        ...users[index],
        ...data,
      };

      return users[index];
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
