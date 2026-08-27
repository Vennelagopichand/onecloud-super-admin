import { useQuery } from "@tanstack/react-query";

import { tenants } from "../data/tenants";
import { queryKeys } from "../constants/queryKeys";

export interface TenantStats {
  users: number;
  organizations: number;
  activeUsers: number;
  storage: number;
}

export const useTenantStats = (id: number) =>
  useQuery({
    queryKey: queryKeys.tenantStats(id),

    queryFn: async (): Promise<TenantStats> => {
      const tenant = tenants.find(
        (item) => item.id === id
      );

      if (!tenant) {
        throw new Error("Tenant statistics not found");
      }

      return {
        users: tenant.users,
        organizations: tenant.organizations,
        activeUsers: tenant.activeUsers,
        storage: tenant.storage,
      };
    },

    enabled: id > 0,
  });
  