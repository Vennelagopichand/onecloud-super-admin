import { useQuery } from "@tanstack/react-query";

import { tenants } from "../data/tenants";
import { queryKeys } from "../constants/queryKeys";

export const useTenant = (id: number) =>
  useQuery({
    queryKey: queryKeys.tenant(id),

    queryFn: async () => {
      const tenant = tenants.find(
        (item) => item.id === id
      );

      if (!tenant) {
        throw new Error("Tenant not found");
      }

      return { ...tenant };
    },

    enabled: id > 0,
  });
  