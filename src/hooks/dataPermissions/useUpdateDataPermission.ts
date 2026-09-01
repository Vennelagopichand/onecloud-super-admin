import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { dataPermissions } from "../../data/dataPermissions";
import { queryKeys } from "../../constants/queryKeys";

import type { DataPermission } from "../../types/dataPermission";

interface UpdateDataPermissionInput {
  id: number;

  data: Partial<DataPermission>;
}

export function useUpdateDataPermission() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateDataPermissionInput) => {
      const index =
        dataPermissions.findIndex(
          (item) =>
            item.id === id
        );

      if (index === -1) {
        throw new Error(
          "Data permission not found"
        );
      }

      dataPermissions[index] = {
        ...dataPermissions[index],
        ...data,
      };

      return dataPermissions[index];
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
