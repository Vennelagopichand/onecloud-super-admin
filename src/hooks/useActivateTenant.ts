import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { tenants } from "../data/tenants";
import { queryKeys } from "../constants/queryKeys";

export const useActivateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const tenant = tenants.find(
        (item) => item.id === id
      );

      if (!tenant) {
        throw new Error("Tenant not found");
      }

      tenant.status = "Active";

      return { ...tenant };
    },

    onSuccess: (tenant) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.tenant(tenant.id),
      });
    },
  });
};
