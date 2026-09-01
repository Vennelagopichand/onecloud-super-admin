import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { users } from "../data/users";
import { queryKeys } from "../constants/queryKeys";

import type { User } from "../types/user";

type NewUser = Omit<
  User,
  "id" | "createdAt" | "lastLogin"
>;

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: NewUser
    ) => {
      const id =
        users.length > 0
          ? Math.max(
              ...users.map(
                (item) => item.id
              )
            ) + 1
          : 1;

      const user: User = {
        ...data,

        id,

        userId:
          data.userId ||
          `USR${String(id).padStart(
            3,
            "0"
          )}`,

        lastLogin: "Never",

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

      users.push(user);

      return user;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users,
      });
    },
  });
}
