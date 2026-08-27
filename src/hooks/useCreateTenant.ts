import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { tenants } from "../data/tenants";
import type { Tenant } from "../types/tenant";
import { queryKeys } from "../constants/queryKeys";

export type CreateTenantInput = Omit<
  Tenant,
  | "id"
  | "users"
  | "organizations"
  | "activeUsers"
  | "storage"
  | "createdAt"
>;

export const useCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateTenantInput
    ): Promise<Tenant> => {
      const exists = tenants.some(
        (item) =>
          item.tenantCode.toLowerCase() ===
          data.tenantCode.toLowerCase()
      );

      if (exists) {
        throw new Error("Tenant code already exists");
      }

      const id =
        Math.max(0, ...tenants.map((item) => item.id)) + 1;

      const tenant: Tenant = {
        ...data,
        id,
        users: 0,
        organizations: 0,
        activeUsers: 0,
        storage: 0,
        createdAt: new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
      };

      tenants.push(tenant);

      return { ...tenant };
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants,
      }),
  });
};
