import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { permissions } from "../../data/permissions";
import { queryKeys } from "../../constants/queryKeys";

import type { Permission } from "../../types/permission";

type NewPermission = Omit<
  Permission,
  "id" | "createdAt" | "rolesCount"
>;

export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: NewPermission
    ) => {
      const id =
        permissions.length > 0
          ? Math.max(
              ...permissions.map(
                (item) => item.id
              )
            ) + 1
          : 1;

      const permission: Permission = {
        ...data,

        id,

        permissionCode:
          data.permissionCode ||
          `PER${String(id).padStart(
            3,
            "0"
          )}`,

        rolesCount: 0,

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

      permissions.push(permission);

      return permission;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.permissions,
      });
    },
  });
}
