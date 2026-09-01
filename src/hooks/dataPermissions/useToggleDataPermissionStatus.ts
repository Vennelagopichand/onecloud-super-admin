import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { dataPermissions } from "../../data/dataPermissions";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleDataPermissionStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      id: number
    ) => {
      const dataPermission =
        dataPermissions.find(
          (item) =>
            item.id === id
        );

      if (!dataPermission) {
        throw new Error(
          "Data permission not found"
        );
      }

      dataPermission.status =
        dataPermission.status ===
        "Active"
          ? "Inactive"
          : "Active";

      return dataPermission;
    },

    onSuccess: (
      dataPermission
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.dataPermissions,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.dataPermission(
            dataPermission.id
          ),
      });
    },
  });
}
