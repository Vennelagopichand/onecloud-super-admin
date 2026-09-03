import { useQuery } from "@tanstack/react-query";

import { securityPolicies } from "../../data/securityPolicies";
import { queryKeys } from "../../constants/queryKeys";

export function useSecurityPolicy(id: number) {
  return useQuery({
    queryKey: queryKeys.securityPolicy(id),

    queryFn: async () => {
      const policy = securityPolicies.find(
        (item) => item.id === id
      );

      if (!policy) {
        throw new Error("Security policy not found");
      }

      return policy;
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}
