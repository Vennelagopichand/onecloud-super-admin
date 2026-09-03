import { useMutation, useQueryClient } from "@tanstack/react-query";

import { securityPolicies } from "../../data/securityPolicies";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleSecurityPolicyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const policy = securityPolicies.find(
        (item) => item.id === id
      );

      if (!policy) {
        throw new Error("Security policy not found");
      }

      policy.status =
        policy.status === "Active" ? "Inactive" : "Active";

      policy.updatedAt = new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

      return policy;
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
