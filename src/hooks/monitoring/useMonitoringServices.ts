import { useQuery } from "@tanstack/react-query";

import { monitoringServices } from "../../data/monitoring";
import { queryKeys } from "../../constants/queryKeys";

export function useMonitoringServices() {
  return useQuery({
    queryKey: queryKeys.monitoringServices,
    queryFn: async () => [...monitoringServices],
  });
}
