import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { roles } from "../data/roles";
import { queryKeys } from "../constants/queryKeys";

export function useToggleRoleStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      id: number
    ) => {
      const role =
        roles.find(
          (item) =>
            item.id === id
        );

      if (!role) {
        throw new Error(
          "Role not found"
        );
      }

      role.status =
        role.status ===
        "Active"
          ? "Inactive"
          : "Active";

      return role;
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
