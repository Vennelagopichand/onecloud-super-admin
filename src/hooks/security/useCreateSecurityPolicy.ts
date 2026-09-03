import { useMutation, useQueryClient } from "@tanstack/react-query";

import { securityPolicies } from "../../data/securityPolicies";
import { queryKeys } from "../../constants/queryKeys";

import type { SecurityPolicy } from "../../types/security";

type CreateSecurityPolicy = Omit<
  SecurityPolicy,
  "id" | "updatedAt"
>;

export function useCreateSecurityPolicy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSecurityPolicy) => {
      const id =
        Math.max(0, ...securityPolicies.map((item) => item.id)) + 1;

      const policy: SecurityPolicy = {
        ...data,
        id,
        policyCode:
          data.policyCode || `SEC${String(id).padStart(3, "0")}`,
        updatedAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      securityPolicies.push(policy);

      return policy;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.securityPolicies,
      });
    },
  });
}
