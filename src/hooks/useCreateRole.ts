import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { roles } from "../data/roles";
import { queryKeys } from "../constants/queryKeys";

import type { Role } from "../types/role";

type NewRole = Omit<
  Role,
  | "id"
  | "createdAt"
  | "usersCount"
>;

export function useCreateRole() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      data: NewRole
    ) => {
      const id =
        roles.length > 0
          ? Math.max(
              ...roles.map(
                (item) =>
                  item.id
              )
            ) + 1
          : 1;

      const role: Role = {
        ...data,

        id,

        roleCode:
          data.roleCode ||
          `ROL${String(
            id
          ).padStart(
            3,
            "0"
          )}`,

        usersCount: 0,

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

      roles.push(role);

      return role;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.roles,
      });
    },
  });
}
