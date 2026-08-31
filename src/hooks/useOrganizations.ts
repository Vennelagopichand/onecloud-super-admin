import { useQuery } from "@tanstack/react-query";

import { organizations } from "../data/organizations";
import { queryKeys } from "../constants/queryKeys";

export function useOrganizations() {
  return useQuery({
    queryKey: queryKeys.organizations,

    queryFn: async () => {
      return [...organizations];
    },
  });
}
