export const queryKeys = {
  tenants: ["tenants"] as const,
  tenant: (id: number) => ["tenant", id] as const,
  tenantStats: (id: number) => ["tenantStats", id] as const,
};