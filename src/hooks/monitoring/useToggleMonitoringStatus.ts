import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { monitoringServices } from "../../data/monitoring";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleMonitoringStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const service = monitoringServices.find(
        (item) => item.id === id
      );

      if (!service) {
        throw new Error(
          "Monitoring service not found"
        );
      }

      if (service.status === "Offline") {
        service.status = "Healthy";
        service.uptime = 99.99;
        service.responseTime = 120;
        service.cpuUsage = 35;
        service.memoryUsage = 45;
      } else {
        service.status = "Offline";
        service.responseTime = 0;
        service.cpuUsage = 0;
        service.memoryUsage = 0;
        service.requestsPerMinute = 0;
      }

      service.lastChecked =
        new Date().toLocaleString("en-GB");

      return service;
    },

    onSuccess: (service) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.monitoringServices,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.monitoringService(
          service.id
        ),
      });
    },
  });
}
