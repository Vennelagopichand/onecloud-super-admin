import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { permissions } from "../../data/permissions";
import { queryKeys } from "../../constants/queryKeys";

export function useTogglePermissionStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      id: number
    ) => {
      const permission =
        permissions.find(
          (item) =>
            item.id === id
        );

      if (!permission) {
        throw new Error(
          "Permission not found"
        );
      }

      permission.status =
        permission.status ===
        "Active"
          ? "Inactive"
          : "Active";

      return permission;
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
