import type { Role } from "../types/role";

export const roles: Role[] = [
  {
    id: 1,
    roleCode: "ROL001",
    roleName: "Super Admin",
    description:
      "Full platform-level access across all tenants, organizations and modules.",
    scope: "Platform",
    usersCount: 1,
    permissionsCount: 24,
    status: "Active",
    createdAt: "01 Aug 2026",
  },

  {
    id: 2,
    roleCode: "ROL002",
    roleName: "Tenant Admin",
    description:
      "Manages tenant users, organizations and tenant-level settings.",
    scope: "Tenant",
    usersCount: 12,
    permissionsCount: 18,
    status: "Active",
    createdAt: "02 Aug 2026",
  },

  {
    id: 3,
    roleCode: "ROL003",
    roleName: "Organization Admin",
    description:
      "Manages users and configuration within an organization.",
    scope: "Organization",
    usersCount: 18,
    permissionsCount: 14,
    status: "Active",
    createdAt: "04 Aug 2026",
  },

  {
    id: 4,
    roleCode: "ROL004",
    roleName: "Manager",
    description:
      "Manages operational teams and selected business modules.",
    scope: "Organization",
    usersCount: 32,
    permissionsCount: 9,
    status: "Active",
    createdAt: "08 Aug 2026",
  },

  {
    id: 5,
    roleCode: "ROL005",
    roleName: "User",
    description:
      "Standard application user with limited assigned permissions.",
    scope: "Organization",
    usersCount: 85,
    permissionsCount: 5,
    status: "Active",
    createdAt: "10 Aug 2026",
  },

  {
    id: 6,
    roleCode: "ROL006",
    roleName: "Auditor",
    description:
      "Read-only access to audit logs, reports and compliance information.",
    scope: "Tenant",
    usersCount: 6,
    permissionsCount: 7,
    status: "Inactive",
    createdAt: "15 Aug 2026",
  },
];
