import { useMutation, useQueryClient } from "@tanstack/react-query";

import { securityPolicies } from "../../data/securityPolicies";
import { queryKeys } from "../../constants/queryKeys";

import type { SecurityPolicy } from "../../types/security";

interface UpdateSecurityPolicy {
  id: number;
  data: Partial<SecurityPolicy>;
}

export function useUpdateSecurityPolicy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateSecurityPolicy) => {
      const index = securityPolicies.findIndex(
        (item) => item.id === id
      );

      if (index === -1) {
        throw new Error("Security policy not found");
      }

      securityPolicies[index] = {
        ...securityPolicies[index],
        ...data,
        updatedAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      return securityPolicies[index];
    },

    onSuccess: (policy) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.securityPolicies,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.securityPolicy(policy.id),
      });
    },
  });
}
