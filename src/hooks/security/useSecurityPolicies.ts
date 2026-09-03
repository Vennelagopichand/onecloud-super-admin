import { useQuery } from "@tanstack/react-query";

import { securityPolicies } from "../../data/securityPolicies";
import { queryKeys } from "../../constants/queryKeys";

export function useSecurityPolicies() {
  return useQuery({
    queryKey: queryKeys.securityPolicies,
    queryFn: async () => [...securityPolicies],
  });
}
