import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { dataPermissions } from "../../data/dataPermissions";
import { queryKeys } from "../../constants/queryKeys";

import type { DataPermission } from "../../types/dataPermission";

type NewDataPermission = Omit<
  DataPermission,
  "id" | "createdAt"
>;

export function useCreateDataPermission() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      data: NewDataPermission
    ) => {
      const id =
        dataPermissions.length > 0
          ? Math.max(
              ...dataPermissions.map(
                (item) => item.id
              )
            ) + 1
          : 1;

      const dataPermission: DataPermission = {
        ...data,

        id,

        permissionCode:
          data.permissionCode ||
          `DPR${String(id).padStart(
            3,
            "0"
          )}`,

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

      dataPermissions.push(
        dataPermission
      );

      return dataPermission;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.dataPermissions,
      });
    },
  });
}
