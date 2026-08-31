import { useQuery } from "@tanstack/react-query";

import { organizations } from "../data/organizations";
import { queryKeys } from "../constants/queryKeys";

export function useOrganization(id: number) {
  return useQuery({
    queryKey: queryKeys.organization(id),

    queryFn: async () => {
      const organization =
        organizations.find(
          (item) => item.id === id,
        );

      if (!organization) {
        throw new Error(
          "Organization not found",
        );
      }

      return organization;
    },

    enabled: Number.isFinite(id),
  });
}
