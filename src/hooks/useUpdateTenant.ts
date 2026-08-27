import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { tenants } from "../data/tenants";
import type { Tenant } from "../types/tenant";
import { queryKeys } from "../constants/queryKeys";

export interface UpdateTenantInput {
  id: number;
  tenantName: string;
  tenantCode: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: Tenant["subscription"];
  country: string;
  timeZone: string;
  status: Tenant["status"];
}

export const useUpdateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateTenantInput
    ): Promise<Tenant> => {
      const index = tenants.findIndex(
        (item) => item.id === data.id
      );

      if (index === -1) {
        throw new Error("Tenant not found");
      }

      const duplicate = tenants.some(
        (item) =>
          item.id !== data.id &&
          item.tenantCode.toLowerCase() ===
            data.tenantCode.toLowerCase()
      );

      if (duplicate) {
        throw new Error("Tenant code already exists");
      }

      tenants[index] = {
        ...tenants[index],
        ...data,
      };

      return { ...tenants[index] };
    },

    onSuccess: (tenant) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.tenant(tenant.id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.tenantStats(tenant.id),
      });
    },
  });
};
