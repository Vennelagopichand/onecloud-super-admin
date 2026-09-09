import { useQuery } from "@tanstack/react-query";

import { monitoringServices } from "../../data/monitoring";
import { queryKeys } from "../../constants/queryKeys";

export function useMonitoringService(id: number) {
  return useQuery({
    queryKey: queryKeys.monitoringService(id),

    queryFn: async () => {
      const service = monitoringServices.find(
        (item) => item.id === id
      );

      if (!service) {
        throw new Error(
          "Monitoring service not found"
        );
      }

      return service;
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}
