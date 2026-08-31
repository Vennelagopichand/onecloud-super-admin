import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { organizations } from "../data/organizations";
import { queryKeys } from "../constants/queryKeys";

export function useToggleOrganizationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const organization =
        organizations.find(
          (item) => item.id === id,
        );

      if (!organization) {
        throw new Error(
          "Organization not found",
        );
      }

      organization.status =
        organization.status === "Active"
          ? "Inactive"
          : "Active";

      return organization;
    },

    onSuccess: (organization) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.organizations,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.organization(
            organization.id,
          ),
      });
    },
  });
}
