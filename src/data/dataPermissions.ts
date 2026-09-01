import type { DataPermission } from "../types/dataPermission";

export const dataPermissions: DataPermission[] = [
  {
    id: 1,
    permissionCode: "DPR001",
    permissionName: "Platform Full Access",
    roleId: 1,
    roleName: "Super Admin",
    scope: "Platform",
    accessLevel: "Full Access",
    tenantName: "All Tenants",
    organizationName: "All Organizations",
    description:
      "Provides complete access to data across the entire platform.",
    status: "Active",
    createdAt: "01 Aug 2026",
  },

  {
    id: 2,
    permissionCode: "DPR002",
    permissionName: "Tenant Administration Access",
    roleId: 2,
    roleName: "Tenant Admin",
    scope: "Tenant",
    accessLevel: "Full Access",
    tenantName: "Acme Corporation",
    organizationName: "All Organizations",
    description:
      "Allows the tenant administrator to manage all data within the assigned tenant.",
    status: "Active",
    createdAt: "03 Aug 2026",
  },

  {
    id: 3,
    permissionCode: "DPR003",
    permissionName: "Organization Management Access",
    roleId: 3,
    roleName: "Organization Admin",
    scope: "Organization",
    accessLevel: "Full Access",
    tenantName: "Acme Corporation",
    organizationName: "Acme India Pvt Ltd",
    description:
      "Provides full access to data within the assigned organization.",
    status: "Active",
    createdAt: "05 Aug 2026",
  },

  {
    id: 4,
    permissionCode: "DPR004",
    permissionName: "Manager Department Access",
    roleId: 4,
    roleName: "Manager",
    scope: "Department",
    accessLevel: "Write",
    tenantName: "TechNova",
    organizationName: "TechNova Labs",
    description:
      "Allows managers to read and update data belonging to their department.",
    status: "Active",
    createdAt: "08 Aug 2026",
  },

  {
    id: 5,
    permissionCode: "DPR005",
    permissionName: "Employee Own Records",
    roleId: 5,
    roleName: "User",
    scope: "Own Records",
    accessLevel: "Read",
    tenantName: "Acme Corporation",
    organizationName: "Acme Digital",
    description:
      "Allows standard users to access only their own records.",
    status: "Active",
    createdAt: "10 Aug 2026",
  },

  {
    id: 6,
    permissionCode: "DPR006",
    permissionName: "Audit Tenant Read Access",
    roleId: 6,
    roleName: "Auditor",
    scope: "Tenant",
    accessLevel: "Read",
    tenantName: "CloudSoft Solutions",
    organizationName: "All Organizations",
    description:
      "Provides read-only access to tenant data for auditing purposes.",
    status: "Inactive",
    createdAt: "15 Aug 2026",
  },

  {
    id: 7,
    permissionCode: "DPR007",
    permissionName: "NextGen Organization Access",
    roleId: 3,
    roleName: "Organization Admin",
    scope: "Organization",
    accessLevel: "Write",
    tenantName: "NextGen Technologies",
    organizationName: "NextGen Systems",
    description:
      "Allows organization administrators to read and update organization data.",
    status: "Active",
    createdAt: "18 Aug 2026",
  },

  {
    id: 8,
    permissionCode: "DPR008",
    permissionName: "TechNova User Records",
    roleId: 5,
    roleName: "User",
    scope: "Own Records",
    accessLevel: "Read",
    tenantName: "TechNova",
    organizationName: "TechNova Labs",
    description:
      "Restricts standard users to their own application records.",
    status: "Active",
    createdAt: "20 Aug 2026",
  },
];
