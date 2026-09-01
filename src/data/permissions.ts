import type { Permission } from "../types/permission";

export const permissions: Permission[] = [
  {
    id: 1,
    permissionCode: "PER001",
    permissionName: "View Dashboard",
    module: "Dashboard",
    action: "View",
    description:
      "Allows users to view the global platform dashboard.",
    rolesCount: 5,
    status: "Active",
    createdAt: "01 Aug 2026",
  },

  {
    id: 2,
    permissionCode: "PER002",
    permissionName: "Manage Tenants",
    module: "Tenant Management",
    action: "Manage",
    description:
      "Allows complete management of platform tenants.",
    rolesCount: 2,
    status: "Active",
    createdAt: "02 Aug 2026",
  },

  {
    id: 3,
    permissionCode: "PER003",
    permissionName: "Create Tenant",
    module: "Tenant Management",
    action: "Create",
    description:
      "Allows users to create new tenant accounts.",
    rolesCount: 2,
    status: "Active",
    createdAt: "03 Aug 2026",
  },

  {
    id: 4,
    permissionCode: "PER004",
    permissionName: "Edit Tenant",
    module: "Tenant Management",
    action: "Edit",
    description:
      "Allows users to edit tenant information.",
    rolesCount: 2,
    status: "Active",
    createdAt: "04 Aug 2026",
  },

  {
    id: 5,
    permissionCode: "PER005",
    permissionName: "Manage Organizations",
    module: "Organization Management",
    action: "Manage",
    description:
      "Allows management of organizations under tenants.",
    rolesCount: 3,
    status: "Active",
    createdAt: "05 Aug 2026",
  },

  {
    id: 6,
    permissionCode: "PER006",
    permissionName: "Manage Users",
    module: "User Management",
    action: "Manage",
    description:
      "Allows administrators to create, edit and manage users.",
    rolesCount: 4,
    status: "Active",
    createdAt: "06 Aug 2026",
  },

  {
    id: 7,
    permissionCode: "PER007",
    permissionName: "Manage Roles",
    module: "Role Management",
    action: "Manage",
    description:
      "Allows administrators to create and manage platform roles.",
    rolesCount: 2,
    status: "Active",
    createdAt: "08 Aug 2026",
  },

  {
    id: 8,
    permissionCode: "PER008",
    permissionName: "Manage Permissions",
    module: "Permission Management",
    action: "Manage",
    description:
      "Allows administrators to create and manage permissions.",
    rolesCount: 1,
    status: "Active",
    createdAt: "10 Aug 2026",
  },

  {
    id: 9,
    permissionCode: "PER009",
    permissionName: "View Audit Logs",
    module: "Audit Logs",
    action: "View",
    description:
      "Allows users to view platform audit and activity logs.",
    rolesCount: 2,
    status: "Active",
    createdAt: "12 Aug 2026",
  },

  {
    id: 10,
    permissionCode: "PER010",
    permissionName: "View Security",
    module: "Security",
    action: "View",
    description:
      "Allows users to view platform security information.",
    rolesCount: 2,
    status: "Inactive",
    createdAt: "15 Aug 2026",
  },

  {
    id: 11,
    permissionCode: "PER011",
    permissionName: "View Monitoring",
    module: "Monitoring",
    action: "View",
    description:
      "Allows access to platform monitoring and system health.",
    rolesCount: 3,
    status: "Active",
    createdAt: "18 Aug 2026",
  },

  {
    id: 12,
    permissionCode: "PER012",
    permissionName: "Manage Features",
    module: "Feature Management",
    action: "Manage",
    description:
      "Allows administrators to configure platform features.",
    rolesCount: 1,
    status: "Active",
    createdAt: "20 Aug 2026",
  },
];
