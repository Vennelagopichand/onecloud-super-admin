import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { organizations } from "../data/organizations";
import { queryKeys } from "../constants/queryKeys";

import type { Organization } from "../types/organization";

type NewOrganization = Omit<
  Organization,
  "id" | "createdAt"
>;

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: NewOrganization,
    ) => {
      const organization: Organization = {
        ...data,

        id:
          organizations.length > 0
            ? Math.max(
                ...organizations.map(
                  (item) => item.id,
                ),
              ) + 1
            : 1,

        createdAt:
          new Date().toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            },
          ),
      };

      organizations.push(organization);

      return organization;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.organizations,
      });
    },
  });
}
