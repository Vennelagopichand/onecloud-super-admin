import { useQuery } from "@tanstack/react-query";

import { auditLogs } from "../../data/auditLogs";
import { queryKeys } from "../../constants/queryKeys";

export function useAuditLogs() {
  return useQuery({
    queryKey: queryKeys.auditLogs,
    queryFn: async () => [...auditLogs],
  });
}
