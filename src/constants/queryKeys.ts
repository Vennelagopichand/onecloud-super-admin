export const queryKeys = {
  /* Tenant */
  tenants: ["tenants"] as const,
  tenant: (id: number) =>
    ["tenant", id] as const,
  tenantStats: (id: number) =>
    ["tenantStats", id] as const,

  /* Organization */
  organizations: ["organizations"] as const,
  organization: (id: number) =>
    ["organization", id] as const,

  /* User */
  users: ["users"] as const,
  user: (id: number) =>
    ["user", id] as const,

  /* Role */
  roles: ["roles"] as const,
  role: (id: number) =>
    ["role", id] as const,

  /* Permission */
  permissions: ["permissions"] as const,
  permission: (id: number) =>
    ["permission", id] as const,

  /* Data Permission */
  dataPermissions: ["dataPermissions"] as const,
  dataPermission: (id: number) =>
    ["dataPermission", id] as const,

  /* Feature */
  features: ["features"] as const,
  feature: (id: number) =>
    ["feature", id] as const,

  /* Subscription & License */
  subscriptions: ["subscriptions"] as const,
  subscription: (id: number) =>
    ["subscription", id] as const,

  /* Platform Configuration */
  platformConfigs: ["platformConfigs"] as const,
  platformConfig: (id: number) =>
    ["platformConfig", id] as const,
  
  /* Security Management */
  securityPolicies: ["securityPolicies"] as const,

  securityPolicy: (id: number) =>
  ["securityPolicy", id] as const,
  
  /* Audit Logs */
  auditLogs: ["auditLogs"] as const,

  auditLog: (id: number) =>
  ["auditLog", id] as const,

 /* Notification Management */
  notifications: ["notifications"] as const,

  notification: (id: number) =>
  ["notification", id] as const,
};
