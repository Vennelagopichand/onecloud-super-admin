import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { permissions } from "../../data/permissions";
import { queryKeys } from "../../constants/queryKeys";

import type { Permission } from "../../types/permission";

interface UpdatePermissionInput {
  id: number;

  data: Partial<Permission>;
}

export function useUpdatePermission() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdatePermissionInput) => {
      const index =
        permissions.findIndex(
          (item) =>
            item.id === id
        );

      if (index === -1) {
        throw new Error(
          "Permission not found"
        );
      }

      permissions[index] = {
        ...permissions[index],
        ...data,
      };

      return permissions[index];
    },

    onSuccess: (
      permission
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.permissions,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.permission(
            permission.id
          ),
      });
    },
  });
}
