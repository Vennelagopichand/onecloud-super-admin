import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { organizations } from "../data/organizations";
import { queryKeys } from "../constants/queryKeys";

import type { Organization } from "../types/organization";

interface UpdateOrganizationInput {
  id: number;
  data: Partial<Organization>;
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateOrganizationInput) => {
      const index =
        organizations.findIndex(
          (item) => item.id === id,
        );

      if (index === -1) {
        throw new Error(
          "Organization not found",
        );
      }

      organizations[index] = {
        ...organizations[index],
        ...data,
      };

      return organizations[index];
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
