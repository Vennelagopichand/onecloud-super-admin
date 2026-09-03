import { useQuery } from "@tanstack/react-query";

import { auditLogs } from "../../data/auditLogs";
import { queryKeys } from "../../constants/queryKeys";

export function useAuditLog(id: number) {
  return useQuery({
    queryKey: queryKeys.auditLog(id),

    queryFn: async () => {
      const log = auditLogs.find(
        (item) => item.id === id
      );

      if (!log) {
        throw new Error("Audit log not found");
      }

      return log;
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}
