import { useQuery } from "@tanstack/react-query";

import { tenants } from "../data/tenants";
import { queryKeys } from "../constants/queryKeys";

export const useTenants = () =>
  useQuery({
    queryKey: queryKeys.tenants,
    queryFn: async () => [...tenants],
  });
  