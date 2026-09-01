import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { roles } from "../data/roles";
import { queryKeys } from "../constants/queryKeys";

import type { Role } from "../types/role";

interface UpdateRoleInput {
  id: number;

  data: Partial<Role>;
}

export function useUpdateRole() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateRoleInput) => {
      const index =
        roles.findIndex(
          (item) =>
            item.id === id
        );

      if (index === -1) {
        throw new Error(
          "Role not found"
        );
      }

      roles[index] = {
        ...roles[index],
        ...data,
      };

      return roles[index];
    },

    onSuccess: (role) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.roles,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.role(
            role.id
          ),
      });
    },
  });
}
